"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/data/blog";
import { getService, getServices } from "@/lib/data/services";
import { getCaseStudy, getCaseStudies } from "@/lib/data/case-studies";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function handleChange(nextLocale: string) {
    // Blog posts have a different slug per locale, so the current locale's
    // params can't be reused as-is — resolve the equivalent slug (by post id)
    // in the target locale, or fall back to the blog index if it doesn't exist.
    if (pathname === "/blog/[slug]" && typeof params.slug === "string") {
      const currentPost = getBlogPost(locale, params.slug);
      const equivalentPost = currentPost
        ? getBlogPosts(nextLocale as Locale).find((p) => p.id === currentPost.id)
        : undefined;

      if (equivalentPost) {
        router.replace(
          { pathname: "/blog/[slug]", params: { slug: equivalentPost.slug } },
          { locale: nextLocale },
        );
      } else {
        router.replace({ pathname: "/blog" }, { locale: nextLocale });
      }
      return;
    }

    // Services have a different slug per locale, so the current locale's
    // params can't be reused as-is — resolve the equivalent slug (by service
    // id) in the target locale, or fall back to the services index if it
    // doesn't exist.
    if (pathname === "/servicios/[slug]" && typeof params.slug === "string") {
      const currentService = getService(locale, params.slug);
      const equivalentService = currentService
        ? getServices(nextLocale as Locale).find((s) => s.id === currentService.id)
        : undefined;

      if (equivalentService) {
        router.replace(
          { pathname: "/servicios/[slug]", params: { slug: equivalentService.slug } },
          { locale: nextLocale },
        );
      } else {
        router.replace({ pathname: "/servicios" }, { locale: nextLocale });
      }
      return;
    }

    // Case studies have a different slug per locale, so the current locale's
    // params can't be reused as-is — resolve the equivalent slug (by case
    // study id) in the target locale, or fall back to the case studies index
    // if it doesn't exist.
    if (pathname === "/casos-de-exito/[slug]" && typeof params.slug === "string") {
      const currentCaseStudy = getCaseStudy(locale, params.slug);
      const equivalentCaseStudy = currentCaseStudy
        ? getCaseStudies(nextLocale as Locale).find((c) => c.id === currentCaseStudy.id)
        : undefined;

      if (equivalentCaseStudy) {
        router.replace(
          { pathname: "/casos-de-exito/[slug]", params: { slug: equivalentCaseStudy.slug } },
          { locale: nextLocale },
        );
      } else {
        router.replace({ pathname: "/casos-de-exito" }, { locale: nextLocale });
      }
      return;
    }

    // next-intl's router persists the choice in the NEXT_LOCALE cookie automatically.
    router.replace(
      // @ts-expect-error -- params are validated against the current pathname's shape
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <span className="sr-only">{t("label")}</span>
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1.5">
          {index > 0 ? (
            <span className="text-neutral-300" aria-hidden="true">
              |
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => handleChange(loc)}
            aria-current={locale === loc}
            className={`uppercase transition-colors ${
              locale === loc
                ? "font-semibold text-dark-800"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
