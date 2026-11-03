import type { WikiArticle } from "@/types/content";

export const guides: WikiArticle[] = [
  {
    slug: "getting-started",
    category: "guides",
    title: "Getting Started",
    summary:
      "Everything you need for your first day in Aurelune, from your Discord application to choosing an Origin at the Hall of Origins and spending your first Aurels.",
    icon: "compass",
    tone: "aether",
    difficulty: 1,
    readingMinutes: 4,
    tags: ["beginner", "whitelist", "first steps", "ascendant landing"],
    updated: "2026-10-28",
    content: [
      {
        type: "p",
        text: "Welcome, Ascendant. Aurelune is a whitelisted, community-driven Origins SMP of floating archipelagos, glowing forests and six proud nations. This guide walks you from your first application to your first sunrise, so you spend less time wondering what to do and more time climbing toward the sky-isles.",
      },
      { type: "h2", text: "Before You Join" },
      {
        type: "steps",
        items: [
          {
            title: "Apply on Discord",
            text: "Join our Discord server and fill in the short whitelist application. You must be 13 or older. A staff member reviews it, usually within a day, and adds your Minecraft name to the whitelist.",
          },
          {
            title: "Install the mod stack",
            text: "Install Fabric Loader, Fabric API and the Origins mod for the server's Minecraft version. The full list, including optional performance mods, lives on the [Server](/server) page.",
          },
          {
            title: "Read the rules",
            text: "Spend five minutes with the [Server Rules](/rules). They are short and friendly, and they explain the few things that will get you into trouble, such as griefing, cheats and real-money trading.",
          },
          {
            title: "Connect",
            text: "Add the address from the [Server](/server) page to your Multiplayer list and log in. You will appear on **The Ascendant Landing**, a ring of floating isles high above the world.",
          },
        ],
      },
      { type: "h2", text: "Your First Hour" },
      {
        type: "steps",
        items: [
          {
            title: "Visit the Hall of Origins",
            text: "Walk to the **Hall of Origins** on the Landing and choose one of the twelve Origins. Each has always-on passives, active abilities and at least one weakness to plan around, except the ever-adaptable Human.",
          },
          {
            title: "Bind your abilities",
            text: "Open **Controls → Origins** and set keys for **Primary Ability** and **Secondary Ability**. Actives have cooldowns, so test them somewhere safe before your first expedition.",
          },
          {
            title: "Check your Coin Purse",
            text: "Every new player starts with **100 Aurels** in a personal **Coin Purse**. Hold on to most of it for now; a Skyport fare and a few good tools will be worth every coin.",
          },
          {
            title: "Choose a direction",
            text: "Set out on foot or catch an airship from the **Skyports**, the docks that link Aurelune's cities for a small fare. The [World Map](/map) shows every nation's border and the great landmarks.",
          },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Your first change is free",
        text: "Not sure your Origin fits? Your first Origin change within **7 days** of joining costs nothing. After that, re-choosing consumes an **Orb of Origin**, earned from events or crafted from Starstone Shards.",
      },
      { type: "h2", text: "Nation or Wanderer?" },
      {
        type: "table",
        headers: ["Path", "How it works", "Best for"],
        rows: [
          [
            "Join a nation",
            "A citizen sponsors you and the nation's leadership approves you. You start as a Citizen and can rise to Officer, Minister or Leader.",
            "Players who want a home city, shared projects and a voice in diplomacy",
          ],
          [
            "Stay a Wanderer",
            "Remain unaligned and travel freely. You can still trade, join every event and earn Deeds.",
            "Explorers, traders and anyone still finding their place",
          ],
        ],
      },
      {
        type: "p",
        text: "There is no rush. Many Ascendants spend a week exploring before they choose a banner, and the [Nations Guide](/wiki/guides/nations-guide) explains sponsorship when you are ready.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Protect your first build",
        text: "Land inside a nation's **Banner Stone** claims is protected from griefing automatically. Wilderness builds are still covered by the no-griefing rule but have no automatic protection, so keep your valuables close and open a ticket if anything goes wrong.",
      },
      { type: "h2", text: "Climbing the Ranks" },
      {
        type: "p",
        text: "Everyone begins their Ascension as a **Wanderer** and climbs through Initiate, Adept, Luminary and Ascendant to Legend by completing **Deeds**: exploring, crafting, serving a nation, joining events and helping others. Ranks are earned in-game only and unlock cosmetic titles, trails, extra homes and more.",
      },
      {
        type: "list",
        items: [
          "PvP is **consensual** outside declared War Zones and event arenas, so nobody may attack you without your agreement.",
          "Duels in the **Proving Grounds** on the Ascendant Landing are always allowed and lose no items.",
          "Origin Ascendants is **not pay-to-win**: the supporter tiers on the [Support](/support) page offer cosmetic, community and convenience perks only.",
        ],
      },
    ],
    related: [
      { type: "guide", slug: "origins-guide" },
      { type: "guide", slug: "nations-guide" },
      { type: "mechanic", slug: "ascension-ranks" },
      { type: "mechanic", slug: "skyports-and-travel" },
    ],
  },
  {
    slug: "origins-guide",
    category: "guides",
    title: "Origins Guide",
    summary:
      "Compare all twelve Origins, learn how passives, actives and weaknesses work, and find out how to change your Origin with your free week or an Orb of Origin.",
    icon: "wand-sparkles",
    tone: "arcane",
    difficulty: 1,
    readingMinutes: 4,
    tags: ["origins", "abilities", "orb of origin", "beginner"],
    updated: "2026-10-15",
    content: [
      {
        type: "p",
        text: "Every Ascendant carries a spark of the shattered Heartstar, and in Aurelune that light blooms as an **Origin**: an inherited gift of body and spirit. Twelve wait for you at the **Hall of Origins**, and each one changes how you move, fight, build and explore. This guide helps you pick one you will love for the long climb.",
      },
      { type: "h2", text: "How Origins Work" },
      {
        type: "list",
        items: [
          "**Passives** are always on, from the Merling's water breathing to the Avian's immunity to fall damage.",
          "**Actives** fire from your **Primary Ability** and **Secondary Ability** keybinds, set in **Controls → Origins**, and each has its own cooldown.",
          "**Weaknesses** are part of the bargain. Every Origin except the Human has at least one, and playing around it is half the fun.",
          "**Rarity** describes how often an Origin appears among Aurelune's peoples, not how strong it is. A Common Origin is every bit as viable as a Legendary one.",
        ],
      },
      { type: "h2", text: "The Twelve at a Glance" },
      {
        type: "table",
        headers: ["Origin", "Strengths", "Watch out for"],
        rows: [
          ["[Human](/wiki/origins/human)", "Adaptable and balanced, with no weaknesses", "No specialisation: master of none, student of all"],
          ["[Elytrian](/wiki/origins/elytrian)", "Innate glide wings for soaring between sky-isles", "Light armour only; uneasy under low ceilings"],
          ["[Enderian](/wiki/origins/enderian)", "Short-range blink and a love of the dark", "Water deals damage"],
          ["[Merling](/wiki/origins/merling)", "Breathes underwater and swims swiftly", "Weaker, slower and parched on dry land"],
          ["[Phantom](/wiki/origins/phantom)", "Night vision and a translucent phase-shift form", "Weaker in direct sunlight"],
          ["[Blazeborn](/wiki/origins/blazeborn)", "Fire immunity, a warm aura and a flame dash", "Hurt by water and cold biomes"],
          ["[Avian](/wiki/origins/avian)", "No fall damage, scouting pings and speed for allies", "Fragile, hollow bones"],
          ["[Arachnid](/wiki/origins/arachnid)", "Wall-climbing, a venom bite and web snares", "A smaller health pool"],
          ["[Shulk](/wiki/origins/shulk)", "Natural armour, extra storage and an unbreakable shell guard", "Slow and always hungry"],
          ["[Feline](/wiki/origins/feline)", "Sure-footed leaps, pounces and night prowling", "Skittish around creepers and explosions"],
          ["[Starborne](/wiki/origins/starborne)", "Starlight regeneration under open sky and a starfall burst", "Weaker underground"],
          ["[Verdant](/wiki/origins/verdant)", "Photosynthesis, faster crops nearby and entangling roots", "Flammable and weak in winter"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Match your Origin to your plans",
        text: "Each nation has homeland Origins that suit its terrain: Merlings thrive in the lagoons of [Tidehaven](/nations/tidehaven-republic), Blazeborn feel at home in the lava rivers of [Emberforge](/nations/emberforge-dominion) and Verdant flourish beneath the [Evergrove](/nations/evergrove-covenant) canopy. Any Origin may join any nation, though.",
      },
      { type: "h2", text: "Changing Your Origin" },
      {
        type: "steps",
        items: [
          {
            title: "Use your free change",
            text: "Your first Origin change within **7 days** of joining costs nothing. Return to the Hall of Origins and choose again.",
          },
          {
            title: "Earn an Orb of Origin",
            text: "After that, every change consumes an **Orb of Origin**. Win one at events such as Skyward Expeditions, Banner Clash or the Festival of Ascension, or craft one from Starstone Shards.",
          },
          {
            title: "Hunt for shards",
            text: "The monthly **Meteor Hunt** scatters Starstone Shards across the wilds, making it the most reliable way to work toward an Orb.",
          },
          {
            title: "Re-bind and re-learn",
            text: "A new Origin brings new actives. Check your keybinds again and practise in the **Proving Grounds** before heading somewhere dangerous.",
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Origins are never for sale",
        text: "No Origin, Orb of Origin or ability boost can be bought. The supporter tiers on the [Support](/support) page are strictly cosmetic, community and convenience perks.",
      },
      {
        type: "p",
        text: "Still torn? Start as a **Human**: no weaknesses, no specialisation, and a steady base from which to learn Aurelune before your free week runs out. Full ability lists live on each Origin's page and in [Origin Abilities](/wiki/mechanics/origin-abilities).",
      },
    ],
    related: [
      { type: "mechanic", slug: "origin-abilities" },
      { type: "guide", slug: "getting-started" },
      { type: "guide", slug: "event-guide" },
      { type: "lore", slug: "the-first-awakening" },
      { type: "origin", slug: "human" },
    ],
  },
];
