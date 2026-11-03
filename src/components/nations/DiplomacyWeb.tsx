"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EmblemMark } from "@/components/art/FlagArt";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { cn } from "@/lib/cn";
import type { FlagSpec } from "@/types/content";

export interface WebNation {
  slug: string;
  name: string;
  short: string;
  primary: string;
  flag: FlagSpec;
  allies: string[];
  rivals: string[];
}

interface Link {
  a: string;
  b: string;
  kind: "ally" | "rival";
}

const SIZE = 520;
const RADIUS = 190;
const C = SIZE / 2;

function round(n: number) {
  return Math.round(n * 10) / 10;
}

/** Interactive ring of nations showing alliances (green) and rivalries (amber). */
export function DiplomacyWeb({ nations }: { nations: WebNation[] }) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const points = new Map(
    nations.map((nation, i) => {
      const angle = (i / nations.length) * Math.PI * 2 - Math.PI / 2;
      return [nation.slug, { x: round(C + Math.cos(angle) * RADIUS), y: round(C + Math.sin(angle) * RADIUS) }];
    }),
  );

  const links: Link[] = [];
  const seen = new Set<string>();
  for (const nation of nations) {
    for (const [kind, list] of [["ally", nation.allies], ["rival", nation.rivals]] as const) {
      for (const other of list) {
        const key = [nation.slug, other].sort().join("|");
        if (seen.has(key) || !points.has(other)) continue;
        seen.add(key);
        links.push({ a: nation.slug, b: other, kind });
      }
    }
  }

  const activeNation = nations.find((n) => n.slug === active);
  const touches = (link: Link) => !active || link.a === active || link.b === active;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full" aria-hidden="true">
          <circle cx={C} cy={C} r={RADIUS} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeDasharray="2 8" />
          <circle cx={C} cy={C} r={RADIUS * 0.45} fill="none" stroke="rgb(56 189 248 / 0.08)" />
          {links.map((link, i) => {
            const p = points.get(link.a)!;
            const q = points.get(link.b)!;
            const on = touches(link);
            const color = link.kind === "ally" ? "#4ADE80" : "#FB923C";
            return (
              <motion.path
                key={`${link.a}-${link.b}`}
                d={`M${p.x} ${p.y}Q${C} ${C} ${q.x} ${q.y}`}
                fill="none"
                stroke={color}
                strokeWidth={on && active ? 2.6 : 1.6}
                strokeDasharray={link.kind === "rival" ? "7 7" : undefined}
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: on ? 0.9 : 0.08 }}
                animate={{ opacity: on ? 0.9 : 0.08 }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ filter: on && active ? `drop-shadow(0 0 6px ${color})` : undefined }}
              />
            );
          })}
        </svg>
        <div className="absolute top-1/2 left-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-night/60 text-center backdrop-blur">
          <p className="px-3 text-[0.65rem] leading-tight tracking-[0.18em] text-mist/70 uppercase">{activeNation ? activeNation.short : "Aurelune"}</p>
        </div>
        {nations.map((nation) => {
          const p = points.get(nation.slug)!;
          const dim = active && active !== nation.slug && !links.some((l) => (l.a === active && l.b === nation.slug) || (l.b === active && l.a === nation.slug));
          return (
            <TransitionLink
              key={nation.slug}
              href={`/nations/${nation.slug}`}
              onMouseEnter={() => setActive(nation.slug)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(nation.slug)}
              onBlur={() => setActive(null)}
              aria-label={`${nation.name}: ${nation.allies.length} allies, ${nation.rivals.length} rivals`}
              className={cn(
                "group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 transition-opacity duration-300",
                dim ? "opacity-35" : "opacity-100",
              )}
              style={{ left: `${(p.x / SIZE) * 100}%`, top: `${(p.y / SIZE) * 100}%` }}
            >
              <span
                className="grid size-14 place-items-center rounded-2xl border-2 bg-night/80 shadow-lift backdrop-blur transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 sm:size-16"
                style={{ borderColor: nation.primary, boxShadow: active === nation.slug ? `0 0 28px -4px ${nation.primary}` : undefined }}
              >
                <EmblemMark spec={nation.flag} className="size-8 sm:size-9" />
              </span>
              <span className="rounded-full bg-night/70 px-2 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap text-white backdrop-blur">{nation.short}</span>
            </TransitionLink>
          );
        })}
      </div>
      <div className="surface rounded-2xl p-5">
        <p className="text-xs font-semibold tracking-[0.2em] text-aether uppercase">How to read the web</p>
        <ul className="mt-4 space-y-3 text-sm text-mist">
          <li className="flex items-center gap-3"><span className="h-0.5 w-8 rounded bg-verdant" />Alliance or trade pact</li>
          <li className="flex items-center gap-3"><span className="h-0.5 w-8 rounded bg-[repeating-linear-gradient(90deg,#FB923C_0_6px,transparent_6px_11px)]" />Rivalry</li>
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-mist/75">
          {activeNation
            ? `${activeNation.name} keeps ${activeNation.allies.length} alliances and ${activeNation.rivals.length} rivalries. Select it to read the full story.`
            : "Hover or focus a banner to trace its friendships and rivalries. Rivalries in Aurelune are mostly friendly—fought in tournaments, trade fairs and building contests."}
        </p>
      </div>
    </div>
  );
}
