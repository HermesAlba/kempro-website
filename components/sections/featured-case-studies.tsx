import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getCaseStudies } from "@/lib/data/case-studies";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Link } from "@/i18n/navigation";
import { CaseCard } from "@/components/sections/case-card";

// Three different industries and three different automation capabilities
// (healthcare triage/scheduling, customer support, computer-vision quality
// control) — picked deliberately for variety across industries and metric
// types, not the first 3 entries in the data file.
const FEATURED_IDS = [
  "salud-triage-pacientes",
  "retail-atencion-al-cliente",
  "manufactura-control-calidad-vision",
];

export function FeaturedCaseStudies() {
  const t = useTranslations("CaseStudies");
  const locale = useLocale() as Locale;
  const allCaseStudies = getCaseStudies(locale);
  const caseStudies = FEATURED_IDS.map(
    (id) => allCaseStudies.find((c) => c.id === id)!,
  );

  return (
    <section className="bg-black py-20 sm:py-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} light />
        {/* Same lg-only fixed-width fix as all-case-studies-grid.tsx — see
            its comment for why the fixed-only version overflowed mobile. */}
        <div className="mt-14 grid grid-cols-1 justify-center gap-x-[30px] gap-y-8 sm:grid-cols-2 lg:grid-cols-[repeat(3,342px)]">
          {caseStudies.map((caseStudy, index) => (
            <FadeIn
              key={caseStudy.slug}
              delay={index * 100}
              direction={index % 2 === 0 ? "up" : "left"}
            >
              <CaseCard caseStudy={caseStudy} />
            </FadeIn>
          ))}
        </div>
        <div className="mt-12 text-center">
          {/* Explicit classes instead of ctaButtonClasses (bg-neutral-900):
              on this section's bg-black that button is nearly invisible
              until hover, the same unfixed issue documented in
              cta-band.tsx. Solid primary-600 matches the CTA treatment
              already used on dark/colored sections (WhatWeDo,
              LovingWhatWeDo). */}
          <Link
            href="/casos-de-exito"
            className="inline-flex h-[35px] items-center justify-center gap-2 rounded-[6px] bg-primary-600 px-[20px] text-[13px] tracking-[-0.02em] text-white transition-colors hover:bg-primary-700"
          >
            {t("homeCta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
