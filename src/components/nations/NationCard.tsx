import { Banner } from "@/components/art/FlagArt";
import { Badge } from "@/components/ui/Badge";
import { SceneCover } from "@/components/ui/SceneCover";
import { TiltCard } from "@/components/ui/TiltCard";
import { seedFrom } from "@/lib/labels";
import type { Nation } from "@/types/content";

/** Card linking to a nation profile, with its banner hanging over the illustrated skyline. */
export function NationCard({ nation }: { nation: Nation }) {
  const facts = [
    { label: "Capital", value: nation.capital.name },
    { label: "Government", value: nation.government.type },
    { label: "Leader", value: `${nation.leader.title} ${nation.leader.name}` },
    { label: "Founded", value: nation.founded },
  ];

  return (
    <TiltCard tone={nation.tone} max={4} href={`/nations/${nation.slug}`} label={`${nation.name} profile`} className="group/cover h-full overflow-hidden">
      <div className="relative">
        <SceneCover scene={nation.scene} seed={seedFrom(nation.slug)} tone={nation.tone} aspect="aspect-[16/8]" shade />
        <div className="absolute top-0 right-6 w-16 origin-top drop-shadow-[0_12px_20px_rgba(2,6,23,0.6)] transition-transform duration-700 ease-out-expo group-hover/tilt:translate-y-1 sm:w-[4.5rem]">
          <Banner spec={nation.flag} className="w-full animate-sway" />
        </div>
        <div className="absolute bottom-4 left-6">
          {nation.joining.open ? (
            <Badge tone="verdant" icon="circle-check" variant="solid">Recruiting</Badge>
          ) : (
            <Badge tone="aether" icon="lock" variant="outline">By invitation</Badge>
          )}
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase tone-text">&ldquo;{nation.motto}&rdquo;</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-white">{nation.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mist/85">{nation.tagline}</p>
        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/8 pt-5">
          {facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="text-[0.68rem] tracking-[0.14em] text-mist/55 uppercase">{fact.label}</dt>
              <dd className="mt-0.5 truncate text-sm text-white">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex items-center gap-4 text-xs text-mist/70">
          <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-verdant" />{nation.allies.length} allies</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-ember" />{nation.rivals.length} rivals</span>
          <span className="ml-auto truncate">{nation.territory.size}</span>
        </div>
      </div>
    </TiltCard>
  );
}
