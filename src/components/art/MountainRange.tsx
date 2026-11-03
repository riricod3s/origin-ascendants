import { useSvgId } from "@/hooks/useSvgId";
import { cn } from "@/lib/cn";
import { createRng, r1 } from "@/lib/prng";

interface MountainRangeProps {
  seed?: number;
  /** Number of main peaks across the width. */
  peaks?: number;
  /** Gradient colours, top to bottom. */
  top?: string;
  bottom?: string;
  /** 0-1: how dramatic the peaks are. */
  amplitude?: number;
  snow?: boolean;
  snowColor?: string;
  /** Darkens the right-hand faces for a crisp low-poly look. */
  facets?: boolean;
  className?: string;
}

const W = 1600;
const H = 300;

/** Procedural low-poly mountain ridgeline. Stretches horizontally (`preserveAspectRatio="none"`). */
export function MountainRange({
  seed = 1,
  peaks = 7,
  top = "#35487a",
  bottom = "#1a2548",
  amplitude = 0.8,
  snow = false,
  snowColor = "#e0f2fe",
  facets = true,
  className,
}: MountainRangeProps) {
  const id = useSvgId("mtn");
  const rng = createRng(seed);
  const step = W / peaks;

  type Pt = { x: number; y: number };
  const startPt: Pt = { x: -20, y: r1(H - H * 0.2) };
  const endPt: Pt = { x: W + 20, y: r1(H - H * 0.22) };
  const peakPts: Pt[] = [];
  const valleyPts: Pt[] = [];
  for (let i = 0; i <= peaks; i++) {
    const px = i * step + rng.range(-step * 0.16, step * 0.16);
    peakPts.push({ x: r1(px), y: r1(H - H * (0.34 + rng.range(0.18, 0.62) * amplitude)) });
    if (i < peaks) {
      const vx = (i + 0.5) * step + rng.range(-step * 0.14, step * 0.14);
      valleyPts.push({ x: r1(vx), y: r1(H - H * rng.range(0.1, 0.3)) });
    }
  }

  const outline: Pt[] = [startPt];
  peakPts.forEach((p, i) => {
    if (i > 0) outline.push(valleyPts[i - 1]);
    // shoulder gives each peak a less symmetrical profile
    const shoulder = { x: r1(p.x - step * 0.16), y: r1(p.y + (H - p.y) * rng.range(0.16, 0.34)) };
    outline.push(shoulder, p);
  });
  outline.push(endPt);

  const d = `M-20 ${H + 2} ${outline.map((p) => `L${p.x} ${p.y}`).join(" ")} L${W + 20} ${H + 2} Z`;

  const lerp = (a: Pt, b: Pt, t: number): Pt => ({ x: r1(a.x + (b.x - a.x) * t), y: r1(a.y + (b.y - a.y) * t) });

  const faces = peakPts.map((p, i) => {
    const rightValley = i < peaks ? valleyPts[i] : endPt;
    const leftValley = i > 0 ? valleyPts[i - 1] : startPt;
    const shadow = `M${p.x} ${p.y} L${rightValley.x} ${rightValley.y} L${rightValley.x} ${H + 2} L${p.x} ${H + 2} Z`;
    const l = lerp(p, leftValley, 0.24);
    const rr = lerp(p, rightValley, 0.24);
    const zig1 = { x: r1(l.x + (p.x - l.x) * 0.5), y: r1(l.y + H * 0.05) };
    const zig2 = { x: r1(p.x + (rr.x - p.x) * 0.45), y: r1(rr.y + H * 0.04) };
    const cap = `M${p.x} ${p.y} L${rr.x} ${rr.y} L${zig2.x} ${zig2.y} L${p.x + 4} ${r1(zig2.y - 6)} L${zig1.x} ${zig1.y} L${l.x} ${l.y} Z`;
    return { shadow, cap, tall: p.y < H * 0.45 };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none block w-full", className)}
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id}-fill)`} />
      {facets && faces.map((f, i) => <path key={`s${i}`} d={f.shadow} fill="#020617" opacity="0.16" />)}
      {snow && faces.filter((f) => f.tall).map((f, i) => <path key={`c${i}`} d={f.cap} fill={snowColor} opacity="0.9" />)}
    </svg>
  );
}
