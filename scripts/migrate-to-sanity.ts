// One-off migration script: pushes the site's existing static content
// (lib/data/blog.ts, services.ts, case-studies.ts, team.ts) into Sanity as
// real documents matching the schemas in sanity/schemaTypes/. Does NOT
// touch how the site itself renders — every page still reads from
// lib/data/*.ts (see CLAUDE.md discussion / this migration's own commit).
//
// Usage:
//   set -a; source .env.local; set +a; npx tsx scripts/migrate-to-sanity.ts
//
// Safe to re-run: every document uses a deterministic _id derived from the
// source content's own stable id/key, so re-running updates the same
// documents in place (via createOrReplace) instead of duplicating them.
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { getBlogPostsRaw } from "../lib/data/blog";
import { getServicesRaw } from "../lib/data/services";
import { getCaseStudiesRaw, type IndustryKey } from "../lib/data/case-studies";
import { getTeamRaw } from "../lib/data/team";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in the environment.\n" +
      "Run this with: set -a; source .env.local; set +a; npx tsx scripts/migrate-to-sanity.ts",
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function randKey(): string {
  return Math.random().toString(36).slice(2, 10);
}

function sanitySlug(current: string) {
  return { _type: "slug" as const, current };
}

type Block = { type: "paragraph" | "heading"; text: string } | { type: "list"; items: string[] };

function toSanityBlock(block: Block) {
  if (block.type === "list") {
    return { _type: "list", _key: randKey(), items: block.items };
  }
  return { _type: block.type, _key: randKey(), text: block.text };
}

// Caches uploaded image assets by their /public-relative path so an image
// shared across multiple documents (e.g. one photo per industry, reused by
// every case study in that industry — see INDUSTRY_IMAGE in
// lib/data/case-studies.ts) is only uploaded to Sanity once.
const uploadedImages = new Map<string, { _type: "image"; asset: { _type: "reference"; _ref: string } }>();

async function uploadImage(publicRelativePath: string) {
  const cached = uploadedImages.get(publicRelativePath);
  if (cached) return cached;

  const absolutePath = path.join(process.cwd(), "public", publicRelativePath);
  const buffer = fs.readFileSync(absolutePath);
  const asset = await client.assets.upload("image", buffer, { filename: path.basename(absolutePath) });
  const value = { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
  uploadedImages.set(publicRelativePath, value);
  return value;
}

async function migrateTeam() {
  const raw = getTeamRaw();
  let count = 0;
  for (let i = 0; i < raw.length; i++) {
    const m = raw[i];
    await client.createOrReplace({
      _id: `teamMember.${slugify(m.name)}`,
      _type: "teamMember",
      nombre: m.name,
      rol: { es: m.role.es, en: m.role.en },
      iniciales: m.initials,
      orden: i,
    });
    count++;
  }
  console.log(`✓ team: ${count} miembros`);
}

async function migrateBlog() {
  const raw = getBlogPostsRaw();
  let count = 0;
  for (const post of raw) {
    await client.createOrReplace({
      _id: `blogPost.${post.id}`,
      _type: "blogPost",
      titulo: { es: post.title.es, en: post.title.en },
      slug: { es: sanitySlug(post.slug.es), en: sanitySlug(post.slug.en) },
      extracto: { es: post.excerpt.es, en: post.excerpt.en },
      fecha: post.date,
      autor: post.author,
      categoria: { clave: post.categoryKey, es: post.category.es, en: post.category.en },
      tiempoLectura: { es: post.readingTime.es, en: post.readingTime.en },
      contenido: {
        es: post.content.es.map(toSanityBlock),
        en: post.content.en.map(toSanityBlock),
      },
    });
    count++;
  }
  console.log(`✓ blogPost: ${count} artículos`);
}

async function migrateServices() {
  const { data, order } = getServicesRaw();
  let count = 0;
  let i = 0;
  for (const key of order) {
    const s = data[key];
    await client.createOrReplace({
      _id: `service.${key}`,
      _type: "service",
      clave: key,
      orden: i,
      icono: s.icon,
      titulo: { es: s.title.es, en: s.title.en },
      slug: { es: sanitySlug(s.slug.es), en: sanitySlug(s.slug.en) },
      descripcion: { es: s.description.es, en: s.description.en },
      beneficios: { es: s.benefits.es, en: s.benefits.en },
      comoTrabajamos: { es: s.howItWorks.es, en: s.howItWorks.en },
      paraQuienEs: { es: s.idealFor.es, en: s.idealFor.en },
    });
    count++;
    i++;
  }
  console.log(`✓ service: ${count} servicios`);
}

async function migrateCaseStudies() {
  const { data, industryImage } = getCaseStudiesRaw();
  let count = 0;
  for (const c of data) {
    const imagePath = industryImage[c.industryKey as IndustryKey];
    const doc: Record<string, unknown> = {
      _id: `caseStudy.${c.id}`,
      _type: "caseStudy",
      clave: c.id,
      cliente: { es: c.client.es, en: c.client.en },
      slug: { es: sanitySlug(c.slug.es), en: sanitySlug(c.slug.en) },
      industria: { es: c.industry.es, en: c.industry.en },
      industriaClave: c.industryKey,
      fecha: c.date,
      esInterno: c.isInternal ?? false,
      problema: { es: c.problem.es, en: c.problem.en },
      solucion: { es: c.solution.es, en: c.solution.en },
      resultado: { es: c.result.es, en: c.result.en },
      metricas: {
        es: c.metrics.es.map((m) => ({ _key: randKey(), value: m.value, label: m.label })),
        en: c.metrics.en.map((m) => ({ _key: randKey(), value: m.value, label: m.label })),
      },
      ventaja: { es: c.advantage.es, en: c.advantage.en },
    };
    if (imagePath) {
      doc.imagen = await uploadImage(imagePath);
    }
    await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
    count++;
  }
  console.log(`✓ caseStudy: ${count} casos de éxito`);
}

async function main() {
  console.log(`Migrando a Sanity — proyecto ${projectId}, dataset ${dataset}\n`);
  await migrateTeam();
  await migrateBlog();
  await migrateServices();
  await migrateCaseStudies();
  console.log("\nListo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
