import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getServices } from "@/lib/data/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/sections/service-card";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.services" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");
  const services = getServices(locale as Locale);
  const process = t.raw("process") as { title: string; description: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <FadeIn
                key={service.slug}
                delay={index * 100}
                direction={index % 2 === 0 ? "up" : "left"}
              >
                <ServiceCard service={service} detailed />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            title={t("processTitle")}
            subtitle={t("processSubtitle")}
          />
          <ProcessSteps steps={process} />
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
