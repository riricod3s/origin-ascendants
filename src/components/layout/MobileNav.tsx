"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/art/LogoMark";
import { DiscordIcon } from "@/components/icons/BrandIcons";
import { AccountNavActions } from "@/components/community/AccountNavActions";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { isActivePath, legalNav, primaryNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.18 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/**
 * Hamburger + glass sidebar. Both are siblings of the header (not children) because a `backdrop-filter`
 * ancestor would turn `position: fixed` into "fixed relative to the header".
 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  // Close whenever the route changes (derived state; avoids an effect).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const previous = { html: html.style.overflow, body: document.body.style.overflow };
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const button = buttonRef.current;
    const focusFirst = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current || !button) return;
      const items = [button, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const desktop = window.matchMedia("(min-width: 80rem)");
    const onResize = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onResize);

    return () => {
      cancelAnimationFrame(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
      html.style.overflow = previous.html;
      document.body.style.overflow = previous.body;
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="glass fixed top-3.5 right-5 z-[80] grid size-11 place-items-center rounded-full transition-colors duration-300 hover:bg-white/15 sm:right-8 lg:right-10 xl:hidden"
      >
        <span className="relative block h-[14px] w-5" aria-hidden="true">
          <motion.span
            className="absolute inset-x-0 top-0 h-0.5 rounded-full bg-white"
            animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          />
          <motion.span
            className="absolute inset-x-0 top-[6px] h-0.5 rounded-full bg-white"
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-white"
            animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              aria-hidden="true"
              className="fixed inset-0 z-[60] bg-night/55 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={close}
            />
            <motion.aside
              key="panel"
              ref={panelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="glass-strong fixed inset-y-0 right-0 z-[70] flex w-[min(26rem,90vw)] flex-col overflow-y-auto shadow-[-30px_0_80px_-30px_rgba(2,6,23,0.9)] xl:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            >
              <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-aether/15 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-24 size-72 rounded-full bg-arcane/15 blur-3xl" />

              <div className="relative flex h-[var(--nav-h)] shrink-0 items-center gap-3 px-6">
                <LogoMark animated className="size-9" />
                <span className="font-display text-sm font-semibold tracking-[0.22em]">
                  ORIGIN <span className="text-gradient-sky">ASCENDANTS</span>
                </span>
              </div>

              <nav aria-label="Mobile" className="relative flex-1 px-4 pb-4">
                <motion.ul variants={listVariants} initial="hidden" animate="show" className="space-y-1">
                  {primaryNav.map((item) => {
                    const active = isActivePath(item.href, pathname);
                    return (
                      <motion.li key={item.href} variants={itemVariants}>
                        <TransitionLink
                          href={item.href}
                          onClick={close}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors duration-300",
                            active ? "bg-white/10 ring-1 ring-white/15" : "hover:bg-white/[0.06]",
                          )}
                        >
                          <span
                            className={cn(
                              "grid size-10 place-items-center rounded-xl transition-colors duration-300",
                              active ? "bg-aether/20 text-aether" : "bg-white/5 text-mist group-hover:bg-aether/15 group-hover:text-aether",
                            )}
                          >
                            <Icon name={item.icon} />
                          </span>
                          <span className={cn("font-display text-lg tracking-wide", active ? "text-white" : "text-mist group-hover:text-white")}>
                            {item.label}
                          </span>
                          {active && <span className="ml-auto size-2 rounded-full bg-aether shadow-[0_0_12px_#38bdf8]" />}
                        </TransitionLink>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="mt-4 space-y-1 border-t border-white/10 pt-4"
                >
                  {legalNav.map((item) => (
                    <motion.li key={item.href} variants={itemVariants}>
                      <TransitionLink
                        href={item.href}
                        onClick={close}
                        aria-current={isActivePath(item.href, pathname) ? "page" : undefined}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-mist/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        <Icon name={item.icon} className="size-4" />
                        {item.label}
                      </TransitionLink>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <div className="sticky bottom-0 space-y-2.5 border-t border-white/10 bg-night/70 p-4 backdrop-blur-md">
                <Button href={siteConfig.discord.invite} external onClick={close} fullWidth size="lg" variant="secondary" icon={<DiscordIcon />}>
                  Join Discord
                </Button>
                <AccountNavActions mobile onNavigate={close} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
