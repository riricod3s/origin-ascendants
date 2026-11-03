"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import { LoreCard, type LoreCardData } from "@/components/lore/LoreCard";
import { FilterChips, type ChipOption } from "@/components/ui/FilterChips";
import { Icon } from "@/components/ui/Icon";
import { SceneCover } from "@/components/ui/SceneCover";
import { SearchInput } from "@/components/ui/SearchInput";
import { cn } from "@/lib/cn";
import { toneStyle } from "@/lib/tones";
import type { IconKey, SceneKind, Tone } from "@/types/content";

export interface ArchiveEntry extends LoreCardData {
  /** Lower-cased plain text used for full-text search. */
  haystack: string;
}

export interface ArchiveTopic {
  slug: string;
  title: string;
  description: string;
  icon: IconKey;
  tone: Tone;
  scene: SceneKind;
  seed: number;
}

interface LoreArchiveProps {
  entries: ArchiveEntry[];
  topics: ArchiveTopic[];
}

/** Topic cards plus a searchable, topic-filtered grid of lore chronicles. */
export function LoreArchive({ entries, topics }: LoreArchiveProps) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const deferred = useDeferredValue(query);
  const reduce = useReducedMotion();
  const archiveRef = useRef<HTMLDivElement>(null);

  const countFor = (slug: string) => entries.filter((e) => e.topic.slug === slug).length;
  const options: ChipOption[] = [
    { value: "all", label: "All chronicles", count: entries.length, icon: "library" },
    ...topics.map((t) => ({ value: t.slug, label: t.title, icon: t.icon, count: countFor(t.slug) })),
  ];

  const results = useMemo(() => {
    const words = deferred.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return entries.filter((entry) => (topic === "all" || entry.topic.slug === topic) && words.every((word) => entry.haystack.includes(word)));
  }, [entries, topic, deferred]);

  const chooseTopic = (slug: string) => {
    setTopic(slug);
    archiveRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t, i) => (
          <motion.li
            key={t.slug}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: reduce ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => chooseTopic(t.slug)}
              aria-pressed={topic === t.slug}
              style={toneStyle(t.tone)}
              className={cn(
                "group/cover surface relative block w-full overflow-hidden rounded-3xl text-left transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:tone-border hover:shadow-lift",
                topic === t.slug && "tone-border tone-glow",
              )}
            >
              <SceneCover scene={t.scene} seed={t.seed} tone={t.tone} aspect="aspect-[16/7]" shade />
              <div className="relative -mt-10 flex items-end gap-4 px-5 pb-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/15 bg-night/85 tone-text tone-glow backdrop-blur transition-transform duration-500 group-hover/cover:-translate-y-1 group-hover/cover:rotate-[-6deg]">
                  <Icon name={t.icon} className="size-6" />
                </span>
                <span className="min-w-0 pb-0.5">
                  <span className="block font-display text-lg font-bold text-white">{t.title}</span>
                  <span className="block text-xs text-mist/65">{countFor(t.slug)} chronicles</span>
                </span>
              </div>
              <p className="px-5 pb-5 text-sm leading-relaxed text-mist/80">{t.description}</p>
            </button>
          </motion.li>
        ))}
      </ul>

      <div ref={archiveRef} id="archive" className="scroll-mt-28 pt-16">
        <h2 className="sr-only">Archive</h2>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <FilterChips options={options} value={topic} onChange={setTopic} label="Filter chronicles by topic" />
          <SearchInput value={query} onChange={setQuery} placeholder="Search the lore archive..." label="Search the lore archive" className="xl:w-80" />
        </div>
        <p className="mt-5 text-sm text-mist/70" aria-live="polite">
          Showing {results.length} of {entries.length} chronicles
        </p>
        <motion.div layout={!reduce} className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((entry, index) => (
              <motion.div
                key={entry.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : Math.min(index, 8) * 0.04 }}
                className="h-full"
              >
                <LoreCard entry={entry} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {results.length === 0 && (
          <div className="surface mt-6 rounded-2xl p-10 text-center">
            <p className="font-display text-xl font-bold text-white">The archivists found nothing.</p>
            <p className="mt-2 text-sm text-mist/75">Try a person, place or era—or clear the filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTopic("all");
              }}
              className="mt-5 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
