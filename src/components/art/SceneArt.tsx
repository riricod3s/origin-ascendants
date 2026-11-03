import type { ReactNode } from "react";
import { useSvgId } from "@/hooks/useSvgId";
import { cn } from "@/lib/cn";
import { createRng, r1, type Rng } from "@/lib/prng";
import { poly } from "@/lib/svg";
import type { SceneKind } from "@/types/content";
import { AirshipArt } from "./Airship";
import { IslandArt } from "./FloatingIsland";
import { Arch, Birds, CloudBank, Column, Conifer, Crystal, Dome, House, MistBand, Orb, Ridge, SkyGradient, Sparkles, STONE, Stars, Tower, RoundTree } from "./scene-kit";

/** All scenes are drawn in an 800 x 500 space and cropped with `slice`, so keep the subject near the centre. */
const W = 800;
const H = 500;

interface P {
  id: string;
  rng: Rng;
  accent: string;
}

function At({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: ReactNode }) {
  return <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>{children}</g>;
}

function Rays({ id, rng, x, count, spread, opacity = 0.45, color = "#ffffff" }: { id: string; rng: Rng; x: number; count: number; spread: number; opacity?: number; color?: string }) {
  return (
    <g opacity={opacity}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={color} stopOpacity="0.85" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: count }, (_, i) => {
        const t = count === 1 ? 0.5 : i / (count - 1);
        const tx = x + (t - 0.5) * spread;
        const w = rng.range(14, 44);
        return <path key={i} d={poly([x - 4, -20], [x + 4, -20], [tx + w, H + 20], [tx - w, H + 20])} fill={`url(#${id})`} />;
      })}
    </g>
  );
}

function Battlements({ x, y, w, color, step = 12 }: { x: number; y: number; w: number; color: string; step?: number }) {
  const n = Math.floor(w / step / 1.6);
  return (
    <g fill={color}>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={r1(x + (i + 0.3) * (w / n))} y={r1(y - 7)} width={r1((w / n) * 0.55)} height="7" />
      ))}
    </g>
  );
}

function Firework({ x, y, r, color, delay = 0, rays = 14 }: { x: number; y: number; r: number; color: string; delay?: number; rays?: number }) {
  return (
    <g className="svg-pulse" style={{ animationDelay: `${delay}s`, animationDuration: "3.8s" }}>
      <circle cx={x} cy={y} r={r1(r * 1.25)} fill={color} opacity="0.08" />
      {Array.from({ length: rays }, (_, i) => {
        const a = (i / rays) * Math.PI * 2;
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        return (
          <g key={i}>
            <path d={`M${r1(x + cos * r * 0.3)} ${r1(y + sin * r * 0.3)}L${r1(x + cos * r * 0.88)} ${r1(y + sin * r * 0.88)}`} stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <circle cx={r1(x + cos * r)} cy={r1(y + sin * r)} r="2.6" fill="#fff" />
          </g>
        );
      })}
      <circle cx={x} cy={y} r="4" fill="#fff" />
    </g>
  );
}

function LanternString({ x0, y0, x1, y1, sag, count, colors }: { x0: number; y0: number; x1: number; y1: number; sag: number; count: number; colors: string[] }) {
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2 + sag * 2;
  const at = (t: number): [number, number] => [(1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1, (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1];
  return (
    <g>
      <path d={`M${x0} ${y0}Q${r1(cx)} ${r1(cy)} ${x1} ${y1}`} fill="none" stroke="#e9d5ff" strokeOpacity="0.7" strokeWidth="1.4" />
      {Array.from({ length: count }, (_, i) => {
        const [px, py] = at((i + 0.5) / count);
        const color = colors[i % colors.length];
        return (
          <g key={i} className="svg-flicker" style={{ animationDelay: `${r1(-i * 0.37)}s` }}>
            <circle cx={r1(px)} cy={r1(py + 13)} r="14" fill={color} opacity="0.22" />
            <rect x={r1(px - 5)} y={r1(py + 3)} width="10" height="14" rx="3.5" fill={color} />
            <rect x={r1(px - 2.5)} y={r1(py)} width="5" height="4" fill="#fde68a" />
          </g>
        );
      })}
    </g>
  );
}

function Boat({ x, y, s = 1, sail = "#ffffff", accent }: { x: number; y: number; s?: number; sail?: string; accent: string }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) scale(${s})`}>
      <path d="M-34 0H34L24 14H-24Z" fill="#8a5a3c" />
      <path d="M-34 0H34" stroke="#d6a06a" strokeWidth="3" />
      <path d="M0 0V-72" stroke="#6b4b3a" strokeWidth="2.4" />
      <path d={poly([3, -70], [3, -8], [32, -8])} fill={sail} />
      <path d={poly([-3, -62], [-3, -8], [-26, -8])} fill={accent} />
      <path className="svg-sway" d="M0 -72l12 -4.5l-12 -4.5z" fill="#fbbf24" />
    </g>
  );
}

/* -------------------------------------------------------------------------- */

function Isles({ id, rng, accent }: P) {
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#1c1a66", "#463ca6", "#9a68c6", "#f3a88e", "#fde3a4"]} />
      <Stars rng={rng} count={60} yMax={210} opacity={0.85} />
      <Orb id={`${id}-sun`} x={420} y={318} r={28} color="#fde68a" />
      <Ridge id={`${id}-r1`} rng={rng} baseY={392} height={96} peaks={7} top="#7a6ac6" bottom="#52449c" snow="#fde2f3" />
      <CloudBank rng={rng} y={412} count={6} size={230} color="#fdf2f8" shade="#c4a6ec" opacity={0.75} />
      <At x={30} y={96} s={0.42}>
        <IslandArt id={`${id}-a`} variant="forest" seed={rng.int(1, 90)} accent="#4ADE80" />
      </At>
      <At x={548} y={34} s={0.5}>
        <IslandArt id={`${id}-b`} variant="ruins" seed={rng.int(1, 90)} accent="#A78BFA" />
      </At>
      <At x={620} y={262} s={0.26}>
        <IslandArt id={`${id}-d`} variant="crystal" seed={rng.int(1, 90)} accent="#38BDF8" />
      </At>
      <At x={194} y={92} s={0.8}>
        <IslandArt id={`${id}-c`} variant="castle" seed={rng.int(1, 90)} accent={accent} waterfall />
      </At>
      <CloudBank rng={rng} y={474} count={5} size={270} color="#ffffff" shade="#c4b5fd" opacity={0.95} />
      <Sparkles rng={rng} count={20} color="#fde68a" y1={420} />
    </>
  );
}

function SkyCity({ id, rng, accent }: P) {
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#2347b0", "#4f86dc", "#9ec3f2", "#e9e3f6", "#fde7c8"]} />
      <Rays id={`${id}-rays`} rng={rng} x={400} count={7} spread={640} opacity={0.5} />
      <Orb id={`${id}-sun`} x={400} y={36} r={22} color="#fff7d1" halo={6} />
      <CloudBank rng={rng} y={300} count={5} size={200} color="#f5f8ff" shade="#a9bff0" opacity={0.6} />
      <At x={566} y={250} s={0.3}>
        <IslandArt id={`${id}-b`} variant="temple" seed={rng.int(1, 90)} accent="#A78BFA" />
      </At>
      <At x={14} y={270} s={0.28}>
        <IslandArt id={`${id}-c`} variant="village" seed={rng.int(1, 90)} accent="#FBBF24" />
      </At>
      <At x={128} y={48} s={1}>
        <IslandArt id={`${id}-a`} variant="castle" seed={rng.int(1, 90)} accent={accent} waterfall />
      </At>
      <At x={30} y={96} s={0.5}>
        <AirshipArt id={`${id}-s1`} accent="#38BDF8" />
      </At>
      <At x={604} y={176} s={0.42}>
        <AirshipArt id={`${id}-s2`} accent="#A78BFA" flag="#4ADE80" />
      </At>
      <CloudBank rng={rng} y={444} count={6} size={260} color="#ffffff" shade="#b6c6f2" opacity={0.96} />
    </>
  );
}

function Ruins({ id, rng, accent }: P) {
  const stones = Array.from({ length: 7 }, () => ({
    x: r1(rng.range(150, 650)),
    y: r1(rng.range(150, 300)),
    s: r1(rng.range(5, 13)),
    d: r1(rng.range(6, 11)),
    delay: r1(-rng.range(0, 7)),
  }));
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#101a52", "#2e2b82", "#6c4cb4", "#e19bbb"]} />
      <Stars rng={rng} count={90} yMax={250} />
      <Orb id={`${id}-moon`} x={606} y={124} r={32} color="#e9d5ff" core="#fffbff" />
      <defs>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f5f3ff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#f5f3ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#8f84e6" />
          <stop offset="1" stopColor="#4a3f9a" />
        </linearGradient>
      </defs>
      <path d={poly([606, 150], [300, 420], [520, 420])} fill={`url(#${id}-beam)`} />
      <Ridge id={`${id}-r1`} rng={rng} baseY={360} height={120} peaks={6} top="#5a4cac" bottom="#37307f" />
      <MistBand id={`${id}-m1`} y={330} h={90} color="#c4b5fd" opacity={0.35} />
      <path d={`M-20 ${H}V404Q190 372 400 386T820 400V${H}Z`} fill={`url(#${id}-ground)`} />
      <ellipse cx="400" cy="424" rx="196" ry="28" fill="none" stroke={accent} strokeWidth="2.2" strokeDasharray="7 9" className="svg-pulse" />
      <ellipse cx="400" cy="424" rx="132" ry="18" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.7" />
      <Arch x={400} y={408} h={100} span={112} />
      <Column x={262} y={414} h={86} />
      <Column x={318} y={424} h={52} broken />
      <Column x={492} y={426} h={64} broken />
      <Column x={548} y={414} h={98} />
      <Column x={640} y={430} h={40} w={8} broken />
      {stones.map((s, i) => (
        <path
          key={i}
          className="svg-float"
          style={{ animationDuration: `${s.d}s`, animationDelay: `${s.delay}s` }}
          d={poly([s.x, s.y - s.s], [s.x + s.s, s.y - 1], [s.x + s.s * 0.4, s.y + s.s], [s.x - s.s * 0.9, s.y + s.s * 0.3])}
          fill={STONE.mid}
        />
      ))}
      <Sparkles rng={rng} count={26} color="#ddd6fe" y0={180} y1={440} />
    </>
  );
}

function Forest({ id, rng, accent }: P) {
  const rows = [
    { y: 330, h: 118, n: 15, light: "#2a8f86", shade: "#1a5f68" },
    { y: 398, h: 160, n: 11, light: "#33b57e", shade: "#1f7f5d" },
    { y: 476, h: 236, n: 8, light: "#5fdc8a", shade: "#2b9a62" },
  ];
  const glows = Array.from({ length: 12 }, () => ({ x: r1(rng.range(40, 760)), y: r1(rng.range(380, 480)), r: r1(rng.range(3, 6.5)), delay: r1(-rng.range(0, 4)) }));
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#0e1f4a", "#1f4a7a", "#2f8f8a", "#a6ebbd"]} />
      <Stars rng={rng} count={40} yMax={170} opacity={0.7} />
      <defs>
        <linearGradient id={`${id}-shaft`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fef9c3" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fef9c3" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#2a9a73" />
          <stop offset="1" stopColor="#14604c" />
        </linearGradient>
      </defs>
      <path d={poly([200, -10], [290, -10], [520, H], [270, H])} fill={`url(#${id}-shaft)`} />
      <path d={poly([480, -10], [520, -10], [700, H], [590, H])} fill={`url(#${id}-shaft)`} opacity="0.55" />
      <Ridge id={`${id}-r1`} rng={rng} baseY={340} height={110} peaks={5} top="#2f8f98" bottom="#1d6670" />
      {rows.map((row, ri) => (
        <g key={ri}>
          {Array.from({ length: row.n }, (_, i) => {
            const x = r1(((i + 0.5) / row.n) * (W + 60) - 30 + rng.range(-16, 16));
            const h = r1(row.h * rng.range(0.7, 1.15));
            return ri === 2 && i % 3 === 1 ? (
              <RoundTree key={i} x={x} y={row.y + rng.range(-6, 8)} h={h * 0.8} light={row.light} shade={row.shade} />
            ) : (
              <Conifer key={i} x={x} y={row.y + rng.range(-6, 8)} h={h} light={row.light} shade={row.shade} />
            );
          })}
          <MistBand id={`${id}-m${ri}`} y={row.y - 40} h={70} color="#d9f99d" opacity={0.18 + ri * 0.05} />
        </g>
      ))}
      <rect y="468" width={W} height="40" fill={`url(#${id}-floor)`} />
      {glows.map((g, i) => (
        <g key={i} className="svg-pulse" style={{ animationDelay: `${g.delay}s` }}>
          <circle cx={g.x} cy={g.y} r={r1(g.r * 3.4)} fill={accent} opacity="0.2" />
          <circle cx={g.x} cy={g.y} r={g.r} fill="#f0fdf4" />
        </g>
      ))}
      <Sparkles rng={rng} count={34} color="#fef08a" y0={200} y1={470} />
    </>
  );
}

function Aurora({ id, y, amp, from, to, opacity }: { id: string; y: number; amp: number; from: string; to: string; opacity: number }) {
  return (
    <g opacity={opacity}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="svg-sway"
        d={`M-20 ${y}C120 ${y - amp} 260 ${y + amp} 400 ${y - amp * 0.4}S700 ${y + amp} 820 ${y - amp * 0.5}V${y + 150}C700 ${y + 110} 540 ${y + 170} 400 ${y + 120}S120 ${y + 160} -20 ${y + 130}Z`}
        fill={`url(#${id})`}
      />
    </g>
  );
}

function CrystalScene({ id, rng, accent }: P) {
  const crystals: { x: number; h: number; w: number; color: string }[] = [
    { x: 400, h: 240, w: 98, color: accent },
    { x: 322, h: 150, w: 64, color: "#38BDF8" },
    { x: 480, h: 172, w: 72, color: "#C4B5FD" },
    { x: 262, h: 84, w: 42, color: "#A78BFA" },
    { x: 548, h: 96, w: 44, color: "#7DD3FC" },
    { x: 196, h: 52, w: 32, color: "#38BDF8" },
    { x: 616, h: 64, w: 34, color: "#C4B5FD" },
  ];
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#0a1030", "#1a2368", "#392f95", "#6d4cc4"]} />
      <Stars rng={rng} count={110} yMax={280} />
      <Aurora id={`${id}-au1`} y={110} amp={50} from="#2dd4bf" to="#38bdf8" opacity={0.42} />
      <Aurora id={`${id}-au2`} y={170} amp={36} from="#a78bfa" to="#818cf8" opacity={0.38} />
      <Ridge id={`${id}-r1`} rng={rng} baseY={400} height={110} peaks={6} top="#3a3592" bottom="#241f66" />
      <defs>
        <linearGradient id={`${id}-lake`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#3b3a9e" />
          <stop offset="1" stopColor="#14164a" />
        </linearGradient>
      </defs>
      <rect y="440" width={W} height="62" fill={`url(#${id}-lake)`} />
      <g transform="translate(0 880) scale(1 -1)" opacity="0.26">
        {crystals.map((c, i) => (
          <Crystal key={i} x={c.x} y={440} h={c.h * 0.7} w={c.w} color={c.color} />
        ))}
      </g>
      <path d={`M-20 ${H}V456Q150 436 330 446T620 444T820 452V${H}Z`} fill="#1c1b58" opacity="0.65" />
      <g>
        {crystals.map((c, i) => (
          <Crystal key={i} x={c.x} y={440 + (i % 2) * 6} h={c.h} w={c.w} color={c.color} />
        ))}
      </g>
      <Sparkles rng={rng} count={30} color="#e0f2fe" y0={150} y1={440} />
    </>
  );
}

function Airships({ id, rng, accent }: P) {
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#2b1b6b", "#7b3fa8", "#d1578f", "#fb923c", "#fde68a"]} />
      <Stars rng={rng} count={40} yMax={140} opacity={0.7} />
      <Orb id={`${id}-sun`} x={560} y={324} r={34} color="#fde68a" halo={5} />
      <CloudBank rng={rng} y={344} count={7} size={200} color="#fbcfe8" shade="#c084fc" opacity={0.6} />
      <Birds rng={rng} count={6} y0={80} y1={190} color="#fff7ed" />
      <At x={70} y={120} s={0.85}>
        <AirshipArt id={`${id}-s1`} accent={accent} flag="#FBBF24" />
      </At>
      <At x={430} y={64} s={0.55}>
        <AirshipArt id={`${id}-s2`} accent="#A78BFA" flag="#4ADE80" />
      </At>
      <At x={596} y={222} s={0.4}>
        <AirshipArt id={`${id}-s3`} accent="#38BDF8" flag="#FB7185" />
      </At>
      <CloudBank rng={rng} y={410} count={6} size={250} color="#ffe4e6" shade="#d8b4fe" opacity={0.9} />
      <CloudBank rng={rng} y={476} count={5} size={300} color="#fff7ed" shade="#d8b4fe" opacity={0.98} />
    </>
  );
}

function Mountains({ id, rng }: P) {
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#1e2a78", "#4a5bb8", "#9aa6e8", "#fcd9b6"]} />
      <Stars rng={rng} count={50} yMax={160} opacity={0.75} />
      <Orb id={`${id}-sun`} x={400} y={326} r={30} color="#fde68a" halo={5} />
      <Birds rng={rng} count={5} y0={90} y1={200} color="#fff" />
      <Ridge id={`${id}-r1`} rng={rng} baseY={352} height={170} peaks={5} top="#b7c3f2" bottom="#8a98d8" snow="#ffffff" />
      <MistBand id={`${id}-m1`} y={330} h={80} color="#fde2f3" opacity={0.4} />
      <Ridge id={`${id}-r2`} rng={rng} baseY={398} height={140} peaks={6} top="#7684cf" bottom="#56639f" snow="#e0e7ff" />
      <MistBand id={`${id}-m2`} y={380} h={70} color="#c7d2fe" opacity={0.35} />
      <Ridge id={`${id}-r3`} rng={rng} baseY={444} height={110} peaks={7} top="#4d5c9e" bottom="#34437f" />
      <Ridge id={`${id}-r4`} rng={rng} baseY={500} height={90} peaks={8} top="#2c3a74" bottom="#1b2658" />
      {Array.from({ length: 12 }, (_, i) => (
        <Conifer key={i} x={r1(40 + i * 66 + rng.range(-14, 14))} y={r1(498 + rng.range(-8, 4))} h={r1(rng.range(46, 78))} light="#2f6f7a" shade="#1f4d5e" />
      ))}
      <CloudBank rng={rng} y={470} count={5} size={240} color="#e0e7ff" shade="#a5b4fc" opacity={0.55} />
    </>
  );
}

function Harbor({ id, rng, accent }: P) {
  const glints = Array.from({ length: 26 }, () => ({ x: r1(rng.range(0, W)), y: r1(rng.range(314, 492)), w: r1(rng.range(8, 30)) }));
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#2b6fd0", "#6aa8ea", "#bfe0f7", "#fde9c8"]} />
      <Orb id={`${id}-sun`} x={500} y={286} r={30} color="#fff3c4" halo={5} />
      <CloudBank rng={rng} y={120} count={4} size={190} color="#ffffff" shade="#b6cdf5" opacity={0.85} />
      <Birds rng={rng} count={6} y0={80} y1={210} color="#ffffff" />
      <defs>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#59c0d8" />
          <stop offset="0.5" stopColor="#2a82b8" />
          <stop offset="1" stopColor="#154b84" />
        </linearGradient>
        <linearGradient id={`${id}-cliff`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#9fb0dd" />
          <stop offset="1" stopColor="#5a6aa8" />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#fff7d1" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff7d1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Ridge id={`${id}-r1`} rng={rng} baseY={314} height={46} peaks={9} top="#8fb3e6" bottom="#6c92d0" />
      <rect y="312" width={W} height={H - 312} fill={`url(#${id}-sea)`} />
      <g stroke="#ffffff" strokeLinecap="round" strokeWidth="2" opacity="0.5">
        {glints.map((g, i) => (
          <path key={i} d={`M${g.x} ${g.y}h${g.w}`} />
        ))}
      </g>
      <path d={poly([-20, H], [-20, 300], [60, 268], [150, 276], [226, 330], [270, 400], [330, H])} fill={`url(#${id}-cliff)`} />
      <path d={poly([150, 276], [226, 330], [270, 400], [330, H], [190, H], [170, 360])} fill="#1b2a5c" opacity="0.2" />
      <path d={poly([-20, 300], [60, 268], [150, 276], [160, 292], [60, 290])} fill="#6ee7a0" />
      <path d={poly([98, 280], [152, 280], [142, 140], [108, 140])} fill="#f8faff" />
      <path d={poly([105, 190], [145, 190], [143, 168], [107, 168])} fill="#fb7185" />
      <path d={poly([104, 232], [148, 232], [146, 210], [102, 210])} fill="#fb7185" />
      <rect x="98" y="132" width="52" height="9" fill="#334155" />
      <rect x="110" y="106" width="28" height="26" fill="#fde68a" className="svg-flicker" />
      <path d={poly([104, 106], [124, 84], [144, 106])} fill="#38BDF8" />
      <path d={poly([124, 118], [560, 80], [560, 170])} fill={`url(#${id}-beam)`} />
      <g>
        <rect x="560" y="404" width="260" height="10" fill="#a8774d" />
        <rect x="560" y="414" width="260" height="6" fill="#6b4b3a" />
        {[590, 650, 710, 770].map((x) => (
          <rect key={x} x={x} y="414" width="8" height="64" fill="#6b4b3a" />
        ))}
        <House x={640} y={404} w={46} h={34} roof="#fb7185" />
        <House x={724} y={404} w={40} h={30} roof={accent} />
      </g>
      <Boat x={420} y={394} s={1.15} accent={accent} />
      <Boat x={330} y={346} s={0.7} accent="#A78BFA" sail="#fff7ed" />
      <Boat x={620} y={352} s={0.6} accent="#FBBF24" />
    </>
  );
}

function Forge({ id, rng, accent }: P) {
  const smoke = [
    { x: 556, y: 150, r: 18, d: 0 },
    { x: 580, y: 112, r: 24, d: 1.4 },
    { x: 604, y: 66, r: 30, d: 2.8 },
    { x: 628, y: 20, r: 34, d: 4.2 },
  ];
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#32185e", "#7a2f6d", "#cf5a5a", "#f59e4b", "#fde1a0"]} />
      <Stars rng={rng} count={34} yMax={130} opacity={0.6} />
      <Orb id={`${id}-sun`} x={300} y={300} r={30} color="#fcd34d" halo={5} />
      <defs>
        <linearGradient id={`${id}-lava`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id={`${id}-door`} x1="0" y1="1" x2="0" y2="0">
          <stop stopColor="#fde68a" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <Ridge id={`${id}-r1`} rng={rng} baseY={360} height={150} peaks={6} top="#8c4a8a" bottom="#5f2d6c" />
      <Ridge id={`${id}-r2`} rng={rng} baseY={430} height={120} peaks={7} top="#6a3472" bottom="#43235a" />
      <path d="M300 340C262 372 350 404 306 440S228 476 250 504" fill="none" stroke="#f97316" strokeWidth="22" strokeLinecap="round" opacity="0.4" />
      <path d="M300 340C262 372 350 404 306 440S228 476 250 504" fill="none" stroke={`url(#${id}-lava)`} strokeWidth="12" strokeLinecap="round" />
      <path d="M300 340C262 372 350 404 306 440S228 476 250 504" fill="none" stroke="#fff7d1" strokeWidth="3" strokeLinecap="round" className="dash-flow" />
      <path d={`M-20 ${H}V446Q180 430 400 450T820 440V${H}Z`} fill="#4a2860" />
      {smoke.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f3e8ff" opacity="0.3" className="svg-smoke" style={{ animationDelay: `${s.d}s` }} />
      ))}
      <rect x="548" y="150" width="16" height="190" fill="#c7b8e6" />
      <rect x="544" y="144" width="24" height="10" fill="#9d8cd0" />
      <rect x="498" y="196" width="14" height="150" fill="#c7b8e6" />
      <rect x="494" y="190" width="22" height="9" fill="#9d8cd0" />
      <path d={poly([420, 340], [640, 340], [640, 450], [420, 450])} fill="#e3dafa" />
      <path d={poly([530, 340], [640, 340], [640, 450], [530, 450])} fill="#0b1020" opacity="0.14" />
      <path d={poly([410, 340], [530, 288], [650, 340])} fill={accent} />
      <path d={poly([530, 288], [650, 340], [530, 340])} fill="#0b1020" opacity="0.2" />
      <path d="M492 450V398a38 38 0 0 1 76 0V450Z" fill={`url(#${id}-door)`} className="svg-flicker" />
      <rect x="436" y="372" width="22" height="26" rx="2" fill="#fde68a" className="svg-flicker" />
      <rect x="604" y="372" width="22" height="26" rx="2" fill="#fde68a" className="svg-flicker" style={{ animationDelay: "-1.2s" }} />
      <path d="M376 442h80v8h-80zM392 430h48v12h-48z" fill="#4a2c6a" />
      <path d="M384 430c12-8 40-8 56 0v4h-56z" fill="#6a4a8a" />
      <Sparkles rng={rng} count={36} color="#fdba74" x0={260} x1={660} y0={120} y1={440} maxR={2.2} />
    </>
  );
}

function Festival({ id, rng, accent }: P) {
  const roofs = ["#fb7185", "#fbbf24", "#a78bfa", "#38bdf8", "#4ade80", "#fb923c"];
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#171a63", "#3e3496", "#a257a8", "#fb9e7a"]} />
      <Stars rng={rng} count={70} yMax={210} />
      <Firework x={214} y={128} r={58} color="#fbbf24" />
      <Firework x={544} y={92} r={70} color="#38bdf8" delay={1.2} rays={16} />
      <Firework x={668} y={206} r={48} color="#fb7185" delay={2.2} rays={12} />
      <Firework x={400} y={196} r={40} color="#a78bfa" delay={0.6} rays={12} />
      <Ridge id={`${id}-r1`} rng={rng} baseY={400} height={90} peaks={7} top="#6a4cae" bottom="#43358a" />
      <LanternString x0={-10} y0={236} x1={810} y1={214} sag={34} count={10} colors={["#fb7185", "#fbbf24", "#a78bfa", "#38bdf8"]} />
      <LanternString x0={-10} y0={290} x1={810} y1={276} sag={26} count={8} colors={["#fbbf24", "#fb7185", "#4ade80"]} />
      <path d={`M-20 ${H}V430Q200 410 400 424T820 418V${H}Z`} fill="#3a2d86" />
      {[110, 220, 330, 470, 580, 690].map((x, i) => (
        <House key={x} x={x} y={434 + (i % 2) * 8} w={58 + (i % 3) * 8} h={50 + (i % 2) * 14} roof={roofs[i]} />
      ))}
      <rect x="396" y="298" width="8" height="140" fill="#e9d5ff" />
      <path className="svg-sway" d={poly([404, 304], [452, 316], [404, 332])} fill={accent} />
      <path className="svg-sway" d={poly([396, 340], [352, 352], [396, 366])} fill="#fbbf24" style={{ animationDelay: "-1s" }} />
      <Sparkles rng={rng} count={28} color="#fde68a" y0={120} y1={420} />
    </>
  );
}

function Observatory({ id, rng, accent }: P) {
  const constellations = [
    [[96, 96], [150, 70], [212, 96], [246, 150], [196, 188]],
    [[560, 70], [610, 110], [668, 90], [706, 150], [650, 190], [598, 168]],
    [[300, 40], [352, 62], [392, 40]],
  ] as const;
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#050a1f", "#0f1a4d", "#2a2f86", "#5b5bc0"]} />
      <Stars rng={rng} count={170} yMax={420} />
      <defs>
        <linearGradient id={`${id}-beam`} x1="0" y1="1" x2="0" y2="0">
          <stop stopColor="#e0f2fe" stopOpacity="0.7" />
          <stop offset="1" stopColor="#e0f2fe" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-shoot`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
      {constellations.map((pts, i) => (
        <g key={i} className="svg-twinkle" style={{ animationDuration: `${6 + i}s` }}>
          <path d={`M${pts.map(([x, y]) => `${x} ${y}`).join("L")}`} fill="none" stroke="#bae6fd" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 5" />
          {pts.map(([x, y], j) => (
            <g key={j}>
              <circle cx={x} cy={y} r="7" fill="#bae6fd" opacity="0.18" />
              <circle cx={x} cy={y} r="2.6" fill="#fff" />
            </g>
          ))}
        </g>
      ))}
      <path d="M470 150L560 126" stroke={`url(#${id}-shoot)`} strokeWidth="2.4" strokeLinecap="round" className="svg-twinkle" />
      <g fill="none" stroke="#a78bfa" strokeOpacity="0.4">
        <circle cx="400" cy="250" r="210" strokeDasharray="2 10" className="svg-spin-slow" />
        <circle cx="400" cy="250" r="150" strokeDasharray="14 10" className="svg-spin-rev" />
      </g>
      <path d={poly([396, 196], [404, 196], [560, -20], [380, -20])} fill={`url(#${id}-beam)`} />
      <Orb id={`${id}-moon`} x={96} y={282} r={14} color="#fde68a" core="#fffbe0" halo={5} />
      <At x={210} y={96} s={0.95}>
        <IslandArt id={`${id}-i`} variant="observatory" seed={rng.int(1, 90)} accent={accent} />
      </At>
      <CloudBank rng={rng} y={470} count={6} size={240} color="#c7d2fe" shade="#818cf8" opacity={0.55} />
    </>
  );
}

function Citadel({ id, rng, accent }: P) {
  return (
    <>
      <SkyGradient id={`${id}-sky`} stops={["#4d8fe8", "#8fbdf5", "#d3e7fb", "#fff1d6"]} />
      <Orb id={`${id}-sun`} x={130} y={86} r={26} color="#fff3c4" halo={6} />
      <CloudBank rng={rng} y={130} count={4} size={180} color="#ffffff" shade="#b9d0f6" opacity={0.8} />
      <Ridge id={`${id}-r1`} rng={rng} baseY={390} height={230} peaks={4} top="#9fb1e4" bottom="#6f82c4" snow="#ffffff" />
      <defs>
        <linearGradient id={`${id}-cliff`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#8c9bd0" />
          <stop offset="1" stopColor="#56649f" />
        </linearGradient>
      </defs>
      <path d={poly([40, H], [140, 440], [660, 440], [760, H])} fill={`url(#${id}-cliff)`} />
      {/* tier 1 */}
      <rect x="170" y="384" width="460" height="64" fill={STONE.light} />
      <rect x="400" y="384" width="230" height="64" fill="#0b1020" opacity="0.1" />
      <Battlements x={170} y={384} w={460} color={STONE.light} />
      {[212, 252, 292, 332, 468, 508, 548, 588].map((x) => (
        <path key={x} d={`M${x - 6} 448V416a6 6 0 0 1 12 0V448Z`} fill="#8592b8" opacity="0.6" />
      ))}
      <Tower x={190} y={448} w={40} h={118} roof={accent} glow="#fde68a" flag={accent} />
      <Tower x={610} y={448} w={40} h={118} roof={accent} glow="#fde68a" flag={accent} />
      {/* tier 2 */}
      <rect x="250" y="304" width="300" height="82" fill="#f1f5ff" />
      <rect x="400" y="304" width="150" height="82" fill="#0b1020" opacity="0.08" />
      <Battlements x={250} y={304} w={300} color="#f1f5ff" />
      <Tower x={270} y={386} w={34} h={106} roof="#38BDF8" glow="#fde68a" />
      <Tower x={530} y={386} w={34} h={106} roof="#38BDF8" glow="#fde68a" />
      {/* tier 3 */}
      <rect x="326" y="226" width="148" height="80" fill={STONE.light} />
      <rect x="400" y="226" width="74" height="80" fill="#0b1020" opacity="0.1" />
      <Dome x={346} y={226} r={20} color="#FBBF24" />
      <Dome x={454} y={226} r={20} color="#FBBF24" />
      <Tower x={400} y={228} w={58} h={132} roof="#FBBF24" glow="#fff7d1" flag={accent} />
      {/* stairs and banners */}
      <path d={poly([372, 448], [428, 448], [420, 440], [380, 440])} fill="#c6d0ea" />
      <path d={poly([380, 440], [420, 440], [414, 306], [386, 306])} fill="#dde5f7" />
      {[322, 346, 370, 394, 418].map((y, i) => (
        <path key={y} d={`M${388 + i * 0.6} ${y}h${24 - i * 1.2}`} stroke="#8592b8" strokeWidth="1.4" opacity="0.7" />
      ))}
      {[236, 296, 504, 564].map((x, i) => (
        <path key={x} className="svg-sway" d={poly([x - 7, 392], [x + 7, 392], [x + 7, 432], [x, 424], [x - 7, 432])} fill={i % 2 ? "#FBBF24" : accent} />
      ))}
      <Birds rng={rng} count={5} y0={70} y1={190} color="#fff" opacity={0.8} />
      <CloudBank rng={rng} y={470} count={6} size={250} color="#ffffff" shade="#b9d0f6" opacity={0.95} />
    </>
  );
}

const SCENES: Record<SceneKind, (props: P) => ReactNode> = {
  isles: Isles,
  skycity: SkyCity,
  ruins: Ruins,
  forest: Forest,
  crystal: CrystalScene,
  airships: Airships,
  mountains: Mountains,
  harbor: Harbor,
  forge: Forge,
  festival: Festival,
  observatory: Observatory,
  citadel: Citadel,
};

const DEFAULT_ACCENT: Record<SceneKind, string> = {
  isles: "#FBBF24",
  skycity: "#FBBF24",
  ruins: "#A78BFA",
  forest: "#4ADE80",
  crystal: "#A78BFA",
  airships: "#38BDF8",
  mountains: "#38BDF8",
  harbor: "#2DD4BF",
  forge: "#FB923C",
  festival: "#FB7185",
  observatory: "#A78BFA",
  citadel: "#FBBF24",
};

interface SceneArtProps {
  kind: SceneKind;
  seed?: number;
  /** Hex accent used for banners, lights and highlights. */
  accent?: string;
  className?: string;
}

/** Procedural illustration for a scene. Fills its container and crops from the centre. */
export function SceneArt({ kind, seed = 1, accent, className }: SceneArtProps) {
  const id = useSvgId("sc");
  const Scene = SCENES[kind];
  const rng = createRng(seed * 7919 + kind.length * 131);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" className={cn("block size-full", className)}>
      <Scene id={id} rng={rng} accent={accent ?? DEFAULT_ACCENT[kind]} />
    </svg>
  );
}
