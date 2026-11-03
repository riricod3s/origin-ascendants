"use client";

import { motion } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { toneStyle } from "@/lib/tones";
import type { IconKey, Tone } from "@/types/content";

export interface TabEntry {
  id: string;
  label: string;
  icon?: IconKey;
  content: ReactNode;
}

interface TabsProps {
  items: TabEntry[];
  defaultId?: string;
  tone?: Tone;
  /** Accessible name for the tab list. */
  label: string;
  className?: string;
}

/** Keyboard-accessible tabs (arrows, Home, End) with a sliding underline. */
export function Tabs({ items, defaultId, tone = "aether", label, className }: TabsProps) {
  const base = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(target: number) {
    const index = (target + items.length) % items.length;
    setActive(items[index].id);
    buttons.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    focusTab(moves[event.key]);
  }

  return (
    <div className={className} style={toneStyle(tone)}>
      <div role="tablist" aria-label={label} className="scrollbar-none flex gap-1 overflow-x-auto border-b border-white/10">
        {items.map((item, index) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              id={`${base}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${base}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors duration-300",
                selected ? "text-white" : "text-mist hover:text-white",
              )}
            >
              {item.icon && <Icon name={item.icon} className={cn("size-4", selected && "tone-text")} />}
              {item.label}
              {selected && (
                <motion.span
                  layoutId={`${base}-underline`}
                  aria-hidden="true"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[rgb(var(--tone))] shadow-[0_0_12px_rgb(var(--tone)/0.8)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`${base}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${item.id}`}
          hidden={item.id !== active}
          tabIndex={0}
          className="panel-in pt-6 outline-offset-4"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
