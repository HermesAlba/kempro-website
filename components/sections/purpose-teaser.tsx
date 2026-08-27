import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { KemproLogo } from "@/components/ui/kempro-logo";
import { Link } from "@/i18n/navigation";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

// Reuses About.hero copy verbatim (same statement/subtitle already shown on
// the real Sobre nosotros page, see app/[locale]/SN/page.tsx) rather than
// authoring new "who we are" copy for the homepage.
export function PurposeTeaser() {
  const tAbout = useTranslations("About.hero");
  const tHome = useTranslations("Home.purpose");

  return (
    <section className="border-t border-neutral-200 bg-primary-50/50 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
              {tAbout("eyebrow")}
            </p>
            <h2 className="mt-3 text-[24px] font-bold leading-tight text-neutral-900 sm:text-[28px]">
              {tAbout("statement")}
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-neutral-600">
              {tAbout("subtitle")}
            </p>
            <div className="mt-8">
              <Link href="/SN" className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}>
                {tHome("cta")}
              </Link>
            </div>
          </FadeIn>

          {/* Per request: no more gradient card/background — just the mark
              itself, centered and proportionally sized within the same
              column space the old image block occupied. */}
          <FadeIn
            direction="right"
            delay={100}
            className="mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center"
          >
            <KemproLogo variant="standalone" size={220} className="h-2/3 w-2/3" />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
