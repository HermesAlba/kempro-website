import { routing, type Locale } from "@/i18n/routing";

// Shared with app/sitemap.ts's own baseUrl constant — kept here too so
// every page's generateMetadata can import a single source instead of
// re-typing the literal string.
export const SITE_URL = "https://www.kempro.ai";

// Builds a locale -> full URL map by calling `pathFor` once per locale —
// `pathFor` is almost always `(locale) => getPathname({ locale, href })`
// (or a dynamic-route variant that resolves the equivalent slug per
// locale first, see servicios/[slug], casos-de-exito/[slug], blog/[slug],
// HC/[slug]). Kept as a plain callback (rather than baking `getPathname`
// in here) so callers can pass whatever `href` shape their own route
// needs without fighting next-intl's own per-route overload typing.
export function buildLocaleUrls(pathFor: (locale: Locale) => string): Record<Locale, string> {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}${pathFor(locale)}`]),
  ) as Record<Locale, string>;
}

// Turns a locale -> URL map (built by each page with the same
// getPathname-based per-locale loop app/sitemap.ts already uses) into the
// `alternates` block Next's Metadata API needs: a self-referencing
// canonical (this page's own URL, for the locale currently being
// rendered) plus hreflang `languages` alternates pointing at every
// locale's equivalent URL.
//
// Fixes the Search Console "Duplicada: el usuario no ha indicado ninguna
// versión canónica" notice (see the Sept 2026 "Nuevos motivos que impiden
// que se indexen páginas..." emails): without an explicit
// <link rel="canonical">, Google can't tell that kempro.ai/es,
// https://kempro.ai (bare domain), etc. are all the same page, so it may
// decline to index any of them with confidence. Every page's
// generateMetadata should call this and spread the result into its
// returned `alternates` field.
export function canonicalAlternates(
  locale: Locale,
  urls: Record<Locale, string>,
): { canonical: string; languages: Record<Locale, string> } {
  return {
    canonical: urls[locale],
    languages: urls,
  };
}
