import {
  FAVICON_BG,
  FAVICON_PRIMARY,
  FAVICON_RINGS,
  FAVICON_VIEWBOX,
  FAVICON_WHITE,
} from "@/lib/kempro-favicon";

type KemproFaviconProps = {
  size?: number;
  className?: string;
};

export function KemproFavicon({ size = 192, className }: KemproFaviconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${FAVICON_VIEWBOX} ${FAVICON_VIEWBOX}`}
      aria-hidden="true"
      className={className}
    >
      <rect width={FAVICON_VIEWBOX} height={FAVICON_VIEWBOX} fill={FAVICON_BG} />

      {FAVICON_RINGS.map((ring, index) => {
        // Innermost ring (last in the outer-to-inner array) is filled
        // solid white instead of indigo — reads as a small white disc at
        // the center of the mark, per request. No separate center dot
        // anymore (see lib/kempro-favicon.ts comment).
        const isInnermost = index === FAVICON_RINGS.length - 1;

        return (
          <circle
            key={`${ring.cx}-${ring.cy}`}
            cx={ring.cx}
            cy={ring.cy}
            // Simulates Figma's stroke-align: INSIDE (SVG has no native
            // equivalent) — strokes are centered on the path by default, so
            // pulling the path radius in by half the stroke weight leaves
            // the stroke's outer edge sitting exactly on the ring's true
            // boundary.
            r={ring.r - ring.strokeWidth / 2}
            fill={isInnermost ? FAVICON_WHITE : FAVICON_PRIMARY}
            fillOpacity={isInnermost ? 1 : ring.opacity}
            stroke={FAVICON_WHITE}
            strokeWidth={ring.strokeWidth}
          />
        );
      })}
    </svg>
  );
}
