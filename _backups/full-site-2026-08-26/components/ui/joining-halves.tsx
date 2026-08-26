"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Renders `children` twice, each copy clipped to one half of the box
// (left/right split down the vertical center) and offset outward at rest —
// so on entrance the two halves visibly slide together and "snap" into the
// single seamless image, rather than the whole block just fading/sliding in
// as one rigid rectangle. Both copies are pixel-identical and perfectly
// overlaid at x:0, so once settled it reads exactly like the unanimated
// version; only the approach differs. Decorative only (aria-hidden) — don't
// pass interactive content as children, since it renders twice.
export function JoiningHalves({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "0px 0px -40px 0px" } as const;
  const transition = { duration: 0.7, ease: "easeOut" as const };

  return (
    <div className={className} aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ ...style, clipPath: "inset(0 50% 0 0)" }}
        initial={shouldReduceMotion ? false : { x: -32 }}
        whileInView={{ x: 0 }}
        viewport={viewport}
        transition={transition}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{ ...style, clipPath: "inset(0 0 0 50%)" }}
        initial={shouldReduceMotion ? false : { x: 32 }}
        whileInView={{ x: 0 }}
        viewport={viewport}
        transition={transition}
      >
        {children}
      </motion.div>
    </div>
  );
}
