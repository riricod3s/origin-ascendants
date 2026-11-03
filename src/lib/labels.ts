import type { SceneKind, Tone } from "@/types/content";

/** Default illustration for content that only carries a tone. */
export const TONE_SCENE: Record<Tone, SceneKind> = {
  aether: "isles",
  arcane: "crystal",
  solar: "skycity",
  verdant: "forest",
  tide: "harbor",
  ember: "forge",
  blush: "festival",
};

export const DIFFICULTY_LABEL: Record<1 | 2 | 3, string> = {
  1: "Beginner friendly",
  2: "Intermediate",
  3: "Advanced",
};

/** Small deterministic seed from a slug, so illustrations stay stable between renders. */
export function seedFrom(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return (hash % 997) + 1;
}
