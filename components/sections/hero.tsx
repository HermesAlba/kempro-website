"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { montserrat } from "@/lib/fonts";

export function Hero({
  title,
  subtitle,
}: {
  /** Overrides t("title")/t("subtitle") (Home.hero) — used to reuse this
   * exact hero (same background photo, wave animation, dark overlay, and
   * layout) as the first block of other top-level pages (Sobre Nosotros,
   * Servicios) with their own copy, instead of Home's. Both must be passed
   * together or not at all; each page's own translation namespace supplies
   * them (e.g. About.photoHero, Services.photoHero). */
  title?: string;
  subtitle?: string;
}) {
  const t = useTranslations("Home.hero");
  const resolvedTitle = title ?? t("title");
  const resolvedSubtitle = subtitle ?? t("subtitle");

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
    <section className="relative -mt-[81px] flex flex-1 items-start overflow-hidden bg-dark-900 pt-[81px] lg:-mt-[207px] lg:pt-[207px]">
      {/* Background photo (abstract network/mesh graphic, per request) —
          full-bleed cover: fills the entire section edge-to-edge (cropped
          as needed) down to where ClientLogos starts, per the reference
          screenshot. A dark overlay on top guarantees the white
          title/subtitle stay readable. Distinct filename from any prior
          hero image to avoid a stale-cache collision on the URL.
          overflow-hidden (in addition to the section's own) clips the
          single left-to-right wave sweep below (see .animate-hero-bg-wave
          in globals.css, plays once on load) so the scaled-up image never
          peeks past the section's edges. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/images/home/hero-network-mesh.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-hero-bg-wave object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>
      <Container className="relative z-10 pt-[46px] sm:pt-[88px] lg:pt-[146px] xl:pt-[162px]">
        <FadeIn className="mx-auto text-center">
          {/* Montserrat (see lib/fonts.ts), weight 800/extrabold, uppercase,
              same format as KR's own "BUILDING STRONG." title. Sizes were
              originally measured to fit "CRECIMIENTO INTELIGENTE." as a
              single line (whitespace-nowrap, no max-w) at every breakpoint's
              tightest viewport width. "CRECIENDO CON INTELIGENCIA." is ~12%
              longer, so every size below is scaled down by that same ratio
              to keep the line the same rendered width (and stay inside the
              lg breakpoint's ~960px available width, the tightest fit)
              instead of overflowing: 18px, 34px, 56px, 62px. */}
          <h1
            className={`${montserrat.className} uppercase whitespace-nowrap text-[18px] font-extrabold tracking-tight text-white sm:text-[34px] lg:text-[56px] xl:text-[62px]`}
          >
            {resolvedTitle}
          </h1>
          {/* 18px at every breakpoint — matches Knife River's own hero
              subtitle size exactly (measured: 18px/400/Montserrat). mt-5
              (20px) matches the gap measured between KR's own title and
              subtitle (511px - 491px ≈ 20px). */}
          <p className="mt-5 min-h-[3lh] text-[18px] text-white">
            {resolvedSubtitle}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
