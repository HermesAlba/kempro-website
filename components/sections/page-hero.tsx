import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  gradient = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  // Opt-in corner gradient (colored top-left corner fading to white toward
  // the bottom-right) instead of the flat bg-primary-50/50 tint — same
  // treatment used on the case-study detail hero (see the radial-gradient
  // div in app/[locale]/casos-de-exito/[slug]/page.tsx). Off by default so
  // any other page adopting PageHero keeps the plain flat background
  // unless it explicitly asks for this one.
  gradient?: boolean;
}) {
  return (
    // Bleeds up behind the floating nav (see HEADER_OFFSET in
    // components/layout/header.tsx): -mt cancels against the extra pt
    // (original py-16/sm:py-24 plus the offset), so the heading's position
    // is unchanged while the background reaches the very top of the screen.
    <section
      className={`relative -mt-[176px] overflow-hidden border-b border-neutral-200 ${gradient ? "bg-white" : "bg-primary-50/50"} pb-16 pt-[145px] sm:pb-24 sm:pt-[177px] lg:-mt-[207px] lg:pt-[303px]`}
    >
      {gradient && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            // Small white-dot grid layered on top of the blue gradient so
            // that zone doesn't read as one flat/compact patch of color —
            // fades out along with the gradient underneath it since it's
            // painted in the same element. Shorter vertically than before
            // (600px vs. the old 1100px) so it stays concentrated near the
            // top-left corner and has faded out by the bottom of the
            // section, instead of staying strong all the way down.
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1.5px), radial-gradient(ellipse 1400px 600px at top left, #B1C4FF 0%, #CFDCFF 45%, transparent 85%)",
            backgroundSize: "14px 14px, 100% 100%",
          }}
        />
      )}
      <Container className="relative z-10">
        <FadeIn>
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </FadeIn>
      </Container>
    </section>
  );
}
