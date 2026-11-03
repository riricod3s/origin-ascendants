import { cn } from "@/lib/cn";
import { r1 } from "@/lib/prng";

interface CelestialRingProps {
  className?: string;
  primary?: string;
  secondary?: string;
  accent?: string;
}

/** Concentric astrolabe ring: ticks, glyphs and orbiting stars. Rotation is pure CSS. */
export function CelestialRing({ className, primary = "#38BDF8", secondary = "#A78BFA", accent = "#FBBF24" }: CelestialRingProps) {
  const ticks = Array.from({ length: 120 }, (_, i) => {
    const a = (i / 120) * Math.PI * 2;
    const rIn = i % 5 === 0 ? 244 : 252;
    const rOut = 262;
    return `M${r1(Math.cos(a) * rIn)} ${r1(Math.sin(a) * rIn)}L${r1(Math.cos(a) * rOut)} ${r1(Math.sin(a) * rOut)}`;
  }).join("");

  const tri = (offset: number) =>
    [0, 1, 2]
      .map((k) => {
        const a = ((offset + k * 120) * Math.PI) / 180;
        return `${r1(Math.cos(a) * 150)} ${r1(Math.sin(a) * 150)}`;
      })
      .join("L");

  return (
    <svg viewBox="-300 -300 600 600" aria-hidden="true" focusable="false" className={cn("block", className)}>
      <circle r="288" fill="none" stroke={primary} strokeOpacity="0.5" strokeWidth="1.2" />
      <circle r="280" fill="none" stroke={primary} strokeOpacity="0.28" strokeWidth="0.8" strokeDasharray="2 9" />
      <g className="svg-spin-slow">
        <circle r="262" fill="none" stroke="none" />
        <path d={ticks} stroke={primary} strokeOpacity="0.5" strokeWidth="1" />
      </g>
      <circle r="236" fill="none" stroke={secondary} strokeOpacity="0.32" strokeWidth="1" />
      <g className="svg-spin-rev">
        <circle r="222" fill="none" stroke="none" />
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 30}) translate(0 -222)`}>
            <path d="M0 -8L4.6 0L0 8L-4.6 0Z" fill={i % 3 === 0 ? accent : secondary} fillOpacity={i % 3 === 0 ? 0.9 : 0.6} />
          </g>
        ))}
      </g>
      <circle r="204" fill="none" stroke={primary} strokeOpacity="0.22" strokeWidth="0.8" />
      <g className="svg-spin-slow" style={{ animationDuration: "200s" }}>
        <circle r="150" fill="none" stroke="none" />
        <path d={`M${tri(-90)}Z`} fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
        <path d={`M${tri(90)}Z`} fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
      </g>
      <circle r="150" fill="none" stroke={secondary} strokeOpacity="0.25" strokeWidth="0.8" />
      <circle r="96" fill="none" stroke={primary} strokeOpacity="0.3" strokeWidth="0.8" strokeDasharray="4 8" />
      <g className="svg-spin-slow" style={{ animationDuration: "70s" }}>
        <circle r="288" fill="none" stroke="none" />
        <circle cx="288" cy="0" r="5" fill={accent} />
        <circle cx="288" cy="0" r="12" fill={accent} opacity="0.25" />
      </g>
      <g className="svg-spin-rev" style={{ animationDuration: "110s" }}>
        <circle r="204" fill="none" stroke="none" />
        <circle cx="0" cy="-204" r="4" fill={primary} />
        <circle cx="0" cy="-204" r="10" fill={primary} opacity="0.25" />
      </g>
    </svg>
  );
}
