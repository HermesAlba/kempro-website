import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/lib/data/case-studies";
import {
  IndustryHeaderBackground,
  industryColorFor,
} from "@/components/sections/industry-header-background";

export function CaseCard({
  caseStudy,
  headerImageSrc,
  headerImageGrayscale,
  background = "white",
}: {
  caseStudy: CaseStudy;
  /** Overrides caseStudy's own image — opt-in per card, used by the
   * Borrador page to swap a category's thumbnail without touching the
   * shared component's default look on the real Historias de Clientes
   * page. When omitted, falls back to caseStudy.image — the same photo
   * used on the detail page's hero, so listing and detail never diverge. */
  headerImageSrc?: string;
  /** Defaults to true when headerImageSrc is explicitly set (matching the
   * Borrador page's black-and-white convention), or false when falling
   * back to caseStudy.image (real color, matching the detail page). */
  headerImageGrayscale?: boolean;
  /** "white" (default) = the original white content panel with dark text,
   * used everywhere except Home. "indigo" = brand-indigo content panel
   * with white/light text, used by FeaturedCaseStudies on Home's
   * black-background "Resultados reales en distintas industrias"
   * section. */
  background?: "white" | "indigo";
}) {
  const locale = useLocale();
  const href = { pathname: "/casos-de-exito/[slug]", params: { slug: caseStudy.slug } } as const;
  const date = new Date(caseStudy.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const imageSrc = headerImageSrc ?? caseStudy.image;
  const imageGrayscale = headerImageGrayscale ?? Boolean(headerImageSrc);
  const isIndigo = background === "indigo";

  return (
    // Top: IndustryHeaderBackground thumbnail (unchanged — see
    // components/sections/industry-header-background.tsx). Bottom: same
    // white background, tight tracking, and content structure (colored
    // category + date, title, excerpt) as the blog's own ArticleCard (see
    // components/blog/all-articles-grid.tsx) — only the category color
    // source differs (industryColorFor instead of the blog's own category
    // palette). Hover is now just the title color shift ArticleCard itself
    // uses, not a whole-card fill swap, to match that same "content and
    // behavior" parity. Category/date meta-row is explicit font-sans
    // (Montserrat, UI label) since <body>'s default is Poppins; the excerpt
    // paragraph stays on that Poppins default (body copy, matches KR).
    <Link
      href={href}
      // w-full max-w-[342px] instead of a fixed w-[342px] — the fixed
      // width alone overflowed a 375px viewport once the section's own
      // px-6 padding is subtracted (~327px available). Parent grids gate
      // to grid-cols-[repeat(3,342px)] only from lg up (see
      // all-case-studies-grid.tsx / featured-case-studies.tsx), so below
      // that this card just fills its (fluid, 1- or 2-column) grid cell,
      // capped at 342px.
      className="group relative flex h-[342px] w-full max-w-[342px] flex-shrink-0 flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-200 ease-out hover:shadow-lg focus-visible:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1"
    >
      {imageSrc ? (
        <div className="relative h-[150px] w-full flex-shrink-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={caseStudy.client}
            fill
            sizes="342px"
            className={`object-cover ${imageGrayscale ? "grayscale" : ""}`}
          />
        </div>
      ) : (
        <IndustryHeaderBackground
          industryKey={caseStudy.industryKey}
          className="relative h-[150px] w-full flex-shrink-0 overflow-hidden"
          cardSize={80}
          iconSize={36}
        />
      )}

      <div
        className={`flex flex-1 flex-col gap-2 overflow-hidden p-6 tracking-[-0.02em] ${
          isIndigo ? "bg-primary-600" : "bg-white"
        }`}
      >
        <p className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-wide">
          <span
            className={isIndigo ? "text-white" : undefined}
            style={isIndigo ? undefined : { color: industryColorFor() }}
          >
            {caseStudy.industry}
          </span>
          <span className={isIndigo ? "text-white/40" : "text-neutral-300"}>&bull;</span>
          <span className={isIndigo ? "text-primary-100" : "text-neutral-500"}>{date}</span>
        </p>
        <h3
          className={`line-clamp-2 text-[18px] font-bold leading-snug transition-colors ${
            isIndigo
              ? "text-white group-hover:text-primary-100"
              : "text-neutral-900 group-hover:text-primary-600"
          }`}
        >
          {caseStudy.client}
        </h3>
        <p
          className={`line-clamp-3 text-[14px] leading-relaxed ${
            isIndigo ? "text-primary-50" : "text-neutral-600"
          }`}
        >
          {caseStudy.result}
        </p>
      </div>
    </Link>
  );
}
