import type { RuleSection } from "@/types/content";

export const ruleSections: RuleSection[] = [
  {
    id: "respect",
    title: "Respect",
    icon: "heart-handshake",
    tone: "blush",
    summary: "Everyone who steps onto the Ascendant Landing is a guest in the same story, so treat them like one.",
    rules: [
      {
        title: "Be kind and welcoming",
        text: "Treat every player and staff member with courtesy, whatever their experience, background or Origin. New Wanderers deserve patient answers, not mockery.",
      },
      {
        title: "No harassment or hate",
        text: "Bullying, slurs, discrimination, threats and targeted insults are never acceptable, in-game, in Discord or anywhere else tied to the server. Banter is fine only while everyone is still enjoying it.",
      },
      {
        title: "Keep your language friendly",
        text: "Casual swearing is tolerated in moderation, but chat must stay suitable for a 13+ audience. No sexual content, graphic violence or attempts to dodge the chat filter.",
      },
      {
        title: "Protect other people's privacy",
        text: "Never share someone's real name, address, photographs, accounts or private messages without their permission, and never ask other players for theirs. Doxxing is a severe offence.",
      },
      {
        title: "Keep rivalries in character",
        text: "Friendly rivalry between nations is the spice of Aurelune, but personal attacks are not. Cheer for your banner as loudly as you like, then shake hands afterwards.",
      },
      {
        title: "Accept staff decisions gracefully",
        text: "Follow reasonable staff instructions straight away, and raise any disagreement calmly in a ticket rather than in public chat. Arguing about a moderation action in chat can extend it.",
      },
    ],
  },
  {
    id: "fair-play",
    title: "Fair Play",
    icon: "scale",
    tone: "aether",
    summary: "Ascension means something because everyone earns it the same way, so cheats and exploits have no place here.",
    rules: [
      {
        title: "No hacked clients or cheats",
        text: "Hacked clients, kill-aura, fly or speed hacks, auto-clickers and macros that automate combat or farming are forbidden. Using them, or helping others to, leads to suspension or a ban.",
      },
      {
        title: "No x-ray or ore finders",
        text: "X-ray mods and texture packs, ore highlighters, freecam and entity radar are not allowed in any form. Finding Starstone veins yourself is half the adventure.",
      },
      {
        title: "Use approved client mods only",
        text: "Fabric, Fabric API and Origins are required, while performance and quality-of-life mods such as Sodium, Iris, Mod Menu and Xaero's World Map (with cave mode and entity radar switched off) are welcome. The full list is on the [Server](/server) page, so ask staff if you are unsure about a mod.",
      },
      {
        title: "No duplication or exploits",
        text: "Duping items, abusing bugs, glitching into claimed land or using exploits to gain items, Aurels or advantages is forbidden. If you find one, report it to staff; honest reports are always appreciated.",
      },
      {
        title: "No real-money trading",
        text: "Never buy, sell or trade Aurels, items, ranks, accounts or services for real money, gift cards or other real-world value. Scamming other players in trades or Stall deals is also forbidden.",
      },
      {
        title: "One player, one account",
        text: "Each player may use one whitelisted account. Staff can approve a single declared alt on request, but alts may never be used to dodge punishments, rig votes, farm events or gain an edge in trade or war.",
      },
      {
        title: "Earn your Ascension",
        text: "Ranks, Deeds and titles are earned in-game and never purchased. Do not use bots, shared accounts or alts to complete Deeds for you.",
      },
    ],
  },
  {
    id: "community-standards",
    title: "Community Standards",
    icon: "users",
    tone: "verdant",
    summary: "Aurelune is a shared world, so we look after the people and the places we gather in, in-game and on Discord.",
    rules: [
      {
        title: "Players must be 13 or older",
        text: "You must be at least 13 years old, Discord's minimum age, to apply for the whitelist. If you are under the age of majority in your country, make sure a parent or guardian knows that you play here.",
      },
      {
        title: "No spam, scams or advertising",
        text: "Do not spam chat, flood channels or advertise other servers, communities or products. Scam links, phishing attempts and unsolicited invite links are removed on sight.",
      },
      {
        title: "Keep content age-appropriate",
        text: "Builds, skins, signs, books, names and screenshots must suit a 13+ audience. Heated real-world political or religious debates belong elsewhere.",
      },
      {
        title: "No impersonation",
        text: "Do not pretend to be staff, nation leaders or other players. Staff will never ask for your password, two-factor codes or payment details, so report anyone who does.",
      },
      {
        title: "Report, do not retaliate",
        text: "If you see rule-breaking, open a ticket with screenshots or clips and the time it happened. Please do not punish others yourself, and never file false reports.",
      },
      {
        title: "Use channels and tickets well",
        text: "Post in the right channels and keep voice chat friendly. Use tickets for private matters such as whitelist problems, appeals and reports.",
      },
    ],
  },
  {
    id: "nation-conduct",
    title: "Nation Conduct",
    icon: "flag",
    tone: "solar",
    summary: "Nations are the heart of Aurelune's stories, and their citizens and leaders are expected to represent them with honour.",
    rules: [
      {
        title: "One nation at a time",
        text: "A player may belong to only one nation at a time, and leaving starts a 7-day cool-down before you can join another. Wanderers who prefer to stay unaligned are always welcome.",
      },
      {
        title: "Join by sponsorship",
        text: "To join a nation you need a citizen to sponsor you and its leadership to approve you. Leaders choose who joins, but may not reject or expel anyone for discriminatory reasons.",
      },
      {
        title: "Claim land fairly",
        text: "Nations claim land with Banner Stones, which protect chunks from griefing and define the borders on the world map. Do not claim over other players' builds or wall off public roads and Skyports, and keep your claim upkeep paid.",
      },
      {
        title: "Declare war properly",
        text: "War requires a declaration at your capital's Diplomacy Table with 48 hours' notice and a stated cause. Nations with an active Concord treaty cannot be attacked, and signed truces and treaties must be honoured.",
      },
      {
        title: "Fight only where and when agreed",
        text: "Battles happen only inside the declared War Zone during scheduled Siege Windows, which last two hours at most. Victory means holding the Banner Stone for the window, and griefing, looting containers or permanent destruction are forbidden even in war.",
      },
      {
        title: "Lead with honour",
        text: "Officers, Ministers and Leaders hold their rank on behalf of their citizens. Abusing it to bully members, misuse shared storage or leak private plans can bring staff action as well as in-world consequences.",
      },
      {
        title: "Staff stay neutral",
        text: "Staff may belong to a nation for fun, but they stay strictly neutral in wars, votes and diplomacy and never use their powers to help their own side. If you suspect bias, open a ticket and a different staff member will review it.",
      },
    ],
  },
  {
    id: "gameplay-rules",
    title: "Gameplay Rules",
    icon: "compass",
    tone: "tide",
    summary: "From Banner Stones to battle lines, these everyday rules keep the world fun, fair and standing.",
    rules: [
      {
        title: "No griefing",
        text: "Never destroy, alter or build over another player's creations, claimed or not. Banner Stone claims add automatic protection, but griefing is a violation whether or not a build is protected.",
      },
      {
        title: "No theft or scamming",
        text: "Taking items from containers or players without permission is theft, and so is deceiving someone in a trade or Stall deal. Staff may restore stolen goods and punish the thief.",
      },
      {
        title: "PvP is consensual",
        text: "Only fight players who have agreed to it. The exceptions are declared War Zones during Siege Windows and event arenas; duels in the Proving Grounds at the Ascendant Landing are always allowed and lose no items.",
      },
      {
        title: "No combat logging",
        text: "Disconnecting to escape a fight you agreed to, or a siege you joined, is a violation. If your connection genuinely fails, tell staff when you return.",
      },
      {
        title: "Keep the Landing safe",
        text: "Do not trap, camp or hunt players at the Ascendant Landing or the Hall of Origins, and never prey on newcomers. Killing unwilling players outside war is treated as harassment.",
      },
      {
        title: "Protect server performance",
        text: "Avoid lag machines, oversized entity farms and endless redstone clocks. Staff may ask you to change or remove builds that slow the server for everyone.",
      },
      {
        title: "Follow event rules",
        text: "Listen to event marshals and follow each event's own rules. Arena fights lose no items, so fight hard but fair, and never disrupt other players' entries or progress.",
      },
    ],
  },
  {
    id: "punishments",
    title: "Punishments",
    icon: "gavel",
    tone: "ember",
    summary: "We aim to correct rather than to punish, so most issues end with a conversation and every decision can be appealed.",
    rules: [
      {
        title: "Proportionate and fair",
        text: "Staff choose the lowest step that fits the situation, weighing intent, severity and history. Repeat or serious breaches climb the ladder faster.",
      },
      {
        title: "Some offences skip steps",
        text: "Hacked clients, duplication, doxxing, threats, hate speech, real-money trading and deliberate large-scale griefing can lead straight to a long suspension or a permanent ban.",
      },
      {
        title: "Ban evasion makes it worse",
        text: "Using an alternate account or any other trick to dodge a punishment lengthens it and usually results in a permanent ban for every account involved.",
      },
      {
        title: "Decisions rest on evidence",
        text: "Staff act on logs, screenshots and clear reports rather than rumour. When you report a problem, include what happened, when and where.",
      },
      {
        title: "Supporters get no special treatment",
        text: "ASCEND and ASCEND+ supporters follow the same rules and face the same steps as everyone else. Supporting never shields anyone from moderation.",
      },
    ],
    ladder: [
      {
        level: "Step 1",
        name: "Warning",
        description:
          "A calm word explaining what went wrong and how to put it right. It is recorded so that staff can spot patterns, but it carries no penalty.",
        duration: "Recorded for 12 months",
        tone: "aether",
      },
      {
        level: "Step 2",
        name: "Mute / Timeout",
        description:
          "Chat or voice privileges are paused so that everyone can cool off after a heated argument, spam or repeated language issues.",
        duration: "10 minutes to 24 hours",
        tone: "solar",
      },
      {
        level: "Step 3",
        name: "Temporary Suspension",
        description:
          "You are removed from the server and Discord for a set time. Your builds and progress are kept safe while you are away.",
        duration: "1 to 7 days",
        tone: "ember",
      },
      {
        level: "Step 4",
        name: "Long Suspension",
        description:
          "For serious or repeated breaches. Access is removed for an extended period, and you will be asked to confirm that you have re-read the rules before you return.",
        duration: "14 to 90 days",
        tone: "blush",
      },
      {
        level: "Step 5",
        name: "Permanent Ban",
        description:
          "Reserved for the most serious breaches, repeated offences and ban evasion. Your whitelist entry is removed, and appeals are considered after six months.",
        duration: "Permanent",
        tone: "arcane",
      },
    ],
    footnote:
      "Think a decision was wrong? Open an appeal ticket in our Discord server. Where possible, a different staff member will review the evidence, and you will always receive a clear answer.",
  },
];
