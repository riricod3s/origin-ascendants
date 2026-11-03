import type { ReactNode } from "react";
import { SceneArt } from "@/components/art/SceneArt";
import { cn } from "@/lib/cn";
import { TONES } from "@/lib/tones";
import type { SceneKind, Tone } from "@/types/content";

interface SceneCoverProps {
  scene: SceneKind;
  seed?: number;
  tone?: Tone;
  /** Tailwind aspect utility, e.g. "aspect-[16/10]". */
  aspect?: string;
  className?: string;
  children?: ReactNode;
  /** Adds a bottom gradient so overlaid text stays legible. */
  shade?: boolean;
}

/** A procedurally illustrated "screenshot" used on cards. */
export function SceneCover({ scene, seed = 1, tone = "aether", aspect = "aspect-[16/10]", className, children, shade = false }: SceneCoverProps) {
  return (
    <div className={cn("relative isolate overflow-hidden", aspect, className)}>
      <SceneArt kind={scene} seed={seed} accent={TONES[tone].hex} className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover/cover:scale-[1.06]" />
      {shade && <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />}
      {children}
    </div>
  );
}
