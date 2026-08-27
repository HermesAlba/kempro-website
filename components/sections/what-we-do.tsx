import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { Link } from "@/i18n/navigation";
import { ServiceIconGlyph } from "@/components/ui/icons";
import { getServices } from "@/lib/data/services";
import type { Locale } from "@/i18n/routing";

// Four core service lines featured in the 2x2 grid — deliberately excludes
// IntranetIA 365 and ProcessMind AI (more specific vertical products) to
// keep this as a "what we do" overview of the broad service lines, distinct
// from ServicesOverview just below (which shows the "Cómo trabajamos"
// process steps, not a service list) and from /servicios (the full catalog
// of all 6). No content is duplicated between the three.
const featuredIds = ["strategy", "automation", "integration", "web"];

// Kempro's own take on Knife River's "WHAT WE DO" section — every measurement
// below (column split, card size/padding/gap, icon size, font sizes, the
// vertical rhythm of the left column) was taken directly off
// kniferiver.com's own rendered layout at its own 1280px reference viewport
// via getComputedStyle/getBoundingClientRect, the same method used for the
// hero. Background is Kempro's indigo (bg-primary-600) — per request; KR's
// own is orange. Title/tagline/subtitle are white and the CTA is an
// outlined white button (matching KR's own treatment on its orange
// background); the black service cards on the right are unaffected either
// way since they already sit on their own black background. Real Kempro
// service lines instead of construction materials. Copy is placeholder,
// not final.
//
// Measured off KR (1280px viewport):
// - left column width 356px, right grid 724px, gap between them 50px
// - "WHAT WE DO": 36px/800/uppercase; gap to tagline 6px
// - tagline: 15px/800/uppercase; gap to body 26px
// - body: 16px/400/leading-24px; gap to button 43px
// - button: border 1px, padding 18px 30px, 15px/600/uppercase, no radius
// - cards: 357x173(+) px, 20px padding, 10px column-gap / 20px row-gap,
//   pure black background
// - icon 50x50px, 15px gap to text column
// - card title 22px/800/uppercase; 5px gap to description
// - card description 16px/400/leading-24px
export function WhatWeDo() {
  const t = useTranslations("Home.whatWeDo");
  const locale = useLocale() as Locale;
  const services = getServices(locale).filter((s) => featuredIds.includes(s.id));

  return (
    <section className="bg-primary-600 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[356fr_724fr] lg:gap-x-[50px]">
          <FadeIn direction="left">
            <h2 className="text-[28px] font-extrabold uppercase leading-[1.1] text-white sm:text-[36px]">
              {t("title")}
            </h2>
            <p className="mt-[6px] text-[15px] font-extrabold uppercase leading-[1.1] tracking-wide text-white">
              {t("tagline")}
            </p>
            <p className="mt-[26px] text-[16px] leading-[24px] text-white">
              {t("subtitle")}
            </p>
            <div className="mt-[43px]">
              <Link
                href="/servicios"
                className="inline-flex h-[55px] items-center justify-center border border-white px-[30px] text-[15px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-primary-700"
              >
                {t("cta")}
              </Link>
            </div>
          </FadeIn>

          <FadeIn
            direction="right"
            delay={100}
            className="grid grid-cols-1 gap-x-[10px] gap-y-[20px] sm:grid-cols-2"
          >
            {services.map((service) => (
              <Link
                key={service.id}
                href={{ pathname: "/servicios/[slug]", params: { slug: service.slug } }}
                // min-h matches KR's own measured card height (173-197px
                // depending on how many lines its description ran to) —
                // shorter cards use this as a floor, and rows with a
                // 4-line description grow past it via the grid's default
                // align-items: stretch, same as KR's own row2 (197px)
                // growing taller than row1 (173px).
                className="hover-lift flex min-h-[173px] items-center gap-[15px] bg-black p-[20px] transition-colors hover:bg-neutral-900"
              >
                <ServiceIconGlyph icon={service.icon} className="h-[50px] w-[50px] flex-shrink-0 text-primary-600" />
                <div>
                  <h3 className="text-[22px] font-extrabold uppercase leading-[1.1] text-white">
                    {service.title}
                  </h3>
                  {/* Short, card-specific blurb (Home.whatWeDo.cards) rather
                      than the full service.description used on /servicios —
                      capped at 3-4 lines to match KR's own card text length,
                      which is what drives the card's height to match KR's
                      measured size (line-clamp-4 as a hard ceiling in case a
                      future edit runs long). */}
                  <p className="mt-[5px] line-clamp-4 text-[16px] leading-[24px] text-white">
                    {t(`cards.${service.id}`)}
                  </p>
                </div>
              </Link>
            ))}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
