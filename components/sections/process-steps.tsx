import { FadeIn } from "@/components/ui/fade-in";

type Step = { title: string; description: string };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <FadeIn key={step.title} delay={index * 100}>
          <li className="relative rounded-2xl border border-neutral-200 bg-white p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <h3 className="mt-4 text-base font-semibold text-neutral-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
          </li>
        </FadeIn>
      ))}
    </ol>
  );
}
