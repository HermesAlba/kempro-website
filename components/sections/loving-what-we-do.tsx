import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Kempro's own take on Knife River's "Loving What We Do!" homepage block —
// a framed photo on the left next to a panel (title/subtitle/CTA) on the
// right. Measurements taken directly off kniferiver.com's own rendered
// layout at its own 1280px reference viewport (same method used for Hero
// and WhatWeDo):
// - two equal 570px columns (50/50 of the 1140px container), no gap
// - left: framed photo, 570x470, inset with a 65px top margin (KR's own
//   inner-section has `margin: 65px 0 -135px`, pushing the photo down from
//   the column's top rather than stretching edge-to-edge) — replicated
//   here as a fixed lg:mt-[65px] lg:h-[470px] block instead of the
//   negative-margin overflow trick itself (which relies on KR's dark
//   section bleeding past its own bottom edge; not needed now that both
//   columns share the same white background, so nothing needs to hide the
//   seam)
// - right panel: heading 40px/800/uppercase (44px line-height); 20px gap
//   to subtitle; subtitle 16px/400 (24px line-height); 35px gap to button;
//   button solid-fill, 18px/30px padding, no radius, 15px/600/uppercase
//
// Per request the panel's dark background (KR's own) was replaced with
// white across the whole block, so title/subtitle switched from white to
// dark neutrals for legibility.
//
// Photo: a light office-desk flat lay (Envato Elements, Tirachard),
// chosen per request for a sober, non-abstract, people-free image that
// stays close in tone to the white background. Because it's this light,
// a soft shadow (not a border — a border reads as the "línea divisoria"
// removed earlier) is used to keep the frame visible against the white
// section rather than blending away entirely.
export function LovingWhatWeDo() {
  const t = useTranslations("Home.lovingWhatWeDo");

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="flex justify-center px-6 pt-16 sm:px-10 sm:pt-20 lg:justify-start lg:px-[50px] lg:pt-0">
          <div className="relative aspect-[6/5] w-full max-w-[570px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] lg:mt-[65px] lg:aspect-auto lg:h-[470px] lg:max-w-none">
            <Image
              src="/images/home/loving-what-we-do.jpg"
              alt=""
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 570px, 100vw"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-[50px]">
          <h2 className="whitespace-nowrap text-[32px] font-extrabold uppercase leading-[1.1] text-neutral-900 sm:text-[40px]">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[440px] text-[16px] leading-[24px] text-neutral-600">
            {t("subtitle")}
          </p>
          <div className="mt-[35px]">
            <Link
              href="/SN"
              className="inline-flex h-[53px] items-center justify-center bg-primary-600 px-[30px] text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-700"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
