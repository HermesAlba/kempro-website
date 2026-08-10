import { useTranslations, useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getServices } from "@/lib/data/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ServiceCard } from "@/components/sections/service-card";

export function ServicesOverview() {
  const t = useTranslations("Home.services");
  const locale = useLocale() as Locale;
  const services = getServices(locale);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn
              key={service.slug}
              delay={index * 100}
              direction={index % 2 === 0 ? "up" : "left"}
            >
              <ServiceCard service={service} />
            </FadeIn>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/servicios" variant="secondary">
            {t("cta")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
