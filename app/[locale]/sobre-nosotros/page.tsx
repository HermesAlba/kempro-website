import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { Hero } from "@/components/sections/hero";
import { OriginImageFrame } from "@/components/sections/origin-image-frame";
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

export default async function SobreNosotrosPage({
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
      {/* Primer bloque — mismo Hero que Servicios (background="white": sin
          foto, sin overlay, sin animación de onda, texto oscuro), sin
          carrusel de logos, con el mismo alto
          (min-h-[calc(100vh-HEADER_OFFSET)]) para que, junto con el menú,
          ocupe exactamente una pantalla — per request. Texto de la imagen
          adjunta, que coincide con About.hero (eyebrow/statement/subtitle,
          sin cambios). Reemplaza el hero anterior (columnas de texto +
          JoiningHalves), que se removió por completo. */}
      <div className="flex flex-col md:min-h-[calc(100vh-81px)] lg:min-h-[calc(100vh-207px)]">
        <Hero eyebrow={t("hero.eyebrow")} title={t("hero.statement")} subtitle={t("hero.subtitle")} background="white" />
      </div>

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
