import { createRng, r1 } from "@/lib/prng";
import { cn } from "@/lib/cn";

interface StarfieldProps {
  count?: number;
  seed?: number;
  className?: string;
  /** Fraction of stars that twinkle (0-1). */
  twinkle?: number;
  /** Keeps stars out of the lower part of the sky (0-1 fraction of height used). */
  height?: number;
}

/** Deterministic SVG starfield, safe to render on the server. */
export function Starfield({ count = 90, seed = 11, className, twinkle = 0.35, height = 1 }: StarfieldProps) {
  const rng = createRng(seed);
  const stars = Array.from({ length: count }, () => {
    const big = rng.chance(0.14);
    return {
      x: r1(rng.range(0, 1600)),
      y: r1(rng.range(0, 900 * height)),
      r: r1(big ? rng.range(1.5, 2.3) : rng.range(0.5, 1.2)),
      o: r1(rng.range(0.35, 0.95)),
      tw: rng.chance(twinkle),
      delay: r1(rng.range(0, 4)),
      color: big ? (rng.chance(0.5) ? "#fde68a" : "#bae6fd") : "#ffffff",
    };
  });

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={s.color}
          opacity={s.o}
          className={s.tw ? "svg-twinkle" : undefined}
          style={s.tw ? { animationDelay: `${s.delay}s`, animationDuration: `${3 + (i % 4)}s` } : undefined}
        />
      ))}
    </svg>
  );
}
