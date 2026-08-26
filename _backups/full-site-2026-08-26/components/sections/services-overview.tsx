import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";
import { FadeIn } from "@/components/ui/fade-in";
import { ProcessSteps } from "@/components/sections/process-steps";

// Was previously a grid of 6 ServiceCard tiles under "Cómo ayudamos a tu
// empresa". Replaced with the same "Cómo trabajamos" content/layout
// already used on /servicios (see the equivalent block in
// app/[locale]/servicios/page.tsx: same title/subtitle keys, same
// ProcessSteps 4-phase carousel, same bg-primary-50/50 section
// background) so the home page previews the process instead of
// duplicating the services grid that's one click away anyway.
export function ServicesOverview() {
  const t = useTranslations("Services");
  const tHome = useTranslations("Home.services");
  const process = t.raw("process") as { title: string; description: string }[];

  return (
    // border-t: this section now sits directly after PurposeTeaser (see
    // app/[locale]/page.tsx) — both share the same bg-primary-50/50, so
    // without a border the two blocks would merge with no visible seam.
    <section className="border-t border-neutral-200 bg-primary-50/50 py-20 sm:py-28">
      <Container>
        <FadeIn direction="left">
          <h2 className="text-[24px] font-bold leading-tight text-neutral-900 sm:text-[28px]">
            {t("processTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-neutral-600">
            {t("processSubtitle")}
          </p>
        </FadeIn>
        <ProcessSteps steps={process} phaseLabel={t("processPhaseLabel")} />
        <div className="mt-12 text-center">
          <Link href="/servicios" className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}>
            {tHome("cta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
