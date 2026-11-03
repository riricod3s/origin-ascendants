import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { r2 } from "@/lib/prng";
import { LogoMark } from "./LogoMark";

interface LogoEmblemProps {
  className?: string;
  /** Plays the one-time "eye awakening" reveal and draws the outer ring. */
  intro?: boolean;
}

// Constellation points around the emblem, echoing the dots and runes on its face.
const STARS = [
  { a: -78, r: 1.5, d: 0 },
  { a: -40, r: 0.9, d: 1.1 },
  { a: 8, r: 1.2, d: 2.2 },
  { a: 47, r: 0.8, d: 0.6 },
  { a: 92, r: 1.4, d: 1.7 },
  { a: 136, r: 0.9, d: 2.8 },
  { a: 181, r: 1.2, d: 0.3 },
  { a: 224, r: 0.8, d: 1.4 },
  { a: 262, r: 1.1, d: 2.5 },
];
const RING_R = 57;

function point(angle: number, radius = RING_R) {
  const rad = (angle * Math.PI) / 180;
  // Rounded so server and browser trig output serialize identically (avoids hydration mismatches).
  return { x: r2(60 + Math.cos(rad) * radius), y: r2(60 + Math.sin(rad) * radius) };
}

/**
 * The animated presentation of the eye emblem used on the loader and route curtain.
 * Motion stays gentle and never rotates the emblem itself, which is a detailed, oriented mark.
 */
export function LogoEmblem({ className, intro = false }: LogoEmblemProps) {
  const links = [
    [0, 1],
    [1, 2],
    [4, 5],
    [6, 7],
  ] as const;

  return (
    <div className={cn("relative isolate grid place-items-center", className)}>
      <div
        aria-hidden="true"
        className="absolute -inset-[55%] -z-10 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgb(251_146_60/0.30)_0%,rgb(251_191_36/0.12)_30%,rgb(56_189_248/0.10)_50%,transparent_70%)] blur-2xl"
      />

      <svg aria-hidden="true" viewBox="0 0 120 120" className="absolute -inset-[20%] size-[140%] overflow-visible">
        <defs>
          <linearGradient id="oa-emblem-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r={RING_R}
          fill="none"
          stroke="url(#oa-emblem-ring)"
          strokeWidth="0.5"
          pathLength={1}
          className={cn("logo-ring", intro && "logo-ring-draw")}
        />
        <circle cx="60" cy="60" r={RING_R + 4.5} fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="0.35" strokeDasharray="0.6 2.4" />
        <g className={cn(intro && "logo-stars-in")}>
          {links.map(([from, to]) => {
            const p1 = point(STARS[from].a);
            const p2 = point(STARS[to].a);
            return (
              <line
                key={`${from}-${to}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="rgb(253 230 138 / 0.18)"
                strokeWidth="0.3"
              />
            );
          })}
          {STARS.map((star) => {
            const { x, y } = point(star.a);
            return (
              <circle
                key={star.a}
                cx={x}
                cy={y}
                r={star.r}
                fill="#fde68a"
                className="svg-twinkle"
                style={{ animationDelay: `${star.d}s` } as CSSProperties}
              />
            );
          })}
        </g>
      </svg>

      <LogoMark animated className={cn("relative size-full", intro && "logo-awaken")} />
      {/* A light that kindles in the pupil, so the eye feels awake. */}
      <span aria-hidden="true" className={cn("logo-glint", intro && "logo-glint-intro")} />
    </div>
  );
}
