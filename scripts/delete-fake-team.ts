// One-off cleanup script: deletes the 4 placeholder/invented teamMember
// documents from Sanity that were migrated by scripts/migrate-to-sanity.ts
// from lib/data/team.ts (María Fernanda Ríos, Santiago Londoño, Camila
// Torres, Andrés Gómez). These were never real people — the site never
// actually rendered them (TeamGrid component is unused), so they're safe
// to remove from both Sanity and the static source.
//
// Usage:
//   set -a; source .env.local; set +a; npx tsx scripts/delete-fake-team.ts
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in the environment.\n" +
      "Run this with: set -a; source .env.local; set +a; npx tsx scripts/delete-fake-team.ts",
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const ids = [
  "teamMember.maria-fernanda-rios",
  "teamMember.santiago-londono",
  "teamMember.camila-torres",
  "teamMember.andres-gomez",
];

async function main() {
  for (const id of ids) {
    await client.delete(id);
    console.log(`✓ eliminado: ${id}`);
  }
  console.log("\nListo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
