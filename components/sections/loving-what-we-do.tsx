import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Kempro's own take on Knife River's "Loving What We Do!" homepage block —
// a framed photo on the left next to a dark panel (title/subtitle/CTA) on
// the right. Measurements taken directly off kniferiver.com's own rendered
// layout at its own 1280px reference viewport (same method used for Hero
// and WhatWeDo):
// - two equal 570px columns (50/50 of the 1140px container), no gap
// - left: framed photo, ~570x470, set as a CSS background-image layer
//   (KR uses an Elementor background-slideshow, not a plain <img>)
// - right panel: heading 40px/800/uppercase (44px line-height); 20px gap
//   to subtitle; subtitle 16px/400 (24px line-height); 35px gap to button;
//   button solid-fill, 18px/30px padding, no radius, 15px/600/uppercase
//
// Per request the panel's dark background (KR's own) was replaced with
// white across the whole block, so title/subtitle switched from white to
// dark neutrals for legibility.
//
// Per request this is a first pass: placeholder image (no real photo
// asset yet) and copy left exactly as shown in the reference (not yet
// translated/adapted for ES — see Home.lovingWhatWeDo in both message
// files). Kempro's indigo brand color replaces KR's orange on the button.
export function LovingWhatWeDo() {
  const t = useTranslations("Home.lovingWhatWeDo");

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2">
        {/* Placeholder image — swap for a real photo asset later. Sized to
            match KR's own framed-photo proportions (~570x470 at 1280px, a
            ~6:5 aspect ratio), stretched to the panel's full height on
            desktop via the grid's default stretch. */}
        <div
          aria-hidden="true"
          className="aspect-[6/5] w-full bg-neutral-200 lg:aspect-auto lg:min-h-[470px]"
        />
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-[50px]">
          <h2 className="text-[32px] font-extrabold uppercase leading-[1.1] text-neutral-900 sm:text-[40px]">
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
