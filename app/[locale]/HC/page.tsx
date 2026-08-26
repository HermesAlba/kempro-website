import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import {
  getCustomerStories,
  getFeaturedCustomerStories,
  getCustomerStoriesWithVideo,
  getCustomerReviews,
} from "@/lib/data/customer-stories";
import { HcHero } from "@/components/sections/hc-hero";
import { HcFeaturedStories } from "@/components/sections/hc-featured-stories";
import { ClientLogos } from "@/components/sections/client-logos";
import { HcStoryGrid } from "@/components/sections/hc-story-grid";
import { HcReviews } from "@/components/sections/hc-reviews";
import { HcVideoGrid } from "@/components/sections/hc-video-grid";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.hc" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function CustomerStoriesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hc");
  const tNav = await getTranslations("Nav");
  const typedLocale = locale as Locale;

  const [stories, featuredStories, videoStories, reviews] = await Promise.all([
    getCustomerStories(typedLocale),
    getFeaturedCustomerStories(typedLocale),
    getCustomerStoriesWithVideo(typedLocale),
    getCustomerReviews(typedLocale),
  ]);

  return (
    <>
      <HcHero
        homeLabel={tNav("home")}
        breadcrumbBlogLabel={t("breadcrumbBlog")}
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <HcFeaturedStories
        stories={featuredStories}
        title={t("featuredTitle")}
        ctaLabel={t("featuredCta")}
        emptyLabel={t("emptyStories")}
      />

      <ClientLogos title={t("logosTitle")} />

      <HcStoryGrid
        stories={stories}
        title={t("gridTitle")}
        allCategoriesLabel={t("allCategoriesFilter")}
        readNowLabel={t("readNow")}
        viewMoreLabel={t("viewMoreLabel")}
        viewLessLabel={t("viewLessLabel")}
        emptyLabel={t("emptyStories")}
      />

      <HcReviews
        reviews={reviews}
        title={t("reviewsTitle")}
        readMoreLabel={t("readMore")}
        emptyLabel={t("emptyReviews")}
      />

      <HcVideoGrid stories={videoStories} title={t("videoTitle")} emptyLabel={t("emptyVideos")} />

      <CtaBand
        title={t("ctaBand.title")}
        subtitle={t("ctaBand.subtitle")}
        cta={t("ctaBand.cta")}
        background="blue-grid"
      />
    </>
  );
}
