import { useSvgId } from "@/hooks/useSvgId";
import { cn } from "@/lib/cn";
import { mixHex } from "@/lib/svg";

/** Airship artwork in a 260 x 180 coordinate space. Bow faces right. */
export function AirshipArt({ id, accent = "#38BDF8", flag = "#FBBF24" }: { id: string; accent?: string; flag?: string }) {
  const light = mixHex(accent, "#ffffff", 0.55);
  const deep = mixHex(accent, "#0b1020", 0.42);
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-bal`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop stopColor={light} />
          <stop offset="0.55" stopColor={accent} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
        <linearGradient id={`${id}-hull`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#c99a69" />
          <stop offset="1" stopColor="#6f4b30" />
        </linearGradient>
      </defs>

      <path d="M92 90L100 120M112 98L114 120M130 101V120M148 98L146 120M168 90L160 120" stroke="#cbd5e1" strokeWidth="1.1" opacity="0.75" />

      <ellipse cx="130" cy="54" rx="90" ry="48" fill={`url(#${id}-bal)`} />
      <ellipse cx="130" cy="54" rx="60" ry="48" fill="#fff" opacity="0.13" />
      <ellipse cx="130" cy="54" rx="28" ry="48" fill="#fff" opacity="0.15" />
      <path d="M42 62A90 48 0 0 0 218 62Q130 92 42 62Z" fill="#0b1020" opacity="0.18" />
      <path d="M62 30A90 48 0 0 1 120 8" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M44 56Q130 76 216 56" fill="none" stroke="#fde68a" strokeWidth="2.2" opacity="0.9" />

      <path d="M70 120L36 110L44 138L78 134Z" fill={light} opacity="0.95" />
      <path d="M190 120L224 110L216 138L182 134Z" fill={light} opacity="0.95" />
      <path d="M70 120L36 110L44 138L78 134Z" fill="none" stroke={deep} strokeOpacity="0.4" strokeWidth="1" />

      <path d="M64 119H196L180 148Q130 160 80 148Z" fill={`url(#${id}-hull)`} />
      <path d="M64 119H196" stroke="#fde68a" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M78 140Q130 152 182 140" fill="none" stroke="#fde68a" strokeOpacity="0.6" strokeWidth="1.4" />
      {[96, 118, 140, 162].map((x) => (
        <g key={x}>
          <circle cx={x} cy="132" r="4.4" fill="#fde68a" />
          <circle cx={x} cy="132" r="7.5" fill="#fde68a" opacity="0.22" className="svg-pulse" />
        </g>
      ))}

      <path d="M196 126H206" stroke="#6f4b30" strokeWidth="2.4" />
      <circle cx="209" cy="127" r="3.6" fill="#fef3c7" />
      <circle cx="209" cy="127" r="9" fill="#fde68a" opacity="0.3" className="svg-pulse" />

      <g className="svg-spin" style={{ animationDuration: "0.55s" }}>
        <ellipse cx="54" cy="132" rx="2.6" ry="13" fill="#e2e8f0" />
        <ellipse cx="54" cy="132" rx="13" ry="2.4" fill="#e2e8f0" opacity="0.6" />
      </g>
      <path d="M58 132H66" stroke="#94a3b8" strokeWidth="3" />

      <path d="M76 119V92" stroke="#94a3b8" strokeWidth="1.4" />
      <path className="svg-sway" d="M76 92L96 98L76 105Z" fill={flag} />
    </g>
  );
}

interface AirshipProps {
  accent?: string;
  flag?: string;
  className?: string;
}

export function Airship({ className, ...art }: AirshipProps) {
  const id = useSvgId("ship");
  return (
    <svg viewBox="0 0 260 180" aria-hidden="true" focusable="false" className={cn("block overflow-visible", className)}>
      <AirshipArt id={id} {...art} />
    </svg>
  );
}
