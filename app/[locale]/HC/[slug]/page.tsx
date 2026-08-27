import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getCustomerStories, getCustomerStory } from "@/lib/data/customer-stories";
import { FadeIn } from "@/components/ui/fade-in";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { XIcon, YouTubeIcon } from "@/components/ui/icons";

const SITE_URL = "https://www.kempro.ai";

export async function generateStaticParams() {
  const params = await Promise.all(
    routing.locales.map(async (locale) => {
      const stories = await getCustomerStories(locale);
      return stories.map((story) => ({ locale, slug: story.slug }));
    }),
  );
  return params.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const story = await getCustomerStory(locale as Locale, slug);

  if (!story) {
    return {};
  }

  return {
    title: story.title,
    description: story.summary,
    openGraph: { title: story.title, description: story.summary },
  };
}

export default async function CustomerStoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hc");
  const tNav = await getTranslations("Nav");
  const story = await getCustomerStory(locale as Locale, slug);

  if (!story) {
    notFound();
  }

  const formattedDate = story.date
    ? new Date(story.date).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const bodyParagraphs = story.body.split("\n").filter((paragraph) => paragraph.trim().length > 0);

  const shareUrl = `${SITE_URL}/${locale}/HC/${story.slug}`;
  const shareHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(story.title)}`;

  return (
    <article className="bg-white">
      {/* No breadcrumb inside the hero anymore — it moved to its own block
          right below, matching the blog article pattern (see
          app/[locale]/blog/[slug]/page.tsx): breadcrumb + divider live in
          the plain white area after the hero, not overlaid on the
          gradient. */}
      <section
        className="-mt-[81px] pt-[81px] lg:-mt-[207px] lg:pt-[207px]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--color-hc-blue) 0%, var(--color-hc-blue-dark) 100%)",
        }}
      >
        <FadeIn className="mx-auto flex max-w-[750px] flex-col items-center gap-6 px-6 pb-10 pt-8 text-center sm:px-10">
          {story.category.label ? (
            <p className="text-[12px] font-semibold uppercase tracking-[0.02em] text-white/80">
              {story.category.label}
            </p>
          ) : null}
          {formattedDate ? <p className="text-sm text-white/70">{formattedDate}</p> : null}
          <h1 className="text-[32px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[40px]">
            {story.title}
          </h1>
        </FadeIn>
      </section>

      {/* Breadcrumb + divider + share icons, same structure as the blog
          article header (breadcrumb left-aligned, divider and share icons
          centered below it) — unified so every detail-page type handles
          this identically. hc-blue instead of primary-600 for the
          divider/breadcrumb hover, keeping this page's own established
          blue token separate from the site's indigo primary scale (see
          the eyebrow-color note in components/sections/hero.tsx); the
          share icon circles stay neutral gray, same as blog/servicios. */}
      <FadeIn className="mx-auto flex max-w-[750px] flex-col items-center gap-6 px-6 pb-10 pt-8 text-center sm:px-10">
        <div className="h-1 w-16 rounded-full" style={{ backgroundColor: "var(--color-hc-blue)" }} aria-hidden="true" />
        <div className="w-full text-left">
          <Breadcrumbs
            items={[
              { label: tNav("home"), href: "/" },
              { label: t("breadcrumbCurrent"), href: "/HC" },
            ]}
            linkClassName="text-neutral-700 hover:text-hc-blue hover:underline"
          />
        </div>
        <div className="flex items-center gap-3">
          <a
            href={shareHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300"
          >
            <XIcon className="h-4 w-4" />
          </a>
          {/* TODO: agregar URL real del canal de YouTube cuando exista. */}
          <span
            aria-label="YouTube"
            className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full bg-neutral-200 text-neutral-600"
          >
            <YouTubeIcon className="h-4 w-4" />
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={100} className="px-6 pb-20 pt-4 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[740px] flex-col gap-8">
          {story.coverImageUrl ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <Image src={story.coverImageUrl} alt={story.title} fill className="object-cover" />
            </div>
          ) : null}

          <p className="text-[18px] leading-relaxed text-neutral-700">{story.summary}</p>

          {bodyParagraphs.map((paragraph, index) => (
            <p key={index} className="text-[16px] leading-[1.6] text-neutral-700">
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>

      <CtaBand
        title={t("ctaBand.title")}
        subtitle={t("ctaBand.subtitle")}
        cta={t("ctaBand.cta")}
        background="blue-grid"
      />
    </article>
  );
}
