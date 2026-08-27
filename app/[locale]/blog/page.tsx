import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/data/blog";
import { FeaturedLatestHero } from "@/components/blog/featured-latest-hero";
import { AllArticlesGrid } from "@/components/blog/all-articles-grid";
import { NewsletterCard } from "@/components/blog/newsletter-card";
import { montserrat } from "@/lib/fonts";

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
  const posts = getBlogPosts(locale as Locale);
  const [featured, ...rest] = posts;
  const latest = rest.slice(0, 4);

  return (
    <div className={`${montserrat.className} bg-white tracking-[-0.02em]`}>
      {featured ? <FeaturedLatestHero featured={featured} latest={latest} roundedImages /> : null}
      {posts.length > 0 ? <AllArticlesGrid posts={posts} roundedImages /> : null}

      {/* Brand gradient (same #5D5FEF→#4949D6 diagonal used by the "Empieza
          aquí" band on /servicios and the "Quiénes somos" tile on the
          home page) — a subtly-gradient indigo tone instead of a single
          flat dark fill. */}
      <section
        className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:px-20"
        style={{ backgroundImage: "linear-gradient(135deg, #5D5FEF 0%, #4949D6 100%)" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <NewsletterCard />
      </section>
    </div>
  );
}
