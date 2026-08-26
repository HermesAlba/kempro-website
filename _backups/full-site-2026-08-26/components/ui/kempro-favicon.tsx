import {
  FAVICON_BG,
  FAVICON_CENTER_DOT,
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

      {FAVICON_RINGS.map((ring) => (
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
          fill={FAVICON_PRIMARY}
          fillOpacity={ring.opacity}
          stroke={FAVICON_WHITE}
          strokeWidth={ring.strokeWidth}
        />
      ))}

      <circle
        cx={FAVICON_CENTER_DOT.cx}
        cy={FAVICON_CENTER_DOT.cy}
        r={FAVICON_CENTER_DOT.r}
        fill={FAVICON_WHITE}
      />
    </svg>
  );
}
