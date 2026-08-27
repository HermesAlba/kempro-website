import { Montserrat, Iceberg } from "next/font/google";

// Site-wide font (see app/[locale]/layout.tsx, which applies `.variable` to
// <html> — globals.css points Tailwind's `font-sans` token at it, see
// `--font-sans: var(--font-montserrat)`). Replaced Work Sans as the sitewide
// default per request; also used directly via `.className` in a few places
// that need it explicitly regardless of inheritance (blog pages, the home
// hero title — see components/sections/hero.tsx). Weight 400 covers body
// copy, 600/700 match KR's own header typeface, 800 matches KR's own hero
// title weight.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
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
