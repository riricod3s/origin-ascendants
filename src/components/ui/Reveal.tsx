"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const VIEWPORT = { once: true, amount: "some", margin: "0px 0px -8% 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px (positive = rises into place). */
  y?: number;
  /** Horizontal travel in px. */
  x?: number;
  duration?: number;
  /** Scale the element up from this value. */
  scale?: number;
}

/** Fades and slides its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 28, x = 0, duration = 0.85, scale = 1 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  gap?: number;
  delay?: number;
}

/** Container that reveals `StaggerItem` children one after another. */
export function Stagger({ children, className, gap = 0.08, delay = 0 }: StaggerProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : gap, delayChildren: reduce ? 0 : delay } },
  };

  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={VIEWPORT} variants={variants}>
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
}

export function StaggerItem({ children, className, y = 26, scale = 0.97 }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, scale },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: EASE_OUT } },
      };

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}
