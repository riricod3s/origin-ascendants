"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { LogoEmblem } from "@/components/art/LogoEmblem";
import { Particles } from "@/components/art/Particles";
import { Starfield } from "@/components/art/Starfield";
import { markSiteReady } from "@/lib/site-ready";

const STAGES = [
  { at: 0, text: "Gathering the Origins" },
  { at: 0.28, text: "Charting the floating isles" },
  { at: 0.55, text: "Waking the Banner Stones" },
  { at: 0.82, text: "Opening the gates of Aurelune" },
] as const;

const SESSION_KEY = "oa-loaded";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Server-rendered overlay, so it is visible on first paint (no JS needed to show it).
 * Progress is simulated against real readiness signals: window load + fonts, with a minimum showing time.
 * A CSS failsafe (see globals.css) hides it after 10s if scripts never run.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState(0);
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (v) => Math.round(v * 100));
  const head = useTransform(progress, (v) => `${v * 100}%`);

  useMotionValueEvent(progress, "change", (v) => {
    let next = 0;
    STAGES.forEach((s, i) => {
      if (v >= s.at) next = i;
    });
    setStage(next);
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage can be unavailable (privacy modes); the full intro is fine then.
    }
    const minMs = reduced ? 500 : seen ? 900 : 2300;
    const started = performance.now();

    let loaded = false;
    let finishStart = 0;
    let raf = 0;
    let cancelled = false;

    const markLoaded = () => {
      loaded = true;
    };
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const onWindowLoad = () => {
      fontsReady.then(markLoaded, markLoaded);
    };
    if (document.readyState === "complete") onWindowLoad();
    else window.addEventListener("load", onWindowLoad, { once: true });
    const maxWait = window.setTimeout(markLoaded, 6500);

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - started;
      const simulated = 1 - Math.pow(1 - Math.min(elapsed / minMs, 1), 3);
      let value = simulated * 0.88;

      if (loaded && elapsed >= minMs) {
        if (!finishStart) finishStart = now;
        const t = Math.min((now - finishStart) / 380, 1);
        value = 0.88 + 0.12 * (1 - Math.pow(1 - t, 3));
        if (t >= 1 && now - finishStart > 380 + 260) {
          progress.set(1);
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            // ignore
          }
          markSiteReady();
          setVisible(false);
          return;
        }
      }
      progress.set(value);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(maxWait);
      window.removeEventListener("load", onWindowLoad);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="oa-loader fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-void"
          role="status"
          aria-live="polite"
          aria-label="Loading Origin Ascendants"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#1d2f5e_0%,#0f172a_50%,#070b18_100%)]" />
          <Starfield count={80} seed={3} className="opacity-80" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ember/[0.07] via-aether/[0.05] to-transparent" />
          <Particles count={48} seed={21} />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6 text-center"
            exit={{ opacity: 0, scale: 1.14, y: -12 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="animate-float">
              <LogoEmblem intro className="size-28 sm:size-32" />
            </div>

            <p className="mt-12 font-display text-2xl tracking-[0.28em] text-white sm:text-4xl">ORIGIN ASCENDANTS</p>
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.5em] text-solar/80">A living world awaits</p>

            <div className="mt-9 w-64 sm:w-80">
              <div className="relative h-1.5 w-full rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-aether via-solar to-ember shadow-[0_0_18px_rgba(251,146,60,0.55)]"
                  style={{ scaleX: progress }}
                />
                <motion.span
                  className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_4px_rgba(253,230,138,0.85)]"
                  style={{ left: head }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[0.7rem] text-mist/70">
                <span className="truncate">{STAGES[stage].text}…</span>
                <span className="tabular-nums">
                  <motion.span>{percent}</motion.span>%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
