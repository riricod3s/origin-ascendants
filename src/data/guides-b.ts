import type { WikiArticle } from "@/types/content";

export const guidesB: WikiArticle[] = [
  {
    slug: "nations-guide",
    category: "guides",
    title: "Nations Guide",
    summary:
      "How to choose, join and thrive in one of Aurelune's six nations, from finding a sponsor to climbing the ranks from Citizen to Leader, or why you might stay a proud Wanderer instead.",
    icon: "flag",
    tone: "verdant",
    difficulty: 1,
    readingMinutes: 4,
    tags: ["nations", "joining", "citizenship", "wanderers", "ranks"],
    updated: "2026-10-20",
    content: [
      {
        type: "p",
        text: "Aurelune is shaped by six nations, each with its own homeland, government and traditions. Joining one gives you neighbours, protected land, a voice at the Diplomacy Table and a story bigger than your own. You never have to join, though: **Wanderers** are welcome everywhere and can take part in every event.",
      },
      { type: "h2", text: "The Six Nations" },
      {
        type: "table",
        headers: ["Nation", "Homeland", "Best for"],
        rows: [
          ["[Lumeria Concord](/nations/lumeria-concord)", "The Radiant Highlands and Skyterraces", "Builders, scholars and sky-scouts"],
          ["[Tidehaven Republic](/nations/tidehaven-republic)", "The Western Coast and the Shimmering Sea", "Traders, sailors and Merlings"],
          ["[Emberforge Dominion](/nations/emberforge-dominion)", "The Cinder Basin", "Smiths, engineers and redstone tinkerers"],
          ["[Evergrove Covenant](/nations/evergrove-covenant)", "The Luminous Weald", "Gardeners, druids and patient builders"],
          ["[Twilight Reach](/nations/twilight-reach)", "The Veiled Expanse", "Explorers, stargazers and lore-hunters"],
          ["[Highcrest Clans](/nations/highcrest-clans)", "The Highcrest Peaks", "Miners, masons and mountaineers"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Visit before you decide",
        text: "Every capital has a public Skyport and a welcome hall. Spend an evening in two or three nations, chat with their citizens and see whose rhythm feels like home. The [world map](/map) shows every border and capital.",
      },
      { type: "h2", text: "How to Join" },
      {
        type: "steps",
        items: [
          {
            title: "Find a sponsor",
            text: "Ask a current citizen to sponsor you. Most nations have recruiters in their capital and on Discord, and many are happy to show newcomers around first.",
          },
          {
            title: "Seek approval",
            text: "Your sponsor brings your request to the nation's leadership, whether that is Lumeria's Council of Lanterns, the Evergrove Rootmoot or the Highcrest Clan Moot. Approval usually takes a day or two.",
          },
          {
            title: "Take your oath",
            text: "Most nations welcome new citizens with a small ceremony, such as lighting a lantern in Solspire or tying a knot in the great rope of Stonecrown.",
          },
          {
            title: "Settle in",
            text: "Ask an Officer for a plot inside your nation's [Banner Stone](/wiki/mechanics/banner-stones) claims. Your Ascension rank immediately adds chunks to the nation's claim allowance.",
          },
        ],
      },
      { type: "h2", text: "Nation Ranks" },
      {
        type: "table",
        headers: ["Rank", "What they do"],
        rows: [
          ["Citizen", "Builds within the claims, joins nation work orders and votes or speaks where the nation's government allows"],
          ["Officer", "Extends claims, grants Guest trust, welcomes new citizens and organises projects"],
          ["Minister", "Manages the treasury, trade pacts and diplomacy on the leader's behalf"],
          ["Leader", "Represents the nation at the Diplomacy Table, approves members and moves the Capital Banner Stone with staff present"],
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "One nation at a time",
        text: "You may belong to only one nation. Leaving starts a **7-day cool-down** before you can join another, so think it over before you pack your bags.",
      },
      { type: "h2", text: "Staying a Wanderer" },
      {
        type: "p",
        text: "Wanderers belong to no nation and answer to no council. They cannot raise Banner Stones, but their builds are protected by the [server rules](/rules), and they can trade, explore, join every event and earn every rank. Many of Aurelune's best-loved cartographers and merchants are Wanderers, and several nations hire them through work orders.",
      },
      {
        type: "p",
        text: "Ready to go further? [Diplomacy & War](/wiki/mechanics/diplomacy-and-war) explains alliances, treaties and sieges, and [The Aurel Economy](/wiki/mechanics/the-aurel-economy) covers treasuries and upkeep.",
      },
    ],
    related: [
      { type: "mechanic", slug: "banner-stones" },
      { type: "mechanic", slug: "diplomacy-and-war" },
      { type: "guide", slug: "getting-started" },
      { type: "nation", slug: "lumeria-concord" },
      { type: "lore", slug: "the-era-of-banners" },
    ],
  },
  {
    slug: "economy-guide",
    category: "guides",
    title: "Economy Guide",
    summary:
      "Earn, save and spend Aurels wisely: your Coin Purse, quests and bounties, nation work orders, event rewards and the everyday costs of life in Aurelune.",
    icon: "coins",
    tone: "solar",
    difficulty: 1,
    readingMinutes: 4,
    tags: ["economy", "aurels", "coin purse", "work orders", "beginner"],
    updated: "2026-10-24",
    content: [
      {
        type: "p",
        text: "The currency of Aurelune is the **Aurel**, a gold-trimmed coin first struck in AS 80 in honour of the First Ascendant. Every player has a personal **Coin Purse** that holds their Aurels safely, and every new Ascendant starts with **100 Aurels**. This guide shows you how to grow that purse without ever feeling stuck.",
      },
      { type: "h2", text: "Ways to Earn" },
      {
        type: "table",
        headers: ["Source", "How it works", "Good for"],
        rows: [
          ["Quests and bounties", "Boards at the Ascendant Landing and every capital post tasks from staff and players", "Steady income from your first day"],
          ["Nation work orders", "Your nation pays citizens and hired Wanderers to gather, craft and build", "Reliable pay while helping your neighbours"],
          ["Selling to players", "Run a Stall or trade face to face", "Crafters, farmers and collectors"],
          ["Events", "Skyward Expeditions, Banner Clash, Meteor Hunt and festivals pay Aurels as rewards", "Fun with a bonus"],
        ],
      },
      { type: "h2", text: "Your First Week" },
      {
        type: "steps",
        items: [
          {
            title: "Take a bounty",
            text: "Check the quest board at the Ascendant Landing. Early bounties ask for simple things such as wood, wool or a map of a nearby valley.",
          },
          {
            title: "Pick up a work order",
            text: "If you have joined a nation, its work order board offers paid jobs. Since version 2.1 you can sort them by reward and by trade.",
          },
          {
            title: "Join an event",
            text: "The weekly [Skyward Expedition](/wiki/guides/event-guide) is the friendliest way to earn Aurels and meet other players at the same time.",
          },
          {
            title: "Keep a little in reserve",
            text: "Hold back about 30 Aurels for Skyport fares and tool repairs so you are never stranded far from home.",
          },
        ],
      },
      { type: "h2", text: "Everyday Costs" },
      {
        type: "list",
        items: [
          "**Skyport fares** for airship travel between cities. See [Skyports & Travel](/wiki/mechanics/skyports-and-travel) for current prices.",
          "**Repair fees** at the Anvilworks, which now shows the price before you confirm.",
          "**Claim upkeep**, paid by nation treasuries at 3 Aurels per claimed chunk per week. Many nations ask citizens for a small voluntary contribution.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Check your ledger",
        text: "Your Coin Purse remembers recent payments and earnings. If your Aurels seem to vanish, the ledger will tell you where they went.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "No real-money trading",
        text: "Buying or selling in-game items, Aurels or services for real money is forbidden by the [server rules](/rules). Supporter tiers never grant Aurels, items or economic advantages.",
      },
      {
        type: "p",
        text: "Ready to open a shop? The [Trading Guide](/wiki/guides/trading-guide) covers Stalls and fair deals, and [The Aurel Economy](/wiki/mechanics/the-aurel-economy) explains the full system behind the coin.",
      },
    ],
    related: [
      { type: "mechanic", slug: "the-aurel-economy" },
      { type: "guide", slug: "trading-guide" },
      { type: "guide", slug: "getting-started" },
      { type: "mechanic", slug: "skyports-and-travel" },
    ],
  },
  {
    slug: "trading-guide",
    category: "guides",
    title: "Trading Guide",
    summary:
      "Set up a Stall, price your goods, strike fair deals with other players and make the most of the great markets of Driftmarket, Veilmarket and Anvilgate.",
    icon: "store",
    tone: "tide",
    difficulty: 2,
    readingMinutes: 4,
    tags: ["trading", "stalls", "markets", "economy", "aurels"],
    updated: "2026-10-24",
    content: [
      {
        type: "p",
        text: "Trade is the thread that ties Aurelune together. Lumerian grain sails west on Tidehaven ships, Highcrest ore feeds Emberforge furnaces and Twilight star charts sell in every market. Whether you want to run a shop or simply swap a few diamonds for a good pickaxe, this guide helps you trade fairly and confidently.",
      },
      { type: "h2", text: "Stalls" },
      {
        type: "p",
        text: "A **Stall** is a player-run sign shop. You place a chest, attach a Stall sign and set the item, quantity and price in Aurels. Buyers pay from their Coin Purse, and the Aurels arrive in yours automatically, even while you are offline.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Find a market",
            text: "Stalls operate in nation markets. Citizens can open one in their own nation; Wanderers can rent space from a nation through a work order or agreement.",
          },
          {
            title: "Place your Stall",
            text: "Put down a chest, attach a Stall sign and follow the prompts to set your item and price.",
          },
          {
            title: "Stock it",
            text: "Fill the chest. Since version 2.1, Stall signs show stock at a glance and dim when sold out.",
          },
          {
            title: "Collect and restock",
            text: "Sales go straight to your Coin Purse. Check your ledger to see which goods sell best.",
          },
        ],
      },
      { type: "h2", text: "The Great Markets" },
      {
        type: "table",
        headers: ["Market", "Nation", "Known for"],
        rows: [
          ["Driftmarket", "Tidehaven Republic", "The busiest Stalls in Aurelune, on a floating city of barges"],
          ["Anvilgate", "Emberforge Dominion", "Tools, armour, redstone parts and enchanted steel"],
          ["Veilmarket", "Twilight Reach", "Star charts, amethyst and curious relics"],
          ["Gildspire", "Lumeria Concord", "Lanterns, glass and festival decorations"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Pricing well",
        text: "Visit two or three markets before you set a price. A fair price sells steadily; a greedy one gathers dust. Bundles, such as a stack of torches with a stack of coal, sell especially well to newcomers.",
      },
      { type: "h2", text: "Face-to-Face Trades" },
      {
        type: "list",
        items: [
          "Agree on the full deal in chat before anything changes hands.",
          "Use the trade menu or drop items in a safe place, never in lava, water or the void.",
          "For large deals, ask a friend or an Officer to witness the trade.",
          "Report scams to staff with screenshots. Scamming is a rule violation, not a clever trick.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Keep it in-game",
        text: "Real-money trading of items, Aurels or services is forbidden. Trades must be paid in Aurels, items or favours inside Aurelune.",
      },
    ],
    related: [
      { type: "guide", slug: "economy-guide" },
      { type: "mechanic", slug: "the-aurel-economy" },
      { type: "nation", slug: "tidehaven-republic" },
      { type: "mechanic", slug: "skyports-and-travel" },
    ],
  },
  {
    slug: "combat-guide",
    category: "guides",
    title: "Combat Guide",
    summary:
      "Fight well and fight fair: consensual PvP, duels in the Proving Grounds, Banner Clash tournaments, war sieges and how to use your Origin's abilities in battle.",
    icon: "swords",
    tone: "ember",
    difficulty: 2,
    readingMinutes: 4,
    tags: ["combat", "pvp", "duels", "war", "abilities"],
    updated: "2026-10-18",
    content: [
      {
        type: "p",
        text: "Combat in Aurelune is about skill, honour and good sportsmanship. Player-versus-player fighting is **consensual**: nobody can be attacked without agreeing to it, except in a few clearly marked places. This guide explains where you can fight, how your Origin shapes your style and how to stay on the right side of the rules.",
      },
      { type: "h2", text: "Where PvP Happens" },
      {
        type: "table",
        headers: ["Place", "When", "Item loss"],
        rows: [
          ["The Proving Grounds", "Any time, at the Ascendant Landing", "None"],
          ["Event arenas", "During Banner Clash and other tournaments", "None"],
          ["Declared War Zones", "Only during scheduled Siege Windows (two hours at most)", "See [Diplomacy & War](/wiki/mechanics/diplomacy-and-war)"],
          ["Anywhere else", "Only if both players agree", "Agree on the terms first"],
        ],
      },
      { type: "h2", text: "Fighting With Your Origin" },
      {
        type: "list",
        items: [
          "**Mobile Origins** such as [Elytrian](/wiki/origins/elytrian), [Avian](/wiki/origins/avian) and [Enderian](/wiki/origins/enderian) win by controlling distance and striking from unexpected angles.",
          "**Sturdy Origins** such as [Shulk](/wiki/origins/shulk) and [Human](/wiki/origins/human) hold ground and protect allies around a Banner Stone.",
          "**Control Origins** such as [Arachnid](/wiki/origins/arachnid) and [Verdant](/wiki/origins/verdant) slow enemies with webs and roots.",
          "**Burst Origins** such as [Blazeborn](/wiki/origins/blazeborn) and [Starborne](/wiki/origins/starborne) deal heavy damage in short windows, then rely on their cooldowns.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Know your weakness",
        text: "A Blazeborn should never chase a Merling into the sea, and a Phantom should avoid a noon duel. Learning your matchups matters as much as learning your abilities.",
      },
      { type: "h2", text: "Practise Before You Clash" },
      {
        type: "steps",
        items: [
          {
            title: "Bind your keys",
            text: "Set **Primary Ability** and **Secondary Ability** in Controls → Origins, then practise until you no longer need to look at the keyboard.",
          },
          {
            title: "Duel at the Proving Grounds",
            text: "Challenge a friend at the Ascendant Landing. Duels there are always allowed and never cost you items.",
          },
          {
            title: "Join a Banner Clash",
            text: "The monthly nation tournament puts you in a team arena with no item loss, the perfect place to learn teamwork.",
          },
          {
            title: "Study siege objectives",
            text: "Wars are won by holding a Banner Stone, not by defeating every enemy. Practise defending a point with your team.",
          },
        ],
      },
      { type: "h2", text: "Fair Play" },
      {
        type: "list",
        items: [
          "Any PvP damage combat-tags you for 30 seconds. Logging out while tagged counts as **combat logging** and is a violation.",
          "No hacked clients, macros or exploits. Movement and combat mods that give an unfair advantage are not allowed.",
          "No griefing, looting containers or permanent destruction, even during war.",
          "Respect a surrender. Good sportsmanship is remembered long after the scoreboard is forgotten.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Never pay-to-win",
        text: "Supporter tiers give no combat advantages of any kind. Every ability, weapon and armour piece is earned in-game.",
      },
    ],
    related: [
      { type: "mechanic", slug: "diplomacy-and-war" },
      { type: "mechanic", slug: "origin-abilities" },
      { type: "guide", slug: "event-guide" },
      { type: "lore", slug: "battle-of-skyfall-pass" },
    ],
  },
  {
    slug: "event-guide",
    category: "guides",
    title: "Event Guide",
    summary:
      "Every recurring event in Aurelune, from weekly Skyward Expeditions to the annual Festival of Ascension, with schedules, how to join and the cosmetic rewards on offer.",
    icon: "party-popper",
    tone: "arcane",
    difficulty: 1,
    readingMinutes: 4,
    tags: ["events", "skyward expedition", "banner clash", "meteor hunt", "festival"],
    updated: "2026-10-30",
    content: [
      {
        type: "p",
        text: "Events are where Aurelune comes together. Every week brings a new adventure, every month brings tournaments, hunts and build contests, and every autumn the whole world celebrates the [Festival of Ascension](/lore/festival-of-ascension). Rewards are cosmetic titles, Orbs of Origin, Aurels and plenty of bragging rights.",
      },
      { type: "h2", text: "The Event Calendar" },
      {
        type: "table",
        headers: ["Event", "When (UTC)", "What happens"],
        rows: [
          ["Skyward Expedition", "Every Saturday, 19:00", "A co-op adventure to floating isles and Ascendant ruins"],
          ["Meteor Hunt", "First Friday of the month, 20:00", "A treasure hunt for Starstone Shards scattered across the wilds"],
          ["War Council", "Second Wednesday of the month, 19:00", "Envoys meet at the Diplomacy Table to sign treaties and schedule sieges"],
          ["Banner Clash", "Third Saturday of the month, 18:00", "A nation-versus-nation arena tournament with no item loss"],
          ["Builders' Festival", "Last Sunday of the month, 17:00", "A themed build contest with tours and community voting"],
          ["Festival of Ascension", "Every year on 22 September, 18:00", "Aurelune's biggest celebration, with lanterns, games and quests"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Times in your timezone",
        text: "Start times on the wiki are listed in UTC. Event announcements on Discord use local timestamps, so they always appear in your own timezone.",
      },
      { type: "h2", text: "How to Join" },
      {
        type: "steps",
        items: [
          {
            title: "Watch the announcements",
            text: "Event details are posted in the Discord announcements channel and on the [news page](/news) a few days ahead.",
          },
          {
            title: "Gather at the Landing",
            text: "Most events begin at the Ascendant Landing. Arrive ten minutes early to form a party and check your gear.",
          },
          {
            title: "Bring the basics",
            text: "Food, a few torches and a full set of tools are enough for most events. Banner Clash provides its own kits.",
          },
          {
            title: "Claim your rewards",
            text: "Rewards are delivered at the end of the event. Event Deeds also count toward your [Ascension rank](/wiki/mechanics/ascension-ranks).",
          },
        ],
      },
      { type: "h2", text: "Highlights" },
      {
        type: "list",
        items: [
          "**Skyward Expeditions** follow the routes first flown by Captain [Orin Gale](/wiki/characters/orin-gale). Higher routes unlock as you rise in rank.",
          "**Meteor Hunt** honours the [Night of Falling Stars](/lore/night-of-falling-stars) and is the best way to gather shards for an Orb of Origin.",
          "**Banner Clash** lets nations compete with pride but without loss. Wanderers can join a mixed team.",
          "**Builders' Festival** themes are announced a week ahead, and winning builds join the [gallery](/gallery).",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Fair for everyone",
        text: "Supporters may receive priority event registration when places are limited, but they never receive gameplay advantages inside an event.",
      },
    ],
    related: [
      { type: "lore", slug: "festival-of-ascension" },
      { type: "mechanic", slug: "ascension-ranks" },
      { type: "guide", slug: "combat-guide" },
      { type: "character", slug: "orin-gale" },
    ],
  },
];
