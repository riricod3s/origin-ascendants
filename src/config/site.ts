import type { IconKey } from "@/types/content";

/**
 * Central place for everything an owner is likely to customise.
 * Public values can be overridden with NEXT_PUBLIC_* environment variables (see .env.example).
 * Every value below that is marked PLACEHOLDER must be replaced before launch.
 */

const discordInvite =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? "https://discord.gg/originascendants"; // PLACEHOLDER

export const siteConfig = {
  name: "Origin Ascendants",
  shortName: "Ascendants",
  tagline: "A community shaped by its members.",
  description:
    "Meet the Origin Ascendants community, join member discussions, share what you know on the community wiki and discover the people behind the projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",

  discord: {
    invite: discordInvite,
    /** Optional. Enables the official embedded Discord widget when set. */
    guildId: process.env.NEXT_PUBLIC_DISCORD_GUILD_ID ?? "",
  },

  server: {
    ip: process.env.NEXT_PUBLIC_SERVER_IP ?? "play.originascendants.net", // PLACEHOLDER
    edition: "Java Edition",
    version: process.env.NEXT_PUBLIC_MC_VERSION ?? "1.21.1", // PLACEHOLDER
    region: process.env.NEXT_PUBLIC_SERVER_REGION ?? "North America (US East)", // PLACEHOLDER
    whitelist: {
      enabled: true,
      label: "Whitelisted",
      detail: "Open an application in Discord and a staff member will whitelist you, usually within a day.",
    },
    modpack: {
      name: "Ascendants Client Pack", // PLACEHOLDER
      loader: "Fabric",
      summary:
        "Origin Ascendants runs on Fabric with the Origins mod stack. You only need a handful of mods to join, plus optional performance and quality-of-life extras.",
      required: [
        { name: "Fabric Loader", note: "Mod loader for Minecraft Java Edition" },
        { name: "Fabric API", note: "Core library required by the Origins mod" },
        { name: "Origins", note: "Adds Origins, passive and active abilities" },
      ],
      recommended: [
        { name: "Sodium", note: "Large rendering performance boost" },
        { name: "Iris Shaders", note: "Optional shader support for screenshots" },
        { name: "Mod Menu", note: "Browse and configure installed mods" },
        { name: "Xaero's World Map", note: "Personal map with waypoints" },
      ],
      downloadUrl: process.env.NEXT_PUBLIC_MODPACK_URL ?? "",
    },
  },

  support: {
    /** Where the "Become a supporter" buttons go. Defaults to the Discord invite. */
    url: process.env.NEXT_PUBLIC_SUPPORT_URL ?? discordInvite,
  },

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@originascendants.net", // PLACEHOLDER
    privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL ?? "privacy@originascendants.net", // PLACEHOLDER
  },

  /** Show real Minecraft skins (mc-heads.net) instead of generated pixel faces. */
  liveAvatars: process.env.NEXT_PUBLIC_LIVE_AVATARS === "true",
} as const;

export interface NavItem {
  label: string;
  href: string;
  icon: IconKey;
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Forums", href: "/forum", icon: "message-circle" },
  { label: "Community Wiki", href: "/wiki", icon: "book-open" },
  { label: "Members", href: "/members", icon: "users" },
  { label: "Announcements", href: "/announcements", icon: "megaphone" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy", icon: "lock" },
  { label: "Terms of Service", href: "/terms-of-service", icon: "scroll-text" },
];

export interface FooterGroup {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

export const footerGroups: FooterGroup[] = [
  {
    title: "Community",
    links: [
      { label: "Home", href: "/" },
      { label: "Forums", href: "/forum" },
      { label: "Wiki", href: "/wiki" },
      { label: "Members", href: "/members" },
      { label: "Announcements", href: "/announcements" },
    ],
  },
  {
    title: "Your account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/register" },
      { label: "Your profile", href: "/account" },
      { label: "Discord community", href: siteConfig.discord.invite, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export function isActivePath(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
