import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/ui/TiltCard";
import { StatPips } from "@/components/wiki/OriginBits";
import { DIFFICULTY_LABEL } from "@/lib/labels";
import type { Origin } from "@/types/content";

const RARITY_TONE = { Common: "aether", Uncommon: "verdant", Rare: "arcane", Legendary: "solar" } as const;

/** Collectible-style card for an Origin. */
export function OriginCard({ origin, compact = false }: { origin: Origin; compact?: boolean }) {
  return (
    <TiltCard tone={origin.tone} href={`/wiki/origins/${origin.slug}`} label={`${origin.name}, ${origin.epithet}`} className="h-full overflow-hidden p-6">
      <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[radial-gradient(circle,rgb(var(--tone)/0.28),transparent_70%)] transition-transform duration-700 group-hover/tilt:scale-125" />
      <div className="relative flex items-start justify-between gap-3">
        <span className="grid size-14 place-items-center rounded-2xl border border-white/15 tone-bg tone-text tone-glow transition-transform duration-500 group-hover/tilt:-translate-y-1 group-hover/tilt:rotate-[-6deg]">
          <Icon name={origin.icon} className="size-7" strokeWidth={1.7} />
        </span>
        <Badge tone={RARITY_TONE[origin.rarity]} icon="gem" variant="outline">{origin.rarity}</Badge>
      </div>
      <p className="relative mt-5 text-xs font-semibold tracking-[0.2em] uppercase tone-text">{origin.epithet}</p>
      <h3 className="relative mt-1 font-display text-2xl font-bold text-white">{origin.name}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-mist/85">{origin.tagline}</p>
      {!compact && (
        <>
          <StatPips stats={origin.stats} tone={origin.tone} className="relative mt-5" />
          <div className="relative mt-5 flex flex-wrap items-center gap-1.5 border-t border-white/8 pt-4">
            {origin.playstyle.map((style) => (
              <span key={style} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[0.7rem] text-mist/85">{style}</span>
            ))}
            <span className="ml-auto text-[0.7rem] text-mist/60">{DIFFICULTY_LABEL[origin.difficulty]}</span>
          </div>
        </>
      )}
    </TiltCard>
  );
}

export { RARITY_TONE };
