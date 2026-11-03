import { CloudShape } from "@/components/art/Cloud";
import { r1, type Rng } from "@/lib/prng";
import { poly } from "@/lib/svg";

/** Shared building blocks for the procedural illustrations (islands, scenes, hero). */

export const STONE = { light: "#e6ecf8", mid: "#b6c2de", dark: "#8592b8" } as const;
const SHADE = "#0b1020";

/* -------------------------------------------------------------------------- */
/* Structures. Every shape is drawn upward from its ground point (x, y).      */
/* -------------------------------------------------------------------------- */

interface ColumnProps {
  x: number;
  y: number;
  h: number;
  w?: number;
  broken?: boolean;
}

export function Column({ x, y, h, w = 9, broken = false }: ColumnProps) {
  const top = y - h;
  return (
    <g>
      <rect x={r1(x - w / 2 - 2.5)} y={r1(y - 3.5)} width={r1(w + 5)} height="3.5" fill={STONE.mid} />
      <rect x={r1(x - w / 2)} y={r1(top)} width={w} height={r1(h - 3.5)} fill={STONE.light} />
      <rect x={r1(x + w * 0.05)} y={r1(top)} width={r1(w * 0.45)} height={r1(h - 3.5)} fill={STONE.dark} opacity="0.5" />
      <path d={`M${r1(x - w * 0.2)} ${r1(top + 3)}v${r1(Math.max(h - 9, 1))}`} stroke="#fff" strokeOpacity="0.4" strokeWidth="0.8" />
      {broken ? (
        <path d={poly([x - w / 2, top], [x - w * 0.22, top - 4], [x, top + 1.5], [x + w * 0.2, top - 6], [x + w / 2, top])} fill={STONE.light} />
      ) : (
        <>
          <rect x={r1(x - w / 2 - 2.5)} y={r1(top - 3.5)} width={r1(w + 5)} height="3.5" fill={STONE.light} />
          <rect x={r1(x + w * 0.1)} y={r1(top - 3.5)} width={r1(w * 0.4 + 2.5)} height="3.5" fill={STONE.dark} opacity="0.5" />
        </>
      )}
    </g>
  );
}

export function Arch({ x, y, h = 64, span = 46 }: { x: number; y: number; h?: number; span?: number }) {
  const half = span / 2;
  const springY = y - h - 3;
  return (
    <g>
      <Column x={x - half} y={y} h={h} />
      <Column x={x + half} y={y} h={h - 20} broken />
      <path
        d={`M${r1(x - half)} ${r1(springY)}A${half} ${r1(half * 0.9)} 0 0 1 ${r1(x + half)} ${r1(springY)}`}
        fill="none"
        stroke={STONE.light}
        strokeWidth="7"
        strokeDasharray="48 12 14"
      />
    </g>
  );
}

interface TreeProps {
  x: number;
  y: number;
  h: number;
  light: string;
  shade: string;
  trunk?: string;
}

export function Conifer({ x, y, h, light, shade, trunk = "#6b4b3a" }: TreeProps) {
  const w = h * 0.5;
  const tiers: [number, number, number][] = [
    [0.62, 0.12, 0.62],
    [0.82, 0.36, 0.5],
    [1, 0.6, 0.36],
  ];
  return (
    <g>
      <rect x={r1(x - 1.6)} y={r1(y - h * 0.16)} width="3.2" height={r1(h * 0.16)} fill={trunk} />
      {tiers.map(([apex, base, hw], i) => (
        <g key={i}>
          <path d={poly([x, y - h * apex], [x + w * hw, y - h * base], [x - w * hw, y - h * base])} fill={light} />
          <path d={poly([x, y - h * apex], [x + w * hw, y - h * base], [x, y - h * base])} fill={shade} opacity="0.5" />
        </g>
      ))}
    </g>
  );
}

export function RoundTree({ x, y, h, light, shade, trunk = "#6b4b3a" }: TreeProps) {
  const r = h * 0.34;
  return (
    <g>
      <rect x={r1(x - 1.8)} y={r1(y - h * 0.4)} width="3.6" height={r1(h * 0.4)} fill={trunk} />
      <g fill={light}>
        <circle cx={r1(x - r * 0.72)} cy={r1(y - h * 0.5)} r={r1(r * 0.72)} />
        <circle cx={r1(x + r * 0.76)} cy={r1(y - h * 0.52)} r={r1(r * 0.68)} />
        <circle cx={r1(x)} cy={r1(y - h * 0.66)} r={r1(r)} />
      </g>
      <circle cx={r1(x + r * 0.55)} cy={r1(y - h * 0.5)} r={r1(r * 0.62)} fill={shade} opacity="0.35" />
      <circle cx={r1(x - r * 0.3)} cy={r1(y - h * 0.76)} r={r1(r * 0.5)} fill="#fff" opacity="0.14" />
    </g>
  );
}

interface CrystalProps {
  x: number;
  y: number;
  h: number;
  w: number;
  color: string;
}

export function Crystal({ x, y, h, w, color }: CrystalProps) {
  const half = w / 2;
  const shoulder = y - h * 0.72;
  return (
    <g>
      <circle cx={r1(x)} cy={r1(y - h * 0.5)} r={r1(h * 0.95)} fill={color} opacity="0.07" />
      <circle cx={r1(x)} cy={r1(y - h * 0.5)} r={r1(h * 0.55)} fill={color} opacity="0.1" />
      <path d={poly([x, y - h], [x - half, shoulder], [x - half * 0.86, y], [x, y])} fill={color} />
      <path d={poly([x, y - h], [x + half, shoulder], [x + half * 0.86, y], [x, y])} fill={color} />
      <path d={poly([x, y - h], [x - half, shoulder], [x - half * 0.86, y], [x, y])} fill="#fff" opacity="0.28" />
      <path d={poly([x, y - h], [x + half, shoulder], [x + half * 0.86, y], [x, y])} fill={SHADE} opacity="0.26" />
      <path d={`M${r1(x)} ${r1(y - h)}L${r1(x)} ${r1(y)}`} stroke="#fff" strokeOpacity="0.35" strokeWidth="0.8" />
    </g>
  );
}

interface HouseProps {
  x: number;
  y: number;
  w: number;
  h: number;
  roof: string;
  wall?: string;
  glow?: string;
}

export function House({ x, y, w, h, roof, wall = "#f1e6d2", glow = "#fde68a" }: HouseProps) {
  const roofH = h * 0.75;
  return (
    <g>
      <rect x={r1(x - w / 2)} y={r1(y - h)} width={r1(w)} height={r1(h)} fill={wall} />
      <rect x={r1(x)} y={r1(y - h)} width={r1(w / 2)} height={r1(h)} fill={SHADE} opacity="0.14" />
      <path d={poly([x - w / 2 - 3, y - h], [x, y - h - roofH], [x + w / 2 + 3, y - h])} fill={roof} />
      <path d={poly([x, y - h - roofH], [x + w / 2 + 3, y - h], [x, y - h])} fill={SHADE} opacity="0.18" />
      <rect x={r1(x - w * 0.2)} y={r1(y - h * 0.66)} width={r1(w * 0.22)} height={r1(h * 0.3)} rx="1" fill={glow} />
      <rect x={r1(x + w * 0.14)} y={r1(y - h * 0.5)} width={r1(w * 0.2)} height={r1(h * 0.5)} fill={SHADE} opacity="0.32" />
    </g>
  );
}

interface TowerProps {
  x: number;
  y: number;
  w: number;
  h: number;
  roof: string;
  wall?: string;
  glow?: string;
  flag?: string;
}

export function Tower({ x, y, w, h, roof, wall = STONE.light, glow = "#fde68a", flag }: TowerProps) {
  const top = y - h;
  const roofH = w * 1.2;
  const tip = top - roofH;
  return (
    <g>
      <rect x={r1(x - w / 2)} y={r1(top)} width={r1(w)} height={r1(h)} fill={wall} />
      <rect x={r1(x)} y={r1(top)} width={r1(w / 2)} height={r1(h)} fill={SHADE} opacity="0.15" />
      <rect x={r1(x - w / 2 - 1.5)} y={r1(top)} width={r1(w + 3)} height="3.4" fill={STONE.mid} />
      <path d={poly([x - w / 2 - 3.5, top + 0.5], [x, tip], [x + w / 2 + 3.5, top + 0.5])} fill={roof} />
      <path d={poly([x, tip], [x + w / 2 + 3.5, top + 0.5], [x, top + 0.5])} fill={SHADE} opacity="0.2" />
      <path d={`M${r1(x - 2.4)} ${r1(top + h * 0.42)}v-5a2.4 2.4 0 0 1 4.8 0v5z`} fill={glow} />
      <path d={`M${r1(x - 2.4)} ${r1(top + h * 0.72)}v-5a2.4 2.4 0 0 1 4.8 0v5z`} fill={glow} opacity="0.8" />
      {flag && (
        <g>
          <path d={`M${r1(x)} ${r1(tip)}v-15`} stroke={STONE.mid} strokeWidth="1.1" />
          <path className="svg-sway" d={poly([x, tip - 15], [x + 11, tip - 11.5], [x, tip - 8])} fill={flag} />
        </g>
      )}
    </g>
  );
}

export function Dome({ x, y, r, color = "#fbbf24" }: { x: number; y: number; r: number; color?: string }) {
  return (
    <g>
      <path d={`M${r1(x - r)} ${r1(y)}A${r} ${r} 0 0 1 ${r1(x + r)} ${r1(y)}Z`} fill={color} />
      <path d={`M${r1(x)} ${r1(y - r)}A${r} ${r} 0 0 1 ${r1(x + r)} ${r1(y)}H${r1(x)}Z`} fill={SHADE} opacity="0.18" />
      <path d={`M${r1(x - r * 0.55)} ${r1(y - r * 0.62)}A${r1(r * 0.8)} ${r1(r * 0.8)} 0 0 1 ${r1(x - r * 0.1)} ${r1(y - r * 0.96)}`} stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
      <rect x={r1(x - r - 2)} y={r1(y - 1.5)} width={r1(r * 2 + 4)} height="3.4" fill={STONE.mid} />
      <path d={`M${r1(x)} ${r1(y - r)}v-8`} stroke={color} strokeWidth="1.4" />
      <circle cx={r1(x)} cy={r1(y - r - 9)} r="2.2" fill="#fff7d1" />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Backgrounds                                                                */
/* -------------------------------------------------------------------------- */

export function SkyGradient({ id, stops, w = 800, h = 500 }: { id: string; stops: readonly string[]; w?: number; h?: number }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          {stops.map((c, i) => (
            <stop key={i} offset={r1(i / (stops.length - 1))} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id})`} />
    </>
  );
}

interface OrbProps {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  core?: string;
  halo?: number;
}

/** Sun or moon with a soft halo. `halo` is the halo radius multiplier. */
export function Orb({ id, x, y, r, color, core = "#fffbe6", halo = 4.5 }: OrbProps) {
  return (
    <g>
      <defs>
        <radialGradient id={id}>
          <stop stopColor={color} stopOpacity="0.55" />
          <stop offset="0.35" stopColor={color} stopOpacity="0.2" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r1(r * halo)} fill={`url(#${id})`} />
      <circle cx={x} cy={y} r={r} fill={core} />
      <circle cx={x} cy={y} r={r1(r * 1.35)} fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
    </g>
  );
}

interface StarsProps {
  rng: Rng;
  count: number;
  yMax?: number;
  w?: number;
  color?: string;
  opacity?: number;
}

export function Stars({ rng, count, yMax = 260, w = 800, color = "#ffffff", opacity = 1 }: StarsProps) {
  return (
    <g fill={color}>
      {Array.from({ length: count }, (_, i) => {
        const cx = r1(rng.range(0, w));
        const cy = r1(rng.range(0, yMax));
        const r = r1(rng.range(0.5, 1.5));
        const o = r1(rng.range(0.35, 1) * opacity);
        const twinkle = rng.chance(0.28);
        const delay = r1(-rng.range(0, 4));
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            opacity={o}
            className={twinkle ? "svg-twinkle" : undefined}
            style={twinkle ? { animationDelay: `${delay}s` } : undefined}
          />
        );
      })}
    </g>
  );
}

interface CloudBankProps {
  rng: Rng;
  y: number;
  count: number;
  /** Cloud width in viewBox units. */
  size?: number;
  color?: string;
  shade?: string;
  opacity?: number;
  w?: number;
  spread?: number;
}

export function CloudBank({ rng, y, count, size = 190, color, shade, opacity = 0.95, w = 800, spread = 26 }: CloudBankProps) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) => {
        const s = r1((size / 260) * rng.range(0.7, 1.3));
        const cx = r1(((i + rng.range(0.1, 0.9)) / count) * (w + 120) - 60);
        const cy = r1(y + rng.range(-spread, spread));
        return (
          <g key={i} transform={`translate(${cx - r1(130 * s)} ${cy - r1(86 * s)}) scale(${s})`}>
            <CloudShape seed={rng.int(1, 9999)} color={color} shade={shade} />
          </g>
        );
      })}
    </g>
  );
}

interface RidgeProps {
  id: string;
  rng: Rng;
  baseY: number;
  height: number;
  peaks?: number;
  top: string;
  bottom: string;
  snow?: string;
  w?: number;
  h?: number;
  rough?: number;
}

/** Low-poly ridgeline filled down to the bottom of the viewBox. */
export function Ridge({ id, rng, baseY, height, peaks = 6, top, bottom, snow, w = 800, h = 500, rough = 0.35 }: RidgeProps) {
  const step = w / peaks;
  const pts: [number, number][] = [[-20, baseY]];
  const tops: [number, number][] = [];
  for (let i = 0; i <= peaks; i++) {
    const px = r1(i * step + rng.range(-step * 0.18, step * 0.18));
    const py = r1(baseY - height * rng.range(1 - rough, 1));
    tops.push([px, py]);
    pts.push([r1(px - step * 0.22), r1(py + height * rng.range(0.12, 0.3))]);
    pts.push([px, py]);
    if (i < peaks) pts.push([r1(px + step * 0.5 + rng.range(-8, 8)), r1(baseY - height * rng.range(0.05, 0.28))]);
  }
  pts.push([w + 20, baseY]);
  const d = `M-20 ${h + 2}${pts.map(([x, y]) => `L${x} ${y}`).join("")}L${w + 20} ${h + 2}Z`;
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} />
      {tops.map(([px, py], i) => (
        <path key={`f${i}`} d={poly([px, py], [px + step * 0.32, py + height * 0.34], [px + step * 0.06, py + height * 0.5], [px - 6, py + height * 0.28])} fill={SHADE} opacity="0.14" />
      ))}
      {snow &&
        tops
          .filter(([, py]) => py < baseY - height * 0.55)
          .map(([px, py], i) => (
            <path key={`s${i}`} d={poly([px, py], [px + step * 0.15, py + height * 0.17], [px + step * 0.04, py + height * 0.13], [px - 4, py + height * 0.2], [px - step * 0.12, py + height * 0.15])} fill={snow} opacity="0.92" />
          ))}
    </g>
  );
}

export function MistBand({ id, y, h, color, opacity = 0.5, w = 800 }: { id: string; y: number; h: number; color: string; opacity?: number; w?: number }) {
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={color} stopOpacity="0" />
          <stop offset="0.5" stopColor={color} stopOpacity={opacity} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y={y} width={w} height={h} fill={`url(#${id})`} />
    </g>
  );
}

export function Birds({ rng, count, x0 = 80, x1 = 720, y0 = 70, y1 = 200, color = "#fff", opacity = 0.7 }: { rng: Rng; count: number; x0?: number; x1?: number; y0?: number; y1?: number; color?: string; opacity?: number }) {
  return (
    <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity={opacity}>
      {Array.from({ length: count }, (_, i) => {
        const x = r1(rng.range(x0, x1));
        const y = r1(rng.range(y0, y1));
        const s = r1(rng.range(0.7, 1.5));
        return <path key={i} d={`M${r1(x - 6 * s)} ${r1(y - 2 * s)}Q${r1(x - 3 * s)} ${r1(y - 4.5 * s)} ${x} ${y}Q${r1(x + 3 * s)} ${r1(y - 4.5 * s)} ${r1(x + 6 * s)} ${r1(y - 2 * s)}`} />;
      })}
    </g>
  );
}

export function Sparkles({ rng, count, x0 = 0, x1 = 800, y0 = 0, y1 = 500, color = "#fff", maxR = 2.4 }: { rng: Rng; count: number; x0?: number; x1?: number; y0?: number; y1?: number; color?: string; maxR?: number }) {
  return (
    <g fill={color}>
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={r1(rng.range(x0, x1))}
          cy={r1(rng.range(y0, y1))}
          r={r1(rng.range(0.8, maxR))}
          className="svg-twinkle"
          style={{ animationDelay: `${r1(-rng.range(0, 4))}s`, animationDuration: `${r1(rng.range(2.4, 5))}s` }}
        />
      ))}
    </g>
  );
}
