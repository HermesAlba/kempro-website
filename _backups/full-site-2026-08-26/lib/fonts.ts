import { Work_Sans } from "next/font/google";

// Site-wide font (see app/[locale]/layout.tsx, which applies `.variable` to
// <html> — globals.css points Tailwind's `font-sans` token at it). Also
// used directly via `.className` in a few places that needed Work Sans
// before it became the sitewide default (Kempro wordmark, blog page).
export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-work-sans",
});
