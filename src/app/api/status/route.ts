import { siteConfig } from "@/config/site";

interface MinecraftStatusResponse {
  online?: boolean;
  players?: { online?: number; max?: number };
  version?: string;
}

export async function GET() {
  if (process.env.SITE_DATA_MODE !== "live") {
    return Response.json({
      online: null,
      players: null,
      version: null,
      demo: true,
    });
  }

  const host = process.env.MC_SERVER_HOST ?? siteConfig.server.ip;
  if (!/^[a-zA-Z0-9.-]+$/.test(host) || host.startsWith(".") || host.endsWith(".")) {
    return Response.json({ error: "MC_SERVER_HOST must be a hostname or IPv4 address." }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(host)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      return Response.json({ error: `The Minecraft status provider returned HTTP ${response.status}.` }, { status: 502 });
    }

    const data = (await response.json()) as MinecraftStatusResponse;
    return Response.json({
      online: data.online === true,
      players:
        typeof data.players?.online === "number" && typeof data.players.max === "number"
          ? { online: data.players.online, max: data.players.max }
          : null,
      version: typeof data.version === "string" ? data.version : null,
      demo: false,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown status provider error.";
    return Response.json({ error: `Unable to reach the Minecraft status provider: ${message}` }, { status: 502 });
  }
}
