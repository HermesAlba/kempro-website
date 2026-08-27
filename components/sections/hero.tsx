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
    // is top-anchored (`items-start` + the Container's own pt) — per
    // request the title starts 1cm ABOVE where KR's own "BUILDING
    // STRONG." starts. Re-measured directly off kniferiver.com at its own
    // 1280px reference viewport: header 207px tall, title top at page-y
    // 407px (200px into the hero section). Target = 407px − 1cm (37.8px)
    // ≈ 369px from page top ≈ 162px into this section (since our header
    // is the same 207px tall as KR's) — hence xl:pt-[162px] below.
    // base/sm/lg values keep the same proportion to the xl value as
    // before (0.285 / 0.545 / 0.9), scaled down from the previous
    // 200px-at-xl figure to this new 162px-at-xl figure.
    <section className="relative -mt-[81px] flex flex-1 items-start overflow-hidden bg-black pt-[81px] lg:-mt-[207px] lg:pt-[207px]">
      {/* Flat solid black (bg-black on the section above), no pattern —
          per request. */}
      <Container className="relative z-10 pt-[46px] sm:pt-[88px] lg:pt-[146px] xl:pt-[162px]">
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
