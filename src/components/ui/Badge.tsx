import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { toneStyle } from "@/lib/tones";
import type { IconKey, Tone } from "@/types/content";

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  icon?: IconKey;
  variant?: "soft" | "outline" | "solid";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, tone = "aether", icon, variant = "soft", size = "sm", className }: BadgeProps) {
  return (
    <span
      style={toneStyle(tone)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide whitespace-nowrap",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3.5 py-1 text-sm",
        variant === "soft" && "tone-bg tone-border tone-text",
        variant === "outline" && "tone-border tone-text bg-transparent",
        variant === "solid" && "tone-bg-strong border-transparent text-night",
        className,
      )}
    >
      {icon && <Icon name={icon} className="size-3.5" />}
      {children}
    </span>
  );
}
