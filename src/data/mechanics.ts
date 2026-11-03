import type { WikiArticle } from "@/types/content";

export const mechanics: WikiArticle[] = [
  {
    slug: "origin-abilities",
    category: "mechanics",
    title: "Origin Abilities",
    summary:
      "How passive and active Origin abilities work: keybinds, cooldowns, how abilities interact with claims and consent rules, and exactly what it costs to change your Origin.",
    icon: "wand-sparkles",
    tone: "arcane",
    difficulty: 1,
    readingMinutes: 3,
    tags: ["abilities", "keybinds", "cooldowns", "origins", "orb of origin"],
    content: [
      {
        type: "p",
        text: "Every Origin carries two kinds of power. **Passives** are woven into your body and are always on, from a Merling's water breathing to a Feline's sure footing. **Actives** are gifts you call on deliberately, each bound to a key and followed by a cooldown. The full kit for every Origin is listed on its page in the [Origins wiki](/wiki/origins).",
      },
      { type: "h2", text: "Ability types" },
      {
        type: "table",
        headers: ["Type", "How it triggers", "Keybind", "Cooldown"],
        rows: [
          ["Passive", "Always on, even while sleeping, riding or swimming", "None", "None"],
          ["Primary active", "Press once to use", "Primary Ability", "Starts the moment it fires"],
          ["Secondary active", "Press once to use", "Secondary Ability", "Starts the moment it fires"],
          ["Toggle active", "Press to begin, press again to end", "Primary or Secondary Ability", "Starts when the effect ends"],
          ["Weakness", "Always on, triggered by the world around you", "None", "None"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Bind your keys first",
        text: "Open **Controls → Origins** and set **Primary Ability** and **Secondary Ability** before you leave the Ascendant Landing. Many players choose G and H, or two mouse side buttons. If an active seems to do nothing, check for a clash with another mod's binding.",
      },
      { type: "h2", text: "Cooldown rules" },
      {
        type: "list",
        items: [
          "Each active shows its cooldown as a small radial icon above your hotbar, and a soft chime plays when it is ready again.",
          "Cooldowns keep running through death, respawn and logging out, so relogging never resets them.",
          "Your two actives never share a cooldown: using your Primary does not delay your Secondary.",
          "Nothing shortens a cooldown. Potions, enchantments, beacons, Ascension rank and supporter perks have no effect on it.",
          "Exact cooldowns are published on each Origin's page and change only through an announced balance patch in the [changelog](/wiki/changelog).",
        ],
      },
      { type: "h2", text: "Abilities, consent and claims" },
      {
        type: "p",
        text: "Abilities follow the same rules as swords and bows. Damaging actives only harm players inside a declared War Zone during a Siege Window, in event arenas and in duels at the Proving Grounds; everywhere else they affect mobs alone. Abilities that place or reshape blocks, such as webs, roots or flame trails, simply fizzle inside another nation's Banner Stone claim unless you hold Guest trust there.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Safe ground",
        text: "Damaging actives are switched off across the Ascendant Landing and the Hall of Origins, except inside the Proving Grounds. Movement abilities still work, so Elytrians and Avians can glide freely between the floating isles.",
      },
      { type: "h2", text: "Changing your Origin" },
      {
        type: "table",
        headers: ["Situation", "Cost", "Notes"],
        rows: [
          ["First choice", "Free", "Made in the Hall of Origins when you first arrive"],
          ["First change within 7 days", "Free", "Counted from your first choice; one free change only"],
          ["Any later change", "1 Orb of Origin", "Right-click the Orb outside combat to reopen the Origin menu"],
          ["Major Origin rework", "Free", "Staff open a 7-day free-change window for affected players, announced in the changelog"],
        ],
      },
      {
        type: "list",
        items: [
          "**Orbs of Origin** are earned from events such as Banner Clash and the Festival of Ascension, or crafted from nine Starstone Shards.",
          "Your items, Aurels, homes, nation, Ascension rank and Deeds all stay with you. Only your powers, weaknesses and cooldowns change.",
          "A Shulk must empty their shell storage before an Orb will activate, so nothing is lost in the change.",
          "An Orb cannot be used while you are combat-tagged, which lasts 30 seconds after any PvP damage.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Earned, never bought",
        text: "Orbs of Origin can be traded in-game or sold at Stalls, but never for real money. Supporter tiers grant no Orbs and no Origin advantages of any kind.",
      },
    ],
    related: [
      { type: "guide", slug: "origins-guide" },
      { type: "guide", slug: "getting-started" },
      { type: "guide", slug: "combat-guide" },
      { type: "mechanic", slug: "ascension-ranks" },
    ],
    updated: "2026-10-14",
  },
  {
    slug: "banner-stones",
    category: "mechanics",
    title: "Banner Stones & Claims",
    summary:
      "The full reference for Banner Stones, the claim anchors nations use to protect land and draw their borders on the world map. Covers reach, allowance, protection, upkeep and what happens when upkeep goes unpaid.",
    icon: "flag",
    tone: "verdant",
    difficulty: 2,
    readingMinutes: 3,
    tags: ["claims", "banner stones", "nations", "upkeep", "map"],
    content: [
      {
        type: "p",
        text: "A **Banner Stone** is a nation's claim anchor: a carved starstone pillar crowned with the nation's flag. Every chunk it claims is protected from griefing, and together a nation's claims draw the coloured borders you see on the [world map](/map). Only nations can raise Banner Stones. Wanderers' builds are protected by the [server rules](/rules) instead.",
      },
      { type: "h2", text: "How claims work" },
      {
        type: "list",
        items: [
          "Placing a Banner Stone claims the chunk it stands in.",
          "Officers extend the claim one chunk at a time from the stone's menu. Each new chunk must touch existing claim and lie within 4 chunks of a Banner Stone, so one stone reaches at most a 9 by 9 chunk area.",
          "Each nation has one **Capital Banner Stone** plus up to 7 **Outpost Banner Stones**.",
          "Players cannot break Banner Stones. Officers can pick up and move an Outpost stone, but only the Leader can move the Capital stone, and only with staff present.",
          "Borders on the world map refresh within 15 minutes of any change.",
        ],
      },
      { type: "h2", text: "Claim allowance" },
      {
        type: "p",
        text: "Every nation starts with an allowance of 48 chunks. Each citizen then adds chunks according to their [Ascension rank](/wiki/mechanics/ascension-ranks), so a nation's land grows as its people do.",
      },
      {
        type: "table",
        headers: ["Citizen's Ascension rank", "Chunks added to the nation"],
        rows: [
          ["Wanderer", "+1"],
          ["Initiate", "+2"],
          ["Adept", "+4"],
          ["Luminary", "+6"],
          ["Ascendant", "+8"],
          ["Legend", "+10"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "When citizens leave",
        text: "A departing citizen takes their chunks out of the allowance. A nation that ends up claiming more than its allowance cannot claim anything new until it is back under, but nothing already claimed is released.",
      },
      { type: "h2", text: "What a claim protects" },
      {
        type: "list",
        items: [
          "Blocks, containers, doors, crops, animals, armour stands and item frames are safe from anyone without permission.",
          "Creeper explosions, fire spread and Endermen lifting blocks are all disabled.",
          "Origin abilities that place or break blocks fizzle for outsiders.",
          "Officers can grant **Guest** trust to individual players or to an entire allied nation.",
        ],
      },
      { type: "h2", text: "Upkeep" },
      {
        type: "table",
        headers: ["Rule", "Detail"],
        rows: [
          ["Rate", "3 Aurels per claimed chunk per week"],
          ["Free chunks", "The first 16 chunks around the Capital Banner Stone"],
          ["Collection", "Taken automatically from the nation treasury every Sunday at 00:00 UTC"],
          ["Unpaid", "Claims turn Faded for 7 days: protection stays, but no new chunks can be claimed"],
          ["Still unpaid", "Outposts release one chunk per day, furthest unbuilt chunk first, until upkeep is covered"],
          ["Capital", "Never released for unpaid upkeep"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Where you may not claim",
        text: "Claims must stay at least 2 chunks from another nation's border unless that nation consents at its Diplomacy Table, and at least 32 chunks from the Ascendant Landing. Skyport docks and public roads can never be claimed over or walled off.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Banner Stones in war",
        text: "Once war is declared, the target Banner Stone is locked in place until the war ends. Read [Diplomacy & War](/wiki/mechanics/diplomacy-and-war) to see how sieges are won by holding it.",
      },
    ],
    related: [
      { type: "guide", slug: "nations-guide" },
      { type: "mechanic", slug: "diplomacy-and-war" },
      { type: "mechanic", slug: "the-aurel-economy" },
      { type: "mechanic", slug: "ascension-ranks" },
    ],
    updated: "2026-09-28",
  },
];
