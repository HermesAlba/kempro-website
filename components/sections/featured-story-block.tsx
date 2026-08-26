"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";

export function FeaturedBlock({
  badgeLabel,
  category,
  date,
  title,
  description,
  ctaLabel,
  imageSrc,
  imageAlt,
  imageGrayscale = true,
  href,
}: {
  badgeLabel?: string;
  /** Industry/category label — rendered next to date in the same meta-row
   * style as CaseCard (see components/sections/case-card.tsx). */
  category?: string;
  /** Already-formatted date string (e.g. via toLocaleDateString). */
  date?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  imageSrc: string;
  imageAlt: string;
  /** Defaults to true (matching the site's black-and-white photo
   * convention); pass false to keep the image in its original color. */
  imageGrayscale?: boolean;
  /** When set, the whole block links to the story's own page (e.g. the
   * real case study this content was pulled from) instead of rendering as
   * a plain, non-interactive card. */
  href?: { pathname: "/casos-de-exito/[slug]"; params: { slug: string } };
}) {
  const content = (
    <>
      {/* order-* flips the stacking order on mobile (image on top, text
          below) vs. desktop (text left, image right) without duplicating
          markup. */}
      <FadeIn
        direction="left"
        className="order-2 flex h-full flex-col justify-between p-10 md:order-1 lg:p-14"
      >
        <div>
          {/* Matches Blog's first block, first column SectionBadge (see
              components/blog/featured-latest-hero.tsx) exactly — plain
              colored text, not a pill. */}
          {badgeLabel ? (
            <span className="mb-3 block text-[13px] font-semibold uppercase tracking-wide text-primary-600">
              {badgeLabel}
            </span>
          ) : null}
          {/* Text sizes match Blog's first block, first column (the
              featured article — see components/blog/featured-latest-hero.tsx):
              text-[24px]/sm:text-[28px] for the heading, text-[14px] for the
              paragraph. */}
          <h2 className="max-w-md text-[24px] font-bold leading-tight text-slate-900 sm:text-[28px]">
            {title}
          </h2>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-slate-500 line-clamp-3">
            {description}
          </p>
          {category || date ? (
            <p className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">
              {category ? <span className="text-primary-600">{category}</span> : null}
              {category && date ? <span className="text-slate-300">&bull;</span> : null}
              {date ? <span className="text-slate-500">{date}</span> : null}
            </p>
          ) : null}
        </div>

        {ctaLabel ? (
          <div className="mt-auto flex flex-col pt-10">
            {/* Decorative "L" connector — dashed vertical edge into a dashed
                horizontal edge, leading the eye down into the CTA. */}
            <div
              aria-hidden="true"
              className="h-6 w-10 border-l border-t border-dashed border-slate-300"
            />
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-mono text-xs uppercase tracking-wide text-white">
              {ctaLabel}
            </span>
          </div>
        ) : null}
      </FadeIn>

      {/* p-[7.6px] = 2mm at 96dpi, uniform on every side so the photo sits
          vertically centered in its column (an earlier, larger bottom
          inset made it sit off-center). rounded-xl on the image keeps its
          corners tidy now that it no longer meets the card's own
          rounded-2xl corners directly. */}
      <FadeIn
        direction="right"
        delay={100}
        className="order-1 relative h-72 w-full p-[7.6px] md:order-2 md:h-full"
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover ${imageGrayscale ? "grayscale" : ""}`}
          />
        </div>
      </FadeIn>
    </>
  );

  // 10cm at 96dpi = 380px (9cm + 1cm). Each column animates independently
  // (left/right, the image slightly delayed) rather than fading the whole
  // card as one rigid unit — same technique as the Blog's featured article
  // hero (see components/blog/featured-latest-hero.tsx).
  const cardClassName =
    "grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-200 ease-out md:h-[380px] md:grid-cols-2" +
    (href ? " hover:shadow-lg focus-visible:shadow-lg" : "");

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return <div className={cardClassName}>{content}</div>;
}
