// Copia de app/[locale]/blog/page.tsx para iterar por separado — misma
// lógica, mismo namespace de traducciones ("Blog"/"Metadata.blog"), mismo
// patrón que SN/page.tsx respecto a sobre-nosotros: ruta standalone que
// reutiliza las mismas keys, así que los cambios de contenido en "Blog"
// afectan a ambas rutas hasta que se quiera diferenciarlas.
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

export default async function BLPage({
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
      {featured ? <FeaturedLatestHero featured={featured} latest={latest} /> : null}
      {posts.length > 0 ? <AllArticlesGrid posts={posts} /> : null}

      <section className="bg-white px-6 pb-16 sm:px-10 lg:px-20 lg:pb-20">
        <NewsletterCard />
      </section>
    </div>
  );
}
