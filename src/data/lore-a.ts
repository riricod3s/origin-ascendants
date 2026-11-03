import type { LoreEntry } from "@/types/content";

type LoreDraft = Pick<LoreEntry, "slug" | "title" | "topic" | "era" | "timeframe" | "scene" | "tone"> & {
  summary: string;
  detail: string;
};

const drafts: LoreDraft[] = [
  {
    slug: "the-radiant-age", title: "The Radiant Age", topic: "ancient-history", era: "radiant-age", timeframe: "~1200 BS – AS 0",
    scene: "ruins", tone: "solar", summary: "For twelve centuries, the Ascendants raised starstone cities above Aurelune and drew their light from the Heartstar.",
    detail: "The Radiant Age began when the first sky-builders learned to anchor towers to the heavens with starstone. At the height of their craft, Aurelon's spires were visible from every coast. Their greatest legacy was not the height they reached, but the maps and tools they left for those who came after.",
  },
  {
    slug: "the-heartstar", title: "The Heartstar", topic: "ancient-history", era: "radiant-age", timeframe: "~640 BS – AS 0",
    scene: "crystal", tone: "solar", summary: "Kindled in the spire-city of Aurelon, the Heartstar gave the ancient sky-cities their light and lift.",
    detail: "The Heartstar was a luminous celestial crystal tended in Aurelon's highest chamber. Its radiance powered the starstone anchors that held the cities aloft. When it shattered at the Sundering, its fragments travelled farther than any living map could follow.",
  },
  {
    slug: "the-sundering", title: "The Sundering", topic: "ancient-history", era: "the-sundering", timeframe: "AS 0 – AS 12",
    scene: "ruins", tone: "ember", summary: "The Heartstar broke, the old sky-cities fell or drifted away, and a new age began in the scattered fragments of its light.",
    detail: "No surviving account agrees on what caused the Heartstar to fracture. All agree on what followed: towers fell, islands wandered, and survivors found themselves beneath a changed sky. In AS 3, some of those touched by the fragments began to awaken as the first Origins.",
  },
  {
    slug: "the-age-of-dawn", title: "The Age of Dawn", topic: "founding-eras", era: "age-of-dawn", timeframe: "AS 13 – AS 142",
    scene: "skycity", tone: "verdant", summary: "Aurel Skyward's First Beacon drew scattered survivors together and gave them the confidence to rebuild.",
    detail: "The Beacon on Mount Dawnrest became a meeting point, a promise and a practical guide through the dark. Communities shared routes, recovered starstone and built the first safe skyports. The Great Gathering of AS 61 marked the moment when survival became a shared future.",
  },
  {
    slug: "the-first-awakening", title: "The First Awakening", topic: "founding-eras", era: "the-sundering", timeframe: "AS 3",
    scene: "crystal", tone: "aether", summary: "Three years after the Sundering, the first known Origins appeared among people who had come close to Heartstar fragments.",
    detail: "Early accounts describe changes as varied as wings, hardened skin and a sudden ease beneath the waves. The First Awakening was not a ceremony or a choice; it was a quiet, bewildering answer to the light left behind by the Heartstar.",
  },
  {
    slug: "the-era-of-banners", title: "The Era of Banners", topic: "founding-eras", era: "era-of-banners", timeframe: "AS 143 – AS 300",
    scene: "festival", tone: "verdant", summary: "Six nations formed around distinct homelands, raising banners that carried local customs into a shared world.",
    detail: "Lumeria's founding charter in AS 143 began a wave of new civic life. Tidehaven, Evergrove, Highcrest, Emberforge and Twilight Reach each followed, with their own forms of leadership and ways of stewarding the land. Rivalries grew alongside trade, and the sky lanes tied the new capitals together.",
  },
  {
    slug: "the-ember-wars", title: "The Ember Wars", topic: "great-wars", era: "age-of-embers", timeframe: "AS 301 – AS 412",
    scene: "citadel", tone: "ember", summary: "Border disputes and competing claims to starstone grew into a long series of declared conflicts, remembered as the Ember Wars.",
    detail: "The Ember Wars were not one unbroken battle. They were a century of campaigns, truces and difficult negotiations, fought over borders, shipping lanes and the stewardship of Heartstar shards. The Night of Falling Stars in AS 412 turned the nations toward a lasting peace.",
  },
  {
    slug: "siege-of-pearlmere", title: "The Siege of Pearlmere", topic: "great-wars", era: "age-of-embers", timeframe: "AS 327",
    scene: "harbor", tone: "tide", summary: "A blockade around Tidehaven's capital tested the harbour's defences and the resolve of its neighbours.",
    detail: "The siege lasted eleven days before a negotiated passage reopened Pearlmere's supply routes. Tidehaven's harbour crews kept the city fed, while Highcrest guides led relief caravans through a winter pass. The agreement that ended the siege became an early model for later rules of engagement.",
  },
  {
    slug: "battle-of-skyfall-pass", title: "The Battle of Skyfall Pass", topic: "great-wars", era: "age-of-embers", timeframe: "AS 358",
    scene: "mountains", tone: "ember", summary: "A hard-fought defence of the northern pass ended when commanders on both sides chose to protect evacuees first.",
    detail: "When a sudden rockslide closed the road, combatants paused their advance to clear the route for civilians. That moment did not end the Ember Wars, but it changed how many people spoke about them. The pass is now a place of remembrance and a well-travelled route between nations.",
  },
  {
    slug: "the-concord-of-aurelune", title: "The Concord of Aurelune", topic: "political-history", era: "age-of-concord", timeframe: "AS 413",
    scene: "skycity", tone: "aether", summary: "The six nations signed a mutual peace after the Night of Falling Stars, beginning the current Age of Concord.",
    detail: "The Concord established shared responsibilities for the Skyports, a forum for resolving disputes and a promise to record treaties openly. It did not erase disagreements; it gave the nations a reliable place to bring them. The annual Spire Summit keeps that promise in practice.",
  },
  {
    slug: "the-timber-feud", title: "The Timber Feud", topic: "political-history", era: "age-of-embers", timeframe: "AS 389 – AS 410",
    scene: "forest", tone: "verdant", summary: "A dispute over old-growth logging strained relations between Evergrove and Highcrest for two decades.",
    detail: "The feud began when logging roads crossed into protected forest near the border. The Rootmoot and Clan Moot eventually negotiated shared stewardship, seasonal limits and a replanting compact. Their agreement is still used as a model for settling claims without force.",
  },
  {
    slug: "the-spire-summit", title: "The Spire Summit", topic: "political-history", era: "age-of-concord", timeframe: "AS 420 – present",
    scene: "skycity", tone: "aether", summary: "Solspire's reopened Great Library became the setting for regular talks between leaders and scholars.",
    detail: "The first summit brought nation leaders, mapmakers and archivists together to compare records lost during the wars. Its public sessions let citizens follow diplomacy, while private working groups coordinate trade and shared expeditions. Each year's meeting leaves a new volume in the library.",
  },
  {
    slug: "night-of-falling-stars", title: "The Night of Falling Stars", topic: "world-events", era: "age-of-embers", timeframe: "AS 412",
    scene: "observatory", tone: "arcane", summary: "A meteor shower scattered new fragments across Aurelune and reminded every nation how much they still shared.",
    detail: "The sky filled with luminous trails from dusk until dawn. Scouts from all six nations worked together to mark safe landing sites and guide people away from fresh craters. In the weeks that followed, envoys began the talks that produced the Concord.",
  },
  {
    slug: "the-great-aurora", title: "The Great Aurora", topic: "world-events", era: "era-of-banners", timeframe: "AS 226 and recurring",
    scene: "observatory", tone: "arcane", summary: "A rare ribbon of colour swept over the eastern sky on the night Twilight Reach was founded.",
    detail: "The first Great Aurora appeared above Moonveil as Twilight Reach raised its banner. The spectacle returns in irregular seasons, and observatories across Aurelune now share their readings so travellers can watch it together. Its colour shifts with the weather, never keeping to one nation's border.",
  },
  {
    slug: "festival-of-ascension", title: "The Festival of Ascension", topic: "world-events", era: "age-of-concord", timeframe: "Annual, every autumn equinox",
    scene: "festival", tone: "arcane", summary: "Each autumn, communities celebrate exploration, new beginnings and the shared legacy of Aurel Skyward's beacon.",
    detail: "The festival began as a beacon-keeping tradition and now moves between the six capitals. Lantern launches, friendly build contests and guided walks welcome newcomers alongside long-time residents. Its most important custom is simple: every lantern carries the name of someone who helped another person find their way.",
  },
];

export const loreEntriesA: LoreEntry[] = drafts.map((draft) => ({
  ...draft,
  tags: [draft.topic.replaceAll("-", " "), draft.era.replaceAll("-", " "), "Aurelune"],
  readingMinutes: 3,
  content: [
    { type: "p", text: draft.summary },
    { type: "h2", text: "From the archive" },
    { type: "p", text: draft.detail },
  ],
  related: [],
  updated: "2026-10-12",
}));
