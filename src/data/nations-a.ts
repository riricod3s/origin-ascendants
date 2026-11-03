import type { Nation } from "@/types/content";

export const nationsA: Nation[] = [
  {
    slug: "lumeria-concord",
    name: "Lumeria Concord",
    short: "Lumeria",
    motto: "Rise in Light",
    tagline: "The golden realm of the First Beacon, where every road climbs toward the sky.",
    tone: "solar",
    colors: { primary: "#FBBF24", secondary: "#FFF7D6" },
    flag: { pattern: "sunburst", colors: ["#FBBF24", "#FFF7D6", "#B45309"], emblem: "sun" },
    scene: "skycity",
    description:
      "The **Lumeria Concord** is the oldest of Aurelune's six nations, a realm of golden spires, terraced meadows and floating isles founded at Solspire in AS 143. It keeps the First Beacon on Mount Dawnrest and the doors of the [Great Library of Solspire](/lore/the-spire-summit), and it welcomes every traveller who wishes to climb a little closer to the sky.",
    leader: {
      name: "Seraphine Aldmere",
      title: "High Luminary",
      characterSlug: "seraphine-aldmere",
      bio: "An Elytrian glider-child from Lantern Vale, Seraphine Aldmere rose through the Council of Lanterns on her gift for listening before ascending the Radiant Throne. As High Luminary she keeps Solspire open to Wanderers of every nation and still greets most sunrises in flight above its golden towers.",
    },
    allies: [
      {
        slug: "tidehaven-republic",
        note: "Lumerian grain and lantern-glass sail west on Tidehaven ships, and the two nations share a warm trade pact and a long habit of standing together at the [Spire Summit](/lore/the-spire-summit).",
      },
      {
        slug: "evergrove-covenant",
        note: "Lumerian scholars and Evergrove druids trade seeds, star charts and a shared reverence for the living light of the [Heartstar](/lore/the-heartstar).",
      },
    ],
    rivals: [
      {
        slug: "emberforge-dominion",
        note: "Old opponents from the [Ember Wars](/lore/the-ember-wars) who now test each other in tournaments, trade fairs and building contests with fierce, respectful pride.",
      },
      {
        slug: "twilight-reach",
        note: "A friendly Sun-versus-Moon rivalry over who should keep custody of recovered Heartstar shards, argued with wit and good humour at every [Spire Summit](/lore/the-spire-summit).",
      },
    ],
    territory: {
      region: "The Radiant Highlands and Skyterraces",
      summary:
        "Lumeria stretches across the sunlit central-north of Aurelune, where rolling meadows climb into great stepped farmlands and floating isles drift lazily above the fields. Its borders run from the slopes of Mount Dawnrest to the western end of the Glass Bridge, the starstone causeway that leads to Twilight Reach.",
      biomes: ["Sunlit meadows", "Terraced farmland", "Floating sky-isles", "Golden birch forests", "Alpine foothills"],
      landmarks: [
        "The First Beacon on Mount Dawnrest",
        "The Skyterraces",
        "The Great Library of Solspire",
        "The Sunwell Falls",
      ],
      size: "Large · 41 claimed regions",
    },
    government: {
      type: "Constitutional monarchy",
      summary:
        "The High Luminary sits upon the Radiant Throne as head of state, but every new law must pass the Council of Lanterns, whose members speak for Lumeria's cities and terraces. The balance dates to the founding charter of AS 143, which declared that no single light should outshine the rest.",
      branches: [
        {
          title: "The Radiant Throne",
          role: "The High Luminary leads the nation, commands its sky-patrols and represents Lumeria at the Diplomacy Table and the Spire Summit.",
        },
        {
          title: "The Council of Lanterns",
          role: "Elected councillors from every city and terrace debate and pass laws, approve treaties and oversee the nation's Banner Stone claims.",
        },
        {
          title: "The Keepers of the Beacon",
          role: "Scholars and wardens who tend the First Beacon, safeguard recovered Heartstar shards and care for the Great Library.",
        },
      ],
    },
    history: [
      {
        year: "AS 14",
        title: "The First Beacon",
        text: "Aurel Skyward lights the First Beacon atop Mount Dawnrest, guiding scattered survivors toward the highlands. Lumerians still count that golden spark as the true beginning of their story.",
      },
      {
        year: "AS 143",
        title: "Founding at Solspire",
        text: "The settlers of the Radiant Highlands sign their founding charter at Solspire, creating the Radiant Throne and the Council of Lanterns. The Lumeria Concord becomes the first nation of the Era of Banners.",
      },
      {
        year: "AS 301",
        title: "The Border Fires",
        text: "A quarrel with the Emberforge Dominion over starstone-rich borderlands flares into the Border Fires, opening the long Ember Wars.",
      },
      {
        year: "AS 358",
        title: "The Battle of Skyfall Pass",
        text: "Lumerian sky-lancers and Emberforge legions clash in the snowbound heights of Skyfall Pass. The courage shown on both sides is still honoured in songs from Solspire to Cinderhold.",
      },
      {
        year: "AS 413",
        title: "The Concord of Aurelune",
        text: "Lumeria joins all five other nations in signing the Concord of Aurelune, ending the Ember Wars and opening the present Age of Concord.",
      },
      {
        year: "AS 420",
        title: "The Great Library Reopens",
        text: "The restored Great Library of Solspire throws open its doors to scholars of every nation, and its sunlit halls soon welcome the leaders' gatherings of the Spire Summit.",
      },
    ],
    capital: {
      name: "Solspire",
      type: "capital",
      description:
        "A crown of golden towers rising from the highest of the Skyterraces, home to the Radiant Throne, the Council of Lanterns and the Great Library. At sunrise its mirrored spires catch the light and glow across the whole highland.",
    },
    cities: [
      {
        name: "Dawnharbor",
        type: "port",
        description:
          "Lumeria's lakeside port on the shore of Lake Sunmere, where grain barges and Tidehaven traders meet beneath a bustling Skyport. Its lighthouse burns with a flame carried down from the First Beacon.",
      },
      {
        name: "Sunhaven",
        type: "town",
        description:
          "A cheerful farming town on the lower terraces, famous for honey-bread, sunflower fields and the loudest harvest fair in the highlands.",
      },
      {
        name: "Aurelwatch",
        type: "fortress",
        description:
          "A white-stone fortress guarding the pilgrim road to Mount Dawnrest. Its sky-lancers now spend more time escorting travellers than standing watch.",
      },
      {
        name: "Gildspire",
        type: "city",
        description:
          "A city of glassblowers and lantern-wrights whose workshops glitter day and night, supplying star-lanterns to festivals across Aurelune.",
      },
      {
        name: "Lantern Vale",
        type: "town",
        description:
          "A sheltered valley town beneath the Skyterraces where young Elytrians learn to glide. Thousands of paper lanterns are folded here each year for the Festival of Ascension.",
      },
    ],
    founded: "AS 143",
    culture: [
      "Lumerian days begin with light. At dawn the lamplighters of Solspire climb the terrace stairs to rekindle the street-beacons, and bells ring from Sunhaven to Gildspire as the sun clears the Skyterraces. Farmers, glassblowers and scholars alike pause for a quiet moment of thanks to the light that once guided survivors home.",
      "Learning is Lumeria's proudest export. The Great Library of Solspire, cared for by the archivist [Thessaly Quill](/wiki/characters/thessaly-quill), welcomes readers from every nation, and Lumerian children grow up copying star charts and old Ascendant blueprints for fun. Many still dream of following [Aurel Skyward](/wiki/characters/aurel-skyward) up the slopes of Mount Dawnrest.",
      "Lumerians are famously hospitable and a little theatrical. Visitors are greeted with honey-bread and a small lantern to carry during their stay, banners are polished until they shine, and every festival ends with music drifting across the terraces long after the stars come out.",
    ],
    strengths: [
      "Bountiful terraced farmland and reliable harvests",
      "The Great Library, Aurelune's largest archive of Ascendant knowledge",
      "Elytrian and Avian sky-patrols with unmatched aerial scouting",
      "Close, long-standing alliances with Tidehaven and Evergrove",
    ],
    challenges: [
      "Scattered floating isles that are slow to supply and hard to defend",
      "A tradition-loving court where the Council of Lanterns can debate for days",
      "A tireless, if friendly, rivalry with Twilight Reach over Heartstar shards",
    ],
    commonOrigins: ["human", "elytrian", "avian", "starborne"],
    traditions: [
      {
        name: "The Dawn Kindling",
        description:
          "On the first morning of each season, runners carry a flame down from the First Beacon so every household can relight its lanterns from Aurel's original spark.",
      },
      {
        name: "The Lantern Oath",
        description:
          "New citizens light a lantern in Solspire's great square and promise to share their light with any traveller who needs it.",
      },
      {
        name: "The Terrace Glide",
        description:
          "Each midsummer, Elytrians and Avians race the updrafts from the highest Skyterrace to the valley floor while the whole nation cheers from below.",
      },
    ],
    joining: {
      open: true,
      summary:
        "Lumeria's gates are open to Ascendants of every Origin, and builders, scholars and sky-scouts are especially welcome. Find a citizen willing to sponsor you, then seek approval from Lumeria's leadership to take your place beneath the golden banner.",
      requirements: [
        "Be sponsored by a current Lumerian citizen",
        "Receive approval from Lumeria's leadership",
        "Belong to no other nation; leaving a nation starts a 7-day cool-down before you can join another",
        "Respect the Council of Lanterns' building codes on the Skyterraces",
      ],
    },
  },
];
