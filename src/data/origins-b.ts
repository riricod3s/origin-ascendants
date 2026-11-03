import type { Origin } from "@/types/content";

export const originsB: Origin[] = [
  {
    slug: "avian",
    name: "Avian",
    epithet: "The Featherlight",
    tagline: "Hollow-boned and keen-eyed, Avians see the whole road before anyone else takes a step.",
    description:
      "Avians are the scouts and messengers of Aurelune: light on their feet, impossible to hurt with a fall and blessed with eyes that pick out a lantern across a valley. They cannot fly like the [Elytrian](/wiki/origins/elytrian), but they spot danger early and lend their companions the speed of the wind. A forgiving first choice for anyone who loves exploring with friends.",
    icon: "bird",
    tone: "aether",
    rarity: "Common",
    difficulty: 1,
    playstyle: ["Scout", "Support", "Explorer"],
    stats: {
      mobility: 5,
      offense: 2,
      defense: 1,
      utility: 4,
      survival: 3,
    },
    passives: [
      {
        name: "Featherfall",
        description:
          "Avians never take fall damage. Leap from cliffs, sky-isles and Skyport docks and drift down as gently as a loose feather.",
        icon: "feather",
      },
      {
        name: "Windward Stride",
        description:
          "While under the open sky, Avians sprint slightly faster and jump half a block higher, as if every breeze were at their back.",
        icon: "wind",
      },
      {
        name: "Dawnsong Nest",
        description:
          "Each sunrise an Avian lays a speckled skylark egg that can be cooked into a hearty breakfast or traded at any market Stall.",
        icon: "egg",
      },
    ],
    actives: [
      {
        name: "Skylark's Call",
        description:
          "Let out a clear, ringing call that outlines every creature and player within 32 blocks for 8 seconds, visible to you and your party.",
        icon: "eye",
        cooldown: "30s",
        keybind: "Primary Ability",
      },
      {
        name: "Tailwind Chorus",
        description:
          "Whistle up a rushing gust that grants you and allies within 10 blocks Speed II and Jump Boost for 10 seconds.",
        icon: "wind",
        cooldown: "45s",
        keybind: "Secondary Ability",
      },
    ],
    weaknesses: [
      {
        name: "Hollow Bones",
        description:
          "Avian frames are built for lightness, not punishment. They take 20% more damage from melee hits and projectiles.",
      },
      {
        name: "Featherweight Frame",
        description:
          "Diamond and netherite chestplates weigh an Avian down, removing Windward Stride and slowing their movement while worn.",
      },
      {
        name: "Seed-Eater's Palate",
        description:
          "Avians cannot eat meat. Bread, berries, seeds and baked goods keep them aloft instead.",
      },
    ],
    lore: [
      "Chroniclers of the [First Awakening](/lore/the-first-awakening) record that Avians bloomed among survivors who sheltered on the highest ledges after the [Sundering](/lore/the-sundering). Where a sliver of the [Heartstar](/lore/the-heartstar) settled into a nest of cliff-grass, the people nearest it woke lighter, their hair streaked with soft plumage and their eyes sharp enough to read smoke signals across a whole valley.",
      "In the [Age of Dawn](/lore/the-age-of-dawn), Avian runners carried word between scattered camps and led wanderers to the First Beacon on Mount Dawnrest. Today they roost wherever the wind is honest: the gull-loud docks of [Tidehaven](/nations/tidehaven-republic), the Eagle's Stair of the [Highcrest Clans](/nations/highcrest-clans) and the sunlit Skyterraces of [Lumeria](/nations/lumeria-concord).",
      "No Avian is more famous in the Age of Concord than [Orin Gale](/wiki/characters/orin-gale), captain of the *Wayfarer's Promise*, whose sharp eyes charted a safe course toward the drifting sky-isles during the [Skyward Expedition](/lore/orin-gale-and-the-skyward-expedition). Young Avians still shout his name for luck before leaping from the Skyports.",
    ],
    related: ["elytrian", "starborne"],
    homelands: ["tidehaven-republic", "highcrest-clans", "lumeria-concord"],
    updated: "2026-09-14",
  },
  {
    slug: "arachnid",
    name: "Arachnid",
    epithet: "The Webspinner",
    tagline: "Patient weavers of the canopy who turn every wall into a road and every shadow into a trap.",
    description:
      "Arachnids scale sheer cliffs and tree trunks as easily as others walk a meadow path, laying silken snares and striking with a numbing bite. They reward careful positioning more than raw toughness, making them a favourite of players who enjoy ambushes, ziplines of web and vertical builds. Their smaller frame means a misjudged fight ends quickly.",
    icon: "bug",
    tone: "blush",
    rarity: "Uncommon",
    difficulty: 2,
    playstyle: ["Ambusher", "Controller", "Climber"],
    stats: {
      mobility: 4,
      offense: 4,
      defense: 2,
      utility: 3,
      survival: 2,
    },
    passives: [
      {
        name: "Silkstep",
        description:
          "Press against any solid wall to climb it at walking pace. Release to cling in place for as long as you like.",
        icon: "footprints",
      },
      {
        name: "Webwalker",
        description:
          "Arachnids move through cobwebs at full speed and can gather string from them without shears.",
        icon: "bug",
      },
      {
        name: "Eightfold Gaze",
        description:
          "Arachnids sense movement around them: hostile creatures within 12 blocks are briefly outlined whenever they move while you are sneaking.",
        icon: "eye",
      },
    ],
    actives: [
      {
        name: "Glowfang Strike",
        description:
          "Lunge with a shimmering, numbing bite that applies Poison I and Slowness I to your target for 5 seconds.",
        icon: "crosshair",
        cooldown: "20s",
        keybind: "Primary Ability",
      },
      {
        name: "Lanternsilk Snare",
        description:
          "Fling a glowing bundle of silk that bursts into a web where it lands, holding any creature caught inside in place for 3 seconds.",
        icon: "waypoints",
        cooldown: "35s",
        keybind: "Secondary Ability",
      },
    ],
    weaknesses: [
      {
        name: "Slight Frame",
        description:
          "Arachnids have 8 hearts of maximum health instead of 10, so drawn-out brawls rarely end in their favour.",
      },
      {
        name: "Bane of Arthropods",
        description:
          "Weapons enchanted with Bane of Arthropods deal their full bonus damage to Arachnids, and other players know it.",
      },
      {
        name: "Hunter's Palate",
        description:
          "Arachnids can only eat meat and fish. Fruit, bread and vegetables offer them no nourishment at all.",
      },
    ],
    lore: [
      "When a fragment of the [Heartstar](/lore/the-heartstar) came to rest among the roots of the Luminous Weald, the forest itself seemed to answer, and the people sheltering beneath its glowing boughs woke during the [First Awakening](/lore/the-first-awakening) with steady hands for climbing and a silk that caught the light. Evergrove storytellers say the first Arachnids wove nets of glimmer-thread to catch falling starlight and kept the shards safe for generations.",
      "In the [Evergrove Covenant](/nations/evergrove-covenant), Arachnids are the keepers of the Lantern Canopy. Their silk bridges link the treetop halls of Glimmerwood, and their spore-lanterns, little globes of webbing filled with glowing moss, light the walkways of Lanternfen through every misty night.",
      "During [the Timber Feud](/lore/the-timber-feud), Arachnid weavers strung warning lines between the ancient trees so that loggers and wardens alike could see which boughs must never be cut. Many Highcrest woodcutters now credit those shining threads with keeping the feud from becoming something worse, and the silk lines still hang there, freshly rewoven each spring.",
    ],
    related: ["feline", "verdant"],
    homelands: ["evergrove-covenant"],
    updated: "2026-08-22",
  },
  {
    slug: "shulk",
    name: "Shulk",
    epithet: "The Shell-Warden",
    tagline: "Carry your fortress on your back and hold the line when everyone else must fall back.",
    description:
      "Shulks wear a living shell of starstone-hard plates that turns aside blows and hides a private store of treasures. They are slow and endlessly hungry, but no Origin is better at guarding a doorway, hauling supplies to a far-off build or simply refusing to be moved. Ideal for builders, miners and anyone who likes to be the anchor of a team.",
    icon: "shield",
    tone: "blush",
    rarity: "Uncommon",
    difficulty: 2,
    playstyle: ["Tank", "Hauler", "Builder"],
    stats: {
      mobility: 1,
      offense: 2,
      defense: 5,
      utility: 4,
      survival: 4,
    },
    passives: [
      {
        name: "Living Carapace",
        description:
          "A natural shell grants Shulks 8 points of armour before any gear is worn, and it stacks with whatever plate they choose to add.",
        icon: "shield",
      },
      {
        name: "Shellhold",
        description:
          "Shulks keep nine extra storage slots tucked inside their shell, available anywhere and kept safe even when they are knocked out.",
        icon: "backpack",
      },
      {
        name: "Bedrock Footing",
        description:
          "Planted feet and a low centre of gravity give Shulks strong knockback resistance and let them break stone and ore by hand at wooden-pickaxe speed.",
        icon: "mountain",
      },
    ],
    actives: [
      {
        name: "Shell Guard",
        description:
          "Withdraw fully into your shell for up to 5 seconds. You cannot move or act, but you are immune to all damage until you emerge.",
        icon: "shield-check",
        cooldown: "40s",
        keybind: "Primary Ability",
      },
      {
        name: "Driftglimmer",
        description:
          "Fire a slow, homing spark of shell-light that lifts the first creature it touches into a gentle float for 3 seconds.",
        icon: "orbit",
        cooldown: "30s",
        keybind: "Secondary Ability",
      },
    ],
    weaknesses: [
      {
        name: "Heavy Shell",
        description:
          "All that armour has weight. Shulks move 15% slower than other Origins and cannot sprint-jump as far.",
      },
      {
        name: "Bottomless Appetite",
        description:
          "Keeping a shell strong takes fuel. A Shulk's hunger drains 50% faster, so a well-stocked Shellhold is never empty of bread.",
      },
      {
        name: "Unwieldy Grip",
        description:
          "Their own shell gets in the way of a second guard, so Shulks cannot raise a shield.",
      },
    ],
    lore: [
      "Highcrest legend holds that the first Shulks awoke in AS 3, during the [First Awakening](/lore/the-first-awakening), when a family sheltering in a cave beneath Frostmere Glacier found a [Heartstar](/lore/the-heartstar) shard frozen in the ice. By spring their skin had hardened into pale, pearl-grey plates that kept out the cold and the falling rock alike, and they dug the first safe tunnels that later became the high roads of the north.",
      "Today Shulks are the stout heart of the [Highcrest Clans](/nations/highcrest-clans), where shell-wardens keep watch over the Eagle's Stair and haul supplies through blizzards no pack-mule would brave. Chieftess [Brenna Stonehelm](/wiki/characters/brenna-stonehelm) is herself a Shulk, and Highcrest children say she once held a snowed-in pass for a whole night so a caravan of strangers could reach Stonecrown.",
      "Further south, the [Emberforge Dominion](/nations/emberforge-dominion) prizes Shulk tunnellers in the mines of Kilnreach, where their shells shrug off heat and falling slag. Smiths at the Great Anvil swear that a Shulk will carry three times their weight in ore up from the deep seams and still ask, very politely, what is for supper.",
    ],
    related: ["enderian", "blazeborn", "human"],
    homelands: ["highcrest-clans", "emberforge-dominion"],
    updated: "2026-07-09",
  },
  {
    slug: "feline",
    name: "Feline",
    epithet: "The Pouncer",
    tagline: "Silent paws, bright eyes and a leap that closes any distance before the dust settles.",
    description:
      "Felines are sure-footed hunters who always land on their feet, move without a sound and see through the darkest night. A single pounce can carry them across a ravine or onto an unsuspecting target, making them superb skirmishers and wilderness guides. Just keep them well clear of creepers.",
    icon: "cat",
    tone: "verdant",
    rarity: "Common",
    difficulty: 1,
    playstyle: ["Skirmisher", "Hunter", "Night Prowler"],
    stats: {
      mobility: 4,
      offense: 3,
      defense: 2,
      utility: 2,
      survival: 4,
    },
    passives: [
      {
        name: "Sure-Footed",
        description:
          "Felines always land on their feet, taking half damage from falls and never losing balance on narrow ledges or fence tops.",
        icon: "footprints",
      },
      {
        name: "Moonlit Eyes",
        description:
          "Felines see clearly in darkness, enjoying night vision whenever the light around them falls low.",
        icon: "moon",
      },
      {
        name: "Velvet Paws",
        description:
          "Feline footsteps make no sound, so they never trigger sculk sensors and hostile creatures notice them from half the usual distance.",
        icon: "cat",
      },
    ],
    actives: [
      {
        name: "Thistledown Pounce",
        description:
          "Spring up to 8 blocks forward in a graceful arc. Your first melee hit within 2 seconds of landing deals 50% bonus damage.",
        icon: "target",
        cooldown: "15s",
        keybind: "Primary Ability",
      },
      {
        name: "Prowler's Hush",
        description:
          "Melt into the shadows for 8 seconds: hostile creatures lose track of you and you gain Speed I. Lasts twice as long at night.",
        icon: "moon-star",
        cooldown: "60s",
        keybind: "Secondary Ability",
      },
    ],
    weaknesses: [
      {
        name: "Skittish",
        description:
          "Explosions rattle a Feline. They take 25% more blast damage and are briefly slowed whenever a creeper hisses within 6 blocks.",
      },
      {
        name: "Damp Fur",
        description:
          "Felines dislike water. They swim noticeably slower than other Origins and cannot use Prowler's Hush while submerged.",
      },
    ],
    lore: [
      "The Feline gift is said to have awakened twice. In the warm hollows of the Luminous Weald, a [Heartstar](/lore/the-heartstar) shard gave forest wardens silent steps and lantern-green eyes; far to the north, another shard lodged in a snowfield gave the mountain folk the broad paws and frost-pale coats of snow lynxes. Both kinds trace their lineage to the [First Awakening](/lore/the-first-awakening).",
      "For a century the two lineages stood on opposite sides of [the Timber Feud](/lore/the-timber-feud). The thaw began, so the story goes, when a ranger from Thornwick and a scout from Frosthollow tracked the same lost child through a blizzard and carried her home together. Feline guides from both nations have shared trails ever since.",
      "In the Age of Concord, Felines are the favourite pathfinders of the [Evergrove Covenant](/nations/evergrove-covenant) and the [Highcrest Clans](/nations/highcrest-clans), leading caravans through dark forest and high pass alike. At every Banner Clash, the crowd waits eagerly for the moment a Feline champion vaults the arena wall.",
    ],
    related: ["arachnid", "phantom", "avian"],
    homelands: ["evergrove-covenant", "highcrest-clans"],
    updated: "2026-10-05",
  },
  {
    slug: "starborne",
    name: "Starborne",
    epithet: "The Celestial Heir",
    tagline: "A fragment of the Heartstar answers when you look up.",
    description: "Starborne carry a faint resonance with the Heartstar's scattered light. Beneath an open sky they mend and steady those nearby, though underground their connection grows faint.",
    icon: "star",
    tone: "solar",
    rarity: "Legendary",
    difficulty: 3,
    playstyle: ["Support", "Celestial", "Late-game"],
    stats: { mobility: 3, offense: 3, defense: 2, utility: 5, survival: 4 },
    passives: [
      { name: "Starlit Renewal", description: "Recover a little health beneath an open night sky.", icon: "star" },
      { name: "Shard Sense", description: "Nearby Heartstar fragments shimmer faintly in your sight.", icon: "sparkles" },
    ],
    actives: [{ name: "Starfall", description: "Call a brief burst of celestial light that restores nearby allies.", icon: "sunrise", cooldown: "90s", keybind: "Primary Ability" }],
    weaknesses: [{ name: "Deep Earth", description: "Underground, your link to the stars fades and your recovery slows." }],
    lore: ["The oldest Starborne stories begin with the [First Awakening](/lore/the-first-awakening), when fragments of the Heartstar found a home in ordinary people. Aurel Skyward's beacon remains the most famous expression of that light."],
    related: ["elytrian", "human", "verdant"],
    homelands: ["lumeria-concord", "twilight-reach"],
    updated: "2026-10-12",
  },
  {
    slug: "verdant",
    name: "Verdant",
    epithet: "The Rootkin",
    tagline: "Where you pause, the small things begin to grow.",
    description: "Verdants share a quiet bond with living things: crops flourish nearby and daylight sustains them. Their green gifts are less comfortable in deep winter and open flame.",
    icon: "sprout",
    tone: "verdant",
    rarity: "Rare",
    difficulty: 2,
    playstyle: ["Gardener", "Support", "Sustain"],
    stats: { mobility: 2, offense: 2, defense: 3, utility: 5, survival: 4 },
    passives: [
      { name: "Photosynthesis", description: "Daylight slows your hunger drain when you spend time outdoors.", icon: "sun" },
      { name: "Green Thumb", description: "Crops and saplings nearby grow a little faster.", icon: "sprout" },
    ],
    actives: [{ name: "Entangling Roots", description: "Raise roots that briefly slow nearby hostile creatures.", icon: "tree-pine", cooldown: "50s", keybind: "Primary Ability" }],
    weaknesses: [{ name: "Kindling", description: "Fire burns more fiercely against you." }, { name: "Winter Dormancy", description: "In snowy biomes, your active ability recovers more slowly." }],
    lore: ["Verdant lore is preserved by the Rootmoot of the [Evergrove Covenant](/nations/evergrove-covenant). The Heartroot is said to have grown from a fragment of the Heartstar, its branches glowing softly whenever the forest welcomes a new wanderer."],
    related: ["arachnid", "feline", "starborne"],
    homelands: ["evergrove-covenant"],
    updated: "2026-10-12",
  },
];
