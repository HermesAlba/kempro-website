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

// "Kempro" wordmark, vectorized from GT America Extended Black (paid,
// desktop-only license — see components/ui/kempro-logo.tsx git history /
// project notes). Grilli Type's desktop license doesn't cover @font-face
// web embedding, but does cover outputting static artwork like a logo, so
// the text was set in Figma (56px, -3% letter-spacing, line-height 1),
// converted to outlines, and copied out as this raw path data — no font
// file ships to the browser. Authored/measured at a 56px font-size, so
// `size` here scales the whole viewBox proportionally from that baseline
// (native 240x51 viewBox = the wordmark's bounding box at 56px).
const KEMPRO_WORDMARK_VIEWBOX = { width: 240, height: 51 };
const KEMPRO_WORDMARK_BASE_SIZE = 56;
// The exported viewBox's own vertical center (height/2 = 25.5) is NOT the
// "K"'s vertical center: the box also has to fit the "p"'s descender (down
// to y=50.68), which pulls the box's midpoint lower than the cap letter.
// The "K" glyph itself (last path below, local x 0-42) spans local y 0
// (cap-height top) to y=39.76 (baseline) — its own center is (0+39.76)/2 =
// 19.88, which sits 5.62 units above the box's center. So centering the
// mark against the wordmark's flex box (as before) actually centers it
// against empty descender space, not the "K" — it visibly sat too high.
// Shifting the wordmark down by this offset (scaled) makes the mark's own
// center land on the K's center instead of the box's.
const KEMPRO_WORDMARK_CAP_CENTER_OFFSET = 5.62;

function KemproWordmark({
  size,
  color,
  className,
}: {
  size: number;
  color: string;
  className?: string;
}) {
  const scale = size / KEMPRO_WORDMARK_BASE_SIZE;

  return (
    <svg
      width={KEMPRO_WORDMARK_VIEWBOX.width * scale}
      height={KEMPRO_WORDMARK_VIEWBOX.height * scale}
      viewBox={`0 0 ${KEMPRO_WORDMARK_VIEWBOX.width} ${KEMPRO_WORDMARK_VIEWBOX.height}`}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: `translateY(${KEMPRO_WORDMARK_CAP_CENTER_OFFSET * scale}px)` }}
    >
      <path d="M221.133 40.6C210.493 40.6 202.765 35.336 202.765 25.704C202.765 16.072 210.493 10.92 221.133 10.92C231.773 10.92 239.501 16.072 239.501 25.704C239.501 35.336 231.773 40.6 221.133 40.6ZM221.133 32.872C224.717 32.872 227.069 30.352 227.069 25.704C227.069 21 224.717 18.648 221.133 18.648C217.549 18.648 215.197 21 215.197 25.704C215.197 30.352 217.549 32.872 221.133 32.872Z" fill={color} />
      <path d="M189.041 19.712C190.553 14.168 194.361 11.032 200.129 11.032C200.969 11.032 201.361 11.032 201.865 11.144V22.12C200.801 21.952 199.681 21.84 198.393 21.84C195.873 21.84 193.801 22.456 192.513 23.576C190.945 24.864 190.161 27.104 190.161 29.792V39.76H177.841V11.76H189.041V19.712Z" fill={color} />
      <path d="M138.177 50.68V11.76H150.161V15.96C152.513 12.6 156.433 10.92 160.969 10.92C169.145 10.92 174.465 16.744 174.465 25.536C174.465 34.72 168.921 40.6 160.577 40.6C156.209 40.6 153.073 39.144 150.497 36.344V50.68H138.177ZM156.097 32.872C159.793 32.872 162.033 30.016 162.033 25.536C162.033 21.112 159.849 18.592 156.209 18.592C152.569 18.592 150.273 20.832 150.273 24.752V26.6C150.273 30.464 152.569 32.872 156.097 32.872Z" fill={color} />
      <path d="M79.9199 11.76H91.9039V17.304C93.8639 13.048 97.2799 10.92 102.264 10.92C106.968 10.92 110.16 12.936 111.952 17.248C114.36 12.992 118 10.92 122.928 10.92C129.928 10.92 133.848 15.4 133.848 23.296V39.76H121.528V25.648C121.528 21.728 120.128 19.824 117.384 19.824C114.528 19.824 113.072 21.784 113.072 25.592V39.76H100.752V25.704C100.752 21.672 99.4079 19.824 96.5519 19.824C93.6959 19.824 92.2399 21.784 92.2399 25.592V39.76H79.9199V11.76Z" fill={color} />
      <path d="M59.9611 40.6C48.5371 40.6 41.6491 35.112 41.6491 25.872C41.6491 16.744 48.5371 10.92 59.3451 10.92C70.6571 10.92 76.8731 16.744 76.8731 26.376V28.28H53.2411C53.6891 31.08 56.3771 32.76 60.2971 32.76C63.0411 32.76 65.6171 31.584 67.0731 29.512L76.1451 33.544C73.0651 37.912 67.1851 40.6 59.9611 40.6ZM64.8891 22.288C64.8331 19.376 62.8171 17.416 59.2331 17.416C55.5931 17.416 53.5211 19.264 53.2411 22.288H64.8891Z" fill={color} />
      <path d="M0 39.76V0H12.768V15.568L27.048 0H41.832L26.824 16.072L42.336 39.76H27.776L17.752 24.136L12.768 29.456V39.76H0Z" fill={color} />
    </svg>
  );
}

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
      {/* GT America Extended Black wordmark, vectorized (see the
          KemproWordmark comment above) — replaced the old live-text
          Iceberg span so the site doesn't need to license/ship the GT
          America font file for a web @font-face. `letterSpacing` is kept
          in the prop signature for backwards compatibility but has no
          effect now: the -3% tracking is baked into the exported path
          geometry, not applied via CSS. */}
      <KemproWordmark
        size={textSize ?? defaults.textSize * scale}
        color={textColor ?? defaults.textColor}
      />
    </span>
  );
}
