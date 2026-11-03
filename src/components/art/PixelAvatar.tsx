import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { createRng, hashString } from "@/lib/prng";
import { mixHex } from "@/lib/svg";
import { LiveSkin } from "./LiveSkin";

const SKIN = ["#f1c9a5", "#e0ac84", "#c98e68", "#a4694a", "#7a4a34", "#f5d5bf"];
const HAIR = ["#3b2a20", "#6b4226", "#b8793f", "#e3b95b", "#222a3a", "#b4452d", "#d9d9e3", "#5b3a8a", "#2a7a6a"];
const EYES = ["#38BDF8", "#4ADE80", "#7c4a2a", "#A78BFA", "#FBBF24"];

/** Builds an 8x8 Minecraft-style face from a username, so every player always has a unique, stable avatar. */
function buildFace(name: string): string[][] {
  const rng = createRng(hashString(name.toLowerCase()));
  const skin = rng.pick(SKIN);
  const hair = rng.pick(HAIR);
  const eye = rng.pick(EYES);
  const skinShade = mixHex(skin, "#000000", 0.14);
  const hairShade = mixHex(hair, "#000000", 0.22);
  const mouth = mixHex(skin, "#7a2f2f", 0.5);
  const bangs = rng.int(0, 2);
  const longHair = rng.chance(0.35);
  const beard = rng.chance(0.25);

  const grid = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => skin));
  for (let c = 0; c < 8; c++) {
    grid[0][c] = c % 3 === 1 ? hairShade : hair;
    grid[1][c] = c % 4 === 2 ? hairShade : hair;
  }
  const bangCols = [[0, 1, 6, 7], [0, 1, 2, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7]][bangs];
  bangCols.forEach((c) => {
    grid[2][c] = c % 2 ? hairShade : hair;
  });
  if (bangs === 2) {
    grid[2][3] = skin;
    grid[2][4] = skin;
  }
  if (longHair) {
    for (let r = 3; r <= 6; r++) {
      grid[r][0] = hair;
      grid[r][7] = hair;
    }
  }
  grid[4][1] = "#ffffff";
  grid[4][2] = eye;
  grid[4][5] = eye;
  grid[4][6] = "#ffffff";
  grid[5][3] = skinShade;
  grid[5][4] = skinShade;
  for (let c = 2; c <= 5; c++) grid[6][c] = mouth;
  for (let c = 0; c < 8; c++) {
    if (grid[7][c] === skin) grid[7][c] = skinShade;
  }
  if (beard) {
    for (let c = 1; c <= 6; c++) {
      if (c >= 2 && c <= 5) continue;
      grid[6][c] = hairShade;
    }
    for (let c = 1; c <= 6; c++) grid[7][c] = hair;
    grid[5][1] = hairShade;
    grid[5][6] = hairShade;
  }
  return grid;
}

function runs(row: string[]) {
  const out: { x: number; w: number; color: string }[] = [];
  row.forEach((color, x) => {
    const last = out[out.length - 1];
    if (last && last.color === color) last.w += 1;
    else out.push({ x, w: 1, color });
  });
  return out;
}

interface PixelAvatarProps {
  /** Minecraft username. */
  name: string;
  className?: string;
  /** Overlay the real skin when `NEXT_PUBLIC_LIVE_AVATARS=true`. */
  live?: boolean;
}

export function PixelAvatar({ name, className, live = true }: PixelAvatarProps) {
  const rows = buildFace(name);
  return (
    <span className={cn("relative block aspect-square shrink-0 overflow-hidden", className)}>
      <svg viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true" focusable="false" className="pixelated absolute inset-0 size-full">
        {rows.map((row, y) => runs(row).map((r) => <rect key={`${y}-${r.x}`} x={r.x} y={y} width={r.w} height="1" fill={r.color} />))}
      </svg>
      {live && siteConfig.liveAvatars && <LiveSkin name={name} />}
    </span>
  );
}
