import { useTranslations } from "next-intl";
import type { Service } from "@/lib/data/services";
import { ServiceIconGlyph, CheckIcon } from "@/components/ui/icons";

export function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  const t = useTranslations("Services");

  return (
    <div className="hover-lift flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
      <div className="hover-lift-icon flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
        <ServiceIconGlyph icon={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-neutral-900">
        {service.title}
      </h3>
      <p className="mt-3 text-neutral-600">{service.description}</p>

      {detailed ? (
        <div className="mt-auto border-t border-neutral-100 pt-6">
          <p className="text-sm font-semibold text-neutral-900">
            {t("benefitsTitle")}
          </p>
          <ul className="mt-4 space-y-3">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-neutral-600">
                <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
