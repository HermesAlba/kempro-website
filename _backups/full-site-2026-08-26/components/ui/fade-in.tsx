"use client";

import { motion, useReducedMotion } from "motion/react";

type Direction = "up" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 16 },
  left: { x: -24 },
  right: { x: 24 },
  // Opacity-only fade, no positional offset — for content the user is about
  // to read (page-level entrances, article bodies), where a slide-in reads
  // as unnecessary motion rather than a reveal.
  none: {},
};

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
};

export function FadeIn({ children, delay = 0, direction = "up", className }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = OFFSETS[direction];

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
