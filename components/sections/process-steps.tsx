import { FadeIn } from "@/components/ui/fade-in";

type Step = { title: string; description: string };

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
      {steps.map((step, index) => (
        <FadeIn key={step.title} delay={index * 100}>
          <li className="h-full rounded-2xl border border-neutral-200 bg-white p-6">
            <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
              {phaseLabel} 0{index + 1}
            </span>
            <h3 className="mt-3 text-xl font-bold text-neutral-900">
              {step.title}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
              {step.description}
            </p>
          </li>
        </FadeIn>
      ))}
    </ol>
  );
}
