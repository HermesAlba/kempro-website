import type { ComponentType } from "react";

// Per-category fallback backgrounds shown by CoverImage (see
// components/blog/cover-image.tsx) whenever a post has no real
// coverImage — applies identically everywhere CoverImage is used (the
// Featured card, the "Lo más reciente" list, the all-articles grid, and
// the article page's own header). Add a new categoryKey entry to
// CATEGORY_FALLBACK_BACKGROUNDS to give another category its own pattern;
// anything not listed there uses DiagonalStepFallback by default.
//
// Every pattern below renders an OUTER div that gets exactly the caller's
// className (so callers can freely pass position/inset overrides like
// "absolute inset-0" for a full-bleed header) and an INNER div that's
// always `relative h-full w-full overflow-hidden`, serving as the actual
// positioning context AND the hard clip boundary for the decorative
// layers. Baking `relative` directly into the outer div instead would
// silently conflict with a caller-supplied `absolute` class — both are
// single-property `position` utilities, so whichever one Tailwind
// happens to emit later in the stylesheet wins, not whichever appears
// later in the className string.
//
// Hover behavior: the block's own outline (size/border-radius/position)
// never changes — callers rely on that inner `overflow-hidden` boundary
// staying exactly where it is. Each pattern instead nudges one of its own
// internal shapes a few px via `translate` on `group-hover` (the
// surrounding card Link carries the `group` class), clipped by that same
// boundary so nothing escapes it. `motion-safe:` gates every one of these
// so prefers-reduced-motion users get the static pattern with no motion
// at all (the underlying gradients/colors are unaffected either way,
// since only `transform` is what's disabled).
const HOVER_TRANSITION =
  "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out";

// Lightweight tileable grain texture — inline SVG feTurbulence data-URI,
// shared by every pattern below, so there's no extra network request.
const GRAIN_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Exported so bespoke, one-off background compositions elsewhere (e.g. the
// Contact page's own 3-band split) can reuse the exact same grain texture
// instead of duplicating the data-URI.
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
      style={{ backgroundImage: GRAIN_TEXTURE, backgroundRepeat: "repeat" }}
    />
  );
}

type FallbackBackgroundProps = {
  className?: string;
  /** Drops the left-only rounded-l-[28px]/[40px] these three patterns
   * otherwise apply on their own inner clip boundary — for callers whose
   * OWN outer container already rounds all 4 corners uniformly (e.g.
   * rounded-xl on the blog thumbnails/article header), where the inner
   * left-only radius would just double up against that outer one instead
   * of matching it. Defaults to false so existing callers (e.g. /BL) keep
   * today's left-only rounding unchanged. */
  squareCorners?: boolean;
};

// Generic/default pattern: a diagonal indigo gradient with a lighter "step"
// overlay (two color planes meeting on a soft diagonal seam) plus grain.
// Hover: only the light "step" layer slides ~6px along its own diagonal
// offset (down-right) — the base gradient underneath stays put.
function DiagonalStepFallback({ className }: FallbackBackgroundProps) {
  return (
    <div role="img" aria-hidden="true" className={className}>
      <div className="relative h-full w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(135deg, #5D5FEF 0%, #CFDCFF 100%)" }}
        />
        <div
          aria-hidden="true"
          className={`absolute left-[45%] top-[40%] right-0 bottom-0 bg-[#E5EDFF] ${HOVER_TRANSITION} motion-safe:group-hover:translate-x-1.5 motion-safe:group-hover:translate-y-1.5`}
        />
        <GrainOverlay />
      </div>
    </div>
  );
}

// "Estrategia" pattern: two solid vertical bands (no diagonal, no
// gradient between them — a clean vertical cut), each with its own grain,
// rounded only on the block's left side to match where this fallback
// sits inside a card next to its text content. Hover: the right band
// (painted on top, so it's the one that visually defines the cut) slides
// ~6px left, appearing to "grow" into the left band; it's positioned with
// a 12px buffer past the container's own right edge specifically so that
// shift never exposes a gap there.
function EstrategiaBandsFallback({ className, squareCorners }: FallbackBackgroundProps) {
  return (
    <div role="img" aria-hidden="true" className={className}>
      <div
        className={`relative h-full w-full overflow-hidden${squareCorners ? "" : " rounded-l-[28px] sm:rounded-l-[40px]"}`}
      >
        <div className="absolute inset-y-0 left-0 w-[30%]" style={{ backgroundColor: "#90A2FE" }}>
          <GrainOverlay />
        </div>
        <div
          className={`absolute inset-y-0 -right-3 left-[30%] ${HOVER_TRANSITION} motion-safe:group-hover:-translate-x-1.5`}
          style={{ backgroundColor: "#5D5FEF" }}
        >
          <GrainOverlay />
        </div>
      </div>
    </div>
  );
}

// "Automatización" pattern: two large overlapping circles ("petals"), each
// with its own grain, sitting on an intense-indigo base (also grained) —
// centered outside the container past its bottom-left/bottom-right
// corners so only their curved edges show, meeting near horizontal center
// to leave a pointed arc of the base color visible at the top. Hover:
// both circles nudge ~4px further apart (outward), letting a bit more of
// the base color's peak show through — they're already oversized well
// past the container edges, so this never exposes empty space.
function AutomatizacionPetalsFallback({ className, squareCorners }: FallbackBackgroundProps) {
  return (
    <div role="img" aria-hidden="true" className={className}>
      <div
        className={`relative h-full w-full overflow-hidden${squareCorners ? "" : " rounded-l-[28px] sm:rounded-l-[40px]"}`}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "#7682F8" }} />
        <GrainOverlay />
        <div
          className={`absolute rounded-full ${HOVER_TRANSITION} motion-safe:group-hover:-translate-x-1`}
          style={{
            backgroundColor: "#B1C4FF",
            width: "95%",
            height: "170%",
            left: "-30%",
            bottom: "-125%",
          }}
        >
          <GrainOverlay />
        </div>
        <div
          className={`absolute rounded-full ${HOVER_TRANSITION} motion-safe:group-hover:translate-x-1`}
          style={{
            backgroundColor: "#CFDCFF",
            width: "95%",
            height: "170%",
            right: "-30%",
            bottom: "-125%",
          }}
        >
          <GrainOverlay />
        </div>
      </div>
    </div>
  );
}

// "Tendencias" pattern: three stacked horizontal bands of similar height,
// each with its own subtle left-to-right internal gradient. The middle
// band is noticeably more saturated than the top/bottom ones (which are
// close in tone but not identical), and there's no hard divider between
// bands — just abutting color blocks, so the shift reads as a soft tonal
// step rather than a ruled line. Hover: each band's own gradient layer
// (30% wider than the band, centered) slides a few px sideways for a
// "flowing" feel — a transform shift rather than animating
// background-position directly, so it uses the same reliable technique
// as the other three patterns.
// Exported so bespoke, one-off compositions elsewhere (e.g. the Contact
// page's own 3-band split) can reuse these exact tones instead of
// redefining them and risking color drift.
export const TREND_BANDS = [
  { from: "#CFDCFF", to: "#B1C4FF" },
  { from: "#7682F8", to: "#90A2FE" },
  { from: "#B1C4FF", to: "#CFDCFF" },
];

function TendenciasBandsFallback({ className, squareCorners }: FallbackBackgroundProps) {
  return (
    <div role="img" aria-hidden="true" className={className}>
      <div
        className={`relative flex h-full w-full flex-col overflow-hidden${squareCorners ? "" : " rounded-l-[28px] sm:rounded-l-[40px]"}`}
      >
        {TREND_BANDS.map((band, index) => (
          <div key={index} className="relative flex-1 overflow-hidden">
            <div
              className={`absolute inset-y-0 -left-[15%] w-[130%] ${HOVER_TRANSITION} motion-safe:group-hover:translate-x-3`}
              style={{ backgroundImage: `linear-gradient(to right, ${band.from}, ${band.to})` }}
            />
            <GrainOverlay />
          </div>
        ))}
      </div>
    </div>
  );
}

const CATEGORY_FALLBACK_BACKGROUNDS: Record<string, ComponentType<FallbackBackgroundProps>> = {
  estrategia: EstrategiaBandsFallback,
  automatizacion: AutomatizacionPetalsFallback,
  tendencias: TendenciasBandsFallback,
};

export function CategoryFallbackBackground({
  categoryKey,
  className,
  squareCorners,
}: {
  categoryKey: string;
  className?: string;
  squareCorners?: boolean;
}) {
  const Pattern = CATEGORY_FALLBACK_BACKGROUNDS[categoryKey] ?? DiagonalStepFallback;
  return <Pattern className={className} squareCorners={squareCorners} />;
}
