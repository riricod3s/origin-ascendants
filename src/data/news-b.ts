import type { NewsArticle } from "@/types/content";

export const newsArticlesB: NewsArticle[] = [
  {
    slug: "banner-clash-october-recap",
    title: "Banner Clash Recap: Highcrest Holds the Summit in an October Thriller",
    excerpt:
      "Six nations, forty-two competitors and one very stubborn Shulk. October's Banner Clash came down to the final seconds of the final round, and the Highcrest Clans took home the Summit Banner.",
    category: "event-recaps",
    date: "2026-10-18",
    author: { name: "PrismPilot", role: "Event & Arena Builder" },
    readingMinutes: 3,
    scene: "citadel",
    tone: "blush",
    tags: ["Banner Clash", "Events", "Tournament", "Highcrest"],
    nations: ["highcrest-clans", "emberforge-dominion", "lumeria-concord", "twilight-reach"],
    content: [
      {
        type: "p",
        text: "Every third Saturday the arena above the Ascendant Landing fills with banners, and this month it was louder than ever. Forty-two players from all six nations, plus a lively mixed team of Wanderers, gathered for October's **Banner Clash**. As always there was no item loss, just pride, cosmetic titles and the right to hang the Summit Banner in your capital for a month.",
      },
      { type: "h2", text: "The road to the final" },
      {
        type: "list",
        items: [
          "**Round one:** Twilight Reach's Enderians blinked circles around Tidehaven in the crystal arena, winning with a flag capture in under four minutes.",
          "**Round two:** Emberforge and Lumeria renewed their famous rivalry. Lumeria's Elytrian sky-lancers took the high ground, but Emberforge's Blazeborn flame dashes won the day.",
          "**Semi-finals:** Highcrest's patient shield wall wore down the Wanderers' mixed team, who earned the loudest applause of the night anyway.",
        ],
      },
      { type: "h2", text: "A final to remember" },
      {
        type: "p",
        text: "The final pitted the Highcrest Clans against their old friends from the Emberforge Dominion. With ten seconds left on the clock and Emberforge pushing hard, Highcrest's **GraniteGuard** dropped into Shell Guard on top of the Banner Stone and simply refused to move. The arena counted down the final seconds together, and the Summit Banner went north to Stonecrown.",
      },
      {
        type: "quote",
        text: "I could hear them hammering on my shell for the whole last minute. Best ten seconds of my life.",
        cite: "GraniteGuard, Highcrest Clans",
      },
      {
        type: "callout",
        variant: "info",
        title: "Results",
        text: "Champions: Highcrest Clans. Runners-up: Emberforge Dominion. Sportsmanship award: the Wanderers' mixed team. Every participant earned an event Deed and the *Clashborn* cosmetic title.",
      },
      {
        type: "p",
        text: "The next Banner Clash is on the third Saturday of November at 18:00 UTC. Check the [Event Guide](/wiki/guides/event-guide) for how to sign up, and the [gallery](/gallery) for screenshots from the final.",
      },
    ],
  },
  {
    slug: "lumeria-tidehaven-skyport-trade-pact",
    title: "Lumeria and Tidehaven Sign the Skyport Trade Pact",
    excerpt:
      "High Luminary Seraphine Aldmere and Consul Maren Tidewell met at the Pearlmere Diplomacy Table to sign a pact that opens a direct skylane between Dawnharbor and Pearlmere.",
    category: "nation-news",
    date: "2026-10-06",
    author: { name: "TideRunner_42", role: "Diplomacy Marshal & Moderator" },
    readingMinutes: 2,
    scene: "harbor",
    tone: "tide",
    tags: ["Diplomacy", "Trade", "Skyports", "Lumeria", "Tidehaven"],
    nations: ["lumeria-concord", "tidehaven-republic"],
    content: [
      {
        type: "p",
        text: "Under bright autumn skies, High Luminary [Seraphine Aldmere](/wiki/characters/seraphine-aldmere) glided down onto the Pearlmere quay to meet Consul [Maren Tidewell](/wiki/characters/maren-tidewell) at the Diplomacy Table. Within the hour, the two oldest allies in Aurelune had signed the **Skyport Trade Pact**.",
      },
      { type: "h2", text: "What the pact does" },
      {
        type: "list",
        items: [
          "Opens a **direct skylane** between Dawnharbor and Pearlmere, replacing the old three-stop journey with a single flight.",
          "Grants each nation's citizens shared Stall access in the other's markets.",
          "Commits both nations to a joint work order for new Skyport platforms at Dawnharbor.",
        ],
      },
      {
        type: "quote",
        text: "Lumerian grain has sailed west on Tidehaven ships for three centuries. Now it can fly.",
        cite: "Consul Maren Tidewell, at the signing",
      },
      {
        type: "p",
        text: "The new skylane opens with version 2.1 later this month. Read more about routes and fares in [Skyports & Travel](/wiki/mechanics/skyports-and-travel), and about how pacts work in [Diplomacy & War](/wiki/mechanics/diplomacy-and-war).",
      },
    ],
  },
  {
    slug: "festival-of-ascension-436-recap",
    title: "Festival of Ascension 436: A Thousand Lanterns for the First Beacon",
    excerpt:
      "Lanterns from all six capitals, a Glass Bridge race, a surprise appearance from the Great Aurora and the biggest crowd the Ascendant Landing has ever seen. Here is how Aurelune celebrated its favourite night.",
    category: "event-recaps",
    date: "2026-09-24",
    author: { name: "LunaHollow", role: "Head of Community & Events" },
    readingMinutes: 3,
    scene: "festival",
    tone: "solar",
    tags: ["Festival of Ascension", "Events", "Lanterns", "Community"],
    featured: true,
    content: [
      {
        type: "p",
        text: "On the autumn equinox, Aurelune paused to celebrate the night [Aurel Skyward](/wiki/characters/aurel-skyward) lit the First Beacon. The **Festival of Ascension** is our biggest event of the year, and this year more Ascendants gathered for it than ever before.",
      },
      { type: "h2", text: "Festival highlights" },
      {
        type: "steps",
        items: [
          {
            title: "The Lantern Procession",
            text: "Citizens of all six nations carried lanterns from their capitals by Skyport, by sea and on foot, meeting at the Ascendant Landing at sunset.",
          },
          {
            title: "The Glass Bridge Race",
            text: "Lumeria and Twilight Reach renewed their Sun-versus-Moon rivalry with a relay across the Glass Bridge. Twilight won by a single block.",
          },
          {
            title: "The Lantern Release",
            text: "At the stroke of nine, over a thousand lanterns rose from the Landing toward Mount Dawnrest, where the First Beacon flared gold in answer.",
          },
          {
            title: "A surprise in the sky",
            text: "Just after midnight, a ribbon of the Great Aurora appeared over the eastern horizon. Twilight Reach's astronomers swear they did not plan it.",
          },
        ],
      },
      {
        type: "callout",
        variant: "lore",
        title: "Why lanterns?",
        text: "Survivors once followed a single golden light up Mount Dawnrest. Releasing lanterns toward the Beacon is Aurelune's way of saying that every light still leads home. Read the full story in [The Festival of Ascension](/lore/festival-of-ascension).",
      },
      {
        type: "p",
        text: "Every participant earned the *Lanternbearer* cosmetic title, and festival quest winners received Orbs of Origin and Aurels. Thank you to the builders, volunteers and staff who made the night shine. Screenshots are in the [gallery](/gallery).",
      },
    ],
  },
  {
    slug: "version-2-0-the-verdant-awakening",
    title: "Version 2.0: The Verdant Awakening",
    excerpt:
      "Our biggest update yet. A new Origin takes root, the Hall of Origins is reborn, nation maps get a full refresh, seasonal Deeds arrive and the economy gets smarter.",
    category: "server-updates",
    date: "2026-09-18",
    author: { name: "SkyArchitect", role: "Server Owner & Lead Developer" },
    readingMinutes: 3,
    scene: "forest",
    tone: "verdant",
    tags: ["Update", "Version 2.0", "Verdant", "Origins"],
    nations: ["evergrove-covenant"],
    content: [
      {
        type: "p",
        text: "Deep beneath the Lantern Canopy, the Heartroot has stirred. Version 2.0 is the largest update in the history of Origin Ascendants, and it begins with a brand-new Origin born of the Luminous Weald.",
      },
      { type: "h2", text: "New Origin: Verdant" },
      {
        type: "p",
        text: "The [Verdant](/wiki/origins/verdant) are the Rootkin, people touched by Heartstar light that fell into the deep forest. They draw strength from sunlight, make crops flourish around them and can call entangling roots from the earth. They are also flammable and wilt in the winter cold, so plan your journeys carefully.",
      },
      { type: "h2", text: "What else is new" },
      {
        type: "table",
        headers: ["Area", "What changed"],
        rows: [
          ["Origins", "The Verdant Origin and a refreshed Hall of Origins for new arrivals"],
          ["Events", "Seasonal exploration Deeds and a new Meteor Hunt route"],
          ["Nations", "Updated claim maps with new markers for capitals and landmarks"],
          ["Economy", "Clearer work order boards and fairer repair fees at the Anvilworks"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Curious about Verdant?",
        text: "Players who joined in the last 7 days can still use their free Origin change. Everyone else can use an Orb of Origin. See the [Origins Guide](/wiki/guides/origins-guide) for details.",
      },
      {
        type: "p",
        text: "Full patch notes are in the [changelog](/wiki/changelog). Thank you for helping us grow Aurelune, one root at a time.",
      },
    ],
  },
];
