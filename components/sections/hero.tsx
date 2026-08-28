"use client";

import Image from "next/image";
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
    <section className="relative -mt-[81px] flex flex-1 items-start overflow-hidden bg-dark-900 pt-[81px] lg:-mt-[207px] lg:pt-[207px]">
      {/* Full-bleed background photo replacing the previous flat black —
          per request. Image fills the whole section (including the
          -mt/pt header-bleed area above), a dark overlay on top guarantees
          the white title/subtitle stay readable regardless of how bright
          any given region of the photo is. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/home/hero-background.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
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
