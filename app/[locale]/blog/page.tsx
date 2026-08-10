import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/data/blog";
import { HeroArticle } from "@/components/blog/hero-article";
import { FeaturedStrip } from "@/components/blog/featured-strip";
import { ArticleCarousel } from "@/components/blog/article-carousel";
import { workSans } from "@/lib/fonts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.blog" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [hero, featured, ...carouselPosts] = getBlogPosts(locale as Locale);

  return (
    <div className={`${workSans.className} mx-auto max-w-[1280px] bg-white tracking-[-0.02em]`}>
      {hero ? <HeroArticle post={hero} /> : null}

      <section className="bg-[#F9F7F4] px-6 pb-12 pt-12 sm:px-10 lg:px-20">
        <div className="flex flex-col gap-12">
          {featured ? <FeaturedStrip post={featured} /> : null}
          {carouselPosts.length > 0 ? <ArticleCarousel posts={carouselPosts} /> : null}
        </div>
      </section>
    </div>
  );
}
