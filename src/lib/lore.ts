import type { ArchiveEntry } from "@/components/lore/LoreArchive";
import type { LoreCardData } from "@/components/lore/LoreCard";
import { getEra, getLoreTopic } from "@/lib/content";
import { stripInline } from "@/lib/inline";
import { seedFrom } from "@/lib/labels";
import type { ContentBlock, LoreEntry } from "@/types/content";

/** Flattens rich content into plain text (for search). */
export function blocksText(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "p":
        case "h2":
        case "h3":
          return block.text;
        case "list":
          return block.items.join(" ");
        case "callout":
          return `${block.title ?? ""} ${block.text}`;
        case "quote":
          return `${block.text} ${block.cite ?? ""}`;
        case "steps":
          return block.items.map((step) => `${step.title} ${step.text}`).join(" ");
        case "table":
          return [...block.headers, ...block.rows.flat()].join(" ");
      }
    })
    .map(stripInline)
    .join(" ");
}

export function toLoreCard(entry: LoreEntry): LoreCardData {
  const topic = getLoreTopic(entry.topic);
  return {
    slug: entry.slug,
    title: entry.title,
    summary: entry.summary,
    timeframe: entry.timeframe,
    readingMinutes: entry.readingMinutes,
    scene: entry.scene,
    tone: entry.tone,
    seed: seedFrom(entry.slug),
    topic: { slug: entry.topic, title: topic?.title ?? entry.topic, icon: topic?.icon ?? "scroll-text", tone: topic?.tone ?? entry.tone },
    eraName: getEra(entry.era)?.name ?? entry.era,
  };
}

export function toArchiveEntry(entry: LoreEntry): ArchiveEntry {
  const card = toLoreCard(entry);
  return {
    ...card,
    haystack: [entry.title, entry.summary, entry.timeframe, card.eraName, card.topic.title, ...entry.tags, blocksText(entry.content)].join(" ").toLowerCase(),
  };
}
