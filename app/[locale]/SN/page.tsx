import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { JoiningHalves } from "@/components/ui/joining-halves";
import { KemproLogo } from "@/components/ui/kempro-logo";
import { OriginImageFrame } from "@/components/sections/origin-image-frame";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";
import { SearchIcon, RulerIcon, BalanceIcon, EyeIcon, TargetIcon } from "@/components/ui/icons";

// Unlinked draft copy of app/[locale]/sobre-nosotros/page.tsx — same
// pattern as app/[locale]/HC/page.tsx: a standalone route (not in nav or
// sitemap) for iterating on this page's content/layout separately from
// the live "Sobre nosotros" page. Reuses the same About translations, so
// edits to those keys affect both routes until this page diverges.
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

export default async function SNPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const rightParagraphs = t.raw("story.rightParagraphs") as string[];
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
      <section className="-mt-[81px] min-h-[calc(100vh+19px)] bg-primary-50/50 pt-[81px] lg:-mt-[157px] lg:pt-[157px]">
        <div className="mx-auto flex max-w-[1280px] flex-col lg:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-6 px-6 py-16 sm:px-10 sm:py-20 lg:w-[640px] lg:flex-none lg:py-20 lg:pl-[95px] lg:pr-10">
            <FadeIn>
              <p className="text-[13px] font-semibold uppercase tracking-[0.02em] text-primary-600">
                {t("hero.eyebrow")}
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-neutral-900 sm:text-[28px]">
                {t("hero.statement")}
              </h1>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-neutral-600 sm:text-[16px]">
                {t("hero.subtitle")}
              </p>
            </FadeIn>
          </div>

          <div className="relative top-[19px] min-h-[280px] flex-1 sm:min-h-[400px] lg:min-h-[560px] lg:w-[640px] lg:flex-none">
            {/* Movement here is the two halves visibly sliding together and
                meeting at the center seam (see JoiningHalves) rather than a
                plain fade/slide of the whole rectangle. */}
            <JoiningHalves
              className="relative h-full w-full overflow-hidden rounded-xl"
              style={{ backgroundImage: "linear-gradient(135deg, #5D5FEF 0%, #4949D6 100%)" }}
            >
              {/* Graph-paper grid — two repeating linear gradients (one
                  horizontal, one vertical) rather than a background image, so
                  the line weight/color stay crisp at any size. White lines,
                  since this mid-indigo base would swallow the dark-indigo
                  grid the pattern normally uses. */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)," +
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
                }}
              />
              {/* White card with the Kempro standalone mark centered. */}
              <div className="absolute left-1/2 top-1/2 flex h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] border border-white/20 bg-white sm:h-[220px] sm:w-[220px] sm:rounded-[28px] lg:h-[260px] lg:w-[260px] lg:rounded-[32px]">
                <KemproLogo
                  variant="standalone"
                  size={120}
                  className="h-[84px] w-[84px] sm:h-[102px] sm:w-[102px] lg:h-[120px] lg:w-[120px]"
                />
              </div>
            </JoiningHalves>
          </div>
        </div>
      </section>

      {/* Divider between blocks 1 and 2 — same line language as
          HeroBodyDivider on the case-studies detail pages (see
          casos-de-exito/[slug]/page.tsx), just as a static border instead
          of a runtime-measured line, since this transition is between two
          fixed-height blocks, not two viewport-relative ones. Symmetric
          py-[57px] (114px = 3cm total) centers the line in the block. */}
      <div className="bg-primary-50/50 px-6 py-[57px] sm:px-10 lg:px-[95px]">
        <div className="mx-auto max-w-[1280px] border-t border-neutral-300" />
      </div>

      <section className="bg-primary-50/50 px-6 py-16 sm:px-10 lg:px-[95px]">
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

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-[95px]" style={{ backgroundColor: "#B1C4FF" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <FadeIn direction="left">
              <h2 className="text-[24px] font-bold leading-tight text-slate-900 sm:text-[28px]">
                {t("values.title")} &rarr;
              </h2>
            </FadeIn>
            {valueItems.map((item, index) => (
              <FadeIn key={item.number} delay={(index + 1) * 100}>
                <div className="hover-lift">
                  <h3 className="text-[20px] font-bold leading-[1.3] text-black">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-black">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 py-8 sm:px-10 lg:px-[95px]" style={{ backgroundColor: "#B1C4FF" }}>
        <div className="relative -top-[38px] mx-auto max-w-[1280px] border-t border-neutral-400" />
      </div>

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-[95px]" style={{ backgroundColor: "#B1C4FF" }}>
        <div className="relative -top-[76px] mx-auto max-w-[1280px]">
          <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <FadeIn direction="left">
              <h2 className="text-[24px] font-bold leading-tight text-slate-900 sm:text-[28px]">
                {t("symbol.title")} &rarr;
              </h2>
            </FadeIn>
            <FadeIn direction="left" delay={100}>
              <div className="flex flex-col gap-4">
                <p className="text-[16px] leading-[1.6] text-black">{t("symbol.introText")}</p>
                <p className="text-[16px] leading-[1.6] text-black">{t("symbol.detailTextSN")}</p>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={200}>
              <p className="text-[16px] leading-[1.6] text-black">{t("symbol.meaningTextSN")}</p>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
