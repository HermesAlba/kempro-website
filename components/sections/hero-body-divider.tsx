"use client";

import { useEffect, useState } from "react";

// Desktop-only — draws a line whose vertical position sits exactly midway
// between the hero photo's bottom edge and the body content's first
// heading ("Resumen"/"Overview"), spanning horizontally from the title's
// left edge to the photo's right edge. Neither endpoint is expressible as
// a fixed offset: the photo's bottom depends on viewport height (see
// app/[locale]/casos-de-exito/[slug]/page.tsx), while the heading's
// position depends on how much the title/description wrap — which differs
// per case study. Measuring the actual rendered elements is the only way
// to get this right for every story at every viewport size.
export function HeroBodyDivider() {
  const [style, setStyle] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    function measure() {
      const article = document.querySelector("article");
      const title = document.querySelector("[data-hero-title]");
      const photo = document.querySelector("[data-hero-photo]");
      const resumeStart = document.querySelector("[data-resume-start]");

      if (!article || !title || !photo || !resumeStart) {
        setStyle(null);
        return;
      }

      // The photo container is hidden below lg (see its own "hidden
      // lg:block" classes) — a hidden element's rect is all zeros, which
      // would place the line at a nonsense position, so skip entirely.
      if (getComputedStyle(photo).display === "none") {
        setStyle(null);
        return;
      }

      const articleRect = article.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      const photoRect = photo.getBoundingClientRect();
      const resumeRect = resumeStart.getBoundingClientRect();

      setStyle({
        top: (photoRect.bottom + resumeRect.top) / 2 - articleRect.top,
        left: titleRect.left - articleRect.left,
        width: photoRect.right - titleRect.left,
      });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (!style) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute hidden border-t border-neutral-300 lg:block"
      style={{ top: style.top, left: style.left, width: style.width }}
    />
  );
}
