// Per-category color for this blog design: category labels render as plain
// colored text (never badges/pills), and cover-image placeholders use a
// matching gradient. Keyed by the stable, locale-independent categoryKey
// set on each post in lib/data/blog.ts (category *labels* are localized;
// this key isn't).
//
// Colors are drawn only from the site's existing primary/accent tokens
// (see app/globals.css) — the Figma spec's example palette used off-brand
// pink/green hues not used anywhere else on the site, so real categories
// are distinguished by shade/hue within the established primary (indigo)
// and accent (cyan) scales instead.
export type CategoryPalette = {
  textColor: string;
  imageFrom: string;
  imageTo: string;
};

const PALETTE: Record<string, CategoryPalette> = {
  estrategia: {
    textColor: "#5D5FEF", // primary-600
    imageFrom: "#7682F8", // primary-500
    imageTo: "#4949D6", // primary-700
  },
  tecnologia: {
    textColor: "#0891B2", // accent-600
    imageFrom: "#22D3EE", // accent-400
    imageTo: "#0E7490", // accent-700
  },
  automatizacion: {
    textColor: "#3031BB", // primary-800
    imageFrom: "#5D5FEF", // primary-600
    imageTo: "#2F3293", // primary-900
  },
};

const DEFAULT_PALETTE: CategoryPalette = {
  textColor: "#475569",
  imageFrom: "#94A3B8",
  imageTo: "#475569",
};

export function paletteFor(categoryKey: string): CategoryPalette {
  return PALETTE[categoryKey] ?? DEFAULT_PALETTE;
}
