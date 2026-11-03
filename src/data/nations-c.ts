import type { Nation } from "@/types/content";

export const nationsC: Nation[] = [
  {
    slug: "tidehaven-republic",
    name: "Tidehaven Republic",
    short: "Tidehaven",
    motto: "Fair Winds, Free Waters",
    tagline: "A merchant republic of lagoons and bright sails, where every voice can ride the tide.",
    tone: "tide",
    colors: { primary: "#2DD4BF", secondary: "#0F766E" },
    flag: { pattern: "horizontal", colors: ["#2DD4BF", "#0F766E", "#E0FEFA"], emblem: "wave" },
    scene: "harbor",
    description:
      "The **Tidehaven Republic** is a seafaring nation of reef-cities, floating markets and island chains along Aurelune's western coast. Chartered at Pearlmere in AS 158, it is ruled by an elected Consul and the Tide Assembly, and its ships carry trade, news and travellers to every harbour in the world.",
    leader: {
      name: "Maren Tidewell",
      title: "Consul",
      characterSlug: "maren-tidewell",
      bio: "A Merling pearl-diver who grew up beneath the docks of Pearlmere, Maren Tidewell won the Consulship on a promise to keep the sea lanes open to everyone. She is known for settling disputes on the deck of a skiff, with her feet in the water and a fair price already in mind.",
    },
    allies: [
      {
        slug: "lumeria-concord",
        note: "Lumerian grain and lantern-glass fill Tidehaven holds, and the two nations have stood shoulder to shoulder at every [Spire Summit](/lore/the-spire-summit).",
      },
      {
        slug: "highcrest-clans",
        note: "Highcrest envoys carried terms across the water during the [Siege of Pearlmere](/lore/siege-of-pearlmere), and Tidehaven has never forgotten the favour.",
      },
    ],
    rivals: [
      {
        slug: "emberforge-dominion",
        note: "Tariffs, shipping lanes and the memory of the blockade keep Tidehaven and Emberforge haggling hard, though now only at the Diplomacy Table.",
      },
    ],
    territory: {
      region: "The Western Coast and the Shimmering Sea",
      summary:
        "Tidehaven holds the long western coast of Aurelune: turquoise lagoons, chalk cliffs, mangrove inlets and island chains that trail out into the Shimmering Sea. Much of the nation is built on the water itself, on stilts, pontoons and anchored barges.",
      biomes: ["Warm lagoons", "Coral reefs", "Mangrove inlets", "Chalk sea-cliffs", "Island chains"],
      landmarks: ["The Shimmering Reef", "The Tidegate Locks", "The Driftmarket Flotilla", "Stormbreak Lighthouse"],
      size: "Large · 37 claimed regions",
    },
    government: {
      type: "Merchant republic",
      summary:
        "Every citizen of Tidehaven may vote for the Consul and for their harbour's seat in the Tide Assembly. The Consul steers day-to-day affairs and speaks for the nation abroad, but trade law, tariffs and treaties must pass the Assembly by open vote on the Pearlmere quay.",
      branches: [
        {
          title: "The Consul",
          role: "The elected head of the Republic, who leads the fleet, signs treaties on the Assembly's behalf and represents Tidehaven at the Diplomacy Table.",
        },
        {
          title: "The Tide Assembly",
          role: "Delegates from every harbour and island who debate trade law, approve tariffs and decide where new Banner Stones are raised.",
        },
        {
          title: "The Harbor Wardens",
          role: "Pilots, lighthouse keepers and reef-divers who guard the sea lanes, run the Tidegate Locks and guide visiting ships safely to port.",
        },
      ],
    },
    history: [
      {
        year: "AS 158",
        title: "The Charter of Pearlmere",
        text: "Captains and fisherfolk of the western coast sign a charter of free waters at Pearlmere, promising that no harbour will ever be closed to an honest ship.",
      },
      {
        year: "AS 262",
        title: "The Wandering Isle Charted",
        text: "Tidehaven navigators plot the looping course of the Wandering Isle, the first proof that the old sky-islands still follow patterns of their own.",
      },
      {
        year: "AS 327",
        title: "The Siege of Pearlmere",
        text: "An Emberforge fleet closes Pearlmere's harbour for a long season. Divers feed the city from the Shimmering Reef until Highcrest envoys broker the lifting of the blockade.",
      },
      {
        year: "AS 413",
        title: "The Concord of Aurelune",
        text: "Tidehaven signs the Concord alongside the other five nations, and Consuls ever since have measured their success in open sea lanes rather than won battles.",
      },
      {
        year: "AS 431",
        title: "The Skyward Expedition",
        text: "Captain Orin Gale sails the *Wayfarer's Promise* above the clouds, charting high sky-isles and opening a new frontier for every Ascendant.",
      },
    ],
    capital: {
      name: "Pearlmere",
      type: "capital",
      description:
        "A shining reef-city of white stone and pearl-inlaid domes, built around a sheltered lagoon. The Tide Assembly meets on its open quay, and at dusk the whole harbour glows with lanterns reflected in the water.",
    },
    cities: [
      {
        name: "Saltwatch",
        type: "port",
        description:
          "A cliff-top port at the mouth of the northern sea lanes whose great lighthouse has guided ships home for nearly three centuries.",
      },
      {
        name: "Coralgate",
        type: "city",
        description:
          "A city of arched bridges and coral gardens built over a living reef. Its glass-floored walkways let visitors watch Merlings tend the corals below.",
      },
      {
        name: "Driftmarket",
        type: "city",
        description:
          "A floating city of lashed-together barges that drifts gently along the coast, home to the busiest player stalls in Aurelune.",
      },
      {
        name: "Kelpwick",
        type: "town",
        description:
          "A quiet fishing town among the kelp forests, famed for seaweed bread, net-weaving and its glowing tide-pools.",
      },
      {
        name: "Stormbreak Quay",
        type: "port",
        description:
          "A sturdy harbour on the southern cliffs where shipwrights build the Republic's fastest vessels and the Skyport launches airships over the sea.",
      },
    ],
    founded: "AS 158",
    culture: [
      "Life in Tidehaven runs on the tide tables. Markets open when the water is high, divers work the reefs at low tide, and nobody schedules an Assembly vote during a spring tide. Children learn to swim before they learn to read, and every family keeps a small boat as surely as other nations keep a horse.",
      "Tidehaveners are natural traders and storytellers. A deal is sealed with a shared cup of kelp tea, and news travels faster along the coast than any courier could carry it. Captain [Orin Gale](/wiki/characters/orin-gale) is the Republic's favourite hero, and every child has a toy airship named after the *Wayfarer's Promise*.",
      "Since the [Siege of Pearlmere](/lore/siege-of-pearlmere), Tidehaven has prized open water above everything else. Its wardens patrol the sea lanes as guides rather than guards, and visiting ships are greeted with a fair-winds salute from the lighthouse at Saltwatch.",
    ],
    strengths: [
      "The largest merchant fleet and the busiest markets in Aurelune",
      "Merling and Avian crews at home on reefs, waves and clouds alike",
      "Skyports and sea lanes that connect every nation",
      "A tradition of fair dealing that makes it a trusted mediator",
    ],
    challenges: [
      "Island territories that are scattered and costly to claim",
      "Storm seasons that close harbours without warning",
      "An ongoing tariff rivalry with the Emberforge Dominion",
    ],
    commonOrigins: ["merling", "avian", "human"],
    traditions: [
      {
        name: "The Fair-Winds Salute",
        description:
          "Every ship entering or leaving a Tidehaven harbour dips its sail to the lighthouse, and the keeper answers with three flashes of light.",
      },
      {
        name: "The Pearl Vote",
        description:
          "Assembly votes are cast by dropping a white or blue pearl into a glass urn on the Pearlmere quay, so anyone can watch the result take shape.",
      },
      {
        name: "Siege Remembrance",
        description:
          "Each year the divers of Pearlmere share a free feast of reef-fish with the whole city, honouring the season they fed it through the blockade.",
      },
    ],
    joining: {
      open: true,
      summary:
        "Tidehaven welcomes traders, sailors, builders and explorers of every Origin. Find a citizen to sponsor you and seek approval from the Consul's office; the [nations guide](/wiki/guides/nations-guide) explains the process.",
      requirements: [
        "Be sponsored by a current Tidehaven citizen",
        "Receive approval from Tidehaven's leadership",
        "Belong to no other nation; leaving a nation starts a 7-day cool-down",
        "Keep docks, sea lanes and Skyport landings clear for other players",
      ],
    },
  },
  {
    slug: "emberforge-dominion",
    name: "Emberforge Dominion",
    short: "Emberforge",
    motto: "Forged, Not Given",
    tagline: "A proud meritocracy of smiths and engineers, tempered in the glow of the Cinder Basin.",
    tone: "ember",
    colors: { primary: "#FB923C", secondary: "#7C2D12" },
    flag: { pattern: "chevron", colors: ["#FB923C", "#7C2D12", "#FFEDD5"], emblem: "anvil" },
    scene: "forge",
    description:
      "The **Emberforge Dominion** is a nation of master smiths, engineers and inventors built among the obsidian mesas and lava rivers of the Cinder Basin. Founded at Cinderhold in AS 204, it believes that respect is earned through skill, and its Forgemaster is chosen by open trial rather than by birth.",
    leader: {
      name: "Brannoch Cinderlight",
      title: "Forgemaster",
      characterSlug: "brannoch-cinderlight",
      bio: "A Blazeborn smith who won the Forgemaster's trials by forging a working airship engine in a single night, Brannoch Cinderlight is blunt, generous and tireless. He opened the Great Anvil to apprentices from every nation and likes to say that the best treaty is a shared workshop.",
    },
    allies: [
      {
        slug: "highcrest-clans",
        note: "Highcrest ore feeds Emberforge furnaces and Emberforge tools climb Highcrest peaks, a partnership of mountain and forge older than the Concord.",
      },
    ],
    rivals: [
      {
        slug: "lumeria-concord",
        note: "Old opponents from the [Ember Wars](/lore/the-ember-wars) who now settle their pride in tournaments, build contests and trade fairs.",
      },
      {
        slug: "tidehaven-republic",
        note: "A long-running contest over tariffs and shipping lanes, still haunted by memories of the [Siege of Pearlmere](/lore/siege-of-pearlmere).",
      },
    ],
    territory: {
      region: "The Cinder Basin",
      summary:
        "Emberforge fills a vast volcanic basin in the south-east of Aurelune, ringed by obsidian mesas and threaded with slow rivers of glowing lava. Hot springs, basalt columns and glass-sand deserts give the land a fierce, glittering beauty.",
      biomes: ["Basalt deltas", "Obsidian mesas", "Glass-sand deserts", "Hot springs", "Lava river valleys"],
      landmarks: ["The Great Anvil", "The Glasswood Mesas", "The Cinder Basin Rim", "The Ember Falls"],
      size: "Large · 35 claimed regions",
    },
    government: {
      type: "Meritocratic dominion",
      summary:
        "Power in Emberforge belongs to the skilled. The Forge Conclave, a council of guild masters, governs the nation, and the Forgemaster who leads it is chosen through public trials of craft, wisdom and leadership. Any citizen may enter the trials, whatever their family or Origin.",
      branches: [
        {
          title: "The Forgemaster",
          role: "Chosen by trial, the Forgemaster leads the Dominion, commands its legions and speaks for Emberforge at the Diplomacy Table.",
        },
        {
          title: "The Forge Conclave",
          role: "Masters of the smithing, engineering, mining and merchant guilds who pass laws, set work orders and approve new Banner Stone claims.",
        },
        {
          title: "The Anvilwardens",
          role: "Inspectors and teachers who certify apprentices, keep the Anvilworks honest and maintain the great furnaces of Cinderhold.",
        },
      ],
    },
    history: [
      {
        year: "AS 204",
        title: "Forged at Cinderhold",
        text: "The smiths of the Cinder Basin choose their first Forgemaster by trial, founding the Emberforge Dominion on the principle that rank must be earned.",
      },
      {
        year: "AS 301",
        title: "The Border Fires",
        text: "A quarrel over starstone-rich borderlands with the Lumeria Concord flares into open conflict, beginning the long Ember Wars.",
      },
      {
        year: "AS 327",
        title: "The Siege of Pearlmere",
        text: "Emberforge ironclads blockade Tidehaven's capital over disputed shipping lanes, until Highcrest envoys negotiate an end to the siege.",
      },
      {
        year: "AS 358",
        title: "The Battle of Skyfall Pass",
        text: "Emberforge legions meet Lumerian sky-lancers in the Highcrest Peaks. When an avalanche threatens the valley, both armies stop fighting to protect the evacuees.",
      },
      {
        year: "AS 413",
        title: "The Concord of Aurelune",
        text: "Marshal [Corvin Ashgrove](/wiki/characters/corvin-ashgrove), once the Dominion's greatest general, helps broker the peace that ends the Ember Wars.",
      },
    ],
    capital: {
      name: "Cinderhold",
      type: "capital",
      description:
        "A fortress-city carved into the caldera wall above a glowing lava lake, crowned by the Great Anvil. Its forges never sleep, and at night the whole city shines like a lantern made of iron and fire.",
    },
    cities: [
      {
        name: "Anvilgate",
        type: "city",
        description:
          "The trading gate of the Dominion, where the Anvilworks repair tools for a fair fee and merchants from every nation haggle over enchanted steel.",
      },
      {
        name: "Magmaren",
        type: "town",
        description:
          "A spa town built around steaming hot springs, where weary smiths soak away a week of hammering and Blazeborn children learn to swim in warm pools.",
      },
      {
        name: "Slagport",
        type: "port",
        description:
          "The Dominion's only sea harbour, a busy dock of cranes and copper roofs that ships ingots, glass and clockwork across the southern sea.",
      },
      {
        name: "Ashenwatch",
        type: "fortress",
        description:
          "A basalt fortress on the rim of the basin that once guarded the Lumerian border. Today it hosts the Dominion's Banner Clash training grounds.",
      },
      {
        name: "Kilnreach",
        type: "town",
        description:
          "A town of potters and glassblowers whose kilns turn the desert's glass-sand into shimmering windows for half of Aurelune.",
      },
    ],
    founded: "AS 204",
    culture: [
      "Emberforgers greet the day with the ringing of the Great Anvil, struck once at sunrise by the youngest apprentice in Cinderhold. Work is honoured above almost everything else, and a well-made tool is considered the finest gift one person can give another.",
      "The Dominion is a nation of tinkerers. Clockwork lifts carry travellers up the caldera walls, steam-driven bellows breathe life into its furnaces, and its engineers built the engines that power many Skyport airships. Forgemaster [Brannoch Cinderlight](/wiki/characters/brannoch-cinderlight) keeps a public workshop where anyone may watch, learn and ask questions.",
      "Emberforge remembers the [Ember Wars](/lore/the-ember-wars) honestly. Its histories record both its victories and its mistakes, and every apprentice learns how Marshal Corvin Ashgrove laid down his command to help make peace. Pride here means getting better, not standing still.",
    ],
    strengths: [
      "Unrivalled smithing, engineering and redstone craft",
      "Rich deposits of iron, gold, obsidian and glass-sand",
      "A meritocracy that rewards talent from any background",
      "A strong friendship with the Highcrest Clans",
    ],
    challenges: [
      "Harsh volcanic terrain that is difficult to farm",
      "Tense trade relations with Tidehaven and Lumeria",
      "A demanding culture that can be hard on newcomers",
    ],
    commonOrigins: ["blazeborn", "human", "shulk"],
    traditions: [
      {
        name: "The First Strike",
        description:
          "Each sunrise the newest apprentice of Cinderhold strikes the Great Anvil once, a single note that tells the city the forges are awake.",
      },
      {
        name: "The Open Trials",
        description:
          "When a new Forgemaster is needed, any citizen may compete in public trials of craft, wisdom and leadership before the whole Dominion.",
      },
      {
        name: "Ember Gifts",
        description:
          "At the turn of the year, every smith forges one small item for a stranger. Many of these gifts travel to other nations as tokens of friendship.",
      },
    ],
    joining: {
      open: true,
      summary:
        "Emberforge welcomes smiths, engineers, miners and anyone ready to earn their place. Find a citizen to sponsor you and seek the approval of the Forge Conclave; the [nations guide](/wiki/guides/nations-guide) covers each step.",
      requirements: [
        "Be sponsored by a current Emberforge citizen",
        "Receive approval from the Forge Conclave, the nation's leadership",
        "Belong to no other nation; leaving a nation starts a 7-day cool-down",
        "Complete one apprentice work order for a Cinderhold guild",
      ],
    },
  },
  {
    slug: "twilight-reach",
    name: "Twilight Reach",
    short: "Twilight Reach",
    motto: "Beyond the Veil, Light",
    tagline: "A realm of stargazers and crystal isles beneath a sky that never fully darkens.",
    tone: "arcane",
    colors: { primary: "#A78BFA", secondary: "#3730A3" },
    flag: { pattern: "diagonal", colors: ["#A78BFA", "#3730A3", "#EDE9FE"], emblem: "moon" },
    scene: "observatory",
    description:
      "**Twilight Reach** is a nation of scholars, oracles and starwatchers in the perpetual twilight of the eastern highlands. Founded beneath [the Great Aurora](/lore/the-great-aurora) in AS 226, it studies the stars, the Veil and the scattered Heartstar shards with patience and wonder.",
    leader: {
      name: "Isolde Veyra",
      title: "Oracle",
      characterSlug: "isolde-veyra",
      bio: "An Enderian astronomer who can blink between the crystal isles in a single breath, Isolde Veyra became Oracle after predicting the return of the Great Aurora to the very night. She governs with the Star Council and spends most evenings at the great lens of Starfall Observatory.",
    },
    allies: [
      {
        slug: "evergrove-covenant",
        note: "Evergrove druids and Twilight stargazers share a reverence for living light, and their scholars meet each midsummer beneath the Lantern Canopy.",
      },
    ],
    rivals: [
      {
        slug: "lumeria-concord",
        note: "A friendly Sun-versus-Moon rivalry over the custody of Heartstar shards, argued with good humour at every [Spire Summit](/lore/the-spire-summit).",
      },
    ],
    territory: {
      region: "The Veiled Expanse",
      summary:
        "Twilight Reach covers the eastern highlands, where the sky stays a deep violet at every hour and crystal isles float above still, mirror-like lakes. Its lands end at the Veil Gate, beyond which the old sky-ruins of the Ascendants drift in silence.",
      biomes: ["Twilight moors", "Crystal isles", "Mirror lakes", "Amethyst groves", "Starlit tundra"],
      landmarks: ["Starfall Observatory", "The Veil Gate", "Lake Duskmirror", "The eastern end of the Glass Bridge"],
      size: "Medium · 29 claimed regions",
    },
    government: {
      type: "Scholar-oracle conclave",
      summary:
        "The Oracle leads Twilight Reach alongside the Star Council, a circle of astronomers, archivists and shard-keepers chosen for their learning. Decisions are reached by reasoned debate, and every important law is first tested against the records of the observatory.",
      branches: [
        {
          title: "The Oracle",
          role: "The nation's leader and chief astronomer, who speaks for Twilight Reach abroad and leads the study of Heartstar shards.",
        },
        {
          title: "The Star Council",
          role: "Scholars who debate and pass laws, manage the nation's Banner Stone claims and oversee the archives of Moonveil.",
        },
        {
          title: "The Veilwardens",
          role: "Explorers and guardians who map the crystal isles, guide visitors safely through the Veil Gate and keep the observatory lenses clean.",
        },
      ],
    },
    history: [
      {
        year: "AS 226",
        title: "The Great Aurora",
        text: "A ribbon of colour sweeps across the eastern sky, drawing stargazers to the shores of Lake Duskmirror, where they found Moonveil beneath its light.",
      },
      {
        year: "AS 371",
        title: "The Concordmaker",
        text: "Lyra Starwhisper, a Starborne scholar of Moonveil, begins the long work of carrying messages between warring nations.",
      },
      {
        year: "AS 412",
        title: "The Night of Falling Stars",
        text: "Twilight astronomers chart the great meteor shower as it happens, and their maps help every nation recover the scattered fragments safely.",
      },
      {
        year: "AS 413",
        title: "The Concord Seal",
        text: "Lyra Starwhisper forges the Concord Seal, and Twilight Reach signs the [Concord of Aurelune](/lore/the-concord-of-aurelune) with the other five nations.",
      },
      {
        year: "AS 424",
        title: "The Glass Bridge Restored",
        text: "Twilight crystal-wrights and Lumerian masons rebuild the starstone causeway between their nations, meeting in the middle with a cheer heard for miles.",
      },
    ],
    capital: {
      name: "Moonveil",
      type: "capital",
      description:
        "A city of silver domes and crescent towers on the shore of Lake Duskmirror, where the water reflects so perfectly that the city seems to float among the stars. The Star Council meets in its great open-roofed rotunda.",
    },
    cities: [
      {
        name: "Starfall",
        type: "city",
        description:
          "The home of Starfall Observatory and its great crystal lens. Scholars from every nation come here to chart the stars and study recovered shards.",
      },
      {
        name: "Veilmarket",
        type: "city",
        description:
          "A night market of glowing stalls that sells star charts, amethyst and curious relics recovered from the drifting ruins beyond the Veil Gate.",
      },
      {
        name: "Duskmere",
        type: "port",
        description:
          "A quiet lake port whose violet-sailed boats carry pilgrims across Lake Duskmirror and whose Skyport links the Reach to the Glass Bridge.",
      },
      {
        name: "Nightbloom",
        type: "town",
        description:
          "A garden town where flowers open only in twilight, filling the streets with soft light and a scent like rain on warm stone.",
      },
      {
        name: "Echo Hollow",
        type: "town",
        description:
          "A town carved into a crystal canyon where every sound rings like a bell. Musicians from across Aurelune come here to compose.",
      },
    ],
    founded: "AS 226",
    culture: [
      "In Twilight Reach the stars are never far away. Families keep star-journals the way others keep diaries, children learn the constellations before their letters, and the best seat in any home is always the one closest to the window.",
      "Curiosity is the national virtue. The Reach's scholars share their findings freely, and the archives of Moonveil hold maps of the drifting ruins beyond the Veil Gate. Oracle [Isolde Veyra](/wiki/characters/isolde-veyra) holds an open night each month when anyone may look through the great lens of Starfall Observatory.",
      "The people of the Reach are proud of [Lyra Starwhisper](/lore/lyra-starwhisper-the-concordmaker), the Concordmaker who helped end the Ember Wars. Her words, *beyond the veil, light*, became the national motto and a quiet promise that even the longest night ends.",
    ],
    strengths: [
      "The finest astronomers and shard-scholars in Aurelune",
      "Enderian and Phantom explorers at home among the crystal isles",
      "Rare amethyst, crystal and starstone deposits",
      "A warm alliance with the Evergrove Covenant",
    ],
    challenges: [
      "Thin soil and dim light that make farming difficult",
      "Remote crystal isles that are hard to reach and defend",
      "A friendly but persistent rivalry with Lumeria over Heartstar shards",
    ],
    commonOrigins: ["enderian", "phantom", "starborne"],
    traditions: [
      {
        name: "The Aurora Vigil",
        description:
          "Whenever the Great Aurora returns, the whole nation gathers on the shores of Lake Duskmirror to watch it in silence until dawn.",
      },
      {
        name: "Star-Naming",
        description:
          "Each new citizen chooses an unnamed star, and the observatory records it in the Book of Lights under their name.",
      },
      {
        name: "The Open Lens",
        description:
          "Once a month, the great lens of Starfall Observatory is opened to every visitor, citizen or not, for a night of stargazing and stories.",
      },
    ],
    joining: {
      open: true,
      summary:
        "Twilight Reach welcomes scholars, explorers, builders and dreamers. Find a citizen to sponsor you and seek the approval of the Star Council; the [nations guide](/wiki/guides/nations-guide) explains every step.",
      requirements: [
        "Be sponsored by a current Twilight Reach citizen",
        "Receive approval from the Star Council, the nation's leadership",
        "Belong to no other nation; leaving a nation starts a 7-day cool-down",
        "Respect the protected crystal isles and observatory grounds",
      ],
    },
  },
  {
    slug: "highcrest-clans",
    name: "Highcrest Clans",
    short: "Highcrest",
    motto: "Stand Tall, Stand Together",
    tagline: "A confederation of mountain clans who climb, build and stand together in the high peaks.",
    tone: "blush",
    colors: { primary: "#FB7185", secondary: "#475569" },
    flag: { pattern: "cross", colors: ["#FB7185", "#475569", "#FFE4E6"], emblem: "peak" },
    scene: "citadel",
    description:
      "The **Highcrest Clans** are a confederation of hardy mountain clans in the snowy northern peaks of Aurelune. United at Stonecrown in AS 189, they elect a High Chieftain at the Clan Moot and are famous for their stonework, their climbers and their unshakable loyalty to friends.",
    leader: {
      name: "Brenna Stonehelm",
      title: "High Chieftess",
      characterSlug: "brenna-stonehelm",
      bio: "A Shulk stonemason from Granitehold, Brenna Stonehelm was elected High Chieftess after rebuilding the avalanche-wrecked road through Skyfall Pass with her own clan. She is steady, plain-spoken and famous for ending the Timber Feud with an apology no one expected.",
    },
    allies: [
      {
        slug: "tidehaven-republic",
        note: "Highcrest envoys helped end the [Siege of Pearlmere](/lore/siege-of-pearlmere), and Tidehaven ships have carried Highcrest stone and wool ever since.",
      },
      {
        slug: "emberforge-dominion",
        note: "Mountain ore for forge-made tools: a partnership of stone and fire that has outlasted every war.",
      },
    ],
    rivals: [
      {
        slug: "evergrove-covenant",
        note: "The [Timber Feud](/lore/the-timber-feud) has ended, but the clans and the Covenant still argue, carefully, over where forest ends and quarry begins.",
      },
    ],
    territory: {
      region: "The Highcrest Peaks",
      summary:
        "Highcrest holds the great northern mountains of Aurelune: jagged peaks, blue glaciers, pine-dark valleys and the high passes that link north and south. Its clan-holds cling to cliffs and ridgelines, connected by rope bridges and stairs cut into living stone.",
      biomes: ["Snowy peaks", "Glaciers", "Pine valleys", "Alpine meadows", "Frozen lakes"],
      landmarks: ["The Eagle's Stair", "Skyfall Pass", "Frostmere Glacier", "The Moot Stones of Stonecrown"],
      size: "Large · 38 claimed regions",
    },
    government: {
      type: "Clan confederation",
      summary:
        "Each clan governs its own hold, but all of them send speakers to the Clan Moot at Stonecrown. The Moot elects a High Chieftain to lead the confederation, decide matters of war and peace, and represent Highcrest abroad. Any clan may call a Moot if it believes the High Chieftain has lost its trust.",
      branches: [
        {
          title: "The High Chieftain",
          role: "Elected by the Clan Moot to lead the confederation, command its defenders and speak for Highcrest at the Diplomacy Table.",
        },
        {
          title: "The Clan Moot",
          role: "Speakers from every clan who meet at the Moot Stones to pass laws, approve treaties and decide where Banner Stones are raised.",
        },
        {
          title: "The Pathkeepers",
          role: "Mountaineers who maintain the high passes, rescue stranded travellers and guide caravans safely through the snow.",
        },
      ],
    },
    history: [
      {
        year: "AS 189",
        title: "The Moot at Stonecrown",
        text: "The scattered mountain clans gather at the Moot Stones and elect their first High Chieftain, uniting as the Highcrest Clans.",
      },
      {
        year: "AS 327",
        title: "Envoys to Pearlmere",
        text: "Highcrest envoys, friends to both Tidehaven and Emberforge, carry terms across the water until the Siege of Pearlmere is lifted.",
      },
      {
        year: "AS 358",
        title: "The Battle of Skyfall Pass",
        text: "Lumerian and Emberforge armies clash in Highcrest's highest pass. Clan Pathkeepers guide both sides' wounded and evacuees to safety after the avalanche.",
      },
      {
        year: "AS 389",
        title: "The Timber Feud",
        text: "Highcrest logging at the edge of the Luminous Weald begins a bitter twenty-year quarrel with the Evergrove Covenant.",
      },
      {
        year: "AS 413",
        title: "The Concord of Aurelune",
        text: "The clans sign the Concord, and the Timber Feud is formally closed with new boundaries between forest and quarry.",
      },
    ],
    capital: {
      name: "Stonecrown",
      type: "capital",
      description:
        "A citadel of grey stone and rose-coloured banners carved into a mountain summit, ringed by the ancient Moot Stones. Its great hall is warmed by a hearth so large that a whole clan can gather around it.",
    },
    cities: [
      {
        name: "Frosthollow",
        type: "town",
        description:
          "A snug valley town of stone cottages and steaming bathhouses, where travellers rest before attempting the high passes.",
      },
      {
        name: "Eaglespire",
        type: "fortress",
        description:
          "A fortress perched at the top of the Eagle's Stair, where Avian scouts nest in carved rookeries and watch over the northern skies.",
      },
      {
        name: "Granitehold",
        type: "city",
        description:
          "The confederation's largest city, a maze of quarries, workshops and stair-streets famous for the finest masonry in Aurelune.",
      },
      {
        name: "Cairnwatch",
        type: "fortress",
        description:
          "A watchtower on the road to Skyfall Pass, surrounded by thousands of stacked stone cairns left by grateful travellers.",
      },
      {
        name: "Windbreak",
        type: "town",
        description:
          "A wind-scoured hamlet of shepherds and weavers whose thick wool cloaks are prized in every cold corner of the world.",
      },
    ],
    founded: "AS 189",
    culture: [
      "In the Highcrest Peaks, nobody climbs alone. Clans share their hearths, their harvests and their rope, and a traveller caught in a storm will always find a door open. Loyalty is the highest virtue, and a promise made on the Moot Stones is never broken.",
      "Highcrest is a nation of builders and climbers. Its masons cut stairways into sheer cliffs, raise bridges across chasms and carve their histories into the mountainsides. High Chieftess [Brenna Stonehelm](/wiki/characters/brenna-stonehelm) still lays stone with her own hands on the roads to Skyfall Pass.",
      "The clans are proud, but they have learned humility. The [Timber Feud](/lore/the-timber-feud) taught them that forests are not just timber, and since the Concord, Highcrest woodcutters plant two saplings for every tree they fell.",
    ],
    strengths: [
      "Unmatched masonry, mining and mountain engineering",
      "Shulk and Feline clansfolk who thrive in harsh terrain",
      "Natural fortresses in the high passes",
      "Loyal alliances with Tidehaven and Emberforge",
    ],
    challenges: [
      "Long winters and short growing seasons",
      "Remote holds that are slow to gather for a Moot",
      "A cautious peace with the Evergrove Covenant",
    ],
    commonOrigins: ["shulk", "feline", "avian", "human"],
    traditions: [
      {
        name: "Cairn-Stacking",
        description:
          "Travellers who cross a high pass safely add a stone to a cairn at the summit, building towers of thanks that have stood for centuries.",
      },
      {
        name: "The Rope Oath",
        description:
          "New citizens tie a knot in the great rope of Stonecrown, promising to hold fast to their clan and to anyone who needs a hand on the climb.",
      },
      {
        name: "The Two-Sapling Pledge",
        description:
          "Since the end of the Timber Feud, every tree felled in Highcrest is replaced by two new saplings, planted with a short apology to the forest.",
      },
    ],
    joining: {
      open: true,
      summary:
        "Highcrest welcomes miners, masons, climbers and anyone with a steady hand. Find a citizen to sponsor you and seek the approval of the Clan Moot; the [nations guide](/wiki/guides/nations-guide) covers the details.",
      requirements: [
        "Be sponsored by a current Highcrest citizen",
        "Receive approval from the Clan Moot, the nation's leadership",
        "Belong to no other nation; leaving a nation starts a 7-day cool-down",
        "Follow the Two-Sapling Pledge when cutting timber in Highcrest lands",
      ],
    },
  },
];
