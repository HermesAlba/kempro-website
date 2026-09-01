import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/data/blog";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { ArticleCard } from "@/components/blog/all-articles-grid";

export function LatestArticles() {
  const t = useTranslations("Home.blog");
  const locale = useLocale() as Locale;
  // getBlogPosts already sorts by date desc — see lib/data/blog.ts.
  const posts = getBlogPosts(locale).slice(0, 3);

  return (
    <section className="bg-black py-20 sm:py-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} light />
        <div className="mt-14 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <ArticleCard
              key={post.slug}
              post={post}
              index={index}
              basePath="/blog"
              roundedImages
              dark
              hideDateOnMobile
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          {/* Explicit classes instead of ctaButtonClasses (bg-neutral-900):
              on this section's bg-black that button is nearly invisible
              until hover — same fix already applied to FeaturedCaseStudies'
              CTA on its own black section. */}
          <Link
            href="/blog"
            className="inline-flex h-[35px] items-center justify-center gap-2 rounded-[6px] bg-primary-600 px-[20px] font-sans text-[13px] tracking-[-0.02em] text-white transition-colors hover:bg-primary-700"
          >
            {t("cta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
