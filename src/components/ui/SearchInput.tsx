"use client";

import { Search, X } from "lucide-react";
import { useEffect, useId, useRef, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** Accessible name. */
  label: string;
  size?: "md" | "lg";
  /** Press "/" anywhere to focus the field. */
  shortcut?: boolean;
  autoFocus?: boolean;
  /** Extra controls rendered inside the field on the right. */
  trailing?: ReactNode;
  /** `id` of a listbox this field controls (for combobox semantics). */
  controls?: string;
  expanded?: boolean;
  onKeyDown?: (event: ReactKeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  label,
  size = "md",
  shortcut = false,
  autoFocus,
  trailing,
  controls,
  expanded,
  onKeyDown,
  className,
}: SearchInputProps) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!shortcut) return;

    function onKey(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = document.activeElement;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      event.preventDefault();
      input.current?.focus();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  const large = size === "lg";

  return (
    <div
      className={cn(
        "glass group/search flex items-center gap-3 rounded-2xl border border-white/12 transition-[border-color,box-shadow] duration-300 focus-within:border-aether/70 focus-within:shadow-glow-aether",
        large ? "px-5 py-4" : "px-4 py-2.5",
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search aria-hidden="true" className={cn("shrink-0 text-aether", large ? "size-6" : "size-5")} />
      <input
        ref={input}
        id={id}
        type="search"
        role={controls ? "combobox" : undefined}
        aria-controls={controls}
        aria-expanded={controls ? expanded : undefined}
        aria-autocomplete={controls ? "list" : undefined}
        autoComplete="off"
        spellCheck={false}
        autoFocus={autoFocus}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-white placeholder:text-mist/60 focus:outline-none [&::-webkit-search-cancel-button]:hidden",
          large ? "text-lg" : "text-base",
        )}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            onChange("");
            input.current?.focus();
          }}
          className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-mist transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="size-4" />
        </button>
      ) : (
        shortcut && (
          <kbd aria-hidden="true" className="hidden shrink-0 rounded-md border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-xs text-mist/80 sm:block">
            /
          </kbd>
        )
      )}
      {trailing}
    </div>
  );
}
