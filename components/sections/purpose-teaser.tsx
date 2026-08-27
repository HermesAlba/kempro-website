import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { Link } from "@/i18n/navigation";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

// Reuses About.hero copy verbatim (same statement/subtitle already shown on
// the real Sobre nosotros page, see app/[locale]/SN/page.tsx) rather than
// authoring new "who we are" copy for the homepage.
export function PurposeTeaser() {
  const tAbout = useTranslations("About.hero");
  const tHome = useTranslations("Home.purpose");

  return (
    // No border/background of its own — the coral gradient behind Hero +
    // ClientLogos (see app/[locale]/page.tsx) continues down through this
    // section and ends around the video below, per request. Container gets
    // relative z-10 so the text/video render above that gradient instead of
    // being covered by it.
    <section className="py-20 sm:py-28">
      <Container className="relative z-10">
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

          {/* Same origin-story video already used on the real "Sobre
              nosotros" page (see app/[locale]/SN/page.tsx's OriginImageFrame
              block) — reused here instead of a static icon/image, per
              request. autoPlay+muted+loop+playsInline for autoplay to work
              across browsers without a play button. */}
          <FadeIn
            direction="right"
            delay={100}
            className="mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-xl bg-neutral-100"
          >
            <video
              src="/videos/about/origin-ink-flow.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
