import type { WikiArticle } from "@/types/content";

export const mechanicsB: WikiArticle[] = [
  {
    slug: "diplomacy-and-war",
    category: "mechanics",
    title: "Diplomacy & War",
    summary:
      "The complete reference for alliances, trade pacts, Concord treaties and declared wars: the Diplomacy Table, 48-hour declarations, War Zones, two-hour Siege Windows and objective-based victory.",
    icon: "handshake",
    tone: "ember",
    difficulty: 3,
    readingMinutes: 4,
    tags: ["diplomacy", "war", "treaties", "sieges", "nations"],
    content: [
      {
        type: "p",
        text: "Every nation's capital holds a **Diplomacy Table**, a great round table of starstone where leaders and ministers record alliances, trade pacts, treaties and declarations of war. Since the [Concord of Aurelune](/lore/the-concord-of-aurelune), conflict in Aurelune follows clear, fair rules: wars are declared openly, fought briefly and won by objectives, never by destruction.",
      },
      { type: "h2", text: "Relationships" },
      {
        type: "table",
        headers: ["Status", "What it means", "How it is made"],
        rows: [
          ["Neutral", "The default between any two nations", "No action needed"],
          ["Trade Pact", "Shared Stall access and Guest trust in each other's markets", "Both leaders sign at a Diplomacy Table"],
          ["Alliance", "Allies may join each other's wars and share claim trust", "Both leaders sign; announced at the next War Council"],
          ["Concord Treaty", "A binding non-aggression pact; neither nation can declare war on the other", "Both leaders sign for at least 30 days"],
          ["War", "A declared conflict with a stated cause and scheduled sieges", "A formal declaration with 48 hours' notice"],
        ],
      },
      { type: "h2", text: "Declaring War" },
      {
        type: "steps",
        items: [
          {
            title: "State a cause",
            text: "A declaration must name a cause, such as a disputed border, a broken pact or a contested Heartstar shard, and the outcome the declaring nation is seeking.",
          },
          {
            title: "Give 48 hours' notice",
            text: "The declaration is lodged at the declaring nation's Diplomacy Table and announced to both nations. Nothing can happen for 48 hours, leaving time for talks.",
          },
          {
            title: "Schedule the sieges",
            text: "Staff and both nations agree on Siege Windows, usually at the monthly War Council. Each window lasts **two hours at most**.",
          },
          {
            title: "Fight in the War Zone",
            text: "The targeted Outpost Banner Stone and the chunks around it become the War Zone. PvP is enabled there only during the Siege Window.",
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Protected from war",
        text: "Nations with an active Concord Treaty cannot be targeted. Capital Banner Stones, the Ascendant Landing, Skyport docks and public roads can never become War Zones.",
      },
      { type: "h2", text: "Winning a Siege" },
      {
        type: "list",
        items: [
          "The attackers win a Siege Window by holding the targeted Banner Stone at the end of the window. The defenders win by keeping it.",
          "A war lasts at most three Siege Windows. The nation that wins the most windows achieves its stated outcome.",
          "Either side may offer a truce at any time. Signed truces and peace treaties are recorded in the [lore archive](/lore).",
          "Players keep their inventories inside War Zones, so nobody loses their gear in a siege.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Honour in war",
        text: "Griefing, looting containers and permanent destruction are forbidden even during war. Staff observe every siege and can pause a window if the rules are broken.",
      },
      {
        type: "p",
        text: "Most disputes never reach a siege. Many end at the Diplomacy Table, and the monthly War Council is as famous for its treaties as for its declarations. Read the [Combat Guide](/wiki/guides/combat-guide) to prepare, and the [server rules](/rules) for the full code of conduct.",
      },
    ],
    related: [
      { type: "mechanic", slug: "banner-stones" },
      { type: "guide", slug: "combat-guide" },
      { type: "guide", slug: "nations-guide" },
      { type: "lore", slug: "the-concord-of-aurelune" },
    ],
    updated: "2026-10-12",
  },
  {
    slug: "the-aurel-economy",
    category: "mechanics",
    title: "The Aurel Economy",
    summary:
      "How the Aurel works behind the scenes: Coin Purses, physical Aurel Coins, nation treasuries, work orders, Stalls and the gold sinks that keep prices steady.",
    icon: "coins",
    tone: "solar",
    difficulty: 2,
    readingMinutes: 3,
    tags: ["economy", "aurels", "treasury", "stalls", "upkeep"],
    content: [
      {
        type: "p",
        text: "The **Aurel** has been the common currency of Aurelune since the beacon-camps struck the first gold-trimmed coins in AS 80. Today it is a player-driven economy: Aurels enter the world through quests, bounties, work orders and events, move between players through trade, and leave the world through a handful of carefully balanced gold sinks.",
      },
      { type: "h2", text: "Where Aurels Live" },
      {
        type: "table",
        headers: ["Container", "What it holds", "Notes"],
        rows: [
          ["Coin Purse", "Your personal balance", "Never dropped on death; includes a ledger of recent payments"],
          ["Aurel Coin", "A physical gold-trimmed coin item", "Withdraw from your purse to store in chests or hand over in person"],
          ["Nation treasury", "Shared funds for a nation", "Ministers and the Leader manage it; pays claim upkeep and work orders"],
          ["Stall", "Earnings from your sign shop", "Paid straight into your Coin Purse, even while you are offline"],
        ],
      },
      { type: "h2", text: "Sources and Sinks" },
      {
        type: "table",
        headers: ["Aurels enter through", "Aurels leave through"],
        rows: [
          ["100 starting Aurels for every new player", "Claim upkeep: 3 Aurels per chunk per week"],
          ["Quests and bounties", "Skyport fares"],
          ["Event rewards", "Repair fees at the Anvilworks"],
          ["Staff-funded work orders", "Event entry for special tournaments"],
        ],
      },
      {
        type: "callout",
        variant: "lore",
        title: "Why it is called the Aurel",
        text: "The first coins were stamped with a beacon flame and named for [Aurel Skyward](/wiki/characters/aurel-skyward). Every nation founded afterwards kept the coin, and it remains one of the few things all six have always agreed on.",
      },
      { type: "h2", text: "Rules of the Economy" },
      {
        type: "list",
        items: [
          "Prices are set by players. Staff never fix the price of goods, but they adjust rewards and fees to keep the economy healthy.",
          "Real-money trading of items, Aurels or services is forbidden.",
          "Supporter tiers never grant Aurels, items or economic advantages.",
          "Exploits that create Aurels or items from nothing must be reported, not used.",
        ],
      },
      {
        type: "p",
        text: "For practical tips, start with the [Economy Guide](/wiki/guides/economy-guide), then the [Trading Guide](/wiki/guides/trading-guide) when you are ready to open a Stall. Changes to fees and rewards are always listed in the [changelog](/wiki/changelog).",
      },
    ],
    related: [
      { type: "guide", slug: "economy-guide" },
      { type: "guide", slug: "trading-guide" },
      { type: "mechanic", slug: "banner-stones" },
      { type: "mechanic", slug: "skyports-and-travel" },
    ],
    updated: "2026-10-24",
  },
  {
    slug: "ascension-ranks",
    category: "mechanics",
    title: "Ascension Ranks",
    summary:
      "The six ranks of Ascension, from Wanderer to Legend: how Deeds work, what each rank unlocks and why ranks can only ever be earned in-game.",
    icon: "trending-up",
    tone: "arcane",
    difficulty: 1,
    readingMinutes: 3,
    tags: ["progression", "ranks", "deeds", "ascension", "titles"],
    content: [
      {
        type: "p",
        text: "In Aurelune, ascension is both a climb and a story. Every player begins as a **Wanderer** and rises through six ranks by completing **Deeds**: acts of exploration, craft, service and kindness that leave a mark on the world. Your rank appears beside your name, unlocks cosmetic rewards and helps your nation grow.",
      },
      { type: "h2", text: "Kinds of Deeds" },
      {
        type: "list",
        items: [
          "**Exploration**: discover landmarks, chart regions and reach sky-isles.",
          "**Crafting**: master trades, build notable structures and complete commissions.",
          "**Nation Service**: fulfil work orders, defend claims and serve as an envoy.",
          "**Events**: take part in Skyward Expeditions, Banner Clash, Meteor Hunt and festivals.",
          "**Community Help**: guide newcomers, organise gatherings and help others in need.",
        ],
      },
      { type: "h2", text: "The Six Ranks" },
      {
        type: "table",
        headers: ["Rank", "Deeds", "Homes", "Nation chunks", "Unlocks"],
        rows: [
          ["Wanderer", "0", "1", "+1", "Starting title"],
          ["Initiate", "10", "2", "+2", "Initiate title and Skyward Expedition routes"],
          ["Adept", "30", "3", "+4", "Adept trail and higher expedition routes"],
          ["Luminary", "75", "4", "+6", "Luminary trail and high-sky expeditions"],
          ["Ascendant", "150", "5", "+8", "Ascendant title and aurora trail"],
          ["Legend", "300", "6", "+10", "A place in the Hall of Legends at the Ascendant Landing"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Variety matters",
        text: "From Luminary onward, your Deeds must span at least three kinds. Legend also requires one **Legendary Deed**, a unique achievement recognised by staff and the community.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Earned, never bought",
        text: "Ranks, Deeds and titles can only be earned in-game. Supporter tiers do not grant ranks, Deeds or progression of any kind, and using alts or bots to complete Deeds breaks the [server rules](/rules).",
      },
      {
        type: "p",
        text: "Each rank's chunk bonus is added to your nation's claim allowance, as explained in [Banner Stones & Claims](/wiki/mechanics/banner-stones). The [Event Guide](/wiki/guides/event-guide) is the quickest route to your first few Deeds.",
      },
    ],
    related: [
      { type: "mechanic", slug: "banner-stones" },
      { type: "guide", slug: "event-guide" },
      { type: "guide", slug: "getting-started" },
      { type: "lore", slug: "aurel-skyward-the-first-ascendant" },
    ],
    updated: "2026-10-24",
  },
  {
    slug: "skyports-and-travel",
    category: "mechanics",
    title: "Skyports & Travel",
    summary:
      "Getting around Aurelune: Skyport airships and fares, skylanes between nations, sea lanes, the Glass Bridge and the free-flying routes of Elytrians and Avians.",
    icon: "ship",
    tone: "aether",
    difficulty: 1,
    readingMinutes: 3,
    tags: ["travel", "skyports", "airships", "fares", "map"],
    content: [
      {
        type: "p",
        text: "Aurelune is vast, and its cities are scattered across continents, coasts and floating isles. The **Skyports**, airship docks found in every capital and many cities, link them together. A short, scenic flight carries you across the world for a small fare, and every route is shown on the [world map](/map).",
      },
      { type: "h2", text: "Fares" },
      {
        type: "table",
        headers: ["Route", "Fare", "Example"],
        rows: [
          ["Ascendant Landing to any capital", "2 Aurels", "The Landing to Solspire"],
          ["Within one nation", "3 Aurels", "Pearlmere to Saltwatch"],
          ["Between nations", "8 Aurels", "Cinderhold to Stonecrown"],
          ["Direct skylanes", "8 Aurels", "Dawnharbor to Pearlmere"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Boarding",
        text: "Step onto a Skyport platform, pick your destination at the dock board and pay from your Coin Purse. Airships depart every few minutes, and your journey cannot be interrupted by PvP.",
      },
      { type: "h2", text: "Other Ways to Travel" },
      {
        type: "list",
        items: [
          "**The Glass Bridge**: a free starstone causeway between Lumeria and Twilight Reach, restored in AS 424.",
          "**Sea lanes**: Tidehaven's coastal waters are linked by the Tidegate Locks, perfect for boats and Merlings.",
          "**Public roads**: every capital is joined by roads that can never be claimed or walled off.",
          "**Free flight**: Elytrians glide and Avians never take fall damage, so both can explore the sky-isles on their own wings.",
        ],
      },
      {
        type: "callout",
        variant: "lore",
        title: "The Wandering Isle",
        text: "One floating island follows no route at all. The Wandering Isle drifts in a slow loop around Mount Dawnrest, and Tidehaven navigators have been charting it since AS 262.",
      },
      {
        type: "p",
        text: "New skylanes are added as nations sign trade pacts, and every change is listed in the [changelog](/wiki/changelog). To budget for travel, see the [Economy Guide](/wiki/guides/economy-guide).",
      },
    ],
    related: [
      { type: "guide", slug: "economy-guide" },
      { type: "mechanic", slug: "the-aurel-economy" },
      { type: "guide", slug: "getting-started" },
      { type: "character", slug: "orin-gale" },
    ],
    updated: "2026-10-24",
  },
];
