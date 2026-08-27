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
      {/* Shared coral gradient (+ animated white-dot layer, same pattern
          Hero used to have on its own) now spans Hero + ClientLogos +
          PurposeTeaser as one continuous background layer, per request —
          it needed to reach all the way down to end right around
          PurposeTeaser's video instead of stopping at the bottom of Hero.
          ClientLogos keeps its own opaque white background (per request,
          reverted from an earlier "transparent" attempt) — the gradient
          still exists underneath it in the DOM/paint order, it's just
          hidden behind that opaque strip rather than visible through it.
          Both decorative layers are absolute + z-index:auto and come first
          in the DOM; every actual content section below (Hero's own
          Container, ClientLogos' <section>, PurposeTeaser's Container) is
          itself `relative` so it paints above them per normal stacking
          order — same technique Hero used internally before. The gradient
          reaches its final, most intense stop at 82% and holds it to 100%;
          that's roughly where PurposeTeaser's own video row sits, though
          exact position shifts slightly with content length/locale since
          nothing here is measured in real pixels. The -mt/pt header-bleed
          pair (see HEADER_OFFSET in components/layout/header.tsx) moved
          here from Hero itself, since this wrapper is now what needs to
          bleed up behind the sticky nav for its own background to reach
          all the way up — net position of everything below is unchanged
          since the two still cancel out. */}
      <div className="relative -mt-[81px] overflow-hidden pt-[81px] lg:-mt-[207px] lg:pt-[207px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, white 0%, #f8d9bd 20%, #ec9c5c 45%, #c2571c 70%, #9a3412 82%, #9a3412 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="animate-dot-wave pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1.5px)",
            backgroundSize: "14px 14px",
          }}
        />
        {/* Hero + ClientLogos are wrapped to fill exactly one viewport
            (minus the floating nav's own height, see HEADER_OFFSET in
            components/layout/header.tsx), so ServicesOverview's title never
            peeks above the fold. Hero (flex-1) absorbs the leftover space
            and centers its own content within it; ClientLogos keeps its
            natural height and sits flush at the bottom of the block. */}
        <div className="flex flex-col md:min-h-[calc(100vh-81px)] lg:min-h-[calc(100vh-207px)]">
          <Hero />
          <ClientLogos />
        </div>
        {/* PurposeTeaser ("Quiénes somos") moved ahead of ServicesOverview
            ("Cómo trabajamos") — right after the logo carousel — per
            request. */}
        <PurposeTeaser />
      </div>
      <ServicesOverview />
      <FeaturedCaseStudies />
      <LatestArticles />
      <CtaBand title={t("title")} subtitle={t("subtitle")} cta={t("cta")} background="blue-grid" />
    </>
  );
}
