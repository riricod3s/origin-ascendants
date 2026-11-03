"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { toneStyle } from "@/lib/tones";
import type { Tone } from "@/types/content";

interface ProgressBarProps {
  /** 0 – 100 */
  value: number;
  /** Accessible name, e.g. "Server Hosting funding". */
  label: string;
  tone?: Tone;
  className?: string;
  trackClassName?: string;
}

/** Bar that fills with a soft shimmer the first time it scrolls into view. */
export function ProgressBar({ value, label, tone = "aether", className, trackClassName }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      style={toneStyle(tone)}
      className={cn("relative h-3.5 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10 ring-inset", trackClassName, className)}
    >
      <motion.div
        className="tone-gradient relative h-full rounded-full shadow-[0_0_18px_rgb(var(--tone)/0.55)]"
        initial={false}
        animate={{ width: reduce || inView ? `${pct}%` : "0%" }}
        transition={{ duration: reduce ? 0 : 1.7, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.15 }}
      >
        <span aria-hidden="true" className="absolute inset-0 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      </motion.div>
    </div>
  );
}
