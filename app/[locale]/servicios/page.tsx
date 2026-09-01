import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/lib/data/services";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { Hero } from "@/components/sections/hero";
import { ServiceCard } from "@/components/sections/service-card";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CtaBand } from "@/components/sections/cta-band";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

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

  // Organized by the problem each group solves rather than as one flat
  // grid of 6 identical cards — see "Convenciones de contenido bilingüe"-
  // adjacent redesign brief: Strategy is the low-risk diagnostic entry
  // point, Implementation & automation is the core delivery work, and
  // Specialized solutions are ready-made products built on tools clients
  // already use.
  const strategyService = services.find((s) => s.id === "strategy")!;
  const implementationServices = services.filter(
    (s) => s.id === "automation" || s.id === "integration",
  );
  const specializedServices = services.filter(
    (s) => s.id === "intranet" || s.id === "web" || s.id === "process",
  );

  return (
    <>
      {/* Primer bloque — mismo Hero del home (misma estructura/tipografía/
          alto), pero en fondo blanco y sin foto (background="white": sin
          imagen, sin overlay, sin animación de onda, texto oscuro) y sin
          el carrusel de logos, per request. Mismo alto
          (min-h-[calc(100vh-HEADER_OFFSET)]) para que, junto con el menú,
          ocupe exactamente una pantalla. Texto propio de esta página
          (Services.eyebrow/title/subtitle, sin cambios). Reemplaza el
          PageHero anterior (banda plana con gradiente). */}
      <div className="flex flex-col md:min-h-[calc(100vh-81px)] lg:min-h-[calc(100vh-207px)]">
        <Hero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} background="white" titleOnlyMobile />
      </div>

      {/* "Cómo trabajamos" — moved here as the second block (right after the
          hero) so visitors see the process before the service groups.
          bg-dark-900 (was bg-primary-50/50), per request — reads as a
          distinct block against the Hero's white bg right above it. Title/
          subtitle switched to their light-on-dark colors to match; the
          phase cards below (ProcessSteps) already read fine on black,
          switched from primary-500 to primary-600 (the site's own indigo)
          per request. Uses <Container> (same px-6 lg:px-8 / max-w-7xl as
          every other section on this page and the rest of the site)
          instead of a bespoke px-6 sm:px-10 lg:px-[95px] wrapper — the
          previous one-off padding made this section's left/right margin
          drift from the Strategy band and CtaBand below, which both
          already go through Container. */}
      <section className="bg-dark-900 py-16 sm:py-20">
        <Container>
          <FadeIn direction="left">
            <h2 className="text-[24px] font-bold leading-tight text-white sm:text-[28px]">
              {t("processTitle")}
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-neutral-300">
              {t("processSubtitle")}
            </p>
          </FadeIn>
          <ProcessSteps steps={process} phaseLabel={t("processPhaseLabel")} />
        </Container>
      </section>

      {/* Group 1 — Strategy, featured as the low-risk first step. Full-width
          section (edge to edge, like CtaBand) instead of an inset rounded
          card — same height (py-20/py-24) and graph-paper grid, same
          centered text layout and dark button as the CtaBand "Hablemos
          sobre..." block below. bg-primary-600 (#5D5FEF) — "el color
          indigo de la marca" per request (was #B1C4FF, the light indigo at
          the top of the home Hero's gradient). Text switched to its
          light-on-indigo colors to match (was dark neutral-900/700, tuned
          for that lighter fill); the grid overlay lines switched from dark
          to white for the same reason. */}
      <section
        // Same min-height/flex treatment as CtaBand (see comment there) so
        // both bands match in height despite this one having an extra
        // eyebrow line and a longer subtitle.
        // Same 384px (6 grid cells) as CtaBand's "Hablemos sobre..." — see
        // comment there.
        className="relative flex min-h-[384px] items-center overflow-hidden bg-primary-600 py-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <Container className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.02em] text-primary-100">
              {t("groups.strategy.label")}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("groups.strategy.title")}
            </h2>
            <p className="mt-4 text-lg text-primary-50">
              {t("groups.strategy.description")}
            </p>
            <div className="mt-8">
              <Link
                href={{ pathname: "/servicios/[slug]", params: { slug: strategyService.slug } }}
                className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}
              >
                {t("groups.strategy.cta")}
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Group 2 — Implementation & automation. Section is bg-white (was
          bg-primary-50/50, per earlier request); the ServiceCard tiles
          themselves are now black (dark prop, per request) — their own
          border-white/10 + shadow separate them from the white section
          fill. Same Container swap as "Cómo trabajamos" above, for the
          same left/right-margin consistency reason. */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <FadeIn direction="left">
            <h2 className="text-[24px] font-bold leading-tight text-neutral-900 sm:text-[28px]">
              {t("groups.implementation.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-neutral-600">
              {t("groups.implementation.description")}
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {implementationServices.map((service, index) => (
              <FadeIn key={service.slug} delay={(index + 1) * 100} direction={index % 2 === 0 ? "left" : "right"}>
                <ServiceCard service={service} detailed dark />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Group 3 — Specialized, ready-to-implement products. bg-dark-900
          per request (was bg-neutral-50) — the white ServiceCard tiles
          below (unchanged, still the plain light variant) contrast against
          it just as well as they did against neutral-50, and this creates
          an alternating rhythm down the page: white section/black cards
          (Group 2) → black section/white cards (Group 3). Title/subtitle
          switched to their light-on-dark colors to match. Same Container
          swap as above. */}
      <section className="bg-dark-900 py-16 sm:py-20">
        <Container>
          <FadeIn direction="left">
            <h2 className="text-[24px] font-bold leading-tight text-white sm:text-[28px]">
              {t("groups.specialized.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-neutral-300">
              {t("groups.specialized.description")}
            </p>
          </FadeIn>

          {/* No `detailed` here — benefits no longer show on these cards,
              only on each solution's own detail page (see the Beneficios
              sidebar in app/[locale]/servicios/[slug]/page.tsx). Group 2
              (Implementation) below still passes `detailed`, unaffected. */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {specializedServices.map((service, index) => (
              <FadeIn key={service.slug} delay={(index + 1) * 100} direction="up">
                <ServiceCard service={service} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={t("ctaBand.title")}
        subtitle={t("ctaBand.subtitle")}
        cta={t("ctaBand.cta")}
        background="blue-grid"
      />
    </>
  );
}
