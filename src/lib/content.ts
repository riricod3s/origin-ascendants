import { changelog } from "@/data/changelog";
import { characters } from "@/data/characters";
import { charactersB } from "@/data/characters-b";
import { guides as guidesA } from "@/data/guides";
import { guidesB } from "@/data/guides-b";
import { loreEntriesA } from "@/data/lore-a";
import { loreEntriesB } from "@/data/lore-b";
import { mechanics as mechanicsA } from "@/data/mechanics";
import { mechanicsB } from "@/data/mechanics-b";
import { nationsA } from "@/data/nations-a";
import { nationsB } from "@/data/nations-b";
import { nationsC } from "@/data/nations-c";
import { newsArticles as newsA } from "@/data/news";
import { newsArticlesB } from "@/data/news-b";
import { originsA } from "@/data/origins-a";
import { originsB } from "@/data/origins-b";
import { ruleSections } from "@/data/rules";
import { timelineEvents, eras } from "@/data/timeline";
import type { ContentRef, IconKey, LoreTopic, SearchEntry, WikiCategorySlug } from "@/types/content";
import { loreTopics } from "@/data/lore-topics";

const NATION_ORDER = [
  "lumeria-concord",
  "tidehaven-republic",
  "emberforge-dominion",
  "evergrove-covenant",
  "twilight-reach",
  "highcrest-clans",
];

const GUIDE_ORDER = [
  "getting-started",
  "origins-guide",
  "nations-guide",
  "economy-guide",
  "trading-guide",
  "combat-guide",
  "event-guide",
];

function byOrder<T extends { slug: string }>(items: T[], order: string[]) {
  return [...items].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}

export const origins = [...originsA, ...originsB];
export const nations = byOrder([...nationsA, ...nationsB, ...nationsC], NATION_ORDER);
export const allCharacters = [...characters, ...charactersB];
export const loreEntries = [...loreEntriesA, ...loreEntriesB];
export const guides = byOrder([...guidesA, ...guidesB], GUIDE_ORDER);
export const mechanics = [...mechanicsA, ...mechanicsB];
export const wikiArticles = [...guides, ...mechanics];
export const newsArticles = [...newsA, ...newsArticlesB].sort((a, b) => b.date.localeCompare(a.date));
export { changelog, eras, loreTopics, timelineEvents };

export const wikiCategories: {
  slug: WikiCategorySlug;
  title: string;
  description: string;
  icon: IconKey;
  count: number;
  href: string;
}[] = [
  { slug: "origins", title: "Origins", description: "Choose the gifts that shape your journey.", icon: "sparkles", count: origins.length, href: "/wiki/origins" },
  { slug: "nations", title: "Nations", description: "Meet the banners and people of Aurelune.", icon: "flag", count: nations.length, href: "/wiki/nations" },
  { slug: "lore", title: "Lore", description: "Explore the history written across the world.", icon: "scroll-text", count: loreEntries.length, href: "/wiki/lore" },
  { slug: "characters", title: "Characters", description: "Discover the people behind the turning points.", icon: "users", count: allCharacters.length, href: "/wiki/characters" },
  { slug: "mechanics", title: "Mechanics", description: "Understand the systems that make Aurelune work.", icon: "waypoints", count: mechanics.length, href: "/wiki/mechanics" },
  { slug: "guides", title: "Guides", description: "Practical advice for your first steps and beyond.", icon: "book-open", count: guides.length, href: "/wiki/guides" },
  { slug: "rules", title: "Rules", description: "The shared standards that keep the world welcoming.", icon: "gavel", count: ruleSections.length, href: "/wiki/rules" },
  { slug: "changelog", title: "Changelog", description: "A record of updates, improvements and fixes.", icon: "newspaper", count: changelog.length, href: "/wiki/changelog" },
];

export function getOrigin(slug: string) {
  return origins.find((item) => item.slug === slug);
}

export function getNation(slug: string) {
  return nations.find((item) => item.slug === slug);
}

export function getCharacter(slug: string) {
  return allCharacters.find((item) => item.slug === slug);
}

export function getLoreEntry(slug: string) {
  return loreEntries.find((item) => item.slug === slug);
}

export function getWikiArticle(category: "guides" | "mechanics", slug: string) {
  return wikiArticles.find((item) => item.category === category && item.slug === slug);
}

export function getLoreTopic(slug: string): LoreTopic | undefined {
  return loreTopics.find((topic) => topic.slug === slug);
}

export function getTimelineEvent(id: string) {
  return timelineEvents.find((event) => event.id === id);
}

export function getNewsArticle(slug: string) {
  return newsArticles.find((item) => item.slug === slug);
}

export function getEra(slug: string) {
  return eras.find((era) => era.slug === slug);
}

export interface ResolvedRef {
  key: string;
  kind: string;
  title: string;
  summary: string;
  href: string;
  icon: IconKey;
  tone: SearchEntry["tone"];
}

/** Turns a cross-reference into a linkable card, or `undefined` if the target does not exist. */
export function resolveRef(ref: ContentRef): ResolvedRef | undefined {
  const key = `${ref.type}:${ref.slug}`;
  switch (ref.type) {
    case "origin": {
      const item = getOrigin(ref.slug);
      return item && { key, kind: "Origin", title: item.name, summary: item.tagline, href: `/wiki/origins/${item.slug}`, icon: item.icon, tone: item.tone };
    }
    case "nation": {
      const item = getNation(ref.slug);
      return item && { key, kind: "Nation", title: item.name, summary: item.tagline, href: `/nations/${item.slug}`, icon: "flag", tone: item.tone };
    }
    case "character": {
      const item = getCharacter(ref.slug);
      return item && { key, kind: "Character", title: item.name, summary: item.title, href: `/wiki/characters/${item.slug}`, icon: "user", tone: item.tone };
    }
    case "lore": {
      const item = getLoreEntry(ref.slug);
      return item && { key, kind: "Lore", title: item.title, summary: item.summary, href: `/lore/${item.slug}`, icon: "scroll-text", tone: item.tone };
    }
    case "guide":
    case "mechanic": {
      const category = ref.type === "guide" ? "guides" : "mechanics";
      const item = getWikiArticle(category, ref.slug);
      return item && { key, kind: ref.type === "guide" ? "Guide" : "Mechanic", title: item.title, summary: item.summary, href: `/wiki/${category}/${item.slug}`, icon: item.icon, tone: item.tone };
    }
  }
}

export function resolveRefs(refs: ContentRef[]) {
  return refs.map(resolveRef).filter((item): item is ResolvedRef => Boolean(item));
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [
    ...origins.map((item) => ({
      id: `origin:${item.slug}`, title: item.name, summary: item.tagline, kind: "Origin", category: "origins" as const,
      href: `/wiki/origins/${item.slug}`, tags: [...item.playstyle, item.rarity], icon: item.icon, tone: item.tone,
    })),
    ...nations.map((item) => ({
      id: `nation:${item.slug}`, title: item.name, summary: item.tagline, kind: "Nation", category: "nations" as const,
      href: `/nations/${item.slug}`, tags: [item.motto, item.territory.region, item.government.type], icon: "flag" as const, tone: item.tone,
    })),
    ...loreEntries.map((item) => ({
      id: `lore:${item.slug}`, title: item.title, summary: item.summary, kind: "Lore", category: "lore" as const,
      href: `/lore/${item.slug}`, tags: item.tags, icon: "scroll-text" as const, tone: item.tone,
    })),
    ...allCharacters.map((item) => ({
      id: `character:${item.slug}`, title: item.name, summary: item.title, kind: "Character", category: "characters" as const,
      href: `/wiki/characters/${item.slug}`, tags: [item.status, item.nation ?? "Wanderer"], icon: "user" as const, tone: item.tone,
    })),
    ...guides.map((item) => ({
      id: `guide:${item.slug}`, title: item.title, summary: item.summary, kind: "Guide", category: "guides" as const,
      href: `/wiki/guides/${item.slug}`, tags: item.tags, icon: item.icon, tone: item.tone,
    })),
    ...mechanics.map((item) => ({
      id: `mechanic:${item.slug}`, title: item.title, summary: item.summary, kind: "Mechanic", category: "mechanics" as const,
      href: `/wiki/mechanics/${item.slug}`, tags: item.tags, icon: item.icon, tone: item.tone,
    })),
    ...changelog.map((item) => ({
      id: `release:${item.version}`, title: `Version ${item.version}: ${item.title}`, summary: item.summary, kind: "Update", category: "changelog" as const,
      href: "/wiki/changelog", tags: item.highlights, icon: "newspaper" as const, tone: "aether" as const,
    })),
    ...newsArticles.map((item) => ({
      id: `news:${item.slug}`, title: item.title, summary: item.excerpt, kind: "News", category: "news" as const,
      href: `/news/${item.slug}`, tags: item.tags, icon: "newspaper" as const, tone: item.tone,
    })),
    ...ruleSections.map((item) => ({
      id: `rule:${item.id}`, title: item.title, summary: item.summary, kind: "Rules", category: "rules" as const,
      href: "/rules", tags: item.rules.map((rule) => rule.title), icon: item.icon, tone: item.tone,
    })),
  ];
  return entries;
}

export const searchIndex = buildSearchIndex();
