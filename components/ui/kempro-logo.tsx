import {
  KEMPRO_MARK_DARK,
  KEMPRO_MARK_PRIMARY,
  KEMPRO_MARK_STANDALONE,
  KEMPRO_PRIMARY,
  KEMPRO_TEXT_DARK,
  KEMPRO_TEXT_LIGHT,
  KEMPRO_WHITE,
  type LogoMarkSpec,
} from "@/lib/kempro-symbol";

type KemproLogoVariant = "primary" | "standalone" | "dark";

type KemproLogoProps = {
  /** "primary" (default) = mark + "Kempro" in black, for light backgrounds. "dark" = mark + "Kempro" in white, for dark backgrounds. "standalone" = mark only, for favicons/app icons/social avatars. */
  variant?: KemproLogoVariant;
  /** Overrides the variant's native mark size (px); the wordmark and gap scale with it. */
  size?: number;
  /** Overrides the mark's ring fill color (default: the indigo brand primary). Use to blend the mark into a solid background instead of standing out in indigo — e.g. black, to match a pure-black bar. */
  markColor?: string;
  /** Overrides the variant's default wordmark color. */
  textColor?: string;
  /** Overrides the variant's default wordmark font size (px). */
  textSize?: number;
  /** Overrides the default -3% wordmark letter-spacing (CSS value, e.g. "-0.02em"). */
  letterSpacing?: string;
  /** Overrides the mark-to-wordmark gap (px), which otherwise scales with `size`. */
  gap?: number;
  className?: string;
};

const VARIANT_SPEC: Record<KemproLogoVariant, LogoMarkSpec> = {
  primary: KEMPRO_MARK_PRIMARY,
  standalone: KEMPRO_MARK_STANDALONE,
  dark: KEMPRO_MARK_DARK,
};

const LOCKUP_DEFAULTS = {
  primary: { textSize: 56, gap: 4, textColor: KEMPRO_TEXT_LIGHT },
  dark: { textSize: 36, gap: 4, textColor: KEMPRO_TEXT_DARK },
} as const;

function KemproMark({
  spec,
  size,
  ringColor = KEMPRO_PRIMARY,
  className,
}: {
  spec: LogoMarkSpec;
  size: number;
  ringColor?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${spec.viewBox} ${spec.viewBox}`}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {spec.rings.map((ring) => {
        const outerRadius = ring.size / 2;
        const cx = ring.x + outerRadius;
        const cy = ring.y + outerRadius;
        // Simulates Figma's stroke-align: INSIDE (SVG has no native
        // equivalent) — strokes are centered on the path by default, so
        // pulling the path radius in by half the stroke weight leaves the
        // stroke's outer edge sitting exactly on the ring's true boundary.
        const pathRadius = outerRadius - ring.strokeWidth / 2;

        return (
          <circle
            key={`${ring.x}-${ring.y}`}
            cx={cx}
            cy={cy}
            r={pathRadius}
            fill={ringColor}
            fillOpacity={ring.opacity}
            stroke={KEMPRO_WHITE}
            strokeWidth={ring.strokeWidth}
          />
        );
      })}

      <circle
        cx={spec.centerDot.x + spec.centerDot.size / 2}
        cy={spec.centerDot.y + spec.centerDot.size / 2}
        r={spec.centerDot.size / 2}
        fill={KEMPRO_WHITE}
      />
    </svg>
  );
}

export function KemproLogo({
  variant = "primary",
  size,
  markColor,
  textColor,
  textSize,
  letterSpacing,
  gap,
  className,
}: KemproLogoProps) {
  const spec = VARIANT_SPEC[variant];

  if (variant === "standalone") {
    return (
      <KemproMark
        spec={spec}
        size={size ?? spec.viewBox}
        ringColor={markColor}
        className={className}
      />
    );
  }

  const defaults = LOCKUP_DEFAULTS[variant];
  const nativeMarkSize = spec.viewBox;
  const scale = size ? size / nativeMarkSize : 1;

  return (
    <span
      className={`inline-flex items-center ${className ?? ""}`}
      style={{ gap: gap ?? defaults.gap * scale }}
    >
      <KemproMark spec={spec} size={nativeMarkSize * scale} ringColor={markColor} />
      <span
        className="font-bold"
        style={{
          color: textColor ?? defaults.textColor,
          fontSize: textSize ?? defaults.textSize * scale,
          letterSpacing: letterSpacing ?? "-0.03em",
          lineHeight: 1,
        }}
      >
        Kempro
      </span>
    </span>
  );
}
