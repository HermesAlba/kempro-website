"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";

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
      {/* Same blue tones as the /servicios hero gradient (see the
          `gradient` prop on components/sections/page-hero.tsx), but as a
          vertical variant instead of a top-left radial one: blue at the
          very top, fading to white by the bottom of this section — i.e.
          right before ClientLogos, since this section is flex-1 and fills
          the rest of the Hero+ClientLogos viewport-height wrapper (see
          app/[locale]/page.tsx). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "linear-gradient(to bottom, #B1C4FF 0%, #CFDCFF 45%, white 100%)" }}
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
          jumping straight to the xl/1280px size) was added once the title
          went uppercase, since the wider caps text needs a slightly smaller
          size to still fit on one line down to 1024px before the exact
          70px/1280px match kicks in. */}
      <Container className="relative pb-4 pt-[57px] sm:pb-4 sm:pt-[114px] lg:pb-4 lg:pt-[191px] xl:pt-[200px]">
        <FadeIn className="mx-auto text-center">
          {/* Uppercase, per request. No max-w on the wrapper above and
              whitespace-nowrap here so the title always renders as a single
              line — matches KR's own title, also a single line. Sizes fit
              on one line at every breakpoint (checked via
              canvas.measureText on the actual uppercase string): 20px→~284,
              40px→~568, 67px→~950, 70px→~993px — all within the Container's
              available width at their respective breakpoints/viewports.
              xl size (70px) matches Knife River's own hero title size
              exactly at their own 1280px reference viewport (measured via
              getComputedStyle: 70px/800/Montserrat — only the size is
              matched, not the weight/family). */}
          <h1 className="uppercase whitespace-nowrap text-[20px] font-bold tracking-tight text-neutral-900 sm:text-[40px] lg:text-[67px] xl:text-[70px]">
            {t("title")}
          </h1>
          {/* 18px at every breakpoint — matches Knife River's own hero
              subtitle size exactly (measured: 18px/400/Montserrat). mt-5
              (20px) matches the gap measured between KR's own title and
              subtitle (511px - 491px ≈ 20px). */}
          <p className="mt-5 min-h-[3lh] text-[18px] text-neutral-700">
            {t("subtitle")}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
