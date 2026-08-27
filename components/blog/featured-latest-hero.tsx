import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/data/blog";
import { CoverImage } from "@/components/blog/cover-image";
import { paletteFor } from "@/lib/blog-categories";
import { FadeIn } from "@/components/ui/fade-in";

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function SectionBadge({ label }: { label: string }) {
  return (
    <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
      {label}
    </span>
  );
}

function MetaRow({ post, locale }: { post: BlogPost; locale: string }) {
  const { textColor } = paletteFor(post.categoryKey);
  return (
    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">
      <span style={{ color: textColor }}>{post.category}</span>
      <span className="text-neutral-300">&bull;</span>
      <span className="text-neutral-500">{formatDate(post.date, locale)}</span>
    </p>
  );
}

export function FeaturedLatestHero({
  featured,
  latest,
  roundedImages,
}: {
  featured: BlogPost;
  latest: BlogPost[];
  roundedImages?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const featuredHref = { pathname: "/blog/[slug]", params: { slug: featured.slug } } as const;
  const roundedClass = roundedImages ? " rounded-xl" : "";

  return (
    // Bleeds up behind the floating nav (see HEADER_OFFSET in
    // components/layout/header.tsx); the inner div keeps its own padding
    // untouched since the -mt/pt pair only shifts where this section's
    // background starts, not where its children render.
    <section className="-mt-[54px] bg-white pt-[54px] lg:-mt-[90px] lg:pt-[90px]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 sm:px-10 lg:px-0 lg:py-10">
        {/* Inner column mx-auto max-w-[1052px] centers with the same 114px
            margins kore.ai uses at the 1280px reference width, instead of
            hardcoding that padding directly (which breaks on narrower
            viewports). */}
        <div className="mx-auto flex max-w-[1052px] flex-col lg:flex-row lg:gap-x-7">
          <FadeIn direction="left" className="flex flex-col gap-6 lg:w-[485px] lg:flex-none">
            <SectionBadge label={t("featuredLabel")} />
            <Link href={featuredHref} className={`group block overflow-hidden${roundedClass}`}>
              <CoverImage
                categoryKey={featured.categoryKey}
                src={featured.coverImage}
                alt={featured.title}
                priority
                className={`aspect-[485/316] w-full${roundedClass}`}
                squareCorners={roundedImages}
              />
            </Link>
            <div className="flex flex-col gap-3">
              <h2 className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-neutral-900 sm:text-[28px]">
                <Link href={featuredHref} className="transition-colors hover:text-primary-600">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-[14px] leading-relaxed text-neutral-500">{featured.excerpt}</p>
              <MetaRow post={featured} locale={locale} />
            </div>
          </FadeIn>

          <FadeIn
            delay={100}
            direction="right"
            className="flex flex-col gap-5 border-t border-neutral-200 pt-12 lg:w-[539px] lg:flex-none lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
          >
            <SectionBadge label={t("latestLabel")} />
            <div className="flex flex-col gap-4">
              {latest.map((post) => {
                const href = { pathname: "/blog/[slug]", params: { slug: post.slug } } as const;
                return (
                  <div key={post.slug} className="flex gap-5">
                    <Link
                      href={href}
                      className={`group block h-[100px] w-[154px] flex-shrink-0 overflow-hidden${roundedClass}`}
                    >
                      <CoverImage
                        categoryKey={post.categoryKey}
                        src={post.coverImage}
                        alt={post.title}
                        className={`h-full w-full${roundedClass}`}
                        squareCorners={roundedImages}
                      />
                    </Link>
                    <div className="flex flex-col gap-2">
                      <h3 className="line-clamp-2 text-[16px] font-semibold leading-snug text-neutral-900">
                        <Link href={href} className="transition-colors hover:text-primary-600">
                          {post.title}
                        </Link>
                      </h3>
                      <MetaRow post={post} locale={locale} />
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
