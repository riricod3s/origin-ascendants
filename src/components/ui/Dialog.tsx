"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/cn";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  /** Classes for the panel (sizing, padding, surface). */
  className?: string;
  /** Hides the built-in close button (provide your own). */
  hideClose?: boolean;
}

type LayerProps = Omit<DialogProps, "open">;

function DialogLayer({ onClose, label, children, className, hideClose }: LayerProps) {
  const panel = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    panel.current?.focus({ preventScroll: true });

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;

      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <div className="fixed inset-0 z-90 grid place-items-center p-4 sm:p-8">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-void/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => closeRef.current()}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn("glass-strong relative max-h-full w-full overflow-y-auto rounded-3xl shadow-lift outline-none", className)}
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {!hideClose && (
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => closeRef.current()}
            className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full border border-white/15 bg-night/60 text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            <X className="size-5" />
          </button>
        )}
        {children}
      </motion.div>
    </div>
  );
}

/** Accessible modal: portal, focus trap, Escape to close, scroll lock and animated enter/exit. */
export function Dialog({ open, ...rest }: DialogProps) {
  const mounted = useMounted();
  if (!mounted) return null;

  return createPortal(<AnimatePresence>{open && <DialogLayer key="dialog" {...rest} />}</AnimatePresence>, document.body);
}
