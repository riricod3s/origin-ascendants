"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Soft celestial spotlight that trails the pointer. Hidden on touch devices and for reduced motion. */
export function MouseLight() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const smoothX = useSpring(x, { stiffness: 110, damping: 22, mass: 0.7 });
  const smoothY = useSpring(y, { stiffness: 110, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 320);
      y.set(event.clientY - 320);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 size-[640px] rounded-full [@media(pointer:coarse)]:hidden"
      style={{
        x: smoothX,
        y: smoothY,
        background: "radial-gradient(circle, rgba(56,189,248,0.11) 0%, rgba(167,139,250,0.06) 38%, transparent 68%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
