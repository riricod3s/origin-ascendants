"use client";

import { Check, Copy, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type CopyState = "idle" | "copied" | "failed";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permission denied or insecure context: try the legacy path below.
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

interface CopyButtonProps {
  value: string;
  /** Idle label. Omit for an icon-only button. */
  children?: ReactNode;
  /** Accessible name when icon-only. */
  label?: string;
  className?: string;
}

/** Copies `value` to the clipboard and confirms with an animated state change. */
export function CopyButton({ value, children, label = "Copy to clipboard", className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function onClick() {
    const ok = await copyText(value);
    setState(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  const copied = state === "copied";
  const failed = state === "failed";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={children ? undefined : label}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-300 active:scale-95",
        copied
          ? "border-verdant/50 bg-verdant/15 text-verdant"
          : failed
            ? "border-ember/50 bg-ember/15 text-ember"
            : "border-white/15 bg-white/8 text-white hover:border-aether/50 hover:bg-aether/15",
        className,
      )}
    >
      <span className="relative grid size-4 place-items-center" aria-hidden="true">
        <Copy className={cn("absolute size-4 transition-all duration-300", state === "idle" ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
        <Check className={cn("absolute size-4 transition-all duration-300", copied ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
        <TriangleAlert className={cn("absolute size-4 transition-all duration-300", failed ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
      </span>
      {children && <span>{copied ? "Copied!" : failed ? "Press Ctrl+C" : children}</span>}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : failed ? "Copy failed" : ""}
      </span>
    </button>
  );
}
