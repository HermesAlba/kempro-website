import { useTranslations } from "next-intl";
import type { Service } from "@/lib/data/services";
import { Link } from "@/i18n/navigation";
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
    <Link
      href={{ pathname: "/servicios/[slug]", params: { slug: service.slug } }}
      // Border/shadow still tint primary on hover for a "clickable" cue —
      // the "Conocer más" line that used to sit at the bottom was removed
      // per request (only shown on /servicios, the only page this
      // component is used on).
      className="group hover-lift flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-[box-shadow,border-color] hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100"
    >
      {/* No background tile — the icon floats directly on the card's
          white background instead of sitting in a colored box, per the
          "sin fondo, suspendidos sobre blanco" direction. Sized up from
          the old h-6 w-6 since there's no tile giving it visual weight
          anymore. */}
      <ServiceIconGlyph
        icon={service.icon}
        className="hover-lift-icon h-9 w-9 text-primary-600"
      />
      <h3 className="mt-6 text-xl font-semibold text-neutral-900">
        {service.title}
      </h3>
      <p className="mt-3 text-neutral-600">{service.description}</p>

      {detailed ? (
        <div className="mt-6 border-t border-neutral-100 pt-6">
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
    </Link>
  );
}
