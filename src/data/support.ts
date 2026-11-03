import type { FundingGoal, SupportTier } from "@/types/content";

// PLACEHOLDER: prices, amounts and goals are illustrative. Update them to match your real payment provider.

export const supportTiers: SupportTier[] = [
  {
    id: "ascend",
    name: "ASCEND",
    tagline: "Take your first step toward the sky.",
    price: "$4.99",
    period: "per month",
    icon: "sparkles",
    tone: "aether",
    benefits: [
      { text: "Exclusive Discord Role" },
      { text: "Supporter Chat Access" },
      { text: "Website Badge" },
      { text: "Early Announcements" },
      { text: "Name on Supporter Wall" },
      { text: "Priority Event Registration" },
    ],
  },
  {
    id: "ascend-plus",
    name: "ASCEND+",
    tagline: "Soar highest and shape what comes next.",
    price: "$9.99",
    period: "per month",
    icon: "crown",
    tone: "solar",
    recommended: true,
    benefits: [
      { text: "Everything Included in Ascend", inherited: true },
      { text: "Exclusive Cosmetic Perks" },
      { text: "Special Supporter Title" },
      { text: "Sneak Peeks of Upcoming Content" },
      { text: "Priority Support" },
      { text: "Featured Recognition" },
      { text: "Exclusive Ascend+ Badge" },
    ],
  },
];

/** Monthly goals. Anything raised beyond a goal becomes a reserve for future improvements. */
export const fundingGoals: FundingGoal[] = [
  {
    id: "server-hosting",
    title: "Server Hosting",
    description: "Dedicated hardware, nightly backups, DDoS protection and the bandwidth that keeps Aurelune smooth around the clock.",
    icon: "server",
    tone: "aether",
    goal: 150,
    raised: 118,
    currency: "USD",
  },
  {
    id: "website-development",
    title: "Website Development",
    description: "The wiki, world map and lore archive, plus the plugins behind Banner Stones, Deeds and the economy.",
    icon: "globe",
    tone: "arcane",
    goal: 100,
    raised: 56,
    currency: "USD",
  },
  {
    id: "community-events",
    title: "Community Events",
    description: "Prizes, decorations and builds for Skyward Expeditions, Banner Clash, the Builders' Festival and the Festival of Ascension.",
    icon: "party-popper",
    tone: "solar",
    goal: 75,
    raised: 69,
    currency: "USD",
  },
];
