// Strips accents before matching ("automatizacion" also matches
// "automatización") — shared by every in-site keyword filter (the
// global header search in components/layout/site-search.tsx, and the
// in-page blog/case-study search boxes) so the same forgiving matching
// behaves identically everywhere instead of drifting between copies.
export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}
