import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { SceneCover } from "@/components/ui/SceneCover";
import { TiltCard } from "@/components/ui/TiltCard";
import type { IconKey, SceneKind, Tone } from "@/types/content";

export interface LoreCardData {
  slug: string;
  title: string;
  summary: string;
  timeframe: string;
  readingMinutes: number;
  scene: SceneKind;
  tone: Tone;
  seed: number;
  topic: { slug: string; title: string; icon: IconKey; tone: Tone };
  eraName: string;
}

/** Illustrated card for a chronicle in the lore archive. */
export function LoreCard({ entry }: { entry: LoreCardData }) {
  return (
    <TiltCard tone={entry.tone} max={4} href={`/lore/${entry.slug}`} label={entry.title} className="group/cover flex h-full flex-col overflow-hidden">
      <SceneCover scene={entry.scene} seed={entry.seed} tone={entry.tone} aspect="aspect-[16/9]" shade>
        <div className="absolute top-4 left-4">
          <Badge tone={entry.topic.tone} icon={entry.topic.icon} variant="solid">{entry.topic.title}</Badge>
        </div>
        <p className="absolute right-4 bottom-3 left-4 text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">{entry.timeframe}</p>
      </SceneCover>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-white">{entry.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist/85">{entry.summary}</p>
        <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-mist/60">
          <span className="inline-flex items-center gap-1.5"><Icon name="hourglass" className="size-3.5" />{entry.eraName}</span>
          <span className="ml-auto inline-flex items-center gap-1.5"><Icon name="book-open" className="size-3.5" />{entry.readingMinutes} min read</span>
        </div>
      </div>
    </TiltCard>
  );
}
