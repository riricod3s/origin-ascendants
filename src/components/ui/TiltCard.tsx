"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { cn } from "@/lib/cn";
import { toneStyle } from "@/lib/tones";
import type { Tone } from "@/types/content";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  /** Maximum rotation in degrees. */
  max?: number;
  /** Makes the whole card a link. Nested interactive elements need `relative z-20`. */
  href?: string;
  /** Accessible name for the overlay link (required with `href`). */
  label?: string;
  external?: boolean;
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.45 } as const;

/** Card that tilts toward the pointer and follows it with a soft spotlight. */
export function TiltCard({ children, className, tone = "aether", max = 6, href, label, external }: TiltCardProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  const x = useTransform(px, (v) => `${(v * 100).toFixed(1)}%`);
  const y = useTransform(py, (v) => `${(v * 100).toFixed(1)}%`);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${x} ${y}, rgb(var(--tone) / 0.2), transparent 58%)`;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  const overlay = href ? (
    external ? (
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 rounded-[inherit]"
      />
    ) : (
      <TransitionLink href={href} aria-label={label} className="absolute inset-0 z-10 rounded-[inherit]" />
    )
  ) : null;

  const classes = cn(
    "group/tilt surface relative isolate rounded-3xl transition-[border-color,box-shadow] duration-500 hover:tone-border hover:shadow-lift",
    className,
  );

  if (reduce) {
    return (
      <div className={classes} style={toneStyle(tone)}>
        {children}
        {overlay}
      </div>
    );
  }

  return (
    <motion.div
      className={classes}
      style={{ ...toneStyle(tone), rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
      {overlay}
    </motion.div>
  );
}
