import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { MailIcon, MapPinIcon, WhatsAppIcon } from "@/components/ui/icons";

const MAPS_URL = "https://www.google.com/maps?q=6.1979,-75.5727";
const WHATSAPP_DIGITS = "573104623473";

type LegalCard = { title: string; description: string };
type Right = { label: string; description: string };

type PrivacySection = {
  id?: string;
  number: number;
  title: string;
  shortDescription: string;
  layout: "contactCard" | "legalFramework" | "dataList" | "numbered" | "plain" | "rightsGrid" | "contactHighlight";
  paragraphs?: string[];
  list?: string[];
  cards?: LegalCard[];
  items?: string[];
  closingNote?: string;
  rights?: Right[];
  companyName?: string;
  address?: string;
  email?: string;
  phone?: string;
  question?: string;
};

function linkifyEmail(text: string, email?: string) {
  if (!email || !text.includes(email)) return text;

  const [before, after] = text.split(email);
  return (
    <>
      {before}
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-1 align-middle text-primary-600 hover:text-primary-700 hover:underline"
      >
        <MailIcon className="h-3.5 w-3.5 flex-shrink-0" />
        {email}
      </a>
      {after}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.privacyNotice" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

function SectionContent({ section }: { section: PrivacySection }) {
  switch (section.layout) {
    case "contactCard":
      return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h3 className="font-bold text-neutral-900">{section.companyName}</h3>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-3 leading-relaxed text-neutral-700">
              {paragraph}
            </p>
          ))}
          <ul className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-sm text-neutral-600">
            {section.email ? (
              <li>
                <a
                  href={`mailto:${section.email}`}
                  className="flex items-center gap-2 hover:text-primary-600 hover:underline"
                >
                  <MailIcon className="h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span>{section.email}</span>
                </a>
              </li>
            ) : null}
            {section.phone ? (
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_DIGITS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary-600 hover:underline"
                >
                  <WhatsAppIcon className="h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span>{section.phone}</span>
                </a>
              </li>
            ) : null}
            {section.address ? (
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-primary-600 hover:underline"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span>{section.address}</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      );

    case "legalFramework":
      return (
        <>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-neutral-700">
              {paragraph}
            </p>
          ))}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {section.cards?.map((card) => (
              <div key={card.title} className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="text-primary-600">{card.title}</p>
                <p className="mt-1 text-sm text-neutral-600">{card.description}</p>
              </div>
            ))}
          </div>
        </>
      );

    case "dataList":
      return (
        <>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-neutral-700">
              {paragraph}
            </p>
          ))}
          <ul className="mt-4 space-y-3">
            {section.list?.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4"
              >
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary-600" />
                <span className="text-sm text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </>
      );

    case "numbered":
      return (
        <>
          <ul className="space-y-3">
            {section.items?.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4"
              >
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary-600" />
                <span className="text-sm text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
          {section.closingNote ? (
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">{section.closingNote}</p>
          ) : null}
        </>
      );

    case "rightsGrid":
      return (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.rights?.map((right) => (
              <div key={right.label} className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="font-bold text-neutral-900">{right.label}</p>
                <p className="mt-1 text-sm text-neutral-600">{right.description}</p>
              </div>
            ))}
          </div>
          {section.closingNote ? (
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {linkifyEmail(section.closingNote, section.email)}
            </p>
          ) : null}
        </>
      );

    case "contactHighlight":
      return (
        <div className="rounded-2xl bg-primary-50 p-6">
          <h3 className="text-lg font-bold text-neutral-900">{section.question}</h3>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-2 leading-relaxed text-neutral-700">
              {paragraph}
            </p>
          ))}
          {section.email ? (
            <a
              href={`mailto:${section.email}`}
              className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <MailIcon className="h-4 w-4 flex-shrink-0" />
              {section.email}
            </a>
          ) : null}
        </div>
      );

    case "plain":
    default:
      return (
        <>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-neutral-700">
              {paragraph}
            </p>
          ))}
        </>
      );
  }
}

export default async function PrivacyNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PrivacyNotice");
  const sections = t.raw("sections") as PrivacySection[];

  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 sm:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600">
              {t("heroBadge")}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-neutral-600">{t("lastUpdated")}</p>
            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary-600" aria-hidden="true" />
          </FadeIn>
        </Container>
      </section>

      <article>
        {sections.map((section, index) => (
          <div
            key={section.title}
            id={section.id}
            className={`scroll-mt-24 py-12 sm:py-14 ${index % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}
          >
            <Container>
              <FadeIn className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-10">
                <div>
                  <p className="font-bold text-primary-600">
                    {section.number}. {section.title}
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">{section.shortDescription}</p>
                </div>
                <div className="space-y-4">
                  <SectionContent section={section} />
                </div>
              </FadeIn>
            </Container>
          </div>
        ))}
      </article>
    </>
  );
}
