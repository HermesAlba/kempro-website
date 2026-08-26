"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { CaseStudy, IndustryKey } from "@/lib/data/case-studies";
import { CaseCard } from "@/components/sections/case-card";
import { FadeIn } from "@/components/ui/fade-in";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

// Same filter-pill + show-more/show-less pattern as
// components/blog/all-articles-grid.tsx, adapted for case studies:
// `industry` stands in for the blog's categoryKey/category pair (case
// studies only have the one resolved-per-locale string, so it's used as
// both the filter key and its own label).
const PAGE_SIZE = 6;

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 px-1 py-1 text-[13px] font-medium transition-colors ${
        active
          ? "border-primary-600 text-primary-600"
          : "border-transparent text-neutral-600 hover:border-primary-300 hover:text-primary-600"
      }`}
    >
      {label}
    </button>
  );
}

export function AllCaseStudiesGrid({
  caseStudies,
  industryImageOverrides,
  background = "white",
}: {
  caseStudies: CaseStudy[];
  /** Per-industry photo overrides for the thumbnail, forwarded to CaseCard
   * (see its own headerImageSrc/headerImageGrayscale props) — opt-in, so
   * pages that don't pass this keep the default IndustryHeaderBackground
   * look untouched. grayscale defaults to true if omitted. */
  industryImageOverrides?: Partial<Record<IndustryKey, { src: string; grayscale?: boolean }>>;
  /** "white" (default) = bg-white with a border-t, used on Historias de
   * Clientes. "primary-50" = flat bg-primary-50, no border — matches the
   * Borrador page's own background exactly. */
  background?: "white" | "primary-50";
}) {
  const t = useTranslations("CaseStudies");
  const locale = useLocale();
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Real industries only, derived from the case studies themselves, sorted
  // alphabetically using the current locale's collation — same approach as
  // the blog's own category filter list.
  const industries = Array.from(new Set(caseStudies.map((c) => c.industry))).sort((a, b) =>
    a.localeCompare(b, locale),
  );
  const filtered = activeIndustry
    ? caseStudies.filter((c) => c.industry === activeIndustry)
    : caseStudies;
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const canCollapse = !hasMore && filtered.length > PAGE_SIZE;

  function handleIndustryChange(industry: string | null) {
    setActiveIndustry(industry);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section
      className={`px-6 py-16 sm:px-10 lg:px-20 lg:py-20 ${
        background === "white" ? "border-t border-neutral-200 bg-white" : "bg-primary-50"
      }`}
    >
      <div className="mx-auto max-w-[1280px]">
        <FadeIn className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[20px] font-bold text-neutral-900">{t("allCasesTitle")}</h2>
          <div className="flex flex-wrap items-center gap-6">
            <FilterPill
              label={t("allIndustriesFilter")}
              active={activeIndustry === null}
              onClick={() => handleIndustryChange(null)}
            />
            {industries.map((industry) => (
              <FilterPill
                key={industry}
                label={industry}
                active={activeIndustry === industry}
                onClick={() => handleIndustryChange(industry)}
              />
            ))}
          </div>
        </FadeIn>

        {/* grid-cols-1/sm:2 fluid columns below lg, fixed 342px×3 only
            from lg up — the fixed-only version overflowed narrower
            viewports (justify-center doesn't shrink fixed track widths). */}
        <div className="mt-10 grid grid-cols-1 justify-center gap-x-[30px] gap-y-6 sm:grid-cols-2 lg:grid-cols-[repeat(3,342px)]">
          {visible.map((caseStudy, index) => {
            const override = industryImageOverrides?.[caseStudy.industryKey];
            return (
              <FadeIn key={caseStudy.slug} delay={index * 100}>
                <CaseCard
                  caseStudy={caseStudy}
                  headerImageSrc={override?.src}
                  headerImageGrayscale={override?.grayscale}
                />
              </FadeIn>
            );
          })}
        </div>

        {hasMore ? (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => Math.min(current + PAGE_SIZE, filtered.length))}
              className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}
            >
              {t("viewMoreLabel")}
            </button>
          </div>
        ) : canCollapse ? (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount(PAGE_SIZE)}
              className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}
            >
              {t("viewLessLabel")}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
