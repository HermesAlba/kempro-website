import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getCaseStudies } from "@/lib/data/case-studies";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHero } from "@/components/sections/page-hero";
import { CaseCard } from "@/components/sections/case-card";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.caseStudies" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CaseStudies");
  const caseStudies = getCaseStudies(locale as Locale);

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((caseStudy, index) => (
              <FadeIn
                key={caseStudy.slug}
                delay={index * 100}
                direction={index % 2 === 0 ? "up" : "left"}
              >
                <CaseCard caseStudy={caseStudy} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={t("ctaBand.title")}
        subtitle={t("ctaBand.subtitle")}
        cta={t("ctaBand.cta")}
      />
    </>
  );
}
