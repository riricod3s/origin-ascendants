import { cn } from "@/lib/cn";
import { createRng, r1 } from "@/lib/prng";

interface CloudShapeProps {
  seed?: number;
  color?: string;
  shade?: string;
}

/** Cloud drawn in a 260 x 110 box with a flat base. Reused by scenes and the hero. */
export function CloudShape({ seed = 1, color = "#eaf2ff", shade = "#9db4e8" }: CloudShapeProps) {
  const rng = createRng(seed);
  const bumps = rng.int(4, 6);
  const blobs = Array.from({ length: bumps }, (_, i) => {
    const t = bumps === 1 ? 0.5 : i / (bumps - 1);
    const hump = Math.sin(Math.PI * t);
    const r = r1(15 + rng.range(0, 9) + hump * rng.range(10, 20));
    return { cx: r1(38 + t * 184), cy: r1(86 - r * 0.92 - hump * rng.range(0, 6)), r };
  });

  return (
    <g>
      <rect x="18" y="62" width="224" height="28" rx="14" fill={shade} opacity="0.5" />
      <g fill={color}>
        <rect x="18" y="58" width="224" height="28" rx="14" />
        {blobs.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r} />
        ))}
      </g>
      <rect x="32" y="75" width="196" height="11" rx="5.5" fill={shade} opacity="0.32" />
    </g>
  );
}

interface CloudProps extends CloudShapeProps {
  className?: string;
}

export function Cloud({ className, ...shape }: CloudProps) {
  return (
    <svg viewBox="0 0 260 110" aria-hidden="true" focusable="false" className={cn("block", className)}>
      <CloudShape {...shape} />
    </svg>
  );
}
