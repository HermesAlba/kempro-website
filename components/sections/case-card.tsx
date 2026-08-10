import { useTranslations } from "next-intl";
import type { CaseStudy } from "@/lib/data/case-studies";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const t = useTranslations("CaseStudies");

  return (
    <article className="hover-lift flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600">
          {caseStudy.industry}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-neutral-900">
        {caseStudy.client}
      </h3>

      <dl className="mt-6 space-y-5 text-sm">
        <div>
          <dt className="font-semibold text-neutral-900">
            {t("problemLabel")}
          </dt>
          <dd className="mt-1 text-neutral-600">{caseStudy.problem}</dd>
        </div>
        <div>
          <dt className="font-semibold text-neutral-900">
            {t("solutionLabel")}
          </dt>
          <dd className="mt-1 text-neutral-600">{caseStudy.solution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-neutral-900">
            {t("resultLabel")}
          </dt>
          <dd className="mt-1 text-neutral-600">{caseStudy.result}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-6 border-t border-neutral-100 pt-6">
        {caseStudy.metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-2xl font-bold text-accent-600">
              <AnimatedCounter value={metric.value} />
            </p>
            <p className="text-xs text-neutral-500">{metric.label}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
