export function safeInternalPath(path: string | null, origin: string, fallback = "/account") {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return fallback;
  try {
    const url = new URL(path, origin);
    if (url.origin !== origin) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
