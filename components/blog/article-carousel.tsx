"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/data/blog";
import { CarouselCard } from "@/components/blog/carousel-card";
import { NewsletterCard } from "@/components/blog/newsletter-card";

const VISIBLE = 3;
const CARD_W = 330;
const GAP = 16;

export function ArticleCarousel({ posts }: { posts: BlogPost[] }) {
  const [index, setIndex] = useState(0);
  const total = posts.length + 1; // + the newsletter card
  const maxIndex = Math.max(total - VISIBLE, 0);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <>
      {/* Mobile: vertical stack, no carousel controls. */}
      <div className="flex flex-col gap-6 md:hidden">
        {posts.map((post) => (
          <CarouselCard key={post.slug} post={post} />
        ))}
        <NewsletterCard />
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-neutral-600 shadow-[0_6px_16px_-6px_rgba(15,23,42,0.08)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="w-[1000px] overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${index * (CARD_W + GAP)}px)` }}
          >
            {posts.map((post) => (
              <CarouselCard key={post.slug} post={post} />
            ))}
            <NewsletterCard />
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          disabled={index === maxIndex}
          aria-label="Next"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-neutral-600 shadow-[0_6px_16px_-6px_rgba(15,23,42,0.08)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </>
  );
}
