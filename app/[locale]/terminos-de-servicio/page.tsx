import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { MailIcon } from "@/components/ui/icons";

type TermsSection = {
  number: number;
  title: string;
  shortDescription: string;
  layout: "plain" | "contactHighlight";
  paragraphs?: string[];
  question?: string;
  email?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.termsOfService" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

function SectionContent({ section }: { section: TermsSection }) {
  switch (section.layout) {
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

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("TermsOfService");
  const sections = t.raw("sections") as TermsSection[];

  return (
    <>
      {/* Bleeds up behind the floating nav (see HEADER_OFFSET in
          components/layout/header.tsx) so this page's own hero color shows
          through the nav's side margins instead of the generic header
          strip; the matching top padding keeps the visible content's
          position unchanged. Same corner-gradient + dot texture as
          PageHero's `gradient` prop (see components/sections/page-hero.tsx)
          instead of the old flat from-primary-50 fill, so this page's hero
          matches the indigo treatment used on servicios/home/sobre
          nosotros. */}
      <section className="relative -mt-[54px] overflow-hidden bg-white pb-16 pt-[118px] sm:pb-24 sm:pt-[150px] lg:-mt-[134px] lg:pt-[230px]">
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
            <span className="inline-flex items-center rounded-full bg-[#E5EDFF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-hc-blue-dark">
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
