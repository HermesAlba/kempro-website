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
    // page's Hero+ClientLogos wrapper (see app/[locale]/page.tsx), and
    // `flex items-center` centers the content within that extra space
    // instead of leaving it pinned to the top with a gap below.
    <section className="relative -mt-[81px] flex flex-1 items-center overflow-hidden bg-white pt-[81px] lg:-mt-[207px] lg:pt-[207px]">
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
      <Container className="relative pb-4 pt-8 sm:pb-4 sm:pt-10 lg:pb-4 lg:pt-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          {/* min-h reserves 3 lines (the Spanish title/subtitle's actual
              wrap count) so the English version — shorter, so it wraps to
              fewer lines — still occupies the same height; `lh` scales
              with each element's own line-height, so this holds at every
              breakpoint without hardcoding per-breakpoint pixel values.
              lg size (70px) matches Knife River's own hero title size
              exactly (measured via getComputedStyle: 70px/800/Montserrat —
              only the size is matched here, not the weight/family). */}
          <h1 className="min-h-[3lh] text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-[70px]">
            {t("title")}
          </h1>
          {/* 18px at every breakpoint — matches Knife River's own hero
              subtitle size exactly (measured: 18px/400/Montserrat). */}
          <p className="mt-4 min-h-[3lh] text-[18px] text-neutral-700">
            {t("subtitle")}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
