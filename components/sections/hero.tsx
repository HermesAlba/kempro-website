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
    // Flat white background, no gradient/pattern — per request. `flex-1`
    // lets this section absorb the leftover height from the home page's
    // Hero+ClientLogos wrapper (see app/[locale]/page.tsx). Content is
    // vertically centered (`items-center`) within that space — per request.
    <section className="relative -mt-[81px] flex flex-1 items-center overflow-hidden bg-white pt-[81px] lg:-mt-[207px] lg:pt-[207px]">
      <Container className="relative z-10">
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
            className={`${montserrat.className} uppercase whitespace-nowrap text-[20px] font-extrabold tracking-tight text-black sm:text-[38px] lg:text-[63px] xl:text-[70px]`}
          >
            {t("title")}
          </h1>
          {/* 18px at every breakpoint — matches Knife River's own hero
              subtitle size exactly (measured: 18px/400/Montserrat). mt-5
              (20px) matches the gap measured between KR's own title and
              subtitle (511px - 491px ≈ 20px). */}
          <p className="mt-5 min-h-[3lh] text-[18px] text-black">
            {t("subtitle")}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
