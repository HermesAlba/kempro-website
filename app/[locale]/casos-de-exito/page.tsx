import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getCaseStudies, getCaseStudyById } from "@/lib/data/case-studies";
import { FeaturedBlock } from "@/components/sections/featured-story-block";
import { ClientLogos } from "@/components/sections/client-logos";
import { AllCaseStudiesGrid } from "@/components/sections/all-case-studies-grid";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.caseStudies" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CaseStudies");
  const caseStudies = getCaseStudies(locale as Locale);
  // "Red de clínicas ambulatorias" — the salud case study, used as this
  // page's own featured story.
  const featuredCaseStudy = getCaseStudyById(locale as Locale, "salud-triage-pacientes")!;
  const featuredDate = new Date(featuredCaseStudy.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      {/* min-height is 100vh minus the header's own rendered height (see
          HEADER_OFFSET in components/layout/header.tsx), so header + this
          block together fill exactly the first screen — this block sits
          below the header in normal flow (unlike other page heroes), so a
          plain min-h-screen here would run past one viewport by the
          header's height.
          px-[95px] = 2.5cm at 96dpi on each side (only from lg up — at
          95px per side that alone exceeds a 375px viewport's width, so
          px-6/sm:px-10 carry mobile/tablet instead); pt-[95px] = 2.5cm gap
          below the header/menu. */}
      <div className="min-h-[calc(100vh-54px)] bg-primary-50 px-6 pb-16 pt-[95px] sm:px-10 lg:min-h-[calc(100vh-134px)] lg:px-[95px]">
        <div className="mx-auto max-w-7xl">
          <FeaturedBlock
            badgeLabel={t("featuredBadge")}
            category={featuredCaseStudy.industry}
            date={featuredDate}
            title={featuredCaseStudy.client}
            description={featuredCaseStudy.result}
            imageSrc={featuredCaseStudy.image!}
            imageAlt={featuredCaseStudy.client}
            imageGrayscale={false}
            href={{ pathname: "/casos-de-exito/[slug]", params: { slug: featuredCaseStudy.slug } }}
          />
        </div>
        {/* mt-16 (64px) minus 5mm (19px at 96dpi) = 45px. border-b is the
            divider between the two blocks — placed on this carousel
            wrapper (rather than on the second block below) so its length
            matches the carousel's own width exactly. */}
        <div className="mt-[45px] border-b border-neutral-200/80">
          <ClientLogos grayscale background="transparent" />
        </div>
      </div>

      {/* Filter-pill + grid section using CaseCard (see
          components/sections/all-case-studies-grid.tsx and
          components/sections/case-card.tsx) — each card's thumbnail
          defaults to caseStudy.image (the same photo used on that story's
          own detail page hero). -mt-[38px] = 1cm at 96dpi, shifting the
          block up. */}
      <div className="-mt-[38px]">
        <AllCaseStudiesGrid caseStudies={caseStudies} background="primary-50" />
      </div>

      <CtaBand
        title={t("ctaBand.title")}
        subtitle={t("ctaBand.subtitle")}
        cta={t("ctaBand.cta")}
        background="blue-grid"
      />
    </>
  );
}
