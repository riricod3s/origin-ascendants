import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/cn";
import type { IconKey } from "@/types/content";

interface IconProps {
  name: IconKey;
  className?: string;
  strokeWidth?: number;
}

/** Renders a Lucide icon from a content-friendly string key. */
export function Icon({ name, className, strokeWidth }: IconProps) {
  const Cmp = ICONS[name];
  return <Cmp aria-hidden="true" strokeWidth={strokeWidth} className={cn("size-5 shrink-0", className)} />;
}
