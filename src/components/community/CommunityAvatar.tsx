import { cn } from "@/lib/cn";
import { getSupabaseConfig } from "@/lib/supabase/config";

export function CommunityAvatar({
  name,
  url,
  size = "md",
}: {
  name: string;
  url?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const dimension = size === "lg" ? "size-24 text-2xl" : size === "sm" ? "size-9 text-xs" : "size-14 text-lg";
  const supabaseUrl = getSupabaseConfig()?.url;
  let safeUrl: string | null = null;
  if (url && supabaseUrl) {
    try {
      const avatar = new URL(url);
      const storage = new URL(supabaseUrl);
      if (
        avatar.protocol === "https:"
        && !avatar.username
        && !avatar.password
        && avatar.origin === storage.origin
        && avatar.pathname.startsWith("/storage/v1/object/public/community-images/")
      ) {
        safeUrl = avatar.href;
      }
    } catch {
      safeUrl = null;
    }
  }
  return (
    <span
      role="img"
      aria-label={`${name}'s avatar`}
      className={cn("grid shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-aether/30 to-arcane/25 font-display font-bold text-white", dimension)}
      style={safeUrl ? { backgroundImage: `url("${safeUrl}")`, backgroundPosition: "center", backgroundSize: "cover" } : undefined}
    >
      {!safeUrl && (name.trim().charAt(0).toUpperCase() || "?")}
    </span>
  );
}
