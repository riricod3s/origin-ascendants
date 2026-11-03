import type { Nation } from "@/types/content";

export const nationsB: Nation[] = [
  {
    slug: "evergrove-covenant",
    name: "Evergrove Covenant",
    short: "Evergrove",
    motto: "Roots Remember",
    tagline: "An ancient forest covenant where the trees keep every promise.",
    tone: "verdant",
    colors: { primary: "#4ADE80", secondary: "#166534" },
    flag: { pattern: "vertical", colors: ["#4ADE80", "#166534", "#DCFCE7"], emblem: "tree" },
    scene: "forest",
    description:
      "The **Evergrove Covenant** guards the Luminous Weald, a realm of glowing giant trees spreading across the south-west of Aurelune. Sworn at Glimmerwood in AS 171, it is guided by consensus beneath the boughs of the Heartroot, and its people believe that a nation, like a tree, grows strongest when it remembers its roots.",
    leader: {
      name: "Sylvara Dewhollow",
      title: "Elder",
      characterSlug: "sylvara-dewhollow",
      bio: "Born among the mossy terraces of Dewhollow, Sylvara awakened as a [Verdant](/wiki/origins/verdant) and spent her youth coaxing felled groves back to life during the long years of the Timber Feud. Chosen Elder by the Rootmoot, she is known for patient listening, hand-carved seed tokens and a habit of settling arguments by planting something together.",
    },
    allies: [
      {
        slug: "lumeria-concord",
        note: "Lumerian terrace-farmers and Evergrove seedkeepers have traded grain, seed and lantern-oil since the Era of Banners, and Elytrian gliders fly freely between the Skyterraces and the Lantern Canopy.",
      },
      {
        slug: "twilight-reach",
        note: "Evergrove guides led the first pilgrims east beneath the [Great Aurora](/lore/the-great-aurora), and the two nations still share star-charts, moonlit herb lore and a deep love of quiet places.",
      },
    ],
    rivals: [
      {
        slug: "highcrest-clans",
        note: "The [Timber Feud](/lore/the-timber-feud) over old-growth logging is settled in spirit by the Concord, but Evergrove and Highcrest still argue cheerfully over every tree line, and their Banner Clash matches draw the loudest crowds of the season.",
      },
    ],
    territory: {
      region: "The Luminous Weald",
      summary:
        "Enormous glowing forests roll across the south-west and centre-south of Aurelune, their canopies lit by moss-lamps and luminous blossoms. Rivers braid between roots as tall as towers, and whole villages hang in the branches high above the forest floor.",
      biomes: [
        "Luminous old-growth forest",
        "Lantern-lit fens and marshes",
        "Flowering glades",
        "Misty river valleys",
        "Giant mushroom groves",
      ],
      landmarks: ["The Heartroot", "Whispering Falls", "The Lantern Canopy"],
      size: "Large · 41 claimed regions",
    },
    government: {
      type: "Druidic covenant",
      summary:
        "Evergrove is governed by the **Rootmoot**, a council of elders who decide by consensus rather than vote, meeting in a ring of living roots beneath Glimmerwood. The Elder speaks for the Covenant abroad, but no great tree is felled and no law is made until every voice in the circle has been heard.",
      branches: [
        {
          title: "The Rootmoot",
          role: "The consensus council of elders from every grove, which sets law, approves new citizens and chooses the Elder.",
        },
        {
          title: "The Thornwardens",
          role: "Rangers based at Thornwick who patrol the borders, guide lost travellers and tend the Covenant's Banner Stones.",
        },
        {
          title: "The Seedkeepers' Circle",
          role: "Stewards of forests, farms and trade who keep the great ledger of every sapling planted and every tree taken.",
        },
      ],
    },
    history: [
      {
        year: "AS 61",
        title: "Voices of the Weald",
        text: "Forest-dwelling survivors walked north to the [Great Gathering](/lore/the-age-of-dawn) at Mount Dawnrest. They carried a spark of the First Beacon home and used it to light the first moss-lamps beneath the giant trees.",
      },
      {
        year: "AS 171",
        title: "The Covenant is sworn",
        text: "Twelve grove-elders met at Glimmerwood during [the Era of Banners](/lore/the-era-of-banners) and swore the Covenant upon the Heartroot, promising to take from the forest only what it could freely give. Their oath is still carved into the great tree's bark.",
      },
      {
        year: "AS 226",
        title: "Lanterns for the Aurora",
        text: "When the [Great Aurora](/lore/the-great-aurora) lit the eastern sky, Evergrove guides led streams of pilgrims through the Weald toward the Veil. The journey began a lasting friendship with the newborn Twilight Reach.",
      },
      {
        year: "AS 389",
        title: "The Timber Feud",
        text: "The [Timber Feud](/lore/the-timber-feud) began when Highcrest timber crews pushed into the old-growth edges of the Weald seeking beams for their mountain halls. Two decades of border standoffs, heated moots and stubborn pride followed on both sides.",
      },
      {
        year: "AS 413",
        title: "The Rootstone Clause",
        text: "Evergrove signed the [Concord of Aurelune](/lore/the-concord-of-aurelune) beside the other five nations. Its Rootstone Clause lets Highcrest take storm-felled timber from the Weald in exchange for a sapling planted in the mountains for every log carried north.",
      },
      {
        year: "AS 433",
        title: "The Ten-Thousandth Sapling",
        text: "Elder Sylvara Dewhollow and Chieftess Brenna Stonehelm planted the ten-thousandth Rootstone sapling together on the old feud line. The Timber Feud was closed in spirit with laughter, cider and a very muddy handshake.",
      },
    ],
    capital: {
      name: "Glimmerwood",
      type: "capital",
      description:
        "Built in the branches and roots around the Heartroot, Glimmerwood is a city of spiral stairways, rope bridges and treehouses glowing with moss-lamps. The Rootmoot meets in a hall that was grown, not built, from living wood.",
    },
    cities: [
      {
        name: "Mossbridge",
        type: "city",
        description:
          "A broad city of moss-cushioned stone arches spanning the Velvane River, where barges carry seed, honey and timber between the forest and the coast.",
      },
      {
        name: "Dewhollow",
        type: "town",
        description:
          "A terraced hollow where morning dew gathers in carved stone basins, famous for its herb gardens and as the birthplace of Elder Sylvara.",
      },
      {
        name: "Lanternfen",
        type: "town",
        description:
          "A stilt village in the glowing marshes, where fireflies and lantern-lilies light the boardwalks after dusk.",
      },
      {
        name: "Thornwick",
        type: "fortress",
        description:
          "The Thornwardens' stronghold on the northern border, a living fortress of braided briar walls that bursts into white roses every spring.",
      },
      {
        name: "Briarhaven",
        type: "city",
        description:
          "A bustling market city at the forest's edge, where Evergrove trades with Lumeria and Twilight Reach and travellers rest in tree-ring inns.",
      },
    ],
    founded: "AS 171",
    culture: [
      "Life in Evergrove follows the slow rhythm of the forest. Families live in treehouses and root-halls, cook over sheltered hearth-stones and greet each morning at the Listening Hour, when the whole Weald falls quiet to hear the wind in the Lantern Canopy. Craft is grown as much as made: bows are shaped from living branches and doors are trained from vines.",
      "Evergrovers measure wealth in what they plant. Every citizen wears a seed-token on a cord, and the Seedkeepers' great ledger records each tree a family has tended. [Verdant](/wiki/origins/verdant) and [Feline](/wiki/origins/feline) Ascendants feel at home among the boughs, [Elytrian](/wiki/origins/elytrian) gliders carry messages between canopy villages, and [Arachnid](/wiki/origins/arachnid) climbers spin the silk bridges that tie them together.",
      "For all its calm, the Covenant loves a celebration. Midsummer lantern walks wind through the forest in long, glowing ribbons, and storytellers at Briarhaven still trade boastful tales of the Timber Feud with visiting Highcrest clansfolk, each side insisting it was right all along.",
    ],
    strengths: [
      "Abundant food, herbs and renewable timber",
      "Dense forests that form natural, defensible borders",
      "Patient consensus politics that rarely fracture",
      "Warm friendships with Lumeria and Twilight Reach",
    ],
    challenges: [
      "Slow decisions when the Rootmoot cannot agree",
      "Little ore or quarry stone within the Weald",
      "Lingering pride from the Timber Feud with Highcrest",
    ],
    commonOrigins: ["verdant", "elytrian", "arachnid", "feline"],
    traditions: [
      {
        name: "The Listening Hour",
        description:
          "At first light the whole Covenant falls silent for an hour to listen to the forest, a custom said to have begun when the first elders heard the Heartroot hum.",
      },
      {
        name: "Seed-Naming",
        description:
          "Every new citizen plants a sapling that carries their name, and the Seedkeepers record it in the great ledger so the forest will always remember them.",
      },
      {
        name: "The Lantern Walk",
        description:
          "On midsummer night thousands of lanterns wind from Briarhaven to Glimmerwood beneath the Lantern Canopy, ending in songs at the roots of the Heartroot.",
      },
    ],
    joining: {
      open: true,
      summary:
        "The Covenant welcomes patient builders, gardeners and explorers who will treat the Weald with care. Find a citizen to sponsor you, then present yourself to the Rootmoot; the [nations guide](/wiki/guides/nations-guide) walks through each step.",
      requirements: [
        "Be sponsored by a current Evergrove citizen",
        "Receive approval from the Rootmoot, the nation's leadership",
        "Belong to no other nation; anyone leaving a nation must first wait out the 7-day cool-down",
        "Pledge to respect protected groves and the Covenant's [Banner Stone](/wiki/mechanics/banner-stones) claims",
      ],
    },
  },
];
