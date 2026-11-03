import { useSvgId } from "@/hooks/useSvgId";
import { cn } from "@/lib/cn";
import { createRng, r1 } from "@/lib/prng";
import { poly } from "@/lib/svg";

interface LightRaysProps {
  seed?: number;
  count?: number;
  color?: string;
  /** Horizontal position of the light source, 0-100. */
  originX?: number;
  className?: string;
}

/** Fan of soft god-rays falling from above the frame. Parent controls blending and animation. */
export function LightRays({ seed = 4, count = 9, color = "#BAE6FD", originX = 50, className }: LightRaysProps) {
  const id = useSvgId("rays");
  const rng = createRng(seed);
  const ox = originX * 10;
  const rays = Array.from({ length: count }, () => {
    const angle = rng.range(-0.75, 0.75);
    const bx = ox + Math.tan(angle) * 1100;
    const width = rng.range(36, 150);
    return { d: poly([ox - 6, -80], [ox + 6, -80], [r1(bx + width / 2), 1000], [r1(bx - width / 2), 1000]), o: r1(rng.range(0.35, 1)) };
  });

  return (
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false" className={cn("block", className)}>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="-80" x2="0" y2="1000">
          <stop stopColor={color} stopOpacity="0.5" />
          <stop offset="0.55" stopColor={color} stopOpacity="0.12" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {rays.map((r, i) => (
        <path key={i} d={r.d} fill={`url(#${id})`} opacity={r.o} />
      ))}
    </svg>
  );
}
