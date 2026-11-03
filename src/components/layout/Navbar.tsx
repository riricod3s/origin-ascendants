"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { LogoMark } from "@/components/art/LogoMark";
import { DiscordIcon } from "@/components/icons/BrandIcons";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { AccountNavActions } from "@/components/community/AccountNavActions";
import { Button } from "@/components/ui/Button";
import { isActivePath, primaryNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Fixed top bar: transparent over the hero, frosted and solid once the page scrolls.
 * The full link row shows from `xl`; below that the MobileNav hamburger takes over.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Restored scroll positions (reloads, back navigation) happen before the first scroll event.
  useEffect(() => {
    const id = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-white/10 bg-night/80 shadow-[0_12px_40px_-24px_rgba(2,6,23,0.9)] backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-night/70 via-night/20 to-transparent",
      )}
    >
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
        <TransitionLink href="/" aria-label="Origin Ascendants home" className="group flex items-center gap-3">
          <LogoMark className="size-10 transition-transform duration-500 ease-out-expo group-hover:scale-105" />
          <span className="font-display text-[0.8rem] font-semibold leading-tight tracking-[0.22em] text-white min-[420px]:text-[0.95rem]">
            ORIGIN <span className="text-gradient-sky">ASCENDANTS</span>
          </span>
        </TransitionLink>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {primaryNav.map((item) => {
            const active = isActivePath(item.href, pathname);
            return (
              <TransitionLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group/nav relative rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors duration-300",
                  active ? "text-white" : "text-mist hover:text-white",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/15"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                  />
                )}
                <span className="relative">{item.label}</span>
                {active ? (
                  <motion.span
                    layoutId="nav-glow"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-aether via-arcane to-solar shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                  />
                ) : (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-white/40 transition-transform duration-300 group-hover/nav:scale-x-100" />
                )}
              </TransitionLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <AccountNavActions />
          <Button href={siteConfig.discord.invite} external size="sm" variant="secondary" icon={<DiscordIcon />}>
            Discord
          </Button>
        </div>

        {/* Reserves space for the fixed hamburger rendered by MobileNav. */}
        <div aria-hidden="true" className="size-11 xl:hidden" />
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-aether via-arcane to-solar"
        style={{ scaleX: scrollYProgress, opacity: scrolled ? 1 : 0 }}
      />
    </header>
  );
}
