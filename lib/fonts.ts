import { Work_Sans, Montserrat, Iceberg } from "next/font/google";

// Site-wide font (see app/[locale]/layout.tsx, which applies `.variable` to
// <html> — globals.css points Tailwind's `font-sans` token at it). Also
// used directly via `.className` in a few places that needed Work Sans
// before it became the sitewide default (Kempro wordmark, blog page).
export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-work-sans",
});

// Scoped to specific components that need to match Knife River's own
// typeface exactly, per request — the header's two bars (see
// components/layout/header.tsx, weight 600/700) and the home hero title
// (see components/sections/hero.tsx, weight 800 — matches KR's own
// "BUILDING STRONG." title). Deliberately NOT wired into the sitewide
// font-sans token: every other page/component still uses Work Sans, so
// this is an intentional per-component exception rather than a second
// sitewide font.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
