import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { JoiningHalves } from "@/components/ui/joining-halves";
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
    <section className="border-t border-neutral-200 bg-primary-50/50 py-10 sm:py-14">
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

          {/* Reduced version of the gradient block used on the Sobre
              nosotros / SN hero (same #5D5FEF→#4949D6 gradient, grid
              pattern, and white icon tile) — establishes the same visual
              identity without duplicating the full-size hero treatment. */}
          <FadeIn direction="right" delay={100} className="mx-auto aspect-square w-full max-w-[420px]">
            <JoiningHalves
              className="relative h-full w-full overflow-hidden rounded-xl"
              style={{ backgroundImage: "linear-gradient(135deg, #5D5FEF 0%, #4949D6 100%)" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)," +
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
                }}
              />
              <div className="absolute left-1/2 top-1/2 flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/20 bg-white sm:h-[120px] sm:w-[120px]">
                <KemproLogo
                  variant="standalone"
                  size={72}
                  className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px]"
                />
              </div>
            </JoiningHalves>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
