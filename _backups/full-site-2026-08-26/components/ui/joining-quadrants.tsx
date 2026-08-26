"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Renderiza `children` 4 veces, cada copia clippeada a un cuadrante (25%)
// de la caja, desplazada en diagonal hacia afuera de su propia esquina en
// el estado inicial. Las 4 esquinas se deslizan hacia el centro al mismo
// tiempo, en un solo movimiento simultáneo, en vez de en dos pasos.
const QUADRANTS = [
  { clip: "inset(0 50% 50% 0)", from: { x: -32, y: -32 }, delay: 0 }, // 1: sup-izq
  { clip: "inset(0 0 50% 50%)", from: { x: 32, y: -32 }, delay: 0 }, // 2: sup-der
  { clip: "inset(50% 50% 0 0)", from: { x: -32, y: 32 }, delay: 0 }, // 3: inf-izq
  { clip: "inset(50% 0 0 50%)", from: { x: 32, y: 32 }, delay: 0 }, // 4: inf-der
] as const;

export function JoiningQuadrants({
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

  return (
    <div className={className} aria-hidden="true">
      {QUADRANTS.map((q, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ ...style, clipPath: q.clip }}
          initial={shouldReduceMotion ? false : q.from}
          whileInView={{ x: 0, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeOut", delay: q.delay }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}
