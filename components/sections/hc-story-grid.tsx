"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import type { CustomerStory } from "@/lib/data/customer-stories";
import { HcStoryCard } from "@/components/sections/hc-story-card";
import { FadeIn } from "@/components/ui/fade-in";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

const PAGE_SIZE = 6;

// Pill-with-active-border tabs (per kore.ai reference), distinct from the
// underline-only FilterPill used on the blog/case-studies pages — this
// page's own filter styling, not a shared component.
function FilterTab({
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
      className={`rounded-full border px-4 py-1.5 font-sans text-[13px] font-medium transition-colors ${
        active
          ? "border-[var(--color-hc-blue)] text-[var(--color-hc-blue)]"
          : "border-neutral-200 text-neutral-600 hover:border-[var(--color-hc-blue)] hover:text-[var(--color-hc-blue)]"
      }`}
    >
      {label}
    </button>
  );
}

export function HcStoryGrid({
  stories,
  title,
  allCategoriesLabel,
  readNowLabel,
  viewMoreLabel,
  viewLessLabel,
  emptyLabel,
}: {
  stories: CustomerStory[];
  title: string;
  allCategoriesLabel: string;
  readNowLabel: string;
  viewMoreLabel: string;
  viewLessLabel: string;
  emptyLabel: string;
}) {
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = Array.from(
    new Map(stories.map((story) => [story.category.key, story.category.label])).entries(),
  )
    .filter(([, label]) => label)
    .sort(([, labelA], [, labelB]) => labelA.localeCompare(labelB, locale));

  const filtered = activeCategory
    ? stories.filter((story) => story.category.key === activeCategory)
    : stories;
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const canCollapse = !hasMore && filtered.length > PAGE_SIZE;

  function handleCategoryChange(key: string | null) {
    setActiveCategory(key);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section className="border-t border-neutral-200 bg-white px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <FadeIn className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[20px] font-bold text-neutral-900">{title}</h2>
          {stories.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3">
              <FilterTab
                label={allCategoriesLabel}
                active={activeCategory === null}
                onClick={() => handleCategoryChange(null)}
              />
              {categories.map(([key, label]) => (
                <FilterTab
                  key={key}
                  label={label}
                  active={activeCategory === key}
                  onClick={() => handleCategoryChange(key)}
                />
              ))}
            </div>
          ) : null}
        </FadeIn>

        {stories.length > 0 ? (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((story, index) => (
                <FadeIn key={story.id} delay={index * 100}>
                  <HcStoryCard story={story} readNowLabel={readNowLabel} />
                </FadeIn>
              ))}
            </div>

            {hasMore ? (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((current) => Math.min(current + PAGE_SIZE, filtered.length))
                  }
                  className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}
                >
                  {viewMoreLabel}
                </button>
              </div>
            ) : canCollapse ? (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount(PAGE_SIZE)}
                  className={`${ctaButtonClasses} h-[35px] px-[20px] py-[10px]`}
                >
                  {viewLessLabel}
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-10 text-[14px] text-neutral-500">{emptyLabel}</p>
        )}
      </div>
    </section>
  );
}
