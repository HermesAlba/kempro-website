import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/data/blog";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/navigation";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";
import { ArticleCard } from "@/components/blog/all-articles-grid";

export function LatestArticles() {
  const t = useTranslations("Home.blog");
  const locale = useLocale() as Locale;
  // getBlogPosts already sorts by date desc — see lib/data/blog.ts.
  const posts = getBlogPosts(locale).slice(0, 3);

  return (
    <section className="border-t border-neutral-200 bg-white py-10 sm:py-14">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-14 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <ArticleCard key={post.slug} post={post} index={index} basePath="/blog" roundedImages />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/blog" className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}>
            {t("cta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
