import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { toneStyle } from "@/lib/tones";
import type { Tone } from "@/types/content";

interface CardProps {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  /** Lifts and glows on hover. */
  interactive?: boolean;
  as?: "div" | "article" | "section" | "li";
}

/** Standard content surface. */
export function Card({ children, className, tone = "aether", interactive = false, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      style={toneStyle(tone)}
      className={cn(
        "surface relative rounded-3xl",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:tone-border hover:shadow-lift",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
