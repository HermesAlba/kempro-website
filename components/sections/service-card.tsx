import { useTranslations } from "next-intl";
import type { Service } from "@/lib/data/services";
import { Link } from "@/i18n/navigation";
import { ServiceIconGlyph, CheckIcon } from "@/components/ui/icons";

export function ServiceCard({
  service,
  detailed = false,
  dark = false,
}: {
  service: Service;
  detailed?: boolean;
  /** Black card instead of white — used by the "Implementación y
   * automatización" group on /servicios, per request. Independent of
   * `detailed` (which only controls whether the benefits list renders). */
  dark?: boolean;
}) {
  const t = useTranslations("Services");

  return (
    <Link
      href={{ pathname: "/servicios/[slug]", params: { slug: service.slug } }}
      // Border/shadow still tint primary on hover for a "clickable" cue —
      // the "Conocer más" line that used to sit at the bottom was removed
      // per request (only shown on /servicios, the only page this
      // component is used on).
      className={`group hover-lift flex h-full flex-col rounded-2xl border p-8 shadow-sm transition-[box-shadow,border-color] ${
        dark
          ? "border-white/10 bg-dark-900 hover:border-primary-400/40 hover:shadow-lg hover:shadow-primary-900/40"
          : "border-neutral-200 bg-white hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100"
      }`}
    >
      {/* No background tile — the icon floats directly on the card's own
          background instead of sitting in a colored box, per the "sin
          fondo, suspendidos sobre blanco" direction. Sized up from the old
          h-6 w-6 since there's no tile giving it visual weight anymore.
          primary-400 (not primary-600) on dark — reads with more contrast
          against bg-dark-900 than the darker brand tone would. */}
      <ServiceIconGlyph
        icon={service.icon}
        className={`hover-lift-icon h-9 w-9 ${dark ? "text-primary-400" : "text-primary-600"}`}
      />
      <h3 className={`mt-6 text-xl font-semibold ${dark ? "text-white" : "text-neutral-900"}`}>
        {service.title}
      </h3>
      <p className={`mt-3 ${dark ? "text-neutral-300" : "text-neutral-600"}`}>{service.description}</p>

      {detailed ? (
        <div className={`mt-6 border-t pt-6 ${dark ? "border-white/10" : "border-neutral-100"}`}>
          <p className={`text-sm font-semibold ${dark ? "text-white" : "text-neutral-900"}`}>
            {t("benefitsTitle")}
          </p>
          <ul className="mt-4 space-y-3">
            {service.benefits.map((benefit) => (
              <li
                key={benefit}
                className={`flex items-start gap-2.5 text-sm ${dark ? "text-neutral-300" : "text-neutral-600"}`}
              >
                <CheckIcon
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 ${dark ? "text-accent-400" : "text-accent-500"}`}
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Link>
  );
}
