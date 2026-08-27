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

// Kempro's own take on Knife River's "WHAT WE DO" section: same two-column
// layout (title/tagline/body/outlined CTA on the left, 2x2 grid of dark
// cards on the right), but on Kempro's indigo brand background instead of
// KR's orange, and featuring real Kempro service lines instead of
// construction materials.
export function WhatWeDo() {
  const t = useTranslations("Home.whatWeDo");
  const locale = useLocale() as Locale;
  const services = getServices(locale).filter((s) => featuredIds.includes(s.id));

  return (
    <section className="bg-primary-600 py-20 sm:py-28">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <h2 className="text-[32px] font-extrabold uppercase leading-tight text-white sm:text-[40px]">
              {t("title")}
            </h2>
            <p className="mt-2 text-[15px] font-bold uppercase tracking-wide text-primary-200 sm:text-[16px]">
              {t("tagline")}
            </p>
            <p className="mt-5 text-[16px] leading-[1.6] text-primary-100">
              {t("subtitle")}
            </p>
            <div className="mt-8">
              <Link
                href="/servicios"
                className="inline-flex h-[38px] items-center justify-center rounded-[6px] border border-white/70 px-6 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-primary-700"
              >
                {t("cta")}
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={100} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.id}
                href={{ pathname: "/servicios/[slug]", params: { slug: service.slug } }}
                className="hover-lift flex flex-col rounded-lg bg-neutral-900 p-6 transition-colors hover:bg-neutral-800"
              >
                <ServiceIconGlyph icon={service.icon} className="h-8 w-8 text-primary-300" />
                <h3 className="mt-4 text-[15px] font-bold uppercase tracking-wide text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-neutral-300">
                  {service.description}
                </p>
              </Link>
            ))}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
