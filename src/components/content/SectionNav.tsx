"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { IconKey } from "@/types/content";

export interface SectionNavItem {
  id: string;
  label: string;
  icon?: IconKey;
}

/** Sticky, horizontally scrollable in-page navigation that highlights the section in view. */
export function SectionNav({ items, label = "On this page", className }: { items: SectionNavItem[]; label?: string; className?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const list = listRef.current;
    if (!link || !list) return;
    const target = link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2;
    list.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={label} className={cn("sticky top-[var(--nav-h)] z-30 border-y border-white/5 bg-night/80 backdrop-blur-xl", className)}>
      <ul ref={listRef} className="container-x scrollbar-none mask-fade-x flex gap-1 overflow-x-auto py-2">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                data-id={item.id}
                aria-current={on ? "location" : undefined}
                onClick={() => setActive(item.id)}
                className={cn(
                  "relative isolate inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  on ? "text-white" : "text-mist/70 hover:text-white",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="section-nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-white/10 tone-bg"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                {item.icon && <Icon name={item.icon} className={cn("size-4", on && "tone-text")} />}
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
