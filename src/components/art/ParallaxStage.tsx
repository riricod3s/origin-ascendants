"use client";

import { createContext, useContext, useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, motionValue, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";

interface StageState {
  /** Smoothed pointer position, -1 (left / top) to 1 (right / bottom). */
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  /** 0 when the stage top meets the viewport top, 1 when it has scrolled fully out. */
  scroll: MotionValue<number>;
  enabled: boolean;
}

const idle: StageState = { mouseX: motionValue(0), mouseY: motionValue(0), scroll: motionValue(0), enabled: false };
const StageContext = createContext<StageState>(idle);

const SPRING = { stiffness: 42, damping: 18, mass: 0.8 };

/** Provides pointer + scroll parallax to every <ParallaxLayer> inside it. Must be `position: relative` (or absolute). */
export function ParallaxStage({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, SPRING);
  const mouseY = useSpring(rawY, SPRING);
  const enabled = !reduceMotion;

  useEffect(() => {
    if (!enabled || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  const value = useMemo<StageState>(() => ({ mouseX, mouseY, scroll: scrollYProgress, enabled }), [mouseX, mouseY, scrollYProgress, enabled]);

  return (
    <StageContext.Provider value={value}>
      <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
        {children}
      </div>
    </StageContext.Provider>
  );
}

interface ParallaxLayerProps {
  /** 0 = backdrop that barely moves, 1 = closest to the viewer. */
  depth?: number;
  /** Vertical offset (px) the layer rises from once the loading screen has finished. */
  rise?: number;
  /** Entrance delay in seconds. */
  delay?: number;
  /** Positions and sizes the layer. */
  className?: string;
  /** Classes for the element that plays the entrance animation. */
  innerClassName?: string;
  children?: ReactNode;
}

export function ParallaxLayer({ depth = 0.3, rise = 36, delay = 0, className, innerClassName, children }: ParallaxLayerProps) {
  const { mouseX, mouseY, scroll, enabled } = useContext(StageContext);
  const k = enabled ? depth : 0;

  const x = useTransform(mouseX, [-1, 1], [-k * 48, k * 48]);
  const driftY = useTransform(mouseY, [-1, 1], [-k * 26, k * 26]);
  const scrollY = useTransform(scroll, [0, 1], [0, k * 320]);
  const y = useTransform([driftY, scrollY], ([a, b]: number[]) => a + b);

  return (
    <motion.div style={{ x, y }} className={cn("absolute will-change-transform", className)}>
      <div
        className={cn("enter size-full", innerClassName)}
        style={{ "--rise": `${rise}px`, "--enter-delay": `${delay}s`, "--enter-duration": "1.9s" } as CSSProperties}
      >
        {children}
      </div>
    </motion.div>
  );
}
