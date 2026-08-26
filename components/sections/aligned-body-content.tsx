"use client";

import { useEffect, useRef, useState } from "react";

// Aligns the body content column's left/right edges with the hero's own
// title (left) and photo (right) — see components/sections/hero-body-divider.tsx
// for why these can't be fixed CSS values (both depend on viewport height
// and per-story text wrapping). Unlike the divider, this content must stay
// in normal document flow (it's real, page-height-affecting text), so it's
// repositioned via margin-left/width on a normal block rather than
// position:absolute. Falls back to a centered max-w-[740px] column before
// the first measurement (and on mobile, where the reference photo is
// hidden) so there's no unstyled flash.
export function AlignedBodyContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ marginLeft: number; width: number } | undefined>(undefined);

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      const title = document.querySelector("[data-hero-title]");
      const photo = document.querySelector("[data-hero-photo]");

      if (!container || !title || !photo || getComputedStyle(photo).display === "none") {
        setStyle(undefined);
        return;
      }

      // Measured against the container's own natural content-box left edge
      // (its rect + its own padding-left), never against the inner column's
      // current position — so this stays correct across repeated resizes
      // instead of compounding a previously-applied margin.
      const containerRect = container.getBoundingClientRect();
      const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
      const naturalContentLeft = containerRect.left + paddingLeft;

      const titleRect = title.getBoundingClientRect();
      const photoRect = photo.getBoundingClientRect();

      setStyle({
        marginLeft: titleRect.left - naturalContentLeft,
        width: photoRect.right - titleRect.left,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={containerRef} className="px-6 pb-20 pt-12 sm:px-10 lg:px-20">
      <div
        className={`${className ?? ""} ${style ? "" : "mx-auto max-w-[740px]"}`}
        style={style ? { marginLeft: style.marginLeft, width: style.width } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
