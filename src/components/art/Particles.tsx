"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { createRng } from "@/lib/prng";
import { cn } from "@/lib/cn";

const DEFAULT_COLORS = ["#e0f2fe", "#7dd3fc", "#c4b5fd", "#fde68a"];

interface ParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
  seed?: number;
  minSize?: number;
  maxSize?: number;
  /** Multiplier for drift speed. */
  speed?: number;
  /** `rise` floats upwards like glowing motes, `drift` wanders sideways. */
  mode?: "rise" | "drift";
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  twinkle: number;
  color: string;
  alpha: number;
}

const TAU = Math.PI * 2;

/** Lightweight canvas mote field. Pauses when off-screen or hidden and renders one still frame for reduced motion. */
export function Particles({
  count = 70,
  colors = DEFAULT_COLORS,
  className,
  seed = 7,
  minSize = 0.6,
  maxSize = 2.3,
  speed = 1,
  mode = "rise",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const colorKey = colors.join("|");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const palette = colorKey.split("|");
    const rng = createRng(seed);
    const total = Math.round(count * (window.innerWidth < 640 ? 0.55 : 1));
    const particles: Particle[] = Array.from({ length: total }, () => ({
      x: rng.next(),
      y: rng.next(),
      r: rng.range(minSize, maxSize),
      vx: rng.range(-0.012, 0.012) * speed + (mode === "drift" ? 0.015 * speed : 0),
      vy: mode === "rise" ? -rng.range(0.008, 0.034) * speed : rng.range(-0.006, 0.006) * speed,
      phase: rng.range(0, TAU),
      twinkle: rng.range(0.6, 2.2),
      color: rng.pick(palette),
      alpha: rng.range(0.35, 0.95),
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let inView = true;

    const draw = (seconds: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const pulse = 0.55 + 0.45 * Math.sin(seconds * p.twinkle + p.phase);
        const x = p.x * width;
        const y = p.y * height;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * pulse * 0.28;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 3.2, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = p.alpha * pulse;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      frame = requestAnimationFrame(step);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.y < -0.02) p.y = 1.02;
        else if (p.y > 1.02) p.y = -0.02;
        if (p.x < -0.02) p.x = 1.02;
        else if (p.x > 1.02) p.x = -0.02;
      }
      draw(now / 1000);
    };

    const start = () => {
      if (frame || reduceMotion || !inView || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now() / 1000);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, colorKey, seed, minSize, maxSize, speed, mode, reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 size-full", className)} />;
}
