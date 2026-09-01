"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { montserrat } from "@/lib/fonts";

export function Hero({
  eyebrow,
  title,
  subtitle,
  background = "photo",
  titleOnlyMobile,
}: {
  /** Small uppercase label above the title (e.g. "SERVICIOS") — omitted by
   * default (Home's own hero has none). Used when this same hero is reused
   * as another page's first block with its own copy. */
  eyebrow?: string;
  /** Overrides t("title")/t("subtitle") (Home.hero) — used to reuse this
   * exact hero (same layout/typography/sizing) as the first block of other
   * top-level pages with their own copy instead of Home's. */
  title?: string;
  subtitle?: string;
  /** "photo" (default) = Home's own look: full-bleed background photo,
   * dark overlay, single wave-sweep animation, white text. "white" = no
   * photo/overlay/animation at all — flat bg-white with dark text instead,
   * same layout/sizing/typography otherwise (used by Services, per
   * request — same full-screen hero block, just without the image). */
  background?: "photo" | "white";
  /** Hides the eyebrow and subtitle on mobile only (still shown from sm
   * up), leaving just the centered title — used by Servicios and Sobre
   * Nosotros per request, not by Home. */
  titleOnlyMobile?: boolean;
}) {
  const t = useTranslations("Home.hero");
  const resolvedTitle = title ?? t("title");
  const resolvedSubtitle = subtitle ?? t("subtitle");
  const isPhoto = background === "photo";

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
    <section
      className={`relative -mt-[81px] flex flex-1 items-start overflow-hidden pt-[81px] lg:-mt-[207px] lg:pt-[207px] ${
        // Photo variant (Home) only, mobile only (reset at sm and up, where
        // the wrapping div's own md/lg min-h takes over instead): forces
        // this section to the same natural height Services' own hero
        // renders at on mobile (measured live: 248.5px at a 375px
        // viewport, content-driven off its eyebrow+2-line-title+longer
        // subtitle) — per request, so ClientLogos right after it starts at
        // the exact same point Services' "Cómo trabajamos" band does,
        // instead of wherever Home's own shorter copy happens to end.
        isPhoto ? "min-h-[249px] bg-dark-900 sm:min-h-0" : "bg-white"
      }`}
    >
      {/* Background photo (abstract network/mesh graphic, per request) —
          full-bleed cover: fills the entire section edge-to-edge (cropped
          as needed) down to where ClientLogos starts, per the reference
          screenshot. A dark overlay on top guarantees the white
          title/subtitle stay readable. Distinct filename from any prior
          hero image to avoid a stale-cache collision on the URL.
          overflow-hidden (in addition to the section's own) clips the
          single left-to-right wave sweep below (see .animate-hero-bg-wave
          in globals.css, plays once on load) so the scaled-up image never
          peeks past the section's edges. Skipped entirely for
          background="white" — no photo, no overlay, no animation. */}
      {isPhoto ? (
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
      ) : null}
      {/* background="white" (Services) starts the text 1cm (38px at 96dpi)
          higher than the photo variant (Home) at sm and up — each pt value
          below sm is 38px less, per request. Photo variant's sm/lg/xl pt
          values stay untouched (still tuned to KR's reference position,
          see the section-level comment above). On mobile only (below sm),
          both variants now share the same tight pt-[8px] start — per
          request, so Home's hero occupies the same footprint on mobile as
          Services' hero does, before ClientLogos renders underneath it. */}
      <Container
        className={`relative z-10 pt-[8px] ${
          isPhoto
            ? "sm:pt-[88px] lg:pt-[146px] xl:pt-[162px]"
            : "sm:pt-[50px] lg:pt-[108px] xl:pt-[124px]"
        }`}
      >
        <FadeIn className="mx-auto text-center">
          {eyebrow ? (
            // Photo variant: text-primary-300 (brand indigo family) rather
            // than the cyan accent-300 SectionHeading's own "light" eyebrow
            // variant uses — that cyan isn't used anywhere live on the site
            // and would clash with this hero's indigo-branded photo/overlay.
            // White variant: text-primary-600, same eyebrow color used on
            // every other light-background section (e.g. SectionHeading's
            // own default, non-"light" eyebrow).
            <p
              className={`font-sans text-[13px] font-semibold uppercase tracking-[0.02em] ${
                titleOnlyMobile ? "hidden sm:block " : ""
              }${isPhoto ? "text-primary-300" : "text-primary-600"}`}
            >
              {eyebrow}
            </p>
          ) : null}
          {/* Montserrat (see lib/fonts.ts), weight 800/extrabold, uppercase,
              same format as KR's own "BUILDING STRONG." title. Sizes were
              originally measured to fit "CRECIMIENTO INTELIGENTE." as a
              single line at every breakpoint's tightest viewport width.
              "CRECIENDO CON INTELIGENCIA." is ~12% longer, so every size
              below is scaled down by that same ratio to keep the line the
              same rendered width: 18px, 34px, 56px, 62px.
              whitespace-nowrap removed (was only needed to guarantee Home's
              own short title never wraps) so a longer overridden title
              (another page's own copy, e.g. Services) wraps onto multiple
              lines instead of overflowing — Home's short title already fits
              within Container's width at every breakpoint on its own, so it
              still renders on a single line exactly as before. */}
          <h1
            className={`${montserrat.className} ${eyebrow ? (titleOnlyMobile ? "sm:mt-3 " : "mt-3 ") : ""}uppercase text-[18px] font-extrabold tracking-tight sm:text-[34px] lg:text-[56px] xl:text-[62px] ${
              isPhoto ? "text-white" : "text-neutral-900"
            }`}
          >
            {resolvedTitle}
          </h1>
          {/* 18px at every breakpoint — matches Knife River's own hero
              subtitle size exactly (measured: 18px/400/Montserrat). mt-5
              (20px) matches the gap measured between KR's own title and
              subtitle (511px - 491px ≈ 20px). max-w-2xl only applies when
              subtitle is overridden — it centers/wraps a longer subtitle at
              a readable line length instead of stretching edge to edge at
              wide breakpoints; Home's own default subtitle keeps its
              original full-width single line (adding the cap there would
              force it to wrap where it didn't before). */}
          <p
            className={`mt-5 min-h-[3lh] text-[18px] ${titleOnlyMobile ? "hidden sm:block " : ""}${
              isPhoto ? "text-white" : "text-neutral-600"
            } ${subtitle ? "mx-auto max-w-2xl" : ""}`}
          >
            {resolvedSubtitle}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
