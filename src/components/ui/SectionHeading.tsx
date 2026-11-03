import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { toneStyle } from "@/lib/tones";
import type { IconKey, Tone } from "@/types/content";

interface SectionHeadingProps {
  eyebrow?: string;
  icon?: IconKey;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: Tone;
  as?: "h1" | "h2" | "h3";
  /** Right-aligned slot (e.g. a "View all" link). */
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  icon,
  title,
  description,
  align = "left",
  tone = "aether",
  as: Heading = "h2",
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={cn("flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between", centered && "sm:flex-col sm:items-center", className)}>
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")} style={toneStyle(tone)}>
        {eyebrow && (
          <p
            className={cn(
              "mb-3 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.24em] uppercase tone-text",
              centered && "justify-center",
            )}
          >
            {icon && <Icon name={icon} className="size-4" />}
            {eyebrow}
          </p>
        )}
        <Heading className="font-display text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-[2.7rem]">
          {title}
        </Heading>
        {description && <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
