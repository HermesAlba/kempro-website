import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { LovingWhatWeDo } from "@/components/sections/loving-what-we-do";
import { FeaturedCaseStudies } from "@/components/sections/featured-case-studies";
import { LatestArticles } from "@/components/sections/latest-articles";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home.ctaBand");

  return (
    <>
      {/* Hero + ClientLogos are wrapped to fill exactly one viewport
          (minus the floating nav's own height, see HEADER_OFFSET in
          components/layout/header.tsx). Hero (flex-1) absorbs the leftover
          space; ClientLogos keeps its natural height and sits flush at the
          bottom of the block. Hero's own black background (see hero.tsx)
          ends exactly at its own bottom edge — i.e. right where
          this carousel starts — per request. Carousel border removed
          (border={false}) — per
          request. */}
      <div className="flex flex-col md:min-h-[calc(100vh-81px)] lg:min-h-[calc(100vh-207px)]">
        <Hero />
        <ClientLogos border={false} />
      </div>
      {/* WhatWeDo: Knife River's "WHAT WE DO" block (2-col: title/tagline/
          body/CTA + 2x2 grid of service cards), on Kempro's indigo brand
          background, right after the logo carousel — per request. */}
      <WhatWeDo />
      {/* LovingWhatWeDo: KR's "Loving What We Do!" block (framed photo +
          dark panel with title/subtitle/CTA), right after WhatWeDo — per
          request. Placeholder image/copy for now. */}
      <LovingWhatWeDo />
      {/* PurposeTeaser ("Quiénes somos") and ServicesOverview ("Cómo
          trabajamos") removed from the home page per request. */}
      <FeaturedCaseStudies />
      <LatestArticles />
      <CtaBand title={t("title")} subtitle={t("subtitle")} cta={t("cta")} background="blue-grid" />
    </>
  );
}
