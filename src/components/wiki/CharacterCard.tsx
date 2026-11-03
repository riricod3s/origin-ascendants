import { PixelPortrait } from "@/components/art/PixelPortrait";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/cn";
import { getNation, getOrigin } from "@/lib/content";
import { TONES } from "@/lib/tones";
import type { Character, CharacterStatus, Tone } from "@/types/content";

export const STATUS_TONE: Record<CharacterStatus, Tone> = { Living: "verdant", Fallen: "blush", Legend: "solar" };

/** Portrait inside a glowing, gilded frame. */
export function PortraitFrame({ character, className }: { character: Character; className?: string }) {
  const hex = TONES[character.tone].hex;
  return (
    <div className={cn("relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-night", className)}>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 30%, ${hex}55, transparent 62%), linear-gradient(180deg, #16234a, #0b1228)` }} />
      <div aria-hidden="true" className="absolute inset-x-6 top-6 bottom-0 rounded-t-full border border-white/10" />
      <PixelPortrait spec={character.portrait} className="relative mx-auto mt-6 w-[78%] transition-transform duration-700 ease-out-expo group-hover/tilt:scale-[1.04]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-night/80 to-transparent" />
    </div>
  );
}

export function CharacterCard({ character }: { character: Character }) {
  const nation = character.nation ? getNation(character.nation) : undefined;
  const origin = character.origin ? getOrigin(character.origin) : undefined;
  return (
    <TiltCard tone={character.tone} href={`/wiki/characters/${character.slug}`} label={`${character.name}, ${character.title}`} className="h-full overflow-hidden p-3">
      <PortraitFrame character={character} className="aspect-[4/4.2]" />
      <div className="px-2 pt-4 pb-2">
        <div className="flex flex-wrap gap-1.5">
          <Badge tone={STATUS_TONE[character.status]} size="sm">{character.status}</Badge>
          {origin && <Badge tone={origin.tone} size="sm" variant="outline" icon={origin.icon}>{origin.name}</Badge>}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-white">{character.name}</h3>
        <p className="mt-1 text-sm text-mist/80">{character.title}</p>
        <p className="mt-3 text-xs text-mist/60">{nation ? nation.name : "Unaffiliated wanderer"}</p>
      </div>
    </TiltCard>
  );
}
