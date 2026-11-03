import type { CSSProperties } from "react";
import type { Tone } from "@/types/content";

export interface ToneInfo {
  hex: string;
  /** Space-separated channels for `rgb(var(--tone) / alpha)` */
  rgb: string;
  label: string;
}

export const TONES: Record<Tone, ToneInfo> = {
  aether: { hex: "#38BDF8", rgb: "56 189 248", label: "Aether" },
  arcane: { hex: "#A78BFA", rgb: "167 139 250", label: "Arcane" },
  solar: { hex: "#FBBF24", rgb: "251 191 36", label: "Solar" },
  verdant: { hex: "#4ADE80", rgb: "74 222 128", label: "Verdant" },
  tide: { hex: "#2DD4BF", rgb: "45 212 191", label: "Tide" },
  ember: { hex: "#FB923C", rgb: "251 146 60", label: "Ember" },
  blush: { hex: "#FB7185", rgb: "251 113 133", label: "Blush" },
};

/** Inline style that exposes `--tone` (and `--tone-hex`) to the tone-* utilities. */
export function toneStyle(tone: Tone): CSSProperties {
  const t = TONES[tone];
  return { "--tone": t.rgb, "--tone-hex": t.hex } as CSSProperties;
}

/** Converts a hex colour to the space-separated channel format used by `--tone`. */
export function hexToChannels(hex: string): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Style variant that accepts an arbitrary hex colour (e.g. nation colours). */
export function hexToneStyle(hex: string): CSSProperties {
  return { "--tone": hexToChannels(hex), "--tone-hex": hex } as CSSProperties;
}
