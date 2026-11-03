import { stripInline } from "@/lib/inline";
import { slugify } from "@/lib/slug";
import type { ContentBlock } from "@/types/content";

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

/** Unique, stable heading ids keyed by block index. Shared by the renderer and the table of contents. */
export function headingIds(blocks: ContentBlock[]): Map<number, string> {
  const seen = new Map<string, number>();
  const ids = new Map<number, string>();

  blocks.forEach((block, index) => {
    if (block.type !== "h2" && block.type !== "h3") return;
    const base = slugify(stripInline(block.text)) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    ids.set(index, count === 0 ? base : `${base}-${count + 1}`);
  });

  return ids;
}

export function getToc(blocks: ContentBlock[], options: { includeH3?: boolean } = {}): TocItem[] {
  const ids = headingIds(blocks);
  const items: TocItem[] = [];

  blocks.forEach((block, index) => {
    const id = ids.get(index);
    if (!id) return;
    if (block.type === "h2") items.push({ id, title: stripInline(block.text), level: 2 });
    else if (block.type === "h3" && options.includeH3) items.push({ id, title: stripInline(block.text), level: 3 });
  });

  return items;
}
