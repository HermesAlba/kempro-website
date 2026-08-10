import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getTeam } from "@/lib/data/team";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { PageHero } from "@/components/sections/page-hero";
import { TeamGrid } from "@/components/sections/team-grid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const team = getTeam(locale as Locale);
  const approachItems = t.raw("approach.items") as {
    title: string;
    description: string;
  }[];
  const originParagraphs = t.raw("origin.paragraphs") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-20 sm:py-28">
        <Container>
          <FadeIn>
            <SectionHeading
              eyebrow={t("origin.eyebrow")}
              title={t("origin.title")}
            />
          </FadeIn>
          <FadeIn delay={100} className="mx-auto mt-10 max-w-3xl space-y-5 text-neutral-600">
            {originParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote className="border-l-4 border-primary-600 bg-primary-50 py-4 pl-6 text-lg font-medium italic text-neutral-900">
              {t("origin.quote")}
            </blockquote>
            <p>{t("origin.closingParagraph")}</p>
            <h3 className="!mt-10 text-lg font-semibold text-neutral-900">
              {t("origin.symbolTitle")}
            </h3>
            <p>{t("origin.symbolParagraph")}</p>
          </FadeIn>
        </Container>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            <FadeIn direction="left" className="rounded-2xl border border-neutral-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-neutral-900">
                {t("mission.title")}
              </h2>
              <p className="mt-3 text-neutral-600">{t("mission.description")}</p>
            </FadeIn>
            <FadeIn
              delay={100}
              direction="right"
              className="rounded-2xl border border-neutral-200 bg-white p-8"
            >
              <h2 className="text-xl font-semibold text-neutral-900">
                {t("vision.title")}
              </h2>
              <p className="mt-3 text-neutral-600">{t("vision.description")}</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="border-t border-neutral-200 py-20 sm:py-28">
        <Container>
          <SectionHeading
            title={t("approach.title")}
            subtitle={t("approach.subtitle")}
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {approachItems.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 100}
                direction={index % 2 === 0 ? "up" : "left"}
              >
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-20 sm:py-28">
        <Container>
          <SectionHeading title={t("team.title")} subtitle={t("team.subtitle")} />
          <div className="mt-14">
            <TeamGrid team={team} />
          </div>
        </Container>
      </section>
    </>
  );
}
