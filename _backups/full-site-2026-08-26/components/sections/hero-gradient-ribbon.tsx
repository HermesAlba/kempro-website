// CSS approximation of the stripe.com/es-us Hero background: on the real
// site this is a WebGL2 canvas (`hero-wave-animation__canvas`) rendering a
// custom shader — confirmed by inspecting the live page (canvas.getContext
// returns "webgl2"), so it isn't something to copy directly. This recreates
// the visual instead: a soft, blurred diagonal "ribbon" that sweeps through
// the same color sequence (periwinkle → indigo → orange → pink → light
// pink), confined to roughly the right half of the Hero — Stripe's ribbon
// doesn't span the full width either, it's anchored to the right with the
// headline sitting in the clear space on the left.
//
// Implementation: a repeating-linear-gradient (so the band sequence tiles
// seamlessly) on an oversized, rotated, blurred div. The animation just
// drifts the gradient's background-position back and forth — cheap (pure
// CSS, no canvas/WebGL) and reads as the same slow, organic color flow.
// mask-image fades the ribbon out toward the left edge of its own
// container so it blends into the white background behind the headline
// instead of ending in a hard vertical line.
export function HeroGradientRibbon({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 right-0 w-full overflow-hidden sm:w-[70%] lg:w-[58%] ${className ?? ""}`}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 35%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 35%)",
      }}
      aria-hidden="true"
    >
      <div className="hero-gradient-ribbon__inner absolute -inset-x-1/3 -inset-y-1/4" />
    </div>
  );
}
