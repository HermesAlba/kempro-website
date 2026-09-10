"use client";

import { useTranslations } from "next-intl";

// WCAG 2.1 success criterion 2.4.1 "Bypass Blocks" (level A): lets
// keyboard users jump straight to the main content instead of tabbing
// through the header's logo, social icons, locale switcher, "Contáctanos"
// button and full nav on every single page. Visually hidden by default
// (sr-only) and only revealed once it actually receives keyboard focus —
// mouse/touch users never see it, and it doesn't change anything about
// how the nav itself works (it's an extra, optional first tab stop, not a
// forced redirect). Must be the first focusable element in <body>, so it
// renders right before <Header /> in app/[locale]/layout.tsx.
export function SkipLink() {
  const t = useTranslations("A11y");

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
    >
      {t("skipToContent")}
    </a>
  );
}
