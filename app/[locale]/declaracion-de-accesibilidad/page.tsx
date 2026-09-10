import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { buildLocaleUrls, canonicalAlternates } from "@/lib/seo/canonical";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { MailIcon } from "@/components/ui/icons";

type AccessibilitySection = {
  number: number;
  title: string;
  shortDescription: string;
  layout: "plain" | "numbered" | "contactHighlight";
  paragraphs?: string[];
  items?: string[];
  question?: string;
  email?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.accessibilityStatement" });
  const urls = buildLocaleUrls((loc) =>
    getPathname({ locale: loc, href: "/declaracion-de-accesibilidad" }),
  );

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
    alternates: canonicalAlternates(locale as Locale, urls),
  };
}

// Same three layouts used by the PrivacyNotice / TermsOfService pages
// (see app/[locale]/aviso-de-privacidad/page.tsx) — kept local rather than
// shared since that page doesn't export its SectionContent component, and
// this page only needs a subset of the layout variants it supports.
function SectionContent({ section }: { section: AccessibilitySection }) {
  switch (section.layout) {
    case "numbered":
      return (
        <ul className="space-y-3">
          {section.items?.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4"
            >
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#5D5FEF]" />
              <span className="text-sm text-neutral-700">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "contactHighlight":
      return (
        <div className="rounded-2xl bg-[#F1F5FF] p-6">
          <h3 className="text-lg font-bold text-neutral-900">{section.question}</h3>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-2 leading-relaxed text-neutral-700">
              {paragraph}
            </p>
          ))}
          {section.email ? (
            <a
              href={`mailto:${section.email}`}
              className="mt-4 inline-flex items-center gap-2 text-hc-blue-dark hover:text-[#4949D6]"
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

export default async function AccessibilityStatementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AccessibilityStatement");
  const sections = t.raw("sections") as AccessibilitySection[];

  return (
    <>
      {/* Same hero treatment as aviso-de-privacidad / terminos-de-servicio
          — see that page for the bleed-under-nav + gradient rationale. */}
      <section className="relative -mt-[176px] overflow-hidden bg-white pb-16 pt-[145px] sm:pb-24 sm:pt-[177px] lg:-mt-[207px] lg:pt-[303px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1.5px), radial-gradient(ellipse 1400px 600px at top left, #B1C4FF 0%, #CFDCFF 45%, transparent 85%)",
            backgroundSize: "14px 14px, 100% 100%",
          }}
        />
        <Container className="relative z-10">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-[#E5EDFF] px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-hc-blue-dark">
              {t("heroBadge")}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-neutral-600">{t("lastUpdated")}</p>
            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#5D5FEF]" aria-hidden="true" />
          </FadeIn>
        </Container>
      </section>

      <article>
        {sections.map((section, index) => (
          <div
            key={section.title}
            className={`py-12 sm:py-14 ${index % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}
          >
            <Container>
              <FadeIn className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-10">
                <div>
                  <p className="font-bold text-hc-blue-dark">
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
