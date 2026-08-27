import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { JoiningQuadrants } from "@/components/ui/joining-quadrants";
import { OriginImageFrame } from "@/components/sections/origin-image-frame";
import { KemproLogo } from "@/components/ui/kempro-logo";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";
import { SearchIcon, RulerIcon, BalanceIcon, EyeIcon, TargetIcon } from "@/components/ui/icons";

const VALUE_ICONS = [SearchIcon, RulerIcon, BalanceIcon, EyeIcon, TargetIcon];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const valueItems = t.raw("values.items") as {
    number: string;
    title: string;
    description: string;
  }[];

  return (
    <>
      {/* Hero — bleeds up behind the floating nav (see HEADER_OFFSET in
          components/layout/header.tsx); the inner columns keep their own
          padding untouched since the -mt/pt pair only shifts where this
          section's background starts, not where its children render. */}
      <section className="-mt-[54px] flex min-h-[100vh] flex-col justify-center bg-primary-50/50 pt-[54px] pb-[38px] lg:-mt-[70px] lg:pt-[70px]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col justify-center gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:w-[640px] lg:flex-none lg:py-20 lg:pl-[95px] lg:pr-10">
            <FadeIn>
              <p className="text-[13px] font-semibold uppercase tracking-[0.02em] text-primary-600">
                {t("hero.eyebrow")}
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-[24px] font-bold leading-tight text-neutral-900 sm:text-[28px]">
                {t("hero.statement")}
              </h1>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="mt-4 max-w-[560px] text-[19px] font-medium leading-[1.5] text-neutral-800 sm:text-[22px]">
                {t("hero.subtitle")}
              </p>
            </FadeIn>
          </div>

          <div className="aspect-square w-full sm:mx-auto sm:w-[456px] lg:ml-auto lg:mr-[95px]">
            {/* Movement here is the four quadrants sliding in from their own
                diagonal and joining in two beats (see JoiningQuadrants)
                rather than a plain fade/slide of the whole rectangle. */}
            <JoiningQuadrants
              className="relative h-full w-full overflow-hidden rounded-xl"
              style={{ backgroundImage: "linear-gradient(135deg, #5D5FEF 0%, #4949D6 100%)" }}
            >
              {/* Graph-paper grid — two repeating linear gradients (one
                  horizontal, one vertical) rather than a background image, so
                  the line weight/color stay crisp at any size. White lines,
                  since this mid-blue base would swallow the dark-blue grid
                  the pattern normally uses. */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)," +
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
                }}
              />
              {/* Purely decorative vertical divider, centered. */}
              <div className="absolute inset-y-0 left-1/2 w-[4px] -translate-x-1/2 bg-white" />
              {/* Purely decorative horizontal divider, centered — same
                  thickness/color as the vertical divider, spanning the
                  full width instead of the full height. */}
              <div className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 bg-white" />

              {/* White card with the Kempro standalone mark centered. The
                  mark's color is hardcoded brand indigo (KEMPRO_PRIMARY,
                  see lib/kempro-symbol.ts) — unlike the icon this replaced,
                  it doesn't take a currentColor override via className. */}
              <div className="absolute left-1/2 top-1/2 flex h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-white sm:h-[157px] sm:w-[157px] lg:h-[185px] lg:w-[185px]">
                <KemproLogo
                  variant="standalone"
                  size={86}
                  className="h-[60px] w-[60px] sm:h-[73px] sm:w-[73px] lg:h-[86px] lg:w-[86px]"
                />
              </div>
            </JoiningQuadrants>
          </div>
        </div>
      </section>

      {/* Divider between blocks 1 and 2 — same line language as
          HeroBodyDivider on the case-studies detail pages (see
          casos-de-exito/[slug]/page.tsx), just as a static border instead
          of a runtime-measured line, since this transition is between two
          fixed-height blocks, not two viewport-relative ones. Asymmetric
          pt/pb (2px/78px) sits the line 1cm higher than a plain py-10
          would, without changing this block's own total height. */}
      <div className="bg-primary-50/50 px-6 pt-[2px] pb-[78px] sm:px-10 lg:px-[95px]">
        <div className="mx-auto max-w-[1280px] border-t border-neutral-300" />
      </div>

      {/* Origin story — blends into the page's own background instead of
          floating as a white card. */}
      <section className="-mt-[38px] bg-primary-50/50 px-6 py-16 sm:px-10 lg:px-[95px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="relative flex flex-col lg:flex-row" data-origin-row>
            <FadeIn
              direction="left"
              className="flex flex-col gap-6 p-8 lg:w-2/3 lg:pl-0 lg:pr-14 lg:pb-14 lg:pt-[18px]"
            >
              <div>
                <h2
                  data-origin-title
                  className="text-[24px] font-bold leading-tight text-neutral-900 sm:text-[28px]"
                >
                  {t("story.originTitle")}
                </h2>
              </div>
              <p className="text-[16px] leading-[1.6] text-neutral-600">{t("story.originParagraph1")}</p>
              <p className="text-[16px] leading-[1.6] text-neutral-600">{t("story.originParagraph2")}</p>
              <p className="text-[16px] leading-[1.6] text-neutral-600">{t("story.originParagraph3")}</p>
              <Link
                href="/contacto"
                data-origin-button
                className={`${ctaButtonClasses} mt-2 h-[35px] w-fit self-center px-[20px] py-[10px]`}
              >
                {t("story.cta")}
              </Link>
            </FadeIn>

            <OriginImageFrame className="relative hidden overflow-hidden rounded-xl bg-neutral-100 lg:absolute lg:right-0 lg:block lg:w-1/3">
              <video
                src="/videos/about/origin-ink-flow.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            </OriginImageFrame>
          </div>
        </div>
      </section>

      {/* Symbol section — the mark is now a large, faint watermark behind
          the whole section instead of a small icon next to the text. */}
      <section className="relative overflow-hidden border-t border-neutral-100 bg-primary-50/50">
        <KemproLogo
          variant="standalone"
          size={560}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] select-none"
        />

        <div className="relative mx-auto max-w-[1280px] px-6 pb-8 pt-14 sm:px-10 lg:px-[95px] lg:pb-8 lg:pt-16">
          <FadeIn>
            <h2 className="text-[24px] font-bold leading-tight text-primary-600 sm:text-[28px]">
              {t("symbol.title")}
            </h2>
          </FadeIn>
        </div>
        <div className="relative mx-auto flex max-w-[1280px] flex-col lg:flex-row">
          <FadeIn
            direction="left"
            className="flex flex-col gap-6 px-6 pb-12 sm:px-10 sm:pb-14 lg:w-[640px] lg:flex-none lg:py-2 lg:pl-[95px] lg:pr-12 lg:pb-12"
          >
            <p className="text-[18px] leading-[1.6] text-neutral-900 sm:text-[20px]">
              {t("symbol.introText")}
            </p>
            <p className="text-[18px] leading-[1.6] text-neutral-900 sm:text-[20px]">
              {t("symbol.detailText")}
            </p>
          </FadeIn>
          <FadeIn
            delay={100}
            direction="right"
            className="px-6 pb-16 sm:px-10 lg:w-[640px] lg:flex-none lg:py-4 lg:pl-12 lg:pr-[95px] lg:pb-12"
          >
            <p className="text-[18px] leading-[1.6] text-primary-600 sm:text-[20px]">
              {t("symbol.meaningText")}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark-900 px-6 py-16 sm:px-10 sm:py-20 lg:px-[95px]">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
          viewBox="0 0 1280 909"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 700 420 120 1280 380" stroke="white" strokeWidth="1" />
          <path d="M180 909 680 0" stroke="white" strokeWidth="1" />
          <path d="M900 0 1280 250" stroke="white" strokeWidth="1" />
          <path d="M0 250 340 909" stroke="white" strokeWidth="1" />
          <path d="M1000 909 1280 620" stroke="white" strokeWidth="1" />
        </svg>

        <div className="relative mx-auto max-w-[1280px]">
          <FadeIn>
            <h2 className="text-[24px] font-bold leading-tight text-[#90A2FE] sm:text-[28px]">
              {t("values.title")}
            </h2>
          </FadeIn>

          <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {valueItems.map((item, index) => {
              const ValueIcon = VALUE_ICONS[index];
              return (
                <FadeIn key={item.number} delay={index * 100}>
                  <div className="hover-lift">
                    <ValueIcon className="h-7 w-7 text-[#90A2FE]/70" />
                    <h3 className="mt-4 text-[24px] font-bold leading-[1.3] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[17px] leading-[1.6] text-[#C8D2E1]">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
