import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
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
      {/* Primer bloque — el mismo Hero (foto de fondo, overlay oscuro,
          animación de onda) + carrusel de logos de clientes que el home,
          dimensionado igual (min-h-[calc(100vh-HEADER_OFFSET)]) para que,
          junto con el menú, ocupe exactamente una pantalla — per request.
          Texto propio de esta página (About.photoHero), no el de Home.
          Reemplaza el hero anterior (columnas de texto + JoiningQuadrants),
          que se removió por completo en vez de reubicarse. */}
      <div className="flex flex-col md:min-h-[calc(100vh-81px)] lg:min-h-[calc(100vh-207px)]">
        <Hero title={t("photoHero.title")} subtitle={t("photoHero.subtitle")} />
        <ClientLogos border={false} />
      </div>

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
