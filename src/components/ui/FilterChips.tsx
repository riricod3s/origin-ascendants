"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { IconKey } from "@/types/content";

export interface ChipOption<T extends string = string> {
  value: T;
  label: string;
  count?: number;
  icon?: IconKey;
}

interface FilterChipsProps<T extends string> {
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group. */
  label: string;
  className?: string;
}

/** Horizontally scrollable filter pills with a sliding highlight. */
export function FilterChips<T extends string>({ options, value, onChange, label, className }: FilterChipsProps<T>) {
  const base = useId();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300",
              active ? "border-transparent text-night" : "border-white/12 bg-white/5 text-mist hover:border-white/25 hover:text-white",
            )}
          >
            {active && (
              <motion.span
                layoutId={`${base}-pill`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-aether to-[#7dd3fc] shadow-glow-aether"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-2">
              {option.icon && <Icon name={option.icon} className="size-4" />}
              {option.label}
              {typeof option.count === "number" && (
                <span className={cn("rounded-full px-1.5 text-xs tabular-nums", active ? "bg-night/15" : "bg-white/10")}>{option.count}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
