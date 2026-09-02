import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getBlogPosts } from "@/lib/data/blog";
import { getServices } from "@/lib/data/services";
import { getCaseStudies } from "@/lib/data/case-studies";

const baseUrl = "https://www.kempro.ai";

const staticRoutes = [
  "/",
  "/servicios",
  "/casos-de-exito",
  "/sobre-nosotros",
  "/blog",
  "/contacto",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const pathname of staticRoutes) {
    entries.push({
      url: `${baseUrl}${getPathname({ locale: routing.defaultLocale, href: pathname })}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => [
            locale,
            `${baseUrl}${getPathname({ locale, href: pathname })}`,
          ]),
        ),
      },
    });
  }

  const postsByLocale = Object.fromEntries(
    routing.locales.map((locale) => [locale, getBlogPosts(locale)]),
  ) as Record<(typeof routing.locales)[number], ReturnType<typeof getBlogPosts>>;

  for (const post of postsByLocale[routing.defaultLocale]) {
    entries.push({
      url: `${baseUrl}${getPathname({
        locale: routing.defaultLocale,
        href: { pathname: "/blog/[slug]", params: { slug: post.slug } },
      })}`,
      lastModified: new Date(post.date),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => {
            const localizedPost = postsByLocale[locale].find((p) => p.id === post.id)!;
            return [
              locale,
              `${baseUrl}${getPathname({
                locale,
                href: { pathname: "/blog/[slug]", params: { slug: localizedPost.slug } },
              })}`,
            ];
          }),
        ),
      },
    });
  }

  // Individual service detail pages (/servicios/[slug]) — previously
  // missing from the sitemap entirely, so Google had no discovery path to
  // them short of crawling internal links. Same id-matched
  // cross-locale alternates pattern as the blog posts above.
  const servicesByLocale = Object.fromEntries(
    routing.locales.map((locale) => [locale, getServices(locale)]),
  ) as Record<(typeof routing.locales)[number], ReturnType<typeof getServices>>;

  for (const service of servicesByLocale[routing.defaultLocale]) {
    entries.push({
      url: `${baseUrl}${getPathname({
        locale: routing.defaultLocale,
        href: { pathname: "/servicios/[slug]", params: { slug: service.slug } },
      })}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => {
            const localizedService = servicesByLocale[locale].find((s) => s.id === service.id)!;
            return [
              locale,
              `${baseUrl}${getPathname({
                locale,
                href: { pathname: "/servicios/[slug]", params: { slug: localizedService.slug } },
              })}`,
            ];
          }),
        ),
      },
    });
  }

  // Individual case study / customer story detail pages
  // (/casos-de-exito/[slug], localized to /historias-de-clientes and
  // /customer-stories) — same gap as services above.
  const caseStudiesByLocale = Object.fromEntries(
    routing.locales.map((locale) => [locale, getCaseStudies(locale)]),
  ) as Record<(typeof routing.locales)[number], ReturnType<typeof getCaseStudies>>;

  for (const caseStudy of caseStudiesByLocale[routing.defaultLocale]) {
    entries.push({
      url: `${baseUrl}${getPathname({
        locale: routing.defaultLocale,
        href: { pathname: "/casos-de-exito/[slug]", params: { slug: caseStudy.slug } },
      })}`,
      lastModified: new Date(caseStudy.date),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((locale) => {
            const localizedCaseStudy = caseStudiesByLocale[locale].find(
              (c) => c.id === caseStudy.id,
            )!;
            return [
              locale,
              `${baseUrl}${getPathname({
                locale,
                href: { pathname: "/casos-de-exito/[slug]", params: { slug: localizedCaseStudy.slug } },
              })}`,
            ];
          }),
        ),
      },
    });
  }

  return entries;
}
