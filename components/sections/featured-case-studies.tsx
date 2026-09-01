import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getCaseStudies } from "@/lib/data/case-studies";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Link } from "@/i18n/navigation";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";
import { CaseCard } from "@/components/sections/case-card";

// Three different industries and three different automation capabilities
// (document governance/Copilot corporate assistant, WhatsApp sales bot,
// corporate travel-optimization methodology) — picked deliberately for
// variety across industries and metric types, not the first 3 entries in
// the data file. retail-atencion-al-cliente, salud-triage-pacientes
// ("Red de clínicas ambulatorias"), manufactura-control-calidad-vision
// ("Planta de manufactura industrial") and logistica-optimizacion-rutas
// ("Operador logístico nacional") were all placeholders, deleted from the
// data file entirely per request — swapped in real client stories instead
// of picking other placeholders each time.
const FEATURED_IDS = [
  "salud-gobernanza-documental-copilot",
  "retail-vinos-whatsapp-bot",
  "construccion-optimizacion-viajes-corporativos",
];

export function FeaturedCaseStudies() {
  const t = useTranslations("CaseStudies");
  const locale = useLocale() as Locale;
  const allCaseStudies = getCaseStudies(locale);
  const caseStudies = FEATURED_IDS.map(
    (id) => allCaseStudies.find((c) => c.id === id)!,
  );

  return (
    <section className="border-t border-neutral-200 bg-primary-200 py-20 sm:py-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        {/* Same lg-only fixed-width fix as all-case-studies-grid.tsx — see
            its comment for why the fixed-only version overflowed mobile. */}
        <div className="mt-14 grid grid-cols-1 justify-center gap-x-[30px] gap-y-8 sm:grid-cols-2 lg:grid-cols-[repeat(3,342px)]">
          {caseStudies.map((caseStudy, index) => (
            <FadeIn
              key={caseStudy.slug}
              delay={index * 100}
              direction={index % 2 === 0 ? "up" : "left"}
            >
              <CaseCard caseStudy={caseStudy} background="indigo" hideDateOnMobile />
            </FadeIn>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/casos-de-exito" className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}>
            {t("homeCta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
