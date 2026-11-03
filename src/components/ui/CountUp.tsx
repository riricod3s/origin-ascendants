"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Digits after the decimal point. */
  decimals?: number;
}

/** Counts up to `value` once it scrolls into view. The final value is always available to assistive tech. */
export function CountUp({ value, prefix = "", suffix = "", duration = 1.8, decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const display = useTransform(progress, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : formatNumber(Math.round(latest)),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(progress, value, { duration: reduce ? 0 : duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, value, duration, reduce, progress]);

  const final = decimals > 0 ? value.toFixed(decimals) : formatNumber(value);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${final}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        <motion.span className="tabular-nums">{display}</motion.span>
        {suffix}
      </span>
    </span>
  );
}
