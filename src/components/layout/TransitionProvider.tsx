"use client";

import { createContext, Suspense, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LogoEmblem } from "@/components/art/LogoEmblem";
import { legalNav, primaryNav } from "@/config/site";

interface Pending {
  from: string;
  to: string;
  label: string;
}

interface TransitionContextValue {
  /** Starts the curtain transition. Returns `true` when it took over the navigation, `false` to let the caller navigate normally. */
  navigate: (href: string) => boolean;
}

const TransitionContext = createContext<TransitionContextValue>({ navigate: () => false });

const PANELS = 6;
const COVER_MS = 560;
const FAILSAFE_MS = 6000;
const EASE_PANEL: [number, number, number, number] = [0.76, 0, 0.24, 1];

const extraLabels: Record<string, string> = {
  "/server": "Server Info",
};

function topSegment(pathname: string) {
  return pathname.split("/")[1] ?? "";
}

function labelFor(pathname: string) {
  const top = `/${topSegment(pathname)}`;
  if (top === "/") return "Home";
  const match = [...primaryNav, ...legalNav].find((item) => item.href === top);
  return match?.label ?? extraLabels[top] ?? "Aurelune";
}

/**
 * Pillar-curtain transition between top-level sections. Same-section navigation (e.g. wiki article to
 * wiki article) skips the curtain and relies on the lighter PageTransition fade/slide instead.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [pending, setPending] = useState<Pending | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (reduceMotion) return false;
      if (pending) return true;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return false;
      }
      if (url.origin !== window.location.origin) return false;
      const currentPath = window.location.pathname;
      if (topSegment(url.pathname) === topSegment(currentPath)) return false;

      const to = `${url.pathname}${url.search}${url.hash}`;
      clearTimers();
      setPending({ from: currentPath, to, label: labelFor(url.pathname) });
      timers.current.push(window.setTimeout(() => router.push(to), COVER_MS));
      timers.current.push(window.setTimeout(() => setPending(null), FAILSAFE_MS));
      return true;
    },
    [clearTimers, pending, reduceMotion, router],
  );

  const value = useMemo(() => ({ navigate }), [navigate]);
  const finishTransition = useCallback(() => {
    clearTimers();
    setPending(null);
  }, [clearTimers]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        <TransitionCurtain pending={pending} onExitComplete={finishTransition} />
      </Suspense>
    </TransitionContext.Provider>
  );
}

function TransitionCurtain({
  pending,
  onExitComplete,
}: {
  pending: Pending | null;
  onExitComplete: () => void;
}) {
  const pathname = usePathname();
  const showCurtain = pending !== null && pathname === pending.from;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {showCurtain && pending && (
        <motion.div key="curtain" className="fixed inset-0 z-[100] flex" role="status" aria-label={`Travelling to ${pending.label}`}>
          {Array.from({ length: PANELS }, (_, i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1 overflow-hidden bg-night"
              initial={{ y: "-101%" }}
              animate={{ y: "0%", transition: { duration: 0.38, delay: i * 0.035, ease: EASE_PANEL } }}
              exit={{ y: "101%", transition: { duration: 0.46, delay: i * 0.035, ease: EASE_PANEL } }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-dusk via-night to-void" />
              <div className="absolute inset-y-0 left-0 w-px bg-white/[0.06]" />
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-aether/10 to-transparent" />
            </motion.div>
          ))}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.4, ease: "easeOut" } }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.22 } }}
          >
            <LogoEmblem className="size-16 sm:size-20" />
            <p className="font-display text-xs uppercase tracking-[0.45em] text-mist/80 sm:text-sm">{pending.label}</p>
            <div className="h-px w-28 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-aether to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useTransitionNavigate() {
  return useContext(TransitionContext);
}
