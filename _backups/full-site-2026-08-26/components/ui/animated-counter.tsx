"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const NUMBER_PATTERN = /^([+-]?)(\d+(?:\.\d+)?)(.*)$/;

function formatValue(sign: string, amount: number, decimals: number, suffix: string) {
  const prefix = sign === "+" ? "+" : "";
  return `${prefix}${amount.toFixed(decimals)}${suffix}`;
}

export function AnimatedCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const match = value.match(NUMBER_PATTERN);

  const [display, setDisplay] = useState(() => {
    if (!match) return value;
    const [, sign, numStr, suffix] = match;
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    return formatValue(sign, 0, decimals, suffix);
  });

  useEffect(() => {
    if (!isInView || !match || shouldReduceMotion) return;

    const [, sign, numStr, suffix] = match;
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const target = sign === "-" ? -parseFloat(numStr) : parseFloat(numStr);

    const controls = animate(0, target, {
      duration: 1.75,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(formatValue(sign, latest, decimals, suffix));
      },
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {!match || shouldReduceMotion ? value : display}
    </span>
  );
}
