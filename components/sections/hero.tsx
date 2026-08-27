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
    <section className="relative -mt-[54px] flex flex-1 items-center overflow-hidden bg-white pt-[54px] lg:-mt-[134px] lg:pt-[134px]">
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
          {/* text-hc-blue-dark (#2F3293) — same indigo tone already used for
              the blog's newsletter section background
              (app/[locale]/blog/page.tsx). */}
          <p className="text-sm font-semibold uppercase tracking-wide text-hc-blue-dark">
            {t("eyebrow")}
          </p>
          {/* min-h reserves 3 lines (the Spanish title/subtitle's actual
              wrap count) so the English version — shorter, so it wraps to
              fewer lines — still occupies the same height; `lh` scales
              with each element's own line-height, so this holds at every
              breakpoint without hardcoding per-breakpoint pixel values. */}
          <h1 className="mt-4 min-h-[3lh] text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 min-h-[3lh] text-lg text-neutral-700 sm:text-xl">
            {t("subtitle")}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
