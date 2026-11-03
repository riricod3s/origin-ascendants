import type { ReactNode } from "react";
import { useSvgId } from "@/hooks/useSvgId";
import { cn } from "@/lib/cn";
import { r1 } from "@/lib/prng";
import { poly } from "@/lib/svg";
import type { FlagEmblem, FlagPattern, FlagSpec } from "@/types/content";

/* Emblems are drawn in a 40 x 40 box centred on the origin and inherit `currentColor`. */

function starPath(outer: number, inner: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${r1(Math.cos(angle) * radius)} ${r1(Math.sin(angle) * radius)}`);
  }
  return `M${pts.join("L")}Z`;
}

const SUN_RAYS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  return `M${r1(Math.cos(a) * 12.5)} ${r1(Math.sin(a) * 12.5)}L${r1(Math.cos(a) * 19)} ${r1(Math.sin(a) * 19)}`;
}).join("");

const EMBLEMS: Record<FlagEmblem, ReactNode> = {
  sun: (
    <>
      <circle r="8.5" />
      <path d={SUN_RAYS} fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </>
  ),
  wave: (
    <g fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round">
      <path d="M-18 -9q4.5 -6 9 0t9 0t9 0t9 0" />
      <path d="M-18 1q4.5 -6 9 0t9 0t9 0t9 0" />
      <path d="M-18 11q4.5 -6 9 0t9 0t9 0t9 0" />
    </g>
  ),
  anvil: <path d="M-19 -10H15L20 -5 13 -1H8L11 8H15V13H-15V8H-11L-8 -1H-12Q-19 -2 -19 -10Z" />,
  tree: (
    <>
      <path d="M0 -19L11 -5H5L14 7H-14L-5 -5H-11Z" />
      <rect x="-2.6" y="6" width="5.2" height="12" />
    </>
  ),
  moon: <path d="M5.75 -16A17 17 0 1 0 16.25 5A13 13 0 1 1 5.75 -16Z" />,
  peak: <path d="M-19 14L-6 -8L0 1L8 -15L19 14Z" />,
  star: <path d={starPath(19, 7.8)} />,
  crown: <path d="M-17 11L-19 -10L-9 -2L0 -15L9 -2L19 -10L17 11Z" />,
  wing: <path d="M-18 9C-14 -8 0 -16 19 -15C13 -9 11 -5 5 -4C11 -4 13 0 9 4C4 2 3 3 -1 5C1 8 1 9 -6 11C-9 9 -12 9 -18 9Z" />,
  tower: <path fillRule="evenodd" d="M-9 15V-6H-13V-14H-6V-9H-2V-14H2V-9H6V-14H13V-6H9V15ZM-3 15V5a3 3 0 0 1 6 0V15Z" />,
};

function Emblem({ kind, x, y, size, color }: { kind: FlagEmblem; x: number; y: number; size: number; color: string }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${r1(size / 40)})`}>
      <g fill="#0b1020" color="#0b1020" opacity="0.3" transform="translate(1.6 2.2)">
        {EMBLEMS[kind]}
      </g>
      <g fill="currentColor" color={color}>
        {EMBLEMS[kind]}
      </g>
    </g>
  );
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function Field({ pattern, colors, x, y, w, h }: Rect & { pattern: FlagPattern; colors: readonly [string, string, string] }) {
  const [a, b] = colors;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const base = <rect x={x} y={y} width={w} height={h} fill={a} />;
  switch (pattern) {
    case "horizontal":
      return (
        <>
          {base}
          <rect x={x} y={cy} width={w} height={h / 2} fill={b} />
        </>
      );
    case "vertical":
      return (
        <>
          {base}
          <rect x={cx} y={y} width={w / 2} height={h} fill={b} />
        </>
      );
    case "cross": {
      const t = Math.min(w, h) * 0.18;
      return (
        <>
          {base}
          <rect x={x + w * 0.34 - t / 2} y={y} width={t} height={h} fill={b} />
          <rect x={x} y={cy - t / 2} width={w} height={t} fill={b} />
        </>
      );
    }
    case "diagonal":
      return (
        <>
          {base}
          <path d={poly([x, y + h], [x + w, y], [x + w, y + h])} fill={b} />
        </>
      );
    case "chevron":
      return (
        <>
          {base}
          <path d={poly([x, y], [x + w * 0.52, cy], [x, y + h])} fill={b} />
        </>
      );
    case "quartered":
      return (
        <>
          {base}
          <rect x={cx} y={y} width={w / 2} height={h / 2} fill={b} />
          <rect x={x} y={cy} width={w / 2} height={h / 2} fill={b} />
        </>
      );
    case "sunburst": {
      const reach = Math.max(w, h) * 1.3;
      return (
        <>
          {base}
          {Array.from({ length: 12 }, (_, i) => {
            const mid = (i / 12) * Math.PI * 2;
            const half = Math.PI / 24;
            return <path key={i} d={poly([cx, cy], [cx + Math.cos(mid - half) * reach, cy + Math.sin(mid - half) * reach], [cx + Math.cos(mid + half) * reach, cy + Math.sin(mid + half) * reach])} fill={b} />;
          })}
        </>
      );
    }
  }
}

function ClothShading({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#fff" stopOpacity="0.2" />
        <stop offset="0.2" stopColor="#000" stopOpacity="0.14" />
        <stop offset="0.42" stopColor="#fff" stopOpacity="0.12" />
        <stop offset="0.62" stopColor="#000" stopOpacity="0.16" />
        <stop offset="0.82" stopColor="#fff" stopOpacity="0.1" />
        <stop offset="1" stopColor="#000" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  );
}

interface FlagProps {
  spec: FlagSpec;
  className?: string;
}

/** A nation flag on a pole. 132 x 84 viewBox. */
export function Flag({ spec, className }: FlagProps) {
  const id = useSvgId("flag");
  const cloth = "M12 6Q46 -3 70 6T128 6V66Q98 76 70 66T12 66Z";
  return (
    <svg viewBox="0 0 132 84" aria-hidden="true" focusable="false" className={cn("block overflow-visible", className)}>
      <ClothShading id={id} />
      <clipPath id={`${id}-clip`}>
        <path d={cloth} />
      </clipPath>
      <rect x="3" y="2" width="5.5" height="82" rx="2.75" fill="#e6ecf8" />
      <circle cx="5.75" cy="2" r="4.2" fill="#fbbf24" />
      <g clipPath={`url(#${id}-clip)`}>
        <Field pattern={spec.pattern} colors={spec.colors} x={12} y={-4} w={116} h={84} />
        <Emblem kind={spec.emblem} x={70} y={36} size={34} color={spec.colors[2]} />
        <rect x="12" y="-4" width="116" height="84" fill={`url(#${id}-fold)`} />
      </g>
      <path d={cloth} fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />
    </svg>
  );
}

/** A hanging heraldic banner with a swallowtail. 90 x 160 viewBox. */
export function Banner({ spec, className }: FlagProps) {
  const id = useSvgId("ban");
  const body = "M14 12H76V142L45 124L14 142Z";
  return (
    <svg viewBox="0 0 90 160" aria-hidden="true" focusable="false" className={cn("block overflow-visible", className)}>
      <ClothShading id={id} />
      <clipPath id={`${id}-clip`}>
        <path d={body} />
      </clipPath>
      <path d="M22 12V4M68 12V4" stroke="#8592b8" strokeWidth="1.6" />
      <rect x="4" y="2" width="82" height="7" rx="3.5" fill="#e6ecf8" />
      <circle cx="4" cy="5.5" r="4.4" fill="#fbbf24" />
      <circle cx="86" cy="5.5" r="4.4" fill="#fbbf24" />
      <g clipPath={`url(#${id}-clip)`}>
        <Field pattern={spec.pattern} colors={spec.colors} x={14} y={10} w={62} h={134} />
        <Emblem kind={spec.emblem} x={45} y={64} size={34} color={spec.colors[2]} />
        <rect x="14" y="10" width="62" height="134" fill={`url(#${id}-fold)`} />
      </g>
      <path d={body} fill="none" stroke="#fbbf24" strokeOpacity="0.55" strokeWidth="1.4" />
    </svg>
  );
}

/** Just the emblem, for compact badges. */
export function EmblemMark({ spec, className }: FlagProps) {
  return (
    <svg viewBox="-22 -22 44 44" aria-hidden="true" focusable="false" className={cn("block", className)}>
      <g fill="currentColor" color={spec.colors[2]}>
        {EMBLEMS[spec.emblem]}
      </g>
    </svg>
  );
}
