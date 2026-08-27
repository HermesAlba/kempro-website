"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { montserrat } from "@/lib/fonts";

export function Hero() {
  const t = useTranslations("Home.hero");

  return (
    // The -mt/pt pair (see HEADER_OFFSET in components/layout/header.tsx)
    // bleeds this section's own background up behind the floating nav; net
    // position of the content below is unchanged since the two cancel out.
    // `flex-1` lets this section absorb the leftover height from the home
    // page's Hero+ClientLogos wrapper (see app/[locale]/page.tsx). Content
    // is top-anchored (`items-start` + the Container's own generous pt)
    // rather than vertically centered — matches Knife River's own hero
    // layout, where the title/subtitle block sits in the upper portion of
    // the section instead of dead-center (measured: title starts ~200px
    // below the header, well above the section's vertical midpoint).
    <section className="relative -mt-[81px] flex flex-1 items-start overflow-hidden bg-white pt-[81px] lg:-mt-[207px] lg:pt-[207px]">
      {/* Deep navy (uses the brand's own primary-200/500/900 tokens — see
          app/globals.css; primary-900 = hc-blue-dark, already used
          elsewhere on the site, so this end of the gradient is a genuine
          brand color, not an arbitrary pick), white at the very top,
          intensifying downward per request. NOTE: the title/subtitle are
          white text (see below) and sit near the top of this section
          (pt-[57..200px], see the Container below) — with white-at-top
          here, that text will have poor contrast right where it renders;
          flagged to the user. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, white 0%, #cfdcff 40%, #7682f8 75%, #2f3293 100%)",
        }}
      />
      {/* White-dot grid, on its own layer (separate from the gradient
          above) so its background-position can animate independently —
          drifts straight down on a loop, like a slow wave/rain, via
          .animate-dot-wave (see app/globals.css). */}
      <div
        aria-hidden="true"
        className="animate-dot-wave pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />
      {/* xl:pt-[200px] matches KR's own measured offset from the top of its
          hero section to its title (title top 407px − section top 207px ≈
          200px) at KR's own reference viewport (1280px). base/sm/lg scale
          proportionally to their own title size — an extra `lg` step (vs.
          jumping straight to the xl/1280px size) exists because the wider
          caps text needs a slightly smaller size to still fit on one line
          down to 1024px before the exact 70px/1280px match kicks in. */}
      <Container className="relative pb-4 pt-[57px] sm:pb-4 sm:pt-[109px] lg:pb-4 lg:pt-[180px] xl:pt-[200px]">
        <FadeIn className="mx-auto text-center">
          {/* Same format as KR's own "BUILDING STRONG." title: Montserrat
              (see lib/fonts.ts), weight 800/extrabold, uppercase — measured
              directly off KR via getComputedStyle. Sizes re-measured for
              Montserrat 800 specifically (canvas.measureText on the actual
              uppercase string): 20px→~300, 38px→~570, 63px→~945,
              70px→~1050px — all within the Container's available width at
              their respective breakpoints/viewports, so it still renders as
              a single line (whitespace-nowrap + no max-w on the wrapper
              above) at every size. xl size (70px) matches KR's own title
              size exactly at their own 1280px reference viewport. */}
          <h1
            className={`${montserrat.className} uppercase whitespace-nowrap text-[20px] font-extrabold tracking-tight text-white sm:text-[38px] lg:text-[63px] xl:text-[70px]`}
          >
            {t("title")}
          </h1>
          {/* 18px at every breakpoint — matches Knife River's own hero
              subtitle size exactly (measured: 18px/400/Montserrat). mt-5
              (20px) matches the gap measured between KR's own title and
              subtitle (511px - 491px ≈ 20px). */}
          <p className="mt-5 min-h-[3lh] text-[18px] text-white">
            {t("subtitle")}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
