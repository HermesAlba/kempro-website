"use client";

import { useEffect, useRef, useState } from "react";

// Positions its children directly below the case-study hero photo, with
// their left edge matching AlignedBodyContent's own left edge below it
// (see components/sections/aligned-body-content.tsx — same marginLeft/
// width formula from [data-hero-title]/[data-hero-photo]), so this block
// and the "Resumen" column beneath it always line up. The photo is
// absolutely positioned and viewport-height-dependent, so a fixed margin
// can't reliably clear its bottom edge at every screen size either — this
// measures the actual rendered photo like HeroBodyDivider/
// AlignedBodyContent do. Falls back to a centered column before the first
// measurement and on mobile (where the photo is hidden), matching
// AlignedBodyContent's own fallback.
export function PhotoClearance({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ marginTop: number; marginLeft: number; width: number } | undefined>(
    undefined,
  );

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      const photo = document.querySelector("[data-hero-photo]");
      const title = document.querySelector("[data-hero-title]");

      if (!container || !photo || !title || getComputedStyle(photo).display === "none") {
        setStyle(undefined);
        return;
      }

      // Measured against the container's own natural (unmargined) top/left
      // edge, never against the inner column's current position — so this
      // stays correct across repeated resizes instead of compounding a
      // previously-applied margin (same approach as AlignedBodyContent).
      const containerRect = container.getBoundingClientRect();
      const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
      const naturalLeft = containerRect.left + paddingLeft;

      const photoRect = photo.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();

      // Same 24px gap used between the divider and the breadcrumb below it
      // (gap-6), so the space above the divider reads the same as the
      // space below it.
      const GAP = 24;

      setStyle({
        marginTop: Math.max(0, Math.round(photoRect.bottom + GAP - containerRect.top)),
        marginLeft: titleRect.left - naturalLeft,
        width: photoRect.right - titleRect.left,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={containerRef} className="px-6 sm:px-10 lg:px-12">
      <div
        className={`${className ?? ""} ${style ? "" : "mx-auto max-w-[750px]"}`}
        style={
          style ? { marginTop: style.marginTop, marginLeft: style.marginLeft, width: style.width } : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
