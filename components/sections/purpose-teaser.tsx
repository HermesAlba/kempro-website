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
    // ClientLogos (see app/[locale]/page.tsx) shows through the first 2cm
    // of this section, then an irregular "torn paper" edge cuts it off into
    // solid coral for the rest of the section, per request (reference:
    // Knife River's own torn-edge treatment under its hero photo). Two
    // decorative layers, both z-index:auto and placed before Container (so
    // Container's own z-10 always paints on top): a thin jagged strip
    // starting at exactly 2cm from this section's top (clip-path zigzag,
    // ~6-22px of jaggedness), then a plain solid-fill div starting a little
    // further down that covers the remainder of the section, overlapping
    // the strip's lower half so there's no seam between them.
    <section className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 h-10"
        style={{
          top: "2cm",
          backgroundColor: "#9a3412",
          clipPath:
            "polygon(0% 45%, 4% 15%, 8% 50%, 12% 20%, 16% 48%, 20% 12%, 24% 52%, 28% 18%, 32% 46%, 36% 22%, 40% 50%, 44% 14%, 48% 48%, 52% 20%, 56% 44%, 60% 16%, 64% 52%, 68% 24%, 72% 46%, 76% 18%, 80% 50%, 84% 14%, 88% 48%, 92% 20%, 96% 46%, 100% 40%, 100% 100%, 0% 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ top: "calc(2cm + 20px)", backgroundColor: "#9a3412" }}
      />
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
