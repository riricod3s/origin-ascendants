import type { ServerEvent } from "@/types/content";

export const serverEvents: ServerEvent[] = [
  {
    id: "skyward-expedition",
    title: "Skyward Expedition",
    type: "Adventure",
    description:
      "Every Saturday, a crew of Ascendants boards an airship at the Skyports and follows the route first flown by Captain Orin Gale into uncharted skies. Each expedition brings a fresh goal, from ruin delving and puzzle vaults to sky-beast hunts, and is built for friendly co-operative play.",
    icon: "compass",
    tone: "aether",
    scene: "airships",
    cadence: "Every Saturday",
    schedule: { kind: "weekly", weekday: 6, hourUTC: 19 },
    highlights: [
      "Weekly co-op voyages aboard player-crewed airships",
      "Quest lines unlock as you rise through the ranks, with Aurels and Orbs of Origin as rewards",
      "Expedition crews can earn cosmetic titles and a place in the Gallery",
    ],
  },
  {
    id: "banner-clash",
    title: "Banner Clash",
    type: "Tournament",
    description:
      "Once a month, the six nations send their champions to the arena for a bracket of banner-bearing duels with their colours on the line. Arena fights lose no items, so every bout is fierce, fair and finished with a handshake.",
    icon: "swords",
    tone: "ember",
    scene: "citadel",
    cadence: "Third Saturday of every month",
    schedule: { kind: "monthly", weekday: 6, nth: 3, hourUTC: 18 },
    highlights: [
      "Nation-versus-nation brackets in a purpose-built arena, with no item loss",
      "Winning nations earn bragging rights and a trophy banner for their capital",
      "Champions receive Aurels and cosmetic titles, and top performers can win Orbs of Origin",
    ],
  },
  {
    id: "builders-festival",
    title: "Builders' Festival",
    type: "Festival",
    description:
      "On the last Sunday of each month, builders of every skill claim a plot on a floating isle and race the clock to bring a shared theme to life. Visitors tour the finished entries, vote for their favourites and celebrate the winners in a lantern-lit parade.",
    icon: "hammer",
    tone: "blush",
    scene: "isles",
    cadence: "Last Sunday of every month",
    schedule: { kind: "monthly", weekday: 0, nth: -1, hourUTC: 17 },
    highlights: [
      "A fresh theme every month, with plots provided and every rank welcome to enter",
      "Community voting alongside a panel of staff builders, with winners featured in the Gallery",
      "Prizes include Aurels, cosmetic titles and the occasional Orb of Origin",
    ],
  },
  {
    id: "meteor-hunt",
    title: "Meteor Hunt",
    type: "Adventure",
    description:
      "Each month, shooting stars streak across the sky and scatter glowing Starstone Shards over the wilds, echoing the legendary Night of Falling Stars. Explorers follow the trails, solve the clues and race to claim the biggest finds before dawn.",
    icon: "star",
    tone: "arcane",
    scene: "crystal",
    cadence: "First Friday of every month",
    schedule: { kind: "monthly", weekday: 5, nth: 1, hourUTC: 20 },
    highlights: [
      "A world-wide treasure hunt, with the first clues announced when the event begins",
      "Starstone Shards that can be crafted into Orbs of Origin",
      "Aurels for every find, plus cosmetic titles for the sharpest-eyed hunters",
    ],
  },
  {
    id: "festival-of-ascension",
    title: "Festival of Ascension",
    type: "Seasonal",
    description:
      "Each autumn equinox, Aurelune gathers to honour Aurel Skyward and the First Beacon lit on Mount Dawnrest, with lanterns, music and games in every capital. It is the biggest celebration of the year, and every nation, Origin and Wanderer is invited.",
    icon: "sparkles",
    tone: "solar",
    scene: "festival",
    cadence: "Every year on the autumn equinox (September 22)",
    schedule: { kind: "annual", month: 9, day: 22, hourUTC: 18 },
    highlights: [
      "A lantern release at dusk, with every nation lighting its own colour in the sky",
      "Seasonal decorations, mini-games and parades through the capitals",
      "Festival Deeds earn limited-time cosmetic titles, Aurels and Orbs of Origin",
    ],
  },
  {
    id: "war-council",
    title: "War Council",
    type: "War",
    description:
      "On the second Wednesday of every month, envoys from the nations meet at the Diplomacy Table to declare wars, sign treaties and settle disputes in the open. Declared wars are scheduled here, with 48 hours' notice, a stated cause and Siege Windows assigned to each one.",
    icon: "scale",
    tone: "tide",
    scene: "skycity",
    cadence: "Second Wednesday of every month",
    schedule: { kind: "monthly", weekday: 3, nth: 2, hourUTC: 19 },
    highlights: [
      "Declarations need a stated cause, and nations under an active Concord treaty cannot be targeted",
      "Siege Windows of two hours at most are assigned, and every treaty and truce is recorded in the lore archive",
      "Envoys and peacemakers earn nation-service Deeds, Aurels and cosmetic titles, while staff stay strictly neutral",
    ],
  },
];
