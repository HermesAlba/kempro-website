import type { Locale } from "@/i18n/routing";
import { getClient } from "@/sanity/lib/client";
import { projectId } from "@/sanity/env";

// Sanity has never had a real project configured in this codebase (empty
// NEXT_PUBLIC_SANITY_PROJECT_ID — see sanity/env.ts). Every function here
// degrades to an empty result instead of throwing, so `npm run build` and
// the HC page keep working before a real project/dataset exists — the page
// itself renders an empty/"coming soon" state in that case rather than
// crashing.
function sanityConfigured(): boolean {
  return projectId.length > 0;
}

type RawLocalized = { es?: string; en?: string };

type RawCustomerStory = {
  _id: string;
  titulo?: RawLocalized;
  slug?: { es?: { current?: string }; en?: { current?: string } };
  resumen?: RawLocalized;
  cuerpo?: RawLocalized;
  categoria?: { clave?: string; es?: string; en?: string };
  coverImageUrl?: string | null;
  cliente?: string | null;
  clientLogoUrl?: string | null;
  destacado?: boolean;
  videoUrl?: string | null;
  fecha?: string;
};

type RawCustomerReview = {
  _id: string;
  fuente?: string;
  cita?: RawLocalized;
  rolResenador?: RawLocalized;
  link?: string | null;
};

export type CustomerStory = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: { key: string; label: string };
  coverImageUrl: string | null;
  client: string | null;
  clientLogoUrl: string | null;
  featured: boolean;
  videoUrl: string | null;
  date: string | null;
};

export type CustomerReview = {
  id: string;
  source: string;
  quote: string;
  reviewerRole: string | null;
  link: string | null;
};

const STORY_PROJECTION = `
  _id,
  titulo,
  slug,
  resumen,
  cuerpo,
  categoria,
  "coverImageUrl": imagenPortada.asset->url,
  cliente,
  "clientLogoUrl": logoCliente.asset->url,
  destacado,
  videoUrl,
  fecha
`;

const REVIEW_PROJECTION = `
  _id,
  fuente,
  cita,
  rolResenador,
  link
`;

function mapStory(raw: RawCustomerStory, locale: Locale): CustomerStory | null {
  const title = raw.titulo?.[locale];
  const slug = raw.slug?.[locale]?.current;
  const summary = raw.resumen?.[locale];

  // A story missing its slug/title/summary in the requested locale can't be
  // rendered or linked to on that locale's page — skip it rather than
  // showing a broken card, matching the blog's own validated-slug approach
  // (see CLAUDE.md's bilingual content rules).
  if (!title || !slug || !summary) return null;

  return {
    id: raw._id,
    slug,
    title,
    summary,
    body: raw.cuerpo?.[locale] ?? "",
    category: {
      key: raw.categoria?.clave ?? "otros",
      label: raw.categoria?.[locale] ?? "",
    },
    coverImageUrl: raw.coverImageUrl ?? null,
    client: raw.cliente ?? null,
    clientLogoUrl: raw.clientLogoUrl ?? null,
    featured: raw.destacado ?? false,
    videoUrl: raw.videoUrl ?? null,
    date: raw.fecha ?? null,
  };
}

function mapReview(raw: RawCustomerReview, locale: Locale): CustomerReview | null {
  const quote = raw.cita?.[locale];
  if (!raw.fuente || !quote) return null;

  return {
    id: raw._id,
    source: raw.fuente,
    quote,
    reviewerRole: raw.rolResenador?.[locale] ?? null,
    link: raw.link ?? null,
  };
}

async function fetchStories(locale: Locale): Promise<CustomerStory[]> {
  if (!sanityConfigured()) return [];

  try {
    const raw = await getClient().fetch<RawCustomerStory[]>(
      `*[_type == "customerStory"] | order(fecha desc) { ${STORY_PROJECTION} }`,
    );
    return raw
      .map((story) => mapStory(story, locale))
      .filter((story): story is CustomerStory => story !== null);
  } catch {
    return [];
  }
}

export async function getCustomerStories(locale: Locale): Promise<CustomerStory[]> {
  return fetchStories(locale);
}

export async function getFeaturedCustomerStories(locale: Locale): Promise<CustomerStory[]> {
  const stories = await fetchStories(locale);
  return stories.filter((story) => story.featured);
}

export async function getCustomerStoriesWithVideo(locale: Locale): Promise<CustomerStory[]> {
  const stories = await fetchStories(locale);
  return stories.filter((story) => Boolean(story.videoUrl));
}

export async function getCustomerStory(
  locale: Locale,
  slug: string,
): Promise<CustomerStory | undefined> {
  const stories = await fetchStories(locale);
  return stories.find((story) => story.slug === slug);
}

export async function getCustomerReviews(locale: Locale): Promise<CustomerReview[]> {
  if (!sanityConfigured()) return [];

  try {
    const raw = await getClient().fetch<RawCustomerReview[]>(
      `*[_type == "customerReview"] { ${REVIEW_PROJECTION} }`,
    );
    return raw
      .map((review) => mapReview(review, locale))
      .filter((review): review is CustomerReview => review !== null);
  } catch {
    return [];
  }
}
