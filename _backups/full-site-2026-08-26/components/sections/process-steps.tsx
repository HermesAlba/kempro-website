"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { ChevronRightIcon } from "@/components/ui/icons";

type Step = { title: string; description: string };

export function ProcessSteps({
  steps,
  phaseLabel,
}: {
  steps: Step[];
  /** e.g. "Fase" / "Phase" — combined with the 1-based index to render
   * "Fase 01", "Fase 02", etc. per card. */
  phaseLabel: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Cards are sized to show exactly 3 per "page" at lg (see the w-[...]
  // classes below) instead of as many 300px cards as happen to fit, so a
  // 4th step never fits in the same view — it only becomes visible by
  // scrolling, and the right arrow below is the visible affordance for
  // that instead of relying on a bare horizontal-scroll gesture.
  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

  function scrollByPage(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="relative mt-14">
      {/* Horizontal scroller: cards are wide enough that only 3 fit per
          "page" at lg (see the w-[...] classes on each card) — -mx/px
          bleed matches the parent <Container>'s own padding (px-6
          lg:px-8) exactly at every breakpoint, so the scroll area always
          reaches the section's true edge instead of stopping short at
          Container's inner edge. */}
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="scrollbar-hide -mx-6 overflow-x-auto overflow-y-hidden px-6 pb-2 lg:-mx-8 lg:px-8"
      >
        <ol className="flex snap-x snap-mandatory gap-6">
          {steps.map((step, index) => (
            <FadeIn
              key={step.title}
              delay={index * 100}
              // gap-6 on the <ol> is 24px; two gaps between 3 visible
              // cards = 48px, subtracted here so exactly 3 cards (wider
              // than the old fixed 300px) fit per "page" at lg, leaving
              // the 4th to scroll in via the arrow below.
              className="w-[85%] flex-shrink-0 snap-start sm:w-[55%] lg:w-[calc((100%-48px)/3)]"
            >
              <li className="h-full rounded-2xl border border-neutral-200 bg-white p-6">
                <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
                  {phaseLabel} 0{index + 1}
                </span>
                <h3 className="mt-3 text-xl font-bold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
                  {step.description}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>

      {/* Right arrow: the visible cue that a 4th step exists beyond the 3
          shown at once. Hidden once there's nothing left to scroll to
          (e.g. on very wide screens where all 4 already fit). */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Ver siguiente"
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white p-2.5 text-neutral-700 shadow-md transition hover:border-primary-300 hover:text-primary-600 sm:flex"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Ver anterior"
          className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white p-2.5 text-neutral-700 shadow-md transition hover:border-primary-300 hover:text-primary-600 sm:flex"
        >
          <ChevronRightIcon className="h-5 w-5 rotate-180" />
        </button>
      )}
    </div>
  );
}
