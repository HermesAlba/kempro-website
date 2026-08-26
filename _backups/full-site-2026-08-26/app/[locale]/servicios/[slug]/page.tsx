import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getServices, getService } from "@/lib/data/services";
import { FadeIn } from "@/components/ui/fade-in";
import { BlockRenderer } from "@/components/blog/block-renderer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckIcon, XIcon, YouTubeIcon } from "@/components/ui/icons";

const SITE_URL = "https://www.kempro.ai";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getServices(locale).map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(locale as Locale, slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: { title: service.title, description: service.description },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("Nav");
  const tServices = await getTranslations("Services");
  const service = getService(locale as Locale, slug);

  if (!service) {
    notFound();
  }

  const shareUrl = `${SITE_URL}/${locale}/servicios/${service.slug}`;
  const shareHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(service.title)}`;

  return (
    <>
      {/* Hero — bleeds up behind the floating nav (see HEADER_OFFSET in
          components/layout/header.tsx), same pattern as the other page
          heroes on the site. No breadcrumb here anymore — it moved to its
          own block right below, matching the blog article pattern (see
          app/[locale]/blog/[slug]/page.tsx): breadcrumb + divider live in
          the plain white area after the hero, not inside/overlaid on it.
          Corner gradient (colored top-left fading to white toward the
          bottom-right) instead of a flat tint — same treatment as the
          /servicios listing hero (see gradient prop on PageHero) and the
          case-study detail hero. */}
      <section className="relative -mt-[54px] overflow-hidden bg-white pb-16 pt-[118px] lg:-mt-[70px] lg:pt-[150px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            // Small white-dot grid layered on top of the blue gradient so
            // that zone doesn't read as one flat/compact patch of color —
            // fades out along with the gradient underneath it since it's
            // painted in the same element. Shorter vertically than before
            // (600px vs. the old 1100px) so it stays concentrated near the
            // top-left corner and has faded out by the bottom of the
            // section, instead of staying strong all the way down —
            // matches the reference gradient's shape (intense at the top
            // corner, tapering off going down and toward both bottom
            // corners).
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1.5px), radial-gradient(ellipse 1400px 600px at top left, #93C5FD 0%, #BFDBFE 45%, transparent 85%)",
            backgroundSize: "14px 14px, 100% 100%",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-[95px]">
          <FadeIn direction="up" className="max-w-2xl">
            <h1 className="text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-neutral-900 sm:text-[40px]">
              {service.title}
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.6] text-neutral-600">
              {service.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Breadcrumb + divider + share icons, same structure as the blog
          article header (breadcrumb left-aligned, indigo divider and
          share icons centered below it) — unified so both detail-page
          types handle this identically. No border-t below anymore (see
          the content section's className) — that full-width rule was left
          over from before this block existed and just added a second,
          redundant line under the divider. */}
      <FadeIn className="px-6 pb-10 pt-8 sm:px-10 lg:px-[95px]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6">
          <div className="h-1 w-16 rounded-full bg-primary-600" aria-hidden="true" />
          <div className="w-full text-left">
            <Breadcrumbs
              items={[
                { label: tNav("home"), href: "/" },
                { label: tNav("services"), href: "/servicios" },
                { label: service.title },
              ]}
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
        </div>
      </FadeIn>

      {/* Content (Resumen / Cómo trabajamos / Para quién es) and Beneficios
          side by side instead of stacked full-width sections — 2/3 for the
          text content, 1/3 for the benefits sidebar, matching how detail
          pages with a distinct "included" list are usually laid out
          elsewhere. lg:items-start keeps the shorter column (whichever one
          that is) from stretching to match the taller one's height; the
          benefits card is lg:sticky so it stays in view while the longer
          text column scrolls past it. Stacks to a single column below lg,
          content first. */}
      <section className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-[95px]">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-3 lg:items-start lg:gap-12">
          <FadeIn className="flex flex-col gap-8 lg:col-span-2">
            {service.content.map((block, index) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </FadeIn>

          {/* Beneficios — pulled out of the generic content blocks (it used
              to be a plain "Qué incluye" text list, same data duplicated)
              into its own highlighted card. Uses the site's own brand
              gradient (#4A90D9 → #2E6DA8, 135deg — same one already used
              a few sections up on this very page's "Cómo trabajamos" band,
              plus Sobre nosotros/SN/CtaBand) instead of the bright indigo
              primary-600, which read as too loud/off-brand here. Checks
              use the lighter accent-300 for contrast on the dark fill. */}
          <FadeIn direction="right" delay={100} className="lg:sticky lg:top-24">
            <div
              className="rounded-2xl p-6 text-white shadow-xl shadow-[#2E6DA8]/20"
              style={{ backgroundImage: "linear-gradient(135deg, #4A90D9 0%, #2E6DA8 100%)" }}
            >
              <h2 className="text-lg font-bold text-white">
                {tServices("benefitsTitle")}
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-300" />
                    <span className="text-[15px] leading-relaxed text-white/90">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBand
        title={tServices("ctaBand.title")}
        subtitle={tServices("ctaBand.subtitle")}
        cta={tServices("ctaBand.cta")}
        background="blue-grid"
      />
    </>
  );
}
