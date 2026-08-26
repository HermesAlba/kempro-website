import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getBlogPosts } from "@/lib/data/blog";

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

  return entries;
}
