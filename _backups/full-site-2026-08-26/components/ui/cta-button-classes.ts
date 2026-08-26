// Shared with the header's "Contáctanos" button and any page-level CTA that
// should look identical (e.g. the 404 page's "Volver al inicio") — kept in
// its own plain (non "use client") module so Server Components can import
// it directly, since a plain string export re-imported from a "use client"
// file (e.g. components/layout/header.tsx) isn't guaranteed to survive the
// server/client boundary in this Next.js version.
export const ctaButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-[6px] bg-neutral-900 text-[13px] tracking-[-0.02em] text-white transition-colors hover:bg-primary-700";
