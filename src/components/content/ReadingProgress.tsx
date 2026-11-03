"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar across the top of the viewport that tracks article reading progress. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-aether via-arcane to-solar shadow-[0_0_12px_rgb(56_189_248/0.7)]"
    />
  );
}
