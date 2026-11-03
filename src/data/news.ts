import type { NewsArticle } from "@/types/content";

export const newsArticles: NewsArticle[] = [
  {
    slug: "meet-meridianmoth-the-wandering-cartographer",
    title: "Community Spotlight: MeridianMoth, the Cartographer Who Charted the Wandering Isle",
    excerpt:
      "For twelve weeks, an Avian Wanderer named MeridianMoth chased the Wandering Isle across the sky with a quill, a compass and endless patience. The result is the most complete atlas Aurelune has ever seen.",
    category: "community-spotlights",
    date: "2026-11-01",
    author: { name: "CrystalWren", role: "Lore Keeper & Moderator" },
    readingMinutes: 3,
    scene: "isles",
    tone: "aether",
    tags: ["Community", "Cartography", "Exploration", "Wanderers"],
    content: [
      {
        type: "p",
        text: "If you have ever found your way home thanks to a hand-drawn map pinned beside a Skyport, there is a good chance **MeridianMoth** drew it. An Avian Wanderer who arrived at the Ascendant Landing in early summer, MeridianMoth has spent five months turning Aurelune into paper, one valley at a time, and has quietly become one of the most helpful people on the server.",
      },
      { type: "h2", text: "The Wayfarer's Atlas" },
      {
        type: "p",
        text: "The project began as a single sketch of the Ascendant Landing for a lost newcomer. It is now **The Wayfarer's Atlas**: sixty-four framed map panels covering all six nations, the Glass Bridge, the rim of the Sundered Crater and every Skyport route in service. The whole atlas hangs in a sunlit gallery hall at the Landing, free for anyone to wander through.",
      },
      {
        type: "p",
        text: "The crown jewel is the chart of the **Wandering Isle**. Most explorers simply hope to stumble across the roaming island. MeridianMoth logged its position every evening for twelve weeks and found that it drifts in a slow, lazy loop around Mount Dawnrest, returning to the same patch of sky roughly every nineteen days.",
      },
      { type: "h2", text: "How MeridianMoth maps a region" },
      {
        type: "steps",
        items: [
          {
            title: "Scout from above",
            text: "From a high perch, the Avian scouting ping marks landmarks, rivers and roads before a single block of the map is placed.",
          },
          {
            title: "Walk the borders",
            text: "Every nation border is checked against the Banner Stones on the ground, so the atlas always matches the real claims.",
          },
          {
            title: "Draw, then redraw",
            text: "Rough sketches become map-art panels, and each panel is revised whenever a city grows or a new road opens.",
          },
        ],
      },
      {
        type: "quote",
        text: "A map is a promise that somebody went there first so you would not have to get lost. I just like keeping that promise.",
        cite: "MeridianMoth",
      },
      {
        type: "p",
        text: "The work has not gone unnoticed. MeridianMoth reached the rank of **Luminary** this autumn, almost entirely through exploration and community-help Deeds, and several nations now commission panels for their own halls through work orders. The harbourmasters of Stormbreak Quay even keep a copy of the Frostfang Pass chart behind the counter.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Visit the atlas",
        text: "Take the east path from the Hall of Origins and look for the doors beneath the bronze compass rose. For live borders and Skyport routes, the official [world map](/map) is always up to date, and [Ascension Ranks](/wiki/mechanics/ascension-ranks) explains how exploration Deeds count towards your next rank.",
      },
      {
        type: "p",
        text: "Know an Ascendant who deserves the spotlight? Nominate them in the community channel on Discord, and their story could be the next one on the [news page](/news).",
      },
    ],
  },
  {
    slug: "version-2-1-skylanes-stalls-and-verdant-tuning",
    title: "Version 2.1 Is Live: New Skylanes, Smarter Stalls and Verdant Tuning",
    excerpt:
      "Version 2.1 lands just in time for tonight's Skyward Expedition, with a direct Dawnharbor to Pearlmere skylane, a Coin Purse ledger, Verdant polish and a long list of fixes.",
    category: "server-updates",
    date: "2026-10-24",
    author: { name: "SkyArchitect", role: "Server Owner & Lead Developer" },
    readingMinutes: 3,
    scene: "airships",
    tone: "solar",
    tags: ["Update", "Version 2.1", "Skyports", "Economy"],
    featured: true,
    nations: ["lumeria-concord", "tidehaven-republic", "highcrest-clans"],
    content: [
      {
        type: "p",
        text: "Five weeks after [The Verdant Awakening](/news/version-2-0-the-verdant-awakening), version 2.1 is live. This update is all about the journeys between the big moments: how you travel, how you trade and how your Origin feels in your hands. Thank you to everyone who sent feedback, bug reports and wonderfully patient screenshots.",
      },
      { type: "h2", text: "New skylanes" },
      {
        type: "p",
        text: "Following the [Skyport Trade Pact](/news/lumeria-tidehaven-skyport-trade-pact), a direct skylane now links **Dawnharbor** and **Pearlmere**, turning the old three-stop journey into a single breezy flight. Highcrest has also opened a small Skyport at **Windbreak**, so travellers bound for Frostfang Pass can skip the long climb from Frosthollow. Fares stay small, and every route is listed in [Skyports and Travel](/wiki/mechanics/skyports-and-travel).",
      },
      { type: "h2", text: "Trade and the Aurel" },
      {
        type: "list",
        items: [
          "**Coin Purse ledger.** Your purse now remembers your recent payments and earnings, so you always know where your Aurels went.",
          "**Smarter Stalls.** Stall signs show stock at a glance and dim when sold out, so nobody crosses Driftmarket for an empty shelf.",
          "**Work order filters.** The work order boards in every capital can now be sorted by reward and by trade.",
          "**Repair previews.** The Anvilworks shows its repair fee before you confirm.",
        ],
      },
      { type: "h2", text: "Origins and abilities" },
      {
        type: "p",
        text: "The Verdant have settled in beautifully, and 2.1 adds a little polish. Resting near a campfire or inside a warm building now eases their winter weakness, and crops touched by their green thumb shimmer so farmers can see its reach. For every Origin, Primary Ability and Secondary Ability cooldowns now appear beside the hotbar.",
      },
      {
        type: "table",
        headers: ["Area", "What changed"],
        rows: [
          ["Ascension", "New cosmetic trails for the Adept and Luminary ranks"],
          ["Meteor Hunt", "A clue journal that records every hint you have found"],
          ["Builders' Festival", "Voting kiosks at the Ascendant Landing for easier tours"],
          ["Fixes", "Elytrians no longer clip Skyport gangways, and Shulk shell storage sorts correctly"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Fair for everyone",
        text: "Every new trail, title and reward in 2.1 is earned in-game through Deeds and events. Supporter tiers remain cosmetic, community and convenience perks only, because Origin Ascendants is **not pay-to-win**. Learn more on the [support page](/support).",
      },
      {
        type: "p",
        text: "The full list of changes lives in the [changelog](/wiki/changelog). See you aboard tonight's expedition, and mind the gangway.",
      },
    ],
  },
];
