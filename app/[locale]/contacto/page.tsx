import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";
import { ContactForm } from "@/components/contact/contact-form";
import { AddToContactsButton } from "@/components/contact/add-to-contacts-button";
import { CalBookingButton } from "@/components/contact/cal-booking-button";
import { GrainOverlay } from "@/components/blog/category-fallback-backgrounds";
import { MapPinIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";

const MAPS_URL = "https://www.google.com/maps?q=6.1979,-75.5727";
const WHATSAPP_DIGITS = "573104623473";

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
    // Bleeds up behind the floating nav (see HEADER_OFFSET in
    // components/layout/header.tsx) via -mt/pt, which already pulls this
    // div's own box up to the very top of the viewport (y=0, behind the
    // sticky header) — so its height needs to be a full 100vh, not
    // 100vh-header, for its bottom edge to land exactly on the fold.
    // Getting this wrong by subtracting the header height leaves a gap
    // where Footer peeks through above the fold. Each column centers its
    // content vertically within that space.
    <div className="relative -mt-[54px] flex flex-col overflow-hidden bg-white pt-[54px] md:min-h-screen md:flex-row lg:-mt-[134px] lg:pt-[134px]">
      {/* IntroSide — pitch, lightweight schedule link, and the icon-only
          contact channels. */}
      <FadeIn direction="left" className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-16">
        <div>
          <p className="text-[11px] font-semibold uppercase text-primary-600">
            {t("overline")}
          </p>
          <h1 className="mt-2 text-[26px] font-bold leading-tight text-neutral-900 sm:text-[30px]">
            {t("title")}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-6">
          <p className="text-[13px] font-semibold text-neutral-900">{t("scheduleTitle")}</p>
          <p className="mt-1 text-[13px] text-neutral-600">{t("scheduleDescription")}</p>
          <CalBookingButton variant="dark" className="mt-3">
            {t("scheduleCta")}
          </CalBookingButton>
        </div>

        {/* Icon-only contact channels — no labels or values shown, just
            the three icons as direct links. */}
        <div className="mt-8 flex items-center gap-4 border-t border-neutral-200 pt-6">
          <a
            href={`mailto:${t("email")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("infoLabels.email")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-colors hover:bg-primary-200"
          >
            <MailIcon className="h-[18px] w-[18px]" />
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_DIGITS}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("infoLabels.whatsapp")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-colors hover:bg-primary-200"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("infoLabels.location")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-colors hover:bg-primary-200"
          >
            <MapPinIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </FadeIn>

      {/* FormSide — three stacked full-bleed bands spanning the column's
          entire height. The outer wrapper's own -mt/pt only bleeds ITS
          background to y=0; the pt then pushes every flex child (both
          columns) back down below the header, so without its own
          correction this column's box would still start at y=54/134px, not
          y=0. md:-mt/lg:-mt here cancels exactly that push (only once row
          layout kicks in, so mobile's stacked columns are untouched),
          pulling this column's own top back up to y=0 so its background
          reaches the very top of the screen behind the header — nothing
          textual sits there (the top band is decorative/aria-hidden) so
          there's no content to protect from being covered. The top/bottom
          bands are flex-1, so they simply absorb whatever space is left
          over above and below the middle band; the middle band is sized by
          its own content (heading + ContactForm + AddToContactsButton)
          rather than a fixed height, so it starts exactly at the "Envíanos
          un mensaje" heading and ends exactly after the "Enviar mensaje"
          button+disclaimer — no hardcoded pixel math needed. On mobile,
          where this column has no enforced viewport height, the top/bottom
          bands simply collapse toward 0 and the middle band ends up filling
          the column, which still satisfies the same alignment rule (nothing
          above the heading, nothing below the form). IntroSide keeps its
          own (unchanged) background. */}
      <FadeIn
        direction="right"
        delay={100}
        className="relative flex flex-1 flex-col overflow-hidden rounded-xl bg-[#5D5FEF] md:-mt-[54px] lg:-mt-[134px]"
      >
        <div aria-hidden="true" className="relative flex-1">
          <GrainOverlay />
        </div>

        <div className="relative px-6 py-10 sm:px-10 lg:px-14 xl:px-16">
          <GrainOverlay />

          <div className="relative mb-6">
            <h2 className="text-[18px] font-bold text-white">{t("formTitle")}</h2>
            <p className="mt-1 text-[13px] text-white/80">{t("formNote")}</p>
          </div>

          <div className="relative">
            <ContactForm dark showCompany={false} submitVariant="dark" />

            {/* Useful on mobile (opens the native contacts app directly);
                on desktop it's just a .vcf download few people import, so
                it's hidden there to keep the page focused. */}
            <AddToContactsButton className="mt-4 text-white hover:text-white/80 sm:hidden" />
          </div>
        </div>

        <div aria-hidden="true" className="relative flex-1">
          <GrainOverlay />
        </div>
      </FadeIn>
    </div>
  );
}
