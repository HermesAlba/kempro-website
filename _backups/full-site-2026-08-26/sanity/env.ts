// These are read at build/runtime. They default to empty strings so that
// `npm run build` and the rest of the site keep working before a real
// Sanity project has been created — see README.md for setup instructions.
// The Studio (/studio) and the write client will only work once real values
// are set in .env.local.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
