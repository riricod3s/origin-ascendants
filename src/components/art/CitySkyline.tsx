import { useSvgId } from "@/hooks/useSvgId";
import { cn } from "@/lib/cn";
import { createRng, r1 } from "@/lib/prng";
import { poly } from "@/lib/svg";

interface CitySkylineProps {
  seed?: number;
  top?: string;
  bottom?: string;
  /** Window glow colour. Set to "" to hide windows. */
  glow?: string;
  className?: string;
}

const W = 1600;
const H = 260;

/** Silhouette of a sky kingdom: towers, domes, spires and walls. Fixed viewBox, scales with width. */
export function CitySkyline({ seed = 9, top = "#2b3a78", bottom = "#141d42", glow = "#fbbf24", className }: CitySkylineProps) {
  const id = useSvgId("city");
  const rng = createRng(seed);

  type Shape = { d: string; kind: string };
  const shapes: Shape[] = [];
  const windows: { x: number; y: number }[] = [];

  let x = -10;
  while (x < W + 10) {
    const w = r1(rng.range(22, 64));
    const center = 1 - Math.abs((x + w / 2) / W - 0.5) * 2;
    const h = r1(34 + center * center * 118 + rng.range(0, 70));
    const kind = rng.pick(["tower", "tower", "dome", "spire", "block", "keep"] as const);
    const y = H;
    const cx = x + w / 2;
    let d = "";
    if (kind === "tower") {
      d = poly([x, y], [x, y - h], [cx - w * 0.1, y - h], [cx, y - h - w * 0.95], [cx + w * 0.1, y - h], [x + w, y - h], [x + w, y]);
    } else if (kind === "dome") {
      d = `M${r1(x)} ${y}V${r1(y - h)}H${r1(x + w)}V${y}ZM${r1(x - 3)} ${r1(y - h)}A${r1(w / 2 + 3)} ${r1(w * 0.62)} 0 0 1 ${r1(x + w + 3)} ${r1(y - h)}Z`;
    } else if (kind === "spire") {
      d = poly([x, y], [x, y - h * 0.7], [cx - w * 0.22, y - h * 0.7], [cx, y - h * 1.5], [cx + w * 0.22, y - h * 0.7], [x + w, y - h * 0.7], [x + w, y]);
    } else if (kind === "keep") {
      const m = w / 5;
      d = poly([x, y], [x, y - h], [x + m * 0.6, y - h], [x + m * 0.6, y - h - 7], [x + m * 1.6, y - h - 7], [x + m * 1.6, y - h], [x + m * 2.4, y - h], [x + m * 2.4, y - h - 7], [x + m * 3.4, y - h - 7], [x + m * 3.4, y - h], [x + w, y - h], [x + w, y]);
    } else {
      d = poly([x, y], [x, y - h * 0.8], [x + w, y - h * 0.92], [x + w, y]);
    }
    shapes.push({ d, kind });
    if (glow && w > 26 && rng.chance(0.65)) {
      const rows = Math.max(1, Math.floor(h / 34));
      for (let r = 0; r < rows; r++) {
        if (rng.chance(0.7)) windows.push({ x: r1(cx - 1.6), y: r1(y - 16 - r * 28) });
      }
    }
    x += w + r1(rng.range(-6, 6));
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false" className={cn("block w-full", className)}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        {shapes.map((s, i) => (
          <path key={i} d={s.d} />
        ))}
      </g>
      {glow && (
        <g fill={glow}>
          {windows.map((win, i) => (
            <rect key={i} x={win.x} y={win.y} width="3.2" height="6.4" rx="1.4" opacity={i % 3 === 0 ? 0.95 : 0.6} className={i % 5 === 0 ? "svg-flicker" : undefined} />
          ))}
        </g>
      )}
    </svg>
  );
}
