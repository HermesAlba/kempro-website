import { FadeIn } from "@/components/ui/fade-in";
import { SearchIcon, RulerIcon, IntegrationIcon, ScaleUpIcon } from "@/components/ui/icons";

type Step = { title: string; description: string };

// Steps always render in this fixed order (Services.process in
// messages/*.json is authored as Diagnóstico → Diseño → Implementación →
// Escalamiento, see lib copy), so mapping icons by index — rather than
// adding an icon field to the translated data — keeps the icon choice out
// of the content layer entirely. Same outline style/stroke width as the
// rest of components/ui/icons.tsx for visual consistency.
const PHASE_ICONS = [SearchIcon, RulerIcon, IntegrationIcon, ScaleUpIcon];

export function ProcessSteps({
  steps,
  phaseLabel,
}: {
  steps: Step[];
  /** e.g. "Fase" / "Phase" — combined with the 1-based index to render
   * "Fase 01", "Fase 02", etc. per card. */
  phaseLabel: string;
}) {
  // All 4 phases render in a single grid — 1 column on mobile, 2 on
  // tablet, and all 4 side by side at lg — so the whole process reads in
  // one screen instead of requiring a horizontal scroll to reach the 4th
  // card (the previous layout intentionally showed only 3 per "page").
  // Descriptions are short one-liners now (see messages/*.json Services.process),
  // which is what makes 4 equal-width columns fit comfortably at lg.
  return (
    <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => {
        const PhaseIcon = PHASE_ICONS[index];
        return (
          <FadeIn key={step.title} delay={index * 100}>
            {/* primary-500 (#7682F8) — the base indigo of the blog's
                "Automatización" category pattern (see
                AutomatizacionPetalsFallback in
                components/blog/category-fallback-backgrounds.tsx), a lighter
                tone than primary-700. Deliberately NOT primary-600, since
                that's the logo's own mark color (KEMPRO_PRIMARY in
                lib/kempro-symbol.ts) — using it here would compete with the
                logo instead of just reusing an established brand tone. */}
            <li className="relative h-full overflow-hidden rounded-2xl bg-primary-500 p-6">
              {/* Decorative watermark icon, one per phase — top-right
                  corner, clipped by the card's own overflow-hidden so it
                  reads as a background texture rather than a competing
                  visual element. primary-900 (a deeper/higher indigo than
                  the primary-500 card fill) gives it visible contrast
                  instead of the near-invisible white/10 used before.
                  pointer-events-none keeps it out of the way of any future
                  interactive content in the card. */}
              {PhaseIcon ? (
                <PhaseIcon className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 text-primary-900/40" />
              ) : null}
              <div className="relative">
                <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-100">
                  {phaseLabel} 0{index + 1}
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/80">
                  {step.description}
                </p>
              </div>
            </li>
          </FadeIn>
        );
      })}
    </ol>
  );
}
