"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/data/blog";
import { CoverImage } from "@/components/blog/cover-image";
import { paletteFor } from "@/lib/blog-categories";
import { FadeIn } from "@/components/ui/fade-in";
import { normalizeSearch } from "@/lib/normalize-search";
import { SearchIcon } from "@/components/ui/icons";

const PAGE_SIZE = 6;

// Only the fields ArticleCard actually renders — lets callers pass
// non-blog data (e.g. case studies) shaped to match, instead of requiring
// a full BlogPost with unused fields (content, readingTime, etc.).
export type ArticleGridItem = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "date" | "author" | "category" | "categoryKey" | "coverImage"
>;

export function ArticleCard({
  post,
  index,
  basePath,
  roundedImages,
  dark,
  hideDateOnMobile,
}: {
  post: ArticleGridItem;
  index: number;
  basePath: "/blog" | "/casos-de-exito";
  roundedImages?: boolean;
  /** Switches the title/excerpt/date text to white/light-neutral for use
   * on a dark section background — the card itself has no background
   * panel of its own (unlike CaseCard's white box), so its text sits
   * directly on the parent section's background. Used by LatestArticles
   * on Home's black "Ideas y casos de uso" section, and by AllArticlesGrid
   * itself (blog's "Todos los artículos" block is now bg-dark-900 too). */
  dark?: boolean;
  /** Hides the "• <date>" part of the meta row on mobile only (still
   * shown from sm up) — opt-in per usage, scoped to LatestArticles' cards
   * on Home per request, without touching the full blog grid. */
  hideDateOnMobile?: boolean;
}) {
  const locale = useLocale();
  const href =
    basePath === "/casos-de-exito"
      ? ({ pathname: "/casos-de-exito/[slug]", params: { slug: post.slug } } as const)
      : ({ pathname: "/blog/[slug]", params: { slug: post.slug } } as const);
  const { textColor } = paletteFor(post.categoryKey);
  const date = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <FadeIn delay={index * 100}>
      {/* Fixed total height so the cover image can be exactly half of it —
          with an aspect-ratio-only image container (the previous
          approach), "50% of the card" has no fixed meaning since card
          height was just whatever the content underneath added up to. */}
      <Link href={href} className="group flex h-[300px] flex-col sm:h-[320px] lg:h-[340px]">
        <div className={`h-1/2 w-full overflow-hidden${roundedImages ? " rounded-xl" : ""}`}>
          <CoverImage
            categoryKey={post.categoryKey}
            src={post.coverImage}
            alt={post.title}
            className={`h-full w-full${roundedImages ? " rounded-xl" : ""}`}
            squareCorners={roundedImages}
          />
        </div>
        {/* overflow-hidden so the excerpt below just shows "as much as
            fits" within the fixed h-1/2 remainder, clipped at the bottom
            edge rather than pushing the card taller. */}
        <div className="flex h-1/2 flex-col gap-2 overflow-hidden pt-3">
          <p className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-wide">
            <span style={dark ? undefined : { color: textColor }} className={dark ? "text-primary-300" : undefined}>
              {post.category}
            </span>
            <span
              className={`${hideDateOnMobile ? "hidden sm:inline" : ""} ${dark ? "text-white/30" : "text-neutral-300"}`}
            >
              &bull;
            </span>
            <span
              className={`${hideDateOnMobile ? "hidden sm:inline" : ""} ${dark ? "text-neutral-400" : "text-neutral-500"}`}
            >
              {date}
            </span>
          </p>
          <h3
            className={`line-clamp-2 text-[18px] font-bold leading-snug transition-colors ${
              dark
                ? "text-white group-hover:text-primary-300"
                : "text-neutral-900 group-hover:text-primary-600"
            }`}
          >
            {post.title}
          </h3>
          <p className={`line-clamp-3 text-[14px] leading-relaxed ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
            {post.excerpt}
          </p>
        </div>
      </Link>
    </FadeIn>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      // Light-on-dark variant — this block now sits on a black section
      // (see the wrapping <section> below). Bumped to near-white per
      // request (neutral-400 read as too dim/low-contrast against
      // bg-dark-900) — active is solid white with the indigo underline,
      // inactive is white/70 so it still reads as secondary next to it.
      className={`border-b-2 px-1 py-1 font-sans text-[13px] font-medium transition-colors ${
        active
          ? "border-primary-400 text-white"
          : "border-transparent text-white/70 hover:border-primary-300/60 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export function AllArticlesGrid({
  posts,
  title,
  categoryLabels,
  basePath = "/blog",
  roundedImages,
}: {
  posts: ArticleGridItem[];
  /** Overrides the section heading (t("allArticlesTitle")) — used when this
   * component is reused outside the blog page itself. */
  title?: string;
  /** Base route each card links to — "/blog" (default) or
   * "/casos-de-exito" when `posts` is actually case-study data reshaped to
   * ArticleGridItem. */
  basePath?: "/blog" | "/casos-de-exito";
  /** Overrides the filter pills with a fixed label list instead of the
   * ones derived from `posts` — used to mirror another section's own
   * category taxonomy (e.g. reusing this component on a different page
   * next to a block with its own unrelated categories). Since these labels
   * don't correspond to any post's categoryKey, selecting one shows no
   * results other than "Todos" — this is a cosmetic/label override only,
   * not a real filter mapping. */
  categoryLabels?: string[];
  roundedImages?: boolean;
}) {
  const t = useTranslations("Blog");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Real categories only, derived from the posts themselves — never a
  // hardcoded list that could drift out of sync with the actual data.
  // Sorted alphabetically by the localized label (not insertion order),
  // using the current locale's collation so accented letters sort
  // correctly (e.g. "Estrategia" before "Tecnología" in Spanish).
  const derivedCategories = Array.from(
    new Map(posts.map((post) => [post.categoryKey, post.category])).entries(),
  ).sort(([, labelA], [, labelB]) => labelA.localeCompare(labelB, locale));
  const categories: [string, string][] =
    categoryLabels?.map((label) => [label, label]) ?? derivedCategories;
  const byCategory = activeCategory
    ? posts.filter((post) => post.categoryKey === activeCategory)
    : posts;
  const trimmedQuery = query.trim();
  const normalizedQuery = normalizeSearch(trimmedQuery);
  // Same title/excerpt/category matching as the global header search (see
  // components/layout/site-search.tsx) — kept scoped to `byCategory` so the
  // category pill and the search box narrow the same list together instead
  // of being two independent filters.
  const filtered = normalizedQuery
    ? byCategory.filter((post) =>
        normalizeSearch(`${post.title} ${post.excerpt} ${post.category}`).includes(
          normalizedQuery,
        ),
      )
    : byCategory;
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const canCollapse = !hasMore && filtered.length > PAGE_SIZE;

  function handleCategoryChange(key: string | null) {
    setActiveCategory(key);
    setVisibleCount(PAGE_SIZE);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    // Black background (same bg-dark-900 as the Hero/CTA band), per
    // request — was bg-white with a neutral-200 top border; text/pills/
    // search/cards below are all switched to their light-on-dark variants
    // to match (ArticleCard already had a `dark` prop for exactly this).
    <section className="border-t border-white/10 bg-dark-900 px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <FadeIn className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[20px] font-bold text-white">{title ?? t("allArticlesTitle")}</h2>
          <div className="flex flex-wrap items-center gap-6">
            <FilterPill
              label={t("allCategoriesFilter")}
              active={activeCategory === null}
              onClick={() => handleCategoryChange(null)}
            />
            {categories.map(([key, label]) => (
              <FilterPill
                key={key}
                label={label}
                active={activeCategory === key}
                onClick={() => handleCategoryChange(key)}
              />
            ))}
          </div>
        </FadeIn>
        {/* Placed after the category pills (own row, below them) rather
            than inline with the filters — keeps the pill row from wrapping
            awkwardly on narrower widths, while still reading as "filter by
            category, then narrow further by keyword" in that order. Filters
            the same visible list the pills do (see `filtered` above), so
            category + search combine instead of competing. */}
        <FadeIn className="mt-4 max-w-sm">
          <label className="relative block">
            {/* Bumped to white/70 (icon) and white/60 placeholder — the
                original neutral-500/white-5 combo read as too faint on
                bg-dark-900, per request. */}
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-full border border-white/25 bg-white/10 py-2 pl-9 pr-4 text-sm text-white placeholder:text-white/60 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30"
            />
          </label>
        </FadeIn>
        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-sm text-neutral-400">
            {t("searchNoResults", { query: trimmedQuery })}
          </p>
        ) : (
          <div className="mt-10 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, index) => (
              <ArticleCard
                key={post.slug}
                post={post}
                index={index}
                basePath={basePath}
                roundedImages={roundedImages}
                dark
              />
            ))}
          </div>
        )}
        {hasMore ? (
          <div className="mt-14 flex justify-center">
            {/* Explicit bg-primary-600 instead of ctaButtonClasses
                (bg-neutral-900): on this section's new bg-dark-900 that
                button is nearly invisible until hover — same fix already
                applied to LatestArticles' and FeaturedCaseStudies' CTAs on
                their own black sections. */}
            <button
              type="button"
              onClick={() => setVisibleCount((current) => Math.min(current + PAGE_SIZE, filtered.length))}
              className="inline-flex h-[35px] items-center justify-center gap-2 rounded-[6px] bg-primary-600 px-[20px] font-sans text-[13px] tracking-[-0.02em] text-white transition-colors hover:bg-primary-700"
            >
              {t("viewMoreLabel")}
            </button>
          </div>
        ) : canCollapse ? (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount(PAGE_SIZE)}
              className="inline-flex h-[35px] items-center justify-center gap-2 rounded-[6px] bg-primary-600 px-[20px] font-sans text-[13px] tracking-[-0.02em] text-white transition-colors hover:bg-primary-700"
            >
              {t("viewLessLabel")}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
