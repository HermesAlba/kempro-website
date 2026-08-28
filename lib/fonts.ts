import { Montserrat, Poppins, Iceberg } from "next/font/google";

// Standardized on Knife River's own font split (measured live off
// kniferiver.com via getComputedStyle): Montserrat for headings, nav, and
// UI chrome (buttons, badges, eyebrow/meta labels) — mapped to the
// `font-sans` Tailwind token, see `--font-sans: var(--font-montserrat)` in
// globals.css, and to the `h1..h6 { font-family: ... }` rule there. Also
// used directly via `.className` in places that need it explicitly
// regardless of inheritance (header nav, blog pages, the home hero title —
// see components/sections/hero.tsx). Weight 400 covers any body text still
// under this family, 600/700 match KR's own header typeface, 800 matches
// KR's own hero title weight.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
});

// KR's own body-copy font (measured live: <p> tags render in
// "Poppins, sans-serif" at weight 400) — applied site-wide as the actual
// document default (see the `font-poppins` class on <body> in
// app/[locale]/layout.tsx), so plain paragraph/prose text uses Poppins
// while headings/nav/buttons/labels stay on Montserrat per the rules
// above. Weight 500/600 cover the few places body copy needs emphasis
// without switching families.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

// Scoped to the "Kempro" wordmark ONLY (see components/ui/kempro-logo.tsx).
// Bank Gothic — the squared-off, geometric, industrial display face the
// Knife River logo's own lettering most resembles — isn't a free/Google
// font; Iceberg is the closest available equivalent (unicase, squared
// geometric caps, no curves) so the wordmark reads in the same spirit
// without needing a licensed/self-hosted font file. Only one weight (400)
// exists for this family — it's a display face, already heavy/blocky by
// design, so no bold variant is needed.
export const iceberg = Iceberg({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-iceberg",
});
