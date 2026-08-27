import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FeaturedCaseStudies } from "@/components/sections/featured-case-studies";
import { PurposeTeaser } from "@/components/sections/purpose-teaser";
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
          components/layout/header.tsx), so ServicesOverview's title never
          peeks above the fold. Hero (flex-1) absorbs the leftover space and
          centers its own content within it; ClientLogos keeps its natural
          height and sits flush at the bottom of the block. Previously
          subtracted an extra 38px (~1cm) here to pull that bottom edge up
          — removed per request so the logo carousel starts lower and uses
          the full first screen instead of ending a bit short of it. */}
      <div className="flex flex-col md:min-h-[calc(100vh-81px)] lg:min-h-[calc(100vh-157px)]">
        <Hero />
        <ClientLogos />
      </div>
      {/* PurposeTeaser ("Quiénes somos") moved ahead of ServicesOverview
          ("Cómo trabajamos") — right after the logo carousel — per request. */}
      <PurposeTeaser />
      <ServicesOverview />
      <FeaturedCaseStudies />
      <LatestArticles />
      <CtaBand title={t("title")} subtitle={t("subtitle")} cta={t("cta")} background="blue-grid" />
    </>
  );
}
