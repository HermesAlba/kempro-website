export const KEMPRO_PRIMARY = "#5D5FEF";
export const KEMPRO_WHITE = "#FFFFFF";
export const KEMPRO_DARK_BG = "#0F172A";
export const KEMPRO_TEXT_LIGHT = "#000000";
export const KEMPRO_TEXT_DARK = "#FFFFFF";

export type Ring = {
  /** Diameter of the circle's bounding box. */
  size: number;
  /** Top-left x/y of the bounding box (Figma frame position, not center). */
  x: number;
  y: number;
  /** Indigo fill opacity — decreases from the outer ring (1.0) inward. */
  opacity: number;
  /** White stroke weight, ~4% of the ring's diameter, aligned INSIDE. */
  strokeWidth: number;
};

export type LogoMarkSpec = {
  /** Native viewBox size (square) this ring/dot table is authored for. */
  viewBox: number;
  /** Outer to inner. */
  rings: Ring[];
  centerDot: { size: number; x: number; y: number };
};

// Exact Figma spec — "primary" brand lockup mark (68x68, used at header
// size). 5 concentric, organically-offset rings, all filled with the
// indigo primary at decreasing opacity, all with an inside-aligned white
// stroke. No molecule/atom glyph — replaced by a solid white center dot.
export const KEMPRO_MARK_PRIMARY: LogoMarkSpec = {
  viewBox: 68,
  rings: [
    { size: 49.572, x: 9.2148, y: 9.214, opacity: 1.0, strokeWidth: 1.9833 },
    { size: 39.474, x: 10.8633, y: 17.0963, opacity: 0.85, strokeWidth: 1.4167 },
    { size: 29.835, x: 13.4158, y: 23.6158, opacity: 0.7, strokeWidth: 0.9917 },
    { size: 19.737, x: 19.5977, y: 27.5315, opacity: 0.55, strokeWidth: 0.7083 },
    { size: 11.475, x: 24.8625, y: 30.5292, opacity: 0.4, strokeWidth: 0.5667 },
  ],
  centerDot: { size: 5, x: 28.0996, y: 33.7667 },
};

// Standalone symbol (120x120, used at its native size for favicons/app
// icons/social avatars) — same ring pattern as "primary", scaled up.
export const KEMPRO_MARK_STANDALONE: LogoMarkSpec = {
  viewBox: 120,
  rings: [
    { size: 87.48, x: 16.2607, y: 16.26, opacity: 1.0, strokeWidth: 3.5 },
    { size: 69.66, x: 19.17, y: 30.17, opacity: 0.85, strokeWidth: 2.5 },
    { size: 52.65, x: 23.675, y: 41.675, opacity: 0.7, strokeWidth: 1.75 },
    { size: 34.83, x: 34.585, y: 48.585, opacity: 0.55, strokeWidth: 1.25 },
    { size: 20.25, x: 43.875, y: 53.875, opacity: 0.4, strokeWidth: 1.0 },
  ],
  centerDot: { size: 5, x: 51.5, y: 61.5 },
};

// Dark-mode mark (44x44, used in the footer's dark context) — only 4 rings
// (the innermost 28-ring is dropped) with a coarser opacity step (20% vs
// 15%) since it renders much smaller.
export const KEMPRO_MARK_DARK: LogoMarkSpec = {
  viewBox: 44,
  rings: [
    { size: 32.076, x: 5.9629, y: 5.962, opacity: 1.0, strokeWidth: 1.2833 },
    { size: 25.542, x: 7.0292, y: 11.0623, opacity: 0.8, strokeWidth: 0.9167 },
    { size: 19.305, x: 8.6808, y: 15.2808, opacity: 0.6, strokeWidth: 0.6417 },
    { size: 12.771, x: 12.6808, y: 17.8145, opacity: 0.4, strokeWidth: 0.4583 },
  ],
  centerDot: { size: 5, x: 16.5663, y: 21.7 },
};
