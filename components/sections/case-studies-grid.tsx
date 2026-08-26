"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { CaseStudy } from "@/lib/data/case-studies";
import { CaseCard } from "@/components/sections/case-card";
import { FadeIn } from "@/components/ui/fade-in";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

// Same show-more/show-less handling as components/blog/all-articles-grid.tsx
// (PAGE_SIZE, visibleCount state, hasMore/canCollapse split, identical
// button styling) — 6 shown initially out of the 7 case studies, expanding
// to all 7 on "Ver más" and collapsing back on "Ver menos".
const PAGE_SIZE = 6;

export function CaseStudiesGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const t = useTranslations("CaseStudies");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = caseStudies.slice(0, visibleCount);
  const hasMore = visibleCount < caseStudies.length;
  const canCollapse = !hasMore && caseStudies.length > PAGE_SIZE;

  return (
    <>
      {/* 3 explicit fixed-width (9cm/342px) columns, always 3 per row
          regardless of container width — a leftover partial row still
          lines up under the same 3 column tracks. Horizontal gap is a
          fixed 8mm (1cm ≈ 38px, so 8mm ≈ 30px) between cards in the same
          row — justify-center then centers that fixed-width 3-column block
          as a whole, giving proportional (equal, symmetric) margins on
          both outer edges without inflating the 8mm gap itself the way
          justify-evenly would. */}
      <div className="grid grid-cols-[repeat(3,342px)] justify-center gap-x-[30px] gap-y-6">
        {visible.map((caseStudy, index) => (
          <FadeIn key={caseStudy.slug} delay={index * 100}>
            <CaseCard caseStudy={caseStudy} />
          </FadeIn>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((current) => Math.min(current + PAGE_SIZE, caseStudies.length))
            }
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
    </>
  );
}
