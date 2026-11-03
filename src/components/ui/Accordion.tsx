"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { toneStyle } from "@/lib/tones";
import type { IconKey, Tone } from "@/types/content";

export interface AccordionEntry {
  id: string;
  title: ReactNode;
  /** Muted line shown under the title. */
  subtitle?: ReactNode;
  icon?: IconKey;
  tone?: Tone;
  /** Right-aligned decoration, e.g. a badge. */
  meta?: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionEntry[];
  /** Lets several panels stay open together. */
  multiple?: boolean;
  defaultOpen?: string[];
  size?: "md" | "lg";
  className?: string;
}

/** Animated disclosure list. Closed panels stay in the DOM but are inert. */
export function Accordion({ items, multiple = false, defaultOpen, size = "md", className }: AccordionProps) {
  const base = useId();
  const [open, setOpen] = useState<string[]>(defaultOpen ?? []);

  function toggle(id: string) {
    setOpen((current) => {
      if (current.includes(id)) return current.filter((entry) => entry !== id);
      return multiple ? [...current, id] : [id];
    });
  }

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const triggerId = `${base}-t-${item.id}`;
        const panelId = `${base}-p-${item.id}`;
        const pad = size === "lg" ? "px-6" : "px-5";

        return (
          <div
            key={item.id}
            style={toneStyle(item.tone ?? "aether")}
            className={cn(
              "surface overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-500",
              isOpen && "tone-border shadow-card",
            )}
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex w-full items-center gap-4 py-4 text-left transition-colors duration-300 hover:bg-white/[0.04]",
                  pad,
                  size === "lg" && "py-5",
                )}
              >
                {item.icon && (
                  <span className="tone-bg tone-text grid size-10 shrink-0 place-items-center rounded-xl">
                    <Icon name={item.icon} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">{item.title}</span>
                  {item.subtitle && <span className="mt-0.5 block text-sm text-mist/80">{item.subtitle}</span>}
                </span>
                {item.meta}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 text-mist transition-[transform,color] duration-500 ease-out-expo",
                    isOpen && "tone-text rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className={cn("pb-5", pad)}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
