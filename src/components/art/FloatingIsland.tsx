import type { ReactNode } from "react";
import { Arch, Column, Conifer, Crystal, Dome, House, RoundTree, STONE, Tower } from "@/components/art/scene-kit";
import { useSvgId } from "@/hooks/useSvgId";
import { cn } from "@/lib/cn";
import { createRng, r1, type Rng } from "@/lib/prng";
import { poly, type Pair } from "@/lib/svg";

export type IslandVariant = "meadow" | "forest" | "ruins" | "crystal" | "castle" | "village" | "temple" | "observatory";

/** Intrinsic coordinate space of an island. */
export const ISLAND_BOX = { w: 400, h: 380 } as const;

const CX = 200;
const SY = 172;
const RX = 154;
const RY = 19;
const SHADE = "#0b1020";

interface Palette {
  g1: string;
  g2: string;
  soil: string;
  rock1: string;
  rock2: string;
}

const PALETTES: Record<IslandVariant, Palette> = {
  meadow: { g1: "#c6f6d5", g2: "#4ade80", soil: "#a37a4e", rock1: "#7f8fb8", rock2: "#2b3763" },
  forest: { g1: "#86efac", g2: "#15803d", soil: "#74543d", rock1: "#6e7eaa", rock2: "#243055" },
  ruins: { g1: "#d9f99d", g2: "#65a30d", soil: "#8a6b4a", rock1: "#8c99bf", rock2: "#2d3a66" },
  crystal: { g1: "#c7d2fe", g2: "#6d5bd0", soil: "#4f4282", rock1: "#6f72b4", rock2: "#272d66" },
  castle: { g1: "#bbf7d0", g2: "#34d399", soil: "#8a6b4a", rock1: "#8796c0", rock2: "#2a3665" },
  village: { g1: "#e1fbb0", g2: "#84cc16", soil: "#94724b", rock1: "#8a98be", rock2: "#2c3866" },
  temple: { g1: "#a7f3d0", g2: "#2dd4bf", soil: "#7d6b55", rock1: "#919fc7", rock2: "#2e3a69" },
  observatory: { g1: "#c7d2fe", g2: "#6366f1", soil: "#5b5280", rock1: "#7785b5", rock2: "#262f62" },
};

/** Random point on the island surface (ellipse), as [x, y]. */
function spot(rng: Rng, rx = 0.82, ry = 0.8): Pair {
  for (let i = 0; i < 24; i++) {
    const x = rng.range(CX - RX * rx, CX + RX * rx);
    const y = rng.range(SY - RY * ry, SY + RY * ry);
    const nx = (x - CX) / (RX * rx);
    const ny = (y - SY) / (RY * ry);
    if (nx * nx + ny * ny <= 1) return [r1(x), r1(y)];
  }
  return [CX, SY];
}

const byDepth = <T extends { y: number }>(items: T[]) => [...items].sort((a, b) => a.y - b.y);

function Decor({ variant, rng, accent }: { variant: IslandVariant; rng: Rng; accent: string }): ReactNode {
  switch (variant) {
    case "forest": {
      const trees = byDepth(
        Array.from({ length: 11 }, () => {
          const [x, y] = spot(rng, 0.88, 0.88);
          return { x, y, h: 34 + (y - 153) * 1.5 + rng.range(0, 18), round: rng.chance(0.3), teal: rng.chance(0.45) };
        }),
      );
      const flies = Array.from({ length: 8 }, () => ({ x: r1(rng.range(70, 330)), y: r1(rng.range(96, 172)), d: r1(-rng.range(0, 4)) }));
      return (
        <g>
          {trees.map((t, i) =>
            t.round ? (
              <RoundTree key={i} x={t.x} y={t.y} h={t.h * 0.9} light={t.teal ? "#2dd4bf" : "#4ade80"} shade="#064e3b" />
            ) : (
              <Conifer key={i} x={t.x} y={t.y} h={t.h} light={t.teal ? "#14b8a6" : "#22c55e"} shade="#022c22" />
            ),
          )}
          {flies.map((f, i) => (
            <circle key={`f${i}`} cx={f.x} cy={f.y} r="2.2" fill={i % 2 ? "#fde68a" : accent} className="svg-twinkle" style={{ animationDelay: `${f.d}s` }} />
          ))}
        </g>
      );
    }

    case "ruins": {
      const cols = byDepth([
        { x: CX - 94, y: SY + 4, h: 40, broken: true },
        { x: CX - 70, y: SY + 8, h: 62, broken: false },
        { x: CX + 82, y: SY + 6, h: 34, broken: true },
        { x: CX + 104, y: SY + 2, h: 52, broken: false },
      ]);
      return (
        <g>
          <rect x={CX - 66} y={SY + 4} width="132" height="6" rx="1.5" fill={STONE.mid} />
          <rect x={CX - 54} y={SY - 1} width="108" height="5.5" rx="1.5" fill={STONE.light} />
          <ellipse cx={CX - 6} cy={SY + 12} rx="46" ry="6.5" fill="none" stroke={accent} strokeOpacity="0.75" strokeWidth="1.4" />
          <ellipse cx={CX - 6} cy={SY + 12} rx="30" ry="4" fill={accent} opacity="0.22" className="svg-pulse" />
          <Arch x={CX + 8} y={SY - 2} h={70} span={50} />
          {cols.map((c, i) => (
            <Column key={i} x={c.x} y={c.y} h={c.h} broken={c.broken} />
          ))}
          <RoundTree x={CX - 130} y={SY + 6} h={42} light="#65a30d" shade="#365314" />
          <RoundTree x={CX + 128} y={SY + 4} h={36} light="#84cc16" shade="#365314" />
          <circle cx={CX + 8} cy={SY - 102} r="5" fill={accent} className="svg-float" />
          <circle cx={CX + 8} cy={SY - 102} r="13" fill={accent} opacity="0.2" className="svg-pulse" />
        </g>
      );
    }

    case "crystal": {
      const palette = [accent, "#a78bfa", "#38bdf8", "#f0abfc", "#fbbf24"];
      const crystals = byDepth([
        { x: CX, y: SY + 2, h: 118, w: 32, c: accent },
        { x: CX - 40, y: SY + 5, h: 82, w: 25, c: palette[1] },
        { x: CX + 42, y: SY + 6, h: 90, w: 26, c: palette[2] },
        { x: CX - 80, y: SY + 6, h: 54, w: 19, c: palette[3] },
        { x: CX + 84, y: SY + 4, h: 60, w: 20, c: accent },
        { x: CX - 18, y: SY + 15, h: 34, w: 14, c: palette[2] },
        { x: CX + 22, y: SY + 16, h: 28, w: 12, c: palette[4] },
        { x: CX - 56, y: SY + 14, h: 26, w: 11, c: palette[1] },
      ]);
      const shards = Array.from({ length: 4 }, (_, i) => ({
        x: r1(rng.range(60, 340)),
        y: r1(rng.range(30, 120)),
        s: r1(rng.range(4, 8)),
        c: palette[i % palette.length],
        dur: r1(rng.range(6, 10)),
        delay: r1(-rng.range(0, 6)),
      }));
      return (
        <g>
          {crystals.map((c, i) => (
            <Crystal key={i} x={c.x} y={c.y} h={c.h} w={c.w} color={c.c} />
          ))}
          {shards.map((s, i) => (
            <path key={`s${i}`} className="svg-float" style={{ animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }} d={poly([s.x, s.y - s.s * 1.6], [s.x + s.s, s.y], [s.x, s.y + s.s * 1.6], [s.x - s.s, s.y])} fill={s.c} />
          ))}
        </g>
      );
    }

    case "castle": {
      const merlons = Array.from({ length: 16 }, (_, i) => CX - 108 + i * 14);
      return (
        <g>
          <rect x={CX - 112} y={SY - 30} width="224" height="34" fill={STONE.mid} />
          <rect x={CX} y={SY - 30} width="112" height="34" fill={SHADE} opacity="0.14" />
          {merlons.map((x) => (
            <rect key={x} x={x} y={SY - 36} width="8" height="7" fill={STONE.mid} />
          ))}
          <Tower x={CX} y={SY - 6} w={36} h={112} roof={accent} flag="#fbbf24" />
          <rect x={CX - 32} y={SY - 52} width="64" height="58" fill={STONE.light} />
          <rect x={CX} y={SY - 52} width="32" height="58" fill={SHADE} opacity="0.14" />
          {Array.from({ length: 5 }, (_, i) => (
            <rect key={i} x={CX - 30 + i * 13} y={SY - 59} width="8" height="8" fill={STONE.light} />
          ))}
          <path d={`M${CX - 8} ${SY + 6}v-22a8 8 0 0 1 16 0v22z`} fill="#1e2a52" />
          <path d={`M${CX - 3} ${SY + 6}v-20a3 3 0 0 1 6 0v20z`} fill="#fde68a" opacity="0.85" />
          <Tower x={CX - 84} y={SY + 2} w={28} h={84} roof={accent} flag="#fbbf24" />
          <Tower x={CX + 86} y={SY + 4} w={26} h={70} roof="#a78bfa" flag="#38bdf8" />
          <RoundTree x={CX - 126} y={SY + 8} h={36} light="#34d399" shade="#065f46" />
          <RoundTree x={CX + 124} y={SY + 8} h={32} light="#4ade80" shade="#14532d" />
        </g>
      );
    }

    case "village": {
      const roofs = ["#fb923c", accent, "#fb7185", "#a78bfa", "#fbbf24"];
      const houses = byDepth(
        Array.from({ length: 6 }, (_, i) => {
          const [x, y] = spot(rng, 0.78, 0.8);
          return { x, y, w: 22 + rng.range(0, 10), h: 20 + rng.range(0, 14), roof: roofs[i % roofs.length] };
        }),
      );
      const trees = byDepth(Array.from({ length: 4 }, () => { const [x, y] = spot(rng, 0.92, 0.85); return { x, y }; }));
      return (
        <g>
          <path d={`M${CX - 90} ${SY + 8}Q${CX - 20} ${SY - 6} ${CX + 92} ${SY + 6}`} fill="none" stroke="#e9d5a8" strokeOpacity="0.7" strokeWidth="5" strokeLinecap="round" />
          {trees.map((t, i) => (
            <RoundTree key={`t${i}`} x={t.x} y={t.y} h={30 + (t.y - 153)} light="#65a30d" shade="#365314" />
          ))}
          {houses.map((h, i) => (
            <House key={i} x={h.x} y={h.y + 4} w={h.w} h={h.h} roof={h.roof} />
          ))}
          <Tower x={CX + 8} y={SY - 8} w={22} h={72} roof={accent} flag="#fbbf24" />
          <circle cx={CX - 60} cy={SY - 20} r="9" fill="#fde68a" opacity="0.22" />
          <circle cx={CX - 60} cy={SY - 20} r="2.6" fill="#fde68a" />
        </g>
      );
    }

    case "temple": {
      const cols = Array.from({ length: 6 }, (_, i) => CX - 65 + i * 26);
      return (
        <g>
          <rect x={CX - 98} y={SY + 4} width="196" height="7" rx="1.5" fill={STONE.mid} />
          <rect x={CX - 88} y={SY - 2} width="176" height="6.5" rx="1.5" fill={STONE.light} />
          <Dome x={CX} y={SY - 62} r={36} color="#fbbf24" />
          <ellipse cx={CX} cy={SY - 86} rx="64" ry="10" fill="none" stroke={accent} strokeOpacity="0.85" strokeWidth="1.6" className="svg-pulse" />
          <Dome x={CX - 96} y={SY - 30} r={14} color="#fcd34d" />
          <Dome x={CX + 96} y={SY - 30} r={14} color="#fcd34d" />
          {cols.map((x, i) => (
            <Column key={i} x={x} y={SY + 1} h={48} w={8} />
          ))}
          <rect x={CX - 84} y={SY - 52} width="168" height="8" fill={STONE.light} />
          <rect x={CX} y={SY - 52} width="84" height="8" fill={STONE.dark} opacity="0.45" />
          <path d={poly([CX - 88, SY - 52], [CX, SY - 76], [CX + 88, SY - 52])} fill={STONE.light} />
          <path d={poly([CX, SY - 76], [CX + 88, SY - 52], [CX, SY - 52])} fill={STONE.dark} opacity="0.45" />
          <circle cx={CX} cy={SY - 60} r="4.5" fill={accent} />
          <circle cx={CX} cy={SY - 60} r="10" fill={accent} opacity="0.25" className="svg-pulse" />
          <RoundTree x={CX - 132} y={SY + 8} h={34} light="#2dd4bf" shade="#115e59" />
          <RoundTree x={CX + 130} y={SY + 8} h={34} light="#5eead4" shade="#115e59" />
        </g>
      );
    }

    case "observatory": {
      return (
        <g>
          <Conifer x={CX - 110} y={SY + 8} h={46} light="#818cf8" shade="#312e81" />
          <Conifer x={CX - 92} y={SY + 12} h={34} light="#6366f1" shade="#312e81" />
          <Conifer x={CX + 112} y={SY + 8} h={44} light="#818cf8" shade="#312e81" />
          <House x={CX + 70} y={SY + 8} w={24} h={20} roof="#a78bfa" />
          <House x={CX - 64} y={SY + 10} w={22} h={18} roof={accent} />
          <rect x={CX - 28} y={SY - 70} width="56" height="76" fill={STONE.light} />
          <rect x={CX} y={SY - 70} width="28" height="76" fill={STONE.dark} opacity="0.45" />
          <rect x={CX - 32} y={SY - 74} width="64" height="6" fill={STONE.mid} />
          <path d={`M${CX - 4} ${SY + 6}v-18a4 4 0 0 1 8 0v18z`} fill="#1e2a52" />
          <rect x={CX - 18} y={SY - 52} width="8" height="10" rx="4" fill="#fde68a" />
          <rect x={CX + 10} y={SY - 52} width="8" height="10" rx="4" fill="#fde68a" />
          <g transform={`rotate(-34 ${CX} ${SY - 84})`}>
            <rect x={CX - 5} y={SY - 150} width="10" height="62" rx="3" fill="#94a3b8" />
            <rect x={CX - 7} y={SY - 156} width="14" height="9" rx="2" fill="#cbd5e1" />
          </g>
          <path d={`M${CX - 30} ${SY - 74}A30 30 0 0 1 ${CX + 30} ${SY - 74}Z`} fill="#eef2ff" />
          <path d={`M${CX} ${SY - 104}A30 30 0 0 1 ${CX + 30} ${SY - 74}H${CX}Z`} fill={SHADE} opacity="0.16" />
          <path d={`M${CX - 5} ${SY - 103}L${CX + 5} ${SY - 103}L${CX + 9} ${SY - 76}L${CX - 9} ${SY - 76}Z`} fill="#1e2a52" opacity="0.85" />
          <path d={poly([CX + 22, SY - 144], [CX + 120, SY - 214], [CX + 138, SY - 190], [CX + 34, SY - 132])} fill={accent} opacity="0.22" />
          <circle cx={CX + 122} cy={SY - 206} r="3" fill="#fff" className="svg-twinkle" />
        </g>
      );
    }

    case "meadow":
    default: {
      const flowers = Array.from({ length: 12 }, (_, i) => {
        const [x, y] = spot(rng, 0.9, 0.85);
        return { x, y, c: ["#fde68a", "#fb7185", "#f0abfc", accent][i % 4] };
      });
      return (
        <g>
          <ellipse cx={CX + 52} cy={SY + 6} rx="30" ry="6" fill="#7dd3fc" opacity="0.85" />
          <ellipse cx={CX + 46} cy={SY + 5} rx="16" ry="2.6" fill="#fff" opacity="0.35" />
          <RoundTree x={CX - 60} y={SY + 8} h={86} light="#4ade80" shade="#14532d" />
          <RoundTree x={CX - 104} y={SY + 4} h={40} light="#86efac" shade="#166534" />
          {flowers.map((f, i) => (
            <circle key={i} cx={f.x} cy={f.y} r="2.2" fill={f.c} />
          ))}
        </g>
      );
    }
  }
}

interface IslandArtProps {
  /** Unique prefix for gradient ids. Required when several islands share an SVG. */
  id: string;
  variant?: IslandVariant;
  seed?: number;
  /** Hex colour used for glows, crystals, banners and rune light. */
  accent?: string;
  waterfall?: boolean;
}

/** Island artwork in a 400 x 380 coordinate space. Renders inside any parent <svg>. */
export function IslandArt({ id, variant = "meadow", seed = 1, accent = "#38BDF8", waterfall = false }: IslandArtProps) {
  const rng = createRng(seed);
  const pal = PALETTES[variant];

  const STEPS = 8;
  const left: Pair[] = [];
  const right: Pair[] = [];
  for (let i = 1; i < STEPS; i++) {
    const t = i / STEPS;
    const hw = 150 * Math.pow(1 - t, 0.85);
    const y = SY + 12 + 150 * Math.pow(t, 1.1);
    left.push([r1(CX - hw + rng.range(-9, 9)), r1(y + rng.range(-5, 5))]);
    right.push([r1(CX + hw + rng.range(-9, 9)), r1(y + rng.range(-5, 5))]);
  }
  const tip: Pair = [r1(CX + rng.range(-10, 10)), SY + 176];
  const rock = poly([CX - RX + 4, SY + 10], ...left, tip, ...[...right].reverse(), [CX + RX - 4, SY + 10]);
  const shadow = poly([CX + 10, SY + 22], ...right, tip);

  const facets = Array.from({ length: 6 }, (_, i) => {
    const onLeft = i % 2 === 0;
    const side = onLeft ? left : right;
    const a = rng.int(0, side.length - 3);
    const p1 = side[a];
    const p2 = side[a + 1];
    const q: Pair = [CX + (onLeft ? -1 : 1) * rng.range(8, 64), (p1[1] + p2[1]) / 2 + rng.range(10, 30)];
    return { d: poly(p1, p2, q), light: onLeft };
  });

  const vines = Array.from({ length: 5 }, () => {
    const x = CX + rng.range(-RX * 0.82, RX * 0.82);
    const nx = (x - CX) / RX;
    const y0 = SY + 9 + RY * Math.sqrt(Math.max(0, 1 - nx * nx));
    const len = rng.range(16, 46);
    const bend = rng.range(-7, 7);
    return { d: `M${r1(x)} ${r1(y0 - 2)}q${r1(bend)} ${r1(len * 0.5)} ${r1(-bend * 0.4)} ${r1(len)}`, ex: r1(x - bend * 0.4), ey: r1(y0 - 2 + len) };
  });

  const chunks = [
    { x: 30, y: 238, s: 13 },
    { x: 372, y: 212, s: 9 },
    { x: 340, y: 292, s: 6 },
    { x: 66, y: 300, s: 5 },
  ].map((c) => ({ ...c, x: r1(c.x + rng.range(-8, 8)), y: r1(c.y + rng.range(-12, 12)), dur: r1(rng.range(7, 12)), delay: r1(-rng.range(0, 8)) }));

  const wfSide = rng.chance(0.5) ? -1 : 1;
  const wfX = r1(CX + wfSide * rng.range(60, 100));
  const wfRim = r1(SY + 9 + RY * Math.sqrt(Math.max(0, 1 - ((wfX - CX) / RX) ** 2)));

  return (
    <g>
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop stopColor={accent} stopOpacity="0.34" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-rock`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={pal.rock1} />
          <stop offset="1" stopColor={pal.rock2} />
        </linearGradient>
        <linearGradient id={`${id}-grass`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={pal.g1} />
          <stop offset="1" stopColor={pal.g2} />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#e0f2fe" stopOpacity="0.95" />
          <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx={CX} cy={SY + 78} rx="200" ry="150" fill={`url(#${id}-glow)`} />

      {chunks.map((c, i) => (
        <path
          key={i}
          className="svg-float"
          style={{ animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
          d={poly([c.x, c.y - c.s], [c.x + c.s * 0.9, c.y - c.s * 0.1], [c.x + c.s * 0.3, c.y + c.s], [c.x - c.s * 0.8, c.y + c.s * 0.3])}
          fill={`url(#${id}-rock)`}
        />
      ))}

      <path d={rock} fill={`url(#${id}-rock)`} />
      <path d={shadow} fill={SHADE} opacity="0.22" />
      {facets.map((f, i) => (
        <path key={i} d={f.d} fill={f.light ? "#fff" : SHADE} opacity={f.light ? 0.08 : 0.14} />
      ))}

      {waterfall && (
        <g>
          <rect x={wfX - 3.5} y={wfRim - 2} width="7" height="130" rx="3.5" fill={`url(#${id}-water)`} />
          <path d={`M${wfX} ${wfRim + 4}v110`} stroke="#fff" strokeOpacity="0.8" strokeWidth="1.6" className="dash-flow" />
          <circle cx={wfX} cy={wfRim + 120} r="9" fill="#e0f2fe" opacity="0.3" className="svg-pulse" />
        </g>
      )}

      <g className="svg-pulse">
        <circle cx={tip[0]} cy={tip[1] + 4} r="16" fill={accent} opacity="0.25" />
      </g>
      <path d={poly([tip[0], tip[1] + 30], [tip[0] + 6, tip[1] + 6], [tip[0], tip[1] - 8], [tip[0] - 6, tip[1] + 6])} fill={accent} />
      <path d={poly([tip[0], tip[1] + 30], [tip[0] + 6, tip[1] + 6], [tip[0], tip[1] + 6])} fill={SHADE} opacity="0.25" />

      <ellipse cx={CX} cy={SY + 9} rx={RX} ry={RY} fill={pal.soil} />
      <ellipse cx={CX} cy={SY + 6} rx={RX} ry={RY} fill={SHADE} opacity="0.12" />
      <g fill="none" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" opacity="0.85">
        {vines.map((v, i) => (
          <path key={i} d={v.d} />
        ))}
      </g>
      <g fill="#86efac" opacity="0.9">
        {vines.map((v, i) => (
          <circle key={i} cx={v.ex} cy={v.ey} r="2.4" />
        ))}
      </g>
      <ellipse cx={CX} cy={SY} rx={RX} ry={RY} fill={`url(#${id}-grass)`} />
      <ellipse cx={CX} cy={SY - 2} rx={RX * 0.92} ry={RY * 0.78} fill="#fff" opacity="0.08" />
      <ellipse cx={CX} cy={SY} rx={RX} ry={RY} fill="none" stroke={pal.g2} strokeOpacity="0.55" strokeWidth="1.2" />

      <Decor variant={variant} rng={rng} accent={accent} />
    </g>
  );
}

interface FloatingIslandProps extends Omit<IslandArtProps, "id"> {
  className?: string;
}

export function FloatingIsland({ className, ...art }: FloatingIslandProps) {
  const id = useSvgId("isl");
  return (
    <svg viewBox={`0 0 ${ISLAND_BOX.w} ${ISLAND_BOX.h}`} aria-hidden="true" focusable="false" className={cn("block overflow-visible", className)}>
      <IslandArt id={id} {...art} />
    </svg>
  );
}
