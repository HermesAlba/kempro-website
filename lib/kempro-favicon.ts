// Favicon geometry — a square, solid-indigo-background variant of the
// concentric-rings mark (distinct from both the brand lockup mark in
// lib/kempro-symbol.ts and the previous white/dark-tile favicon design).
// Source: Figma favicon spec. The ring/dot positions in that spec are
// local to a 163x163 wrapper centered inside the 192x192 canvas; the
// values below are already converted to absolute 192-viewBox coordinates
// (wrapper offset = (192 - 163) / 2 = 14.5, added to every x/y before
// computing each ring's center).
export const FAVICON_VIEWBOX = 192;
export const FAVICON_BG = "#5D5FEF";
export const FAVICON_PRIMARY = "#5D5FEF";
export const FAVICON_WHITE = "#FFFFFF";

export type FaviconRing = {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  strokeWidth: number;
};

// Outer to inner.
export const FAVICON_RINGS: FaviconRing[] = [
  { cx: 96.05, cy: 96.05, r: 43.75, opacity: 1.0, strokeWidth: 3.5 },
  { cx: 90.05, cy: 101.05, r: 34.85, opacity: 0.85, strokeWidth: 2.5 },
  { cx: 86.05, cy: 104.05, r: 26.35, opacity: 0.7, strokeWidth: 1.75 },
  { cx: 88.0, cy: 102.0, r: 17.4, opacity: 0.55, strokeWidth: 1.25 },
  { cx: 90.05, cy: 100.05, r: 10.15, opacity: 0.4, strokeWidth: 1.0 },
];

export const FAVICON_CENTER_DOT = { cx: 92.0, cy: 92.0, r: 2.5 };
