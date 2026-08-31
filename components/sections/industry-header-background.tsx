import type { ComponentType } from "react";
import type { IndustryKey } from "@/lib/data/case-studies";
import {
  HeartPulseIcon,
  UtensilsIcon,
  BuildingIcon,
  BuildingConstructionIcon,
  UsersIcon,
  WebIcon,
  ShoppingBagIcon,
} from "@/components/ui/icons";

type IconProps = { className?: string; style?: React.CSSProperties };

// Shared indigo every category crosses over to on hover — the exact pair
// used in the "Sobre nosotros" Hero block (see
// app/[locale]/sobre-nosotros/page.tsx). Both the background and the icon
// converge on this same tone on hover, regardless of category.
const HOVER_FROM = "#5D5FEF";
const HOVER_TO = "#4949D6";

// Single shared background for all 5 categories — a flat dark indigo
// (previously neutral-900 → neutral-800, which read as a blue-vs-black
// contrast against the page's own indigo Hero block above). #2F3293 keeps
// the thumbnail in the same indigo family as that Hero's own gradient for
// a coherent monochromatic composition instead. Both stops share the same
// value (a flat fill) rather than reintroducing a two-tone gradient, per
// explicit request.
const BACKGROUND_FROM = "#2F3293";
const BACKGROUND_TO = "#2F3293";

// Every icon shares the same brand indigo (primary-600, see
// app/globals.css) instead of its own hue — only the icon shape still
// varies by industry. Verified against white: 4.83:1, clearing both the
// ~3:1 non-text bar (icon) and the 4.5:1 small-text bar (the category
// label on case-card.tsx, which reuses this same color via
// industryColorFor).
const ICON_COLOR = "#5D5FEF";

const INDUSTRY_ICONS: Record<IndustryKey, { Icon: ComponentType<IconProps> }> = {
  salud: { Icon: HeartPulseIcon },
  restaurantes: { Icon: UtensilsIcon },
  arquitectura: { Icon: BuildingIcon },
  construccion: { Icon: BuildingConstructionIcon },
  "cajas-compensacion": { Icon: UsersIcon },
  tecnologia: { Icon: WebIcon },
  retail: { Icon: ShoppingBagIcon },
};

// Exposes the shared indigo icon color so other elements (e.g. the
// category label on case-card.tsx) can stay visually consistent with the
// thumbnail without duplicating the hex value.
export function industryColorFor(): string {
  return ICON_COLOR;
}

// Same visual language as the "Sobre nosotros" Hero's right column: a
// graph-paper grid over a diagonal neutral gradient, a thin centered
// vertical divider, and a white rounded card floating in the center with a
// line icon. The background/grid/divider are identical across every
// category — only the icon (shape + color) changes. Must be rendered
// inside a `group`-classed ancestor (e.g. the case-card Link) —
// hover/focus-visible on that ancestor crossfades both the background and
// the icon color to the shared blue reference.
export function IndustryHeaderBackground({
  industryKey,
  className,
  cardSize = 140,
  iconSize = 64,
}: {
  industryKey: IndustryKey;
  className?: string;
  /** Card side length in px (square). */
  cardSize?: number;
  /** Icon side length in px (square). */
  iconSize?: number;
}) {
  const { Icon } = INDUSTRY_ICONS[industryKey];

  return (
    <div className={className}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: `linear-gradient(135deg, ${BACKGROUND_FROM} 0%, ${BACKGROUND_TO} 100%)` }}
      />
      {/* Hover crossfade — a second full gradient layer faded in by
          opacity, since background-image itself can't be transitioned
          between two different gradients (same technique as the case
          card's own hover fill, see case-card.tsx). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{ backgroundImage: `linear-gradient(135deg, ${HOVER_FROM} 0%, ${HOVER_TO} 100%)` }}
      />

      {/* Graph-paper grid, white lines (same 64px cells as the "Sobre
          nosotros" Hero). */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Purely decorative vertical divider, centered. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
      />

      {/* White card, identical across every category — only the icon
          inside (shape + color) changes, crossfading to the same blue
          reference tone as the background on hover. */}
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] border border-white/20 bg-white"
        style={{ height: cardSize, width: cardSize }}
      >
        <div className="relative" style={{ height: iconSize, width: iconSize }}>
          <Icon
            className="absolute inset-0 h-full w-full transition-opacity duration-200 ease-out group-hover:opacity-0 group-focus-visible:opacity-0"
            style={{ color: ICON_COLOR }}
          />
          <Icon
            className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ color: HOVER_FROM }}
          />
        </div>
      </div>
    </div>
  );
}
