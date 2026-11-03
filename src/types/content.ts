/**
 * Shared content model for the Origin Ascendants world.
 *
 * Text fields marked "mini-markdown" support:
 *   **bold**, *italic*, and [label](/internal-path) links.
 * Nothing else (no HTML, no headings, no images).
 */

/* -------------------------------------------------------------------------- */
/* Primitives                                                                 */
/* -------------------------------------------------------------------------- */

export const ICON_KEYS = [
  "sparkles", "compass", "map", "map-pin", "swords", "sword", "shield", "shield-check",
  "crown", "castle", "flag", "landmark", "book-open", "book-marked", "scroll-text", "scroll",
  "users", "user", "wind", "waves", "flame", "moon", "moon-star", "sun", "sunrise", "cloud",
  "mountain", "mountain-snow", "tree-pine", "tree-deciduous", "leaf", "sprout", "flower",
  "gem", "star", "coins", "handshake", "trophy", "hammer", "pickaxe", "hourglass",
  "telescope", "orbit", "wand-sparkles", "newspaper", "camera", "palette", "zap", "anchor",
  "ship", "rocket", "bird", "bug", "cat", "eye", "ghost", "feather", "heart",
  "heart-handshake", "key", "package", "backpack", "route", "building", "tent", "snowflake",
  "droplets", "shell", "fish", "scale", "gavel", "medal", "award", "calendar", "megaphone",
  "party-popper", "brain", "globe", "clock", "lock", "alert", "info", "hand-heart",
  "milestone", "message-circle", "hand-coins", "store", "atom", "vault", "bell", "waypoints",
  "signpost", "library", "gift", "ticket", "trending-up", "layers", "rainbow", "eclipse",
  "lamp", "lightbulb", "puzzle", "target", "footprints", "dumbbell", "quote", "mail",
  "gamepad", "server", "wifi", "activity", "check", "circle-check", "bomb", "bone", "wheat",
  "shovel", "flask", "egg", "cuboid", "hexagon", "diamond", "home", "search", "crosshair",
] as const;

/** Key into the curated Lucide icon map in `src/lib/icons.ts`. */
export type IconKey = (typeof ICON_KEYS)[number];

/** Accent colour family. Maps to the palette in `src/lib/tones.ts`. */
export type Tone = "aether" | "arcane" | "solar" | "verdant" | "tide" | "ember" | "blush";

/** Procedural illustration used wherever a screenshot or cover image would go. */
export type SceneKind =
  | "isles"
  | "skycity"
  | "ruins"
  | "forest"
  | "crystal"
  | "airships"
  | "mountains"
  | "harbor"
  | "forge"
  | "festival"
  | "observatory"
  | "citadel";

/** Rich body copy rendered by `RichContent`. */
export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; variant: "tip" | "warning" | "info" | "lore"; title?: string; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] };

/* -------------------------------------------------------------------------- */
/* Wiki                                                                       */
/* -------------------------------------------------------------------------- */

export type WikiCategorySlug =
  | "origins"
  | "nations"
  | "lore"
  | "characters"
  | "mechanics"
  | "guides"
  | "rules"
  | "changelog";

/** Cross-link to another piece of content. */
export type ContentRef =
  | { type: "origin"; slug: string }
  | { type: "nation"; slug: string }
  | { type: "character"; slug: string }
  | { type: "lore"; slug: string }
  | { type: "mechanic"; slug: string }
  | { type: "guide"; slug: string };

/** A single guide or mechanics article. */
export interface WikiArticle {
  slug: string;
  category: "guides" | "mechanics";
  title: string;
  summary: string;
  icon: IconKey;
  tone: Tone;
  /** 1 = beginner friendly, 3 = advanced */
  difficulty: 1 | 2 | 3;
  readingMinutes: number;
  tags: string[];
  content: ContentBlock[];
  related: ContentRef[];
  /** ISO date (YYYY-MM-DD) */
  updated: string;
}

/* -------------------------------------------------------------------------- */
/* Origins                                                                    */
/* -------------------------------------------------------------------------- */

export interface Ability {
  name: string;
  description: string;
  icon: IconKey;
  /** Active abilities only, e.g. "45s" */
  cooldown?: string;
  /** Active abilities only, e.g. "Primary Ability Key" */
  keybind?: string;
}

export interface Weakness {
  name: string;
  description: string;
}

export type OriginRarity = "Common" | "Uncommon" | "Rare" | "Legendary";

export interface OriginStats {
  /** Each value is an integer from 1 (low) to 5 (high). */
  mobility: number;
  offense: number;
  defense: number;
  utility: number;
  survival: number;
}

export interface Origin {
  slug: string;
  name: string;
  /** Short epithet, e.g. "The Skyborn" */
  epithet: string;
  /** One-line hook */
  tagline: string;
  /** 2-3 sentence overview (mini-markdown) */
  description: string;
  icon: IconKey;
  tone: Tone;
  rarity: OriginRarity;
  /** 1 = beginner friendly, 3 = advanced */
  difficulty: 1 | 2 | 3;
  playstyle: string[];
  stats: OriginStats;
  passives: Ability[];
  actives: Ability[];
  weaknesses: Weakness[];
  /** 2-4 paragraphs (mini-markdown) */
  lore: string[];
  /** Origin slugs */
  related: string[];
  /** Nation slugs where this origin is most common */
  homelands: string[];
  /** ISO date */
  updated: string;
}

/* -------------------------------------------------------------------------- */
/* Nations                                                                    */
/* -------------------------------------------------------------------------- */

export type FlagPattern =
  | "horizontal"
  | "vertical"
  | "cross"
  | "diagonal"
  | "chevron"
  | "quartered"
  | "sunburst";

export type FlagEmblem =
  | "sun"
  | "wave"
  | "anvil"
  | "tree"
  | "moon"
  | "peak"
  | "star"
  | "crown"
  | "wing"
  | "tower";

export interface FlagSpec {
  pattern: FlagPattern;
  /** Hex colours: [field, secondary, emblem/accent] */
  colors: [string, string, string];
  emblem: FlagEmblem;
}

export type CityType = "capital" | "city" | "port" | "fortress" | "town";

export interface NationCity {
  name: string;
  type: CityType;
  description: string;
}

export interface NationRelation {
  /** Nation slug */
  slug: string;
  /** One sentence on the nature of the relationship (mini-markdown) */
  note: string;
}

export interface Nation {
  slug: string;
  name: string;
  /** Short form, e.g. "Lumeria" */
  short: string;
  motto: string;
  /** One-line hook */
  tagline: string;
  tone: Tone;
  /** Hex colours used for the banner, map territory and accents */
  colors: { primary: string; secondary: string };
  flag: FlagSpec;
  scene: SceneKind;
  /** 2-3 sentence overview (mini-markdown) */
  description: string;
  leader: {
    name: string;
    title: string;
    /** Slug in characters data */
    characterSlug?: string;
    bio: string;
  };
  allies: NationRelation[];
  rivals: NationRelation[];
  territory: {
    region: string;
    summary: string;
    biomes: string[];
    landmarks: string[];
    size: string;
  };
  government: {
    type: string;
    summary: string;
    branches: { title: string; role: string }[];
  };
  /** Chronological, 4-6 entries */
  history: { year: string; title: string; text: string }[];
  capital: NationCity;
  /** 4-5 cities, not including the capital */
  cities: NationCity[];
  /** e.g. "AS 143" */
  founded: string;
  /** 2-3 paragraphs about daily life and culture (mini-markdown) */
  culture: string[];
  strengths: string[];
  challenges: string[];
  /** Origin slugs commonly found here */
  commonOrigins: string[];
  traditions: { name: string; description: string }[];
  joining: { open: boolean; summary: string; requirements: string[] };
}

/* -------------------------------------------------------------------------- */
/* Characters                                                                 */
/* -------------------------------------------------------------------------- */

export type PortraitHair = "short" | "long" | "braided" | "bald" | "hooded" | "spiky" | "curly";
export type PortraitAccessory =
  | "none"
  | "crown"
  | "circlet"
  | "goggles"
  | "headband"
  | "antlers"
  | "eyepatch"
  | "scarf";

export interface PortraitSpec {
  /** Hex colours */
  skin: string;
  hair: string;
  eyes: string;
  /** Clothing/cape colour */
  outfit: string;
  hairStyle: PortraitHair;
  accessory: PortraitAccessory;
}

export type CharacterStatus = "Living" | "Fallen" | "Legend";

export interface Character {
  slug: string;
  name: string;
  /** e.g. "High Luminary of Lumeria" */
  title: string;
  /** Nation slug, or null for unaffiliated figures */
  nation: string | null;
  /** Origin slug, or null */
  origin: string | null;
  status: CharacterStatus;
  /** Era slug from the timeline data (e.g. "age-of-concord") */
  era: string;
  tone: Tone;
  portrait: PortraitSpec;
  /** Short quote in their voice */
  quote: string;
  /** 2-4 paragraphs (mini-markdown) */
  biography: string[];
  /** 4-6 short bullet lines */
  achievements: string[];
  /** 1-2 sentences (mini-markdown) */
  significance: string;
  relatedCharacters: string[];
  relatedLore: string[];
}

/* -------------------------------------------------------------------------- */
/* Lore                                                                       */
/* -------------------------------------------------------------------------- */

export type LoreTopicSlug =
  | "ancient-history"
  | "founding-eras"
  | "great-wars"
  | "legendary-figures"
  | "political-history"
  | "world-events";

export interface LoreTopic {
  slug: LoreTopicSlug;
  title: string;
  description: string;
  icon: IconKey;
  tone: Tone;
  scene: SceneKind;
}

export interface LoreEntry {
  slug: string;
  title: string;
  topic: LoreTopicSlug;
  /** Era slug (see `Era`) */
  era: string;
  /** Human-readable time frame, e.g. "AS 301 - AS 412" */
  timeframe: string;
  summary: string;
  scene: SceneKind;
  tone: Tone;
  tags: string[];
  readingMinutes: number;
  content: ContentBlock[];
  related: ContentRef[];
  /** ISO date */
  updated: string;
}

export interface Era {
  slug: string;
  name: string;
  /** e.g. "Before AS 0" */
  span: string;
  startYear: number;
  endYear: number;
  tone: Tone;
  icon: IconKey;
  description: string;
}

export type TimelineEventKind =
  | "founding"
  | "war"
  | "discovery"
  | "treaty"
  | "disaster"
  | "festival"
  | "ascension";

export interface TimelineEvent {
  id: string;
  /** Numeric year in the AS calendar (negative = before the Sundering) */
  year: number;
  /** e.g. "AS 143" or "~1200 BS" */
  yearLabel: string;
  title: string;
  /** 1 sentence shown collapsed */
  summary: string;
  /** 2-4 sentences shown expanded (mini-markdown) */
  details: string;
  era: string;
  kind: TimelineEventKind;
  icon: IconKey;
  /** Nation slugs involved */
  nations?: string[];
  /** Optional deep link to a lore entry */
  loreSlug?: string;
}

/* -------------------------------------------------------------------------- */
/* Changelog, news, gallery, events                                           */
/* -------------------------------------------------------------------------- */

export type ChangeType = "added" | "improved" | "balance" | "fixed" | "removed";

export interface ChangelogRelease {
  version: string;
  title: string;
  /** ISO date */
  date: string;
  kind: "major" | "minor" | "patch";
  summary: string;
  highlights: string[];
  changes: { type: ChangeType; text: string }[];
}

export type NewsCategorySlug =
  | "server-updates"
  | "nation-news"
  | "event-recaps"
  | "community-spotlights";

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategorySlug;
  /** ISO date */
  date: string;
  author: { name: string; role: string };
  readingMinutes: number;
  scene: SceneKind;
  tone: Tone;
  tags: string[];
  featured?: boolean;
  content: ContentBlock[];
  /** Related nation slugs */
  nations?: string[];
}

export type GalleryCategorySlug = "builds" | "events" | "landscapes" | "community" | "fan-art";

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategorySlug;
  /** Minecraft username or display name */
  author: string;
  /** Nation slug, if relevant */
  nation?: string;
  scene: SceneKind;
  tone: Tone;
  /** Deterministic seed for the procedural illustration */
  seed: number;
  /** Width / height ratio between 0.7 and 1.6 for the masonry layout */
  aspect: number;
  /** ISO date */
  date: string;
  /** Optional real screenshot in /public (e.g. "/gallery/solspire.jpg"). Overrides the illustration. */
  image?: string;
}

export type EventKind = "Adventure" | "War" | "Seasonal" | "Festival" | "Tournament";

/** weekday: 0 = Sunday ... 6 = Saturday. All times are UTC. */
export type EventSchedule =
  | { kind: "weekly"; weekday: number; hourUTC: number }
  /** nth = 1..4, or -1 for the last weekday of the month */
  | { kind: "monthly"; weekday: number; nth: 1 | 2 | 3 | 4 | -1; hourUTC: number }
  /** month: 1..12 */
  | { kind: "annual"; month: number; day: number; hourUTC: number };

export interface ServerEvent {
  id: string;
  title: string;
  type: EventKind;
  description: string;
  icon: IconKey;
  tone: Tone;
  scene: SceneKind;
  /** Human-readable cadence, e.g. "First Saturday of every month" */
  cadence: string;
  schedule: EventSchedule;
  highlights: string[];
}

/* -------------------------------------------------------------------------- */
/* Rules, support, staff, legal                                               */
/* -------------------------------------------------------------------------- */

export interface RuleItem {
  title: string;
  text: string;
}

export interface PunishmentStep {
  level: string;
  name: string;
  description: string;
  duration: string;
  tone: Tone;
}

export interface RuleSection {
  id: string;
  title: string;
  icon: IconKey;
  tone: Tone;
  summary: string;
  rules: RuleItem[];
  /** Only used by the Punishments section */
  ladder?: PunishmentStep[];
  footnote?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  /** Paragraphs (mini-markdown) */
  answer: string[];
}

export type SupportTierId = "ascend" | "ascend-plus";

export interface SupportTier {
  id: SupportTierId;
  name: string;
  tagline: string;
  price: string;
  period: string;
  icon: IconKey;
  tone: Tone;
  recommended?: boolean;
  benefits: { text: string; inherited?: boolean }[];
}

export interface Supporter {
  /** Minecraft username */
  username: string;
  tier: SupportTierId;
  /** ISO date */
  joined: string;
}

export interface FundingGoal {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  tone: Tone;
  /** Whole currency units */
  goal: number;
  raised: number;
  currency: string;
}

export type StaffRole = "Owner" | "Administrator" | "Moderator" | "Builder";

export type SocialPlatform =
  | "discord"
  | "x"
  | "youtube"
  | "twitch"
  | "github"
  | "instagram"
  | "tiktok"
  | "website";

export interface StaffMember {
  slug: string;
  /** Minecraft username */
  username: string;
  role: StaffRole;
  /** Display title, e.g. "Server Owner & Lead Developer" */
  position: string;
  tone: Tone;
  bio: string;
  /** Origin slug they usually play */
  origin?: string;
  /** Nation slug they are affiliated with (staff stay neutral in conflicts) */
  nation?: string;
  socials: { platform: SocialPlatform; label: string; url: string }[];
}

export interface LegalSection {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface LegalDocument {
  title: string;
  /** ISO date */
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
}

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */

export interface SearchEntry {
  id: string;
  title: string;
  summary: string;
  /** Display label for the source, e.g. "Origin", "Nation", "Lore" */
  kind: string;
  category: WikiCategorySlug | "news";
  href: string;
  tags: string[];
  icon: IconKey;
  tone: Tone;
}
