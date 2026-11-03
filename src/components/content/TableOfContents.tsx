"use client";

import { List } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
  title?: string;
}

function scrollToHeading(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

/** Scroll-spy outline. Sticky list on large screens, a disclosure on small ones. */
export function TableOfContents({ items, className, title = "On this page" }: TableOfContentsProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = items.find((item) => visible.has(item.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-14% 0px -72% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const list = (
    <ol className="space-y-0.5 border-l border-white/10">
      {items.map((item) => {
        const current = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={current ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollToHeading(item.id);
              }}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pr-2 text-sm leading-snug transition-[color,border-color,background-color] duration-300",
                item.level === 3 ? "pl-7" : "pl-4",
                current ? "border-aether bg-aether/8 font-medium text-white" : "border-transparent text-mist hover:border-white/30 hover:text-white",
              )}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <nav aria-label={title} className={className}>
      <details className="surface group rounded-2xl lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
          <List className="size-4 text-aether" />
          {title}
        </summary>
        <div className="px-4 pb-4">{list}</div>
      </details>
      <div className="hidden lg:block">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-aether uppercase">
          <List className="size-4" />
          {title}
        </p>
        {list}
      </div>
    </nav>
  );
}
