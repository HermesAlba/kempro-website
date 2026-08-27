import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getCaseStudies, getCaseStudy } from "@/lib/data/case-studies";
import { FadeIn } from "@/components/ui/fade-in";
import { BlockRenderer } from "@/components/blog/block-renderer";
import { AlignedBodyContent } from "@/components/sections/aligned-body-content";
import { IndustryHeaderBackground } from "@/components/sections/industry-header-background";
import { PhotoClearance } from "@/components/sections/photo-clearance";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { XIcon, YouTubeIcon } from "@/components/ui/icons";

const SITE_URL = "https://www.kempro.ai";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCaseStudies(locale).map((caseStudy) => ({ locale, slug: caseStudy.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudy(locale as Locale, slug);

  if (!caseStudy) {
    return {};
  }

  return {
    title: caseStudy.client,
    description: caseStudy.result,
    openGraph: { title: caseStudy.client, description: caseStudy.result },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("Nav");
  const caseStudy = getCaseStudy(locale as Locale, slug);

  if (!caseStudy) {
    notFound();
  }

  const formattedDate = new Date(caseStudy.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const shareUrl = `${SITE_URL}/${locale}/casos-de-exito/${caseStudy.slug}`;
  const shareHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(caseStudy.client)}`;

  return (
    <article className="relative overflow-hidden bg-slate-50 lg:min-h-screen">
      {/* Subtle indigo gradient in the top-left corner, fading into
          bg-slate-50 — same "quiet" background treatment as the listing
          page, just corner-anchored instead of full-bleed. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(ellipse 900px 700px at top left, #E5EDFF, transparent 60%)" }}
      />

      {/* Desktop-only photo: absolutely positioned against <article> itself
          (not the breadcrumb/text flow below), so its top edge lands
          exactly 1cm below the header regardless of how tall the
          breadcrumb or text column happen to be. <article> is the
          positioning ancestor and its own top edge already sits right at
          the header's bottom (normal document flow) — so top-[38px] (1cm
          at 96dpi) alone gives the 1cm gap; the lg header's own 134px (see
          HEADER_OFFSET in components/layout/header.tsx) must NOT be added
          again here. Height is 100vh minus that same 134px header, minus
          1cm top, minus 1cm bottom, so the bottom edge lands exactly 1cm
          before the first screen ends. w-[380px] = 10cm at 96dpi.
          right-[81px]/lg:right-[105px] = the base right-6/right-12 (24px/
          48px) plus 57px (1.5cm at 96dpi), shifting the photo left. */}
      <div
        data-hero-photo
        className="pointer-events-none absolute right-[81px] top-[38px] hidden h-[calc(100vh-134px-76px)] w-[380px] max-w-full overflow-hidden rounded-2xl lg:right-[105px] lg:block"
      >
        <FadeIn direction="right" className="relative h-full w-full">
          {caseStudy.image ? (
            <Image
              src={caseStudy.image}
              alt={caseStudy.client}
              fill
              sizes="380px"
              className="object-cover"
              priority
            />
          ) : (
            <IndustryHeaderBackground
              industryKey={caseStudy.industryKey}
              className="absolute inset-0 h-full w-full"
              cardSize={140}
              iconSize={64}
            />
          )}
        </FadeIn>
      </div>

      {/* lg:max-w reserves the fixed 380px photo's own width plus its
          right offset (105px, now that the photo shifted 1.5cm left) and a
          gap, so the text never runs underneath it. lg:pl-[57px] = 1.5cm at
          96dpi, shifting the text block right per request — gated to lg
          since that offset exists only to clear the desktop-only absolute
          photo (the mobile photo below is back in normal flow instead, so
          below lg this padding was just eating ~57px of an already-narrow
          content width for no reason). No top padding here — the H1's own
          mt-[38px] below is the sole gap between the breadcrumb and the
          title, so that gap is exactly 1cm. */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <FadeIn direction="up" className="pb-16 lg:max-w-[calc(100%-533px)] lg:pl-[57px]">
          {/* Mobile-only photo, back in normal flow, on top of the text. */}
          <FadeIn direction="up" className="relative mb-8 h-80 w-full overflow-hidden rounded-2xl lg:hidden">
            {caseStudy.image ? (
              <Image
                src={caseStudy.image}
                alt={caseStudy.client}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            ) : (
              <IndustryHeaderBackground
                industryKey={caseStudy.industryKey}
                className="absolute inset-0 h-full w-full"
                cardSize={120}
                iconSize={56}
              />
            )}
          </FadeIn>

          {/* Title/description sizes match the Historias de Clientes
              listing page's own Hero exactly (see
              app/[locale]/casos-de-exito/page.tsx): text-[32px]/
              sm:text-[40px]/lg:text-[48px] for the H1, text-[15px] for the
              paragraph. */}
          {/* mt-[38px] = 1cm at 96dpi, lowering the title's own start per request. */}
          <h1
            data-hero-title
            className="mt-[38px] text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-slate-900 sm:text-[40px] lg:text-[48px]"
          >
            {caseStudy.client}
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-500">
            {caseStudy.result}
          </p>

          {/* Category + date, same meta-row size as CaseCard on that same
              listing page (see components/sections/case-card.tsx). */}
          <p className="mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">
            <span style={{ color: "#7682F8" }}>{caseStudy.industry}</span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-500">{formattedDate}</span>
          </p>
        </FadeIn>
      </div>

      {/* Same divider + breadcrumb + share-icons block as the blog/servicios
          article headers (see app/[locale]/blog/[slug]/page.tsx and
          app/[locale]/servicios/[slug]/page.tsx) — replaces both the old
          top-of-page custom breadcrumb nav and the old HeroBodyDivider (a
          JS-measured absolute line). Wrapped in PhotoClearance so it starts
          right below the hero photo's bottom edge and its left edge (the
          breadcrumb's) lines up with "Resumen" below — see
          components/sections/photo-clearance.tsx. */}
      <PhotoClearance>
        <FadeIn className="flex flex-col items-center gap-6">
          <div className="h-1 w-16 rounded-full bg-primary-600" aria-hidden="true" />
          <div className="w-full text-left">
            <Breadcrumbs
              items={[
                { label: tNav("home"), href: "/" },
                { label: tNav("caseStudies"), href: "/casos-de-exito" },
              ]}
              linkClassName="text-neutral-700 hover:text-primary-600 hover:underline"
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
      </PhotoClearance>

      <FadeIn delay={100}>
        {/* Aligns the column's left/right edges with the title and photo
            above (see components/sections/aligned-body-content.tsx) —
            replaces the previous centered max-w-[740px] treatment. */}
        <AlignedBodyContent className="flex flex-col gap-8">
          {caseStudy.content.map((block, index) => (
            <div key={index}>
              <BlockRenderer block={block} />
            </div>
          ))}
        </AlignedBodyContent>
      </FadeIn>
    </article>
  );
}
