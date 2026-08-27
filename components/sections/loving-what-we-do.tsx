import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Kempro's own take on Knife River's "Loving What We Do!" homepage block —
// a framed photo on the left next to a panel (title/subtitle/CTA) on the
// right, on Kempro's white background.
//
// Per request the block's total height is fixed at 11cm on desktop (lg+;
// below that it stacks and reverts to natural/auto height, since a fixed
// 11cm can't fit an image + text stacked on top of each other). Built with
// flexbox (not CSS Grid) specifically so the fixed height is guaranteed:
// a flex row's items stretch to the row's own height by default — a
// simple, unambiguous rule — rather than depending on a single implicit
// grid row stretching to fill leftover space, which is a subtler
// (spec-correct, but easy to get subtly wrong) mechanism. The photo
// itself is 5mm taller than the block and absolutely positioned from the
// top of its column, so it bleeds 5mm past the block's bottom edge —
// Kempro's version of KR's own image-overhang treatment (KR's inner
// section uses a `margin: 65px 0 -135px` trick to let its photo bleed
// past its dark section; ours is a literal cm/mm spec instead since both
// columns now share the same white background).
//
// Right panel typography: heading 40px/800/uppercase (44px line-height);
// 20px gap to subtitle; subtitle 16px/400 (24px line-height); 35px gap to
// button; button solid-fill, 18px/30px padding, no radius, 15px/600/
// uppercase — all measured off KR at its own 1280px reference viewport.
//
// Photo: a light office-desk flat lay (Envato Elements, Tirachard),
// chosen per request for a sober, non-abstract, people-free image that
// stays close in tone to the white background. Because it's this light,
// a soft shadow (not a border — a border reads as the "línea divisoria"
// removed earlier) plus a contrast boost on the image itself keep it
// visible against the white section rather than blending away entirely.
export function LovingWhatWeDo() {
  const t = useTranslations("Home.lovingWhatWeDo");

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:h-[11cm] lg:flex-row">
        <div className="relative aspect-[6/5] w-full lg:aspect-auto lg:w-1/2 lg:flex-shrink-0">
          <div className="absolute inset-x-0 top-0 h-full shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] lg:h-[calc(100%+5mm)]">
            <Image
              src="/images/home/loving-what-we-do.jpg"
              alt=""
              fill
              className="object-cover object-top contrast-125"
              sizes="(min-width: 1024px) 570px, 100vw"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:w-1/2 lg:px-[50px]">
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
