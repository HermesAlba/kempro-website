import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppMenu } from "@/components/contact/whatsapp-menu";
import { AddToContactsButton } from "@/components/contact/add-to-contacts-button";
import { CalBookingButton } from "@/components/contact/cal-booking-button";
import { InfoRow } from "@/components/contact/info-row";
import { MapPinIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";

const MAPS_URL = "https://www.google.com/maps?q=6.1979,-75.5727";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <div className="flex flex-col md:flex-row">
      {/* FormSide */}
      <div className="flex-1 bg-white px-6 py-16 sm:px-12 sm:py-20 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-xl">
          <p className="text-[11px] font-semibold uppercase text-primary-600">
            {t("overline")}
          </p>
          <h1 className="mt-2 text-[34px] font-bold leading-tight text-neutral-900">
            {t("title")}
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">
            {t("subtitle")}
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* AccentSide */}
      <div className="flex-1 bg-neutral-900 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 xl:px-20">
        <div className="mx-auto flex max-w-xl flex-col gap-6">
          <h2 className="text-[20px] font-bold text-white">{t("infoTitle")}</h2>

          <div className="flex flex-col gap-6">
            <InfoRow icon={MailIcon} label={t("infoLabels.email")}>
              <a href={`mailto:${t("email")}`} className="hover:text-primary-light">
                {t("email")}
              </a>
            </InfoRow>

            <InfoRow icon={WhatsAppIcon} label={t("infoLabels.whatsapp")}>
              <WhatsAppMenu />
            </InfoRow>

            <InfoRow icon={MapPinIcon} label={t("infoLabels.location")}>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-light"
              >
                {t("location")}
              </a>
            </InfoRow>
          </div>

          <div className="border-t border-white/10 pt-6">
            <AddToContactsButton />
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-[20px] font-bold text-white">{t("scheduleTitle")}</h3>
            <p className="mt-2 text-[13px] text-neutral-400">{t("scheduleDescription")}</p>
            <CalBookingButton className="mt-6 w-full">{t("scheduleCta")}</CalBookingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
