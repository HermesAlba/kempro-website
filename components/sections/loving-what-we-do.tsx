import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";

// Kempro's own take on Knife River's "Loving What We Do!" homepage block —
// a framed photo on the left next to a panel (title/subtitle/CTA) on the
// right, on a black background. Every number below was re-measured
// directly off kniferiver.com's own rendered layout (getBoundingClientRect/
// getComputedStyle) at its own 1280px reference viewport, replacing an
// earlier ad-hoc "11cm" pass:
//
// - The two columns sit inside KR's own centered content container (not
//   flush against the viewport edge — only the section's own background
//   photo is full-bleed) — replicated here with the site's shared
//   <Container>, same as Hero/WhatWeDo, rather than hardcoding KR's own
//   1140px container width.
// - Block height (both columns' shared height): 430px. Implemented as a
//   flex row stretched to that height — flex's default cross-axis stretch
//   is simple/unambiguous, unlike relying on a single implicit CSS Grid
//   row stretching to fill leftover space.
// - Left column: the photo itself is NOT stretched to the column's
//   height. It's a fixed 65px-from-top / 470px-tall block (KR's own
//   inner-section: `margin: 65px 0 -135px`), so it naturally overhangs
//   105px past the 430px block's bottom edge — Kempro's version of KR's
//   own image-bleed treatment, now using KR's literal measured offsets
//   instead of an invented cm/mm spec.
// - Right column: heading sits ~100px from the column's top, which is
//   just shy of dead-center for a ~223px-tall text block in a 430px
//   column — so `justify-center` (already vertical-centering) reproduces
//   this without needing a hardcoded top offset. Heading 40px/800/
//   uppercase (44px line-height); 20px gap to subtitle; subtitle 16px/400
//   (24px line-height); 35px gap to button; button solid-fill, 18px/30px
//   padding, no radius, 15px/600/uppercase, 236px wide.
// - Section padding-bottom: 80px (KR's own section padding, `0 15px
//   80px`), kept as the gap before the next block.
//
// Per request the block's background is white, so title/subtitle use dark
// neutrals for legibility.
//
// Photo: an abstract 3D render — dark geometric cubes threaded together by
// a tangled indigo network/mesh of connected nodes — swapped in per
// request to replace the earlier office-desk flat lay. object-center (not
// object-top, which suited the old photo's framing) since this
// composition is centered both ways. A soft shadow (not a border — a
// border reads as the "línea divisoria" removed earlier) plus a contrast
// boost on the image itself keep its edges well defined against the
// white section background.
export function LovingWhatWeDo() {
  const t = useTranslations("Home.lovingWhatWeDo");

  return (
    <section className="bg-white lg:pb-[80px]">
      <Container>
        <div className="flex flex-col lg:h-[430px] lg:flex-row">
          <div className="relative aspect-[6/5] w-full lg:aspect-auto lg:h-full lg:w-1/2 lg:flex-shrink-0">
            <div className="absolute left-[1.5cm] right-0 top-0 h-full shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] lg:top-[65px] lg:h-[470px]">
              <Image
                src="/images/home/metodo-con-alma-cubes.jpg"
                alt=""
                fill
                className="object-cover object-center contrast-125"
                sizes="(min-width: 1024px) 570px, 100vw"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:w-1/2 lg:px-[50px] lg:py-0">
            <h2 className="whitespace-nowrap text-[32px] font-extrabold uppercase leading-[1.1] text-neutral-900 sm:text-[40px]">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-[440px] text-[16px] leading-[24px] text-neutral-600">
              {t("subtitle")}
            </p>
            <div className="mt-[35px]">
              <Link
                href="/SN"
                className="inline-flex h-[53px] items-center justify-center bg-primary-600 px-[30px] font-sans text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-700"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
