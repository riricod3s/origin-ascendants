import { r1 } from "@/lib/prng";

export type Pair = readonly [number, number];

/** Closed polygon path. Coordinates are rounded so server and client output match exactly. */
export function poly(...pts: Pair[]): string {
  return `M${pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L")}Z`;
}

/** Open polyline path. */
export function polyline(...pts: Pair[]): string {
  return `M${pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L")}`;
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Blends two hex colours. `t` = 0 returns `a`, 1 returns `b`. */
export function mixHex(a: string, b: string, t: number): string {
  const pa = parseHex(a);
  const pb = parseHex(b);
  const out = pa.map((c, i) => Math.round(c + (pb[i] - c) * t));
  return `#${out.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
