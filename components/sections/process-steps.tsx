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
            {/* bg-primary-600 (#5D5FEF) — "el color indigo del sitio" per
                request: the same brand indigo as the logo's own mark
                (KEMPRO_PRIMARY in lib/kempro-symbol.ts) and the CTA-button
                hover fill, not the lighter primary-500 this card used
                before. The watermark icon below now uses primary-700 (one
                step darker) instead of primary-600, since both can no
                longer share that same tone once the card fill itself moved
                to primary-600 — primary-700 still reads as a subtle darker
                texture against the card without disappearing into it. */}
            <li className="relative h-full overflow-hidden rounded-2xl bg-primary-600 p-6">
              {/* Decorative watermark icon, one per phase — top-right
                  corner, clipped by the card's own overflow-hidden so it
                  reads as a background texture rather than a competing
                  visual element. pointer-events-none keeps it out of the
                  way of any future interactive content in the card. */}
              {PhaseIcon ? (
                <PhaseIcon className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 text-primary-700" />
              ) : null}
              <div className="relative">
                <span className="font-sans text-[13px] font-semibold uppercase tracking-wide text-primary-100">
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
