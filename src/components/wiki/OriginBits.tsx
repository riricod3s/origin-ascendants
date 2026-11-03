import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { toneStyle } from "@/lib/tones";
import type { IconKey, OriginStats, Tone } from "@/types/content";

export const STAT_META: { key: keyof OriginStats; label: string; icon: IconKey }[] = [
  { key: "mobility", label: "Mobility", icon: "wind" },
  { key: "offense", label: "Offense", icon: "swords" },
  { key: "defense", label: "Defense", icon: "shield" },
  { key: "utility", label: "Utility", icon: "wand-sparkles" },
  { key: "survival", label: "Survival", icon: "heart" },
];

/** Five-pip attribute rows, like a character sheet. */
export function StatPips({ stats, tone, className, showIcons = false }: { stats: OriginStats; tone: Tone; className?: string; showIcons?: boolean }) {
  return (
    <dl className={cn("space-y-2", className)} style={toneStyle(tone)}>
      {STAT_META.map((stat) => (
        <div key={stat.key} className="flex items-center gap-3">
          <dt className="flex w-24 shrink-0 items-center gap-2 text-xs text-mist/75">
            {showIcons && <Icon name={stat.icon} className="size-3.5 tone-text" />}
            {stat.label}
          </dt>
          <dd className="flex flex-1 gap-1" aria-label={`${stats[stat.key]} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors duration-500",
                  i < stats[stat.key] ? "tone-bg-strong shadow-[0_0_8px_rgb(var(--tone)/0.6)]" : "bg-white/10",
                )}
              />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Glowing orb with orbiting rings that represents an Origin. */
export function OriginSigil({ icon, tone, className, size = "lg" }: { icon: IconKey; tone: Tone; className?: string; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <div style={toneStyle(tone)} className={cn("relative grid place-items-center", big ? "size-56 sm:size-64" : "size-20", className)} aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(var(--tone)/0.35),transparent_68%)] blur-xl animate-pulse-glow" />
      <div className="absolute inset-[6%] animate-orbit rounded-full border border-dashed tone-border [animation-duration:36s]" />
      <div className="absolute inset-[18%] animate-orbit-rev rounded-full border tone-border opacity-70 [animation-duration:18s]">
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full tone-bg-strong shadow-[0_0_12px_rgb(var(--tone))]" />
      </div>
      <div className={cn("relative grid place-items-center rounded-full border border-white/20 bg-night/60 tone-glow backdrop-blur", big ? "size-28 sm:size-32" : "size-12")}>
        <div className="absolute inset-0 rounded-full tone-gradient" />
        <Icon name={icon} className={cn("relative tone-text drop-shadow-[0_0_14px_rgb(var(--tone)/0.8)]", big ? "size-12 sm:size-14" : "size-6")} strokeWidth={1.6} />
      </div>
    </div>
  );
}
