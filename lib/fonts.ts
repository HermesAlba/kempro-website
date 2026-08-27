import { Work_Sans, Montserrat } from "next/font/google";

// Site-wide font (see app/[locale]/layout.tsx, which applies `.variable` to
// <html> — globals.css points Tailwind's `font-sans` token at it). Also
// used directly via `.className` in a few places that needed Work Sans
// before it became the sitewide default (Kempro wordmark, blog page).
export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-work-sans",
});

// Scoped to the header's two bars ONLY (see components/layout/header.tsx) —
// matches the reference site's own header typeface exactly, per request.
// Deliberately NOT wired into the sitewide font-sans token: every other
// page/component still uses Work Sans, so this is an intentional exception
// for that one component rather than a second sitewide font.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
});
