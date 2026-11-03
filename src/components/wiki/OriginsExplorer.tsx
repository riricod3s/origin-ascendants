"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useDeferredValue, useMemo, useState } from "react";
import { FilterChips, type ChipOption } from "@/components/ui/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";
import { OriginCard } from "@/components/wiki/OriginCard";
import type { Origin, OriginRarity } from "@/types/content";

type RarityFilter = "all" | OriginRarity;

const RARITIES: OriginRarity[] = ["Common", "Uncommon", "Rare", "Legendary"];

/** Searchable, filterable grid of Origin cards. */
export function OriginsExplorer({ origins }: { origins: Origin[] }) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState<RarityFilter>("all");
  const deferred = useDeferredValue(query);
  const reduce = useReducedMotion();

  const options: ChipOption<RarityFilter>[] = [
    { value: "all", label: "All Origins", count: origins.length, icon: "sparkles" },
    ...RARITIES.filter((r) => origins.some((o) => o.rarity === r)).map((r) => ({ value: r, label: r, count: origins.filter((o) => o.rarity === r).length })),
  ];

  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    return origins.filter((origin) => {
      if (rarity !== "all" && origin.rarity !== rarity) return false;
      if (!q) return true;
      return [origin.name, origin.epithet, origin.tagline, ...origin.playstyle, ...origin.passives.map((a) => a.name), ...origin.actives.map((a) => a.name)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [origins, rarity, deferred]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips options={options} value={rarity} onChange={setRarity} label="Filter Origins by rarity" />
        <SearchInput value={query} onChange={setQuery} placeholder="Search Origins, abilities, playstyles..." label="Search Origins" className="lg:w-80" />
      </div>
      <p className="mt-5 text-sm text-mist/70" aria-live="polite">
        Showing {results.length} of {origins.length} Origins
      </p>
      <motion.div layout={!reduce} className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {results.map((origin, index) => (
            <motion.div
              key={origin.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : Math.min(index, 8) * 0.04 }}
            >
              <OriginCard origin={origin} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {results.length === 0 && (
        <div className="surface mt-6 rounded-2xl p-10 text-center">
          <p className="font-display text-xl font-bold text-white">No Origins match that search.</p>
          <p className="mt-2 text-sm text-mist/75">Try another ability or playstyle—or clear the filters.</p>
          <button type="button" onClick={() => { setQuery(""); setRarity("all"); }} className="mt-5 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
