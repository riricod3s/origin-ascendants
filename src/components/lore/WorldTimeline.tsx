"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { FilterChips, type ChipOption } from "@/components/ui/FilterChips";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { renderInline } from "@/lib/inline";
import { toneStyle } from "@/lib/tones";
import type { Era, TimelineEvent, TimelineEventKind, Tone } from "@/types/content";

export const KIND_META: Record<TimelineEventKind, { label: string; tone: Tone }> = {
  founding: { label: "Founding", tone: "verdant" },
  war: { label: "War", tone: "ember" },
  discovery: { label: "Discovery", tone: "aether" },
  treaty: { label: "Treaty", tone: "arcane" },
  disaster: { label: "Cataclysm", tone: "blush" },
  festival: { label: "Festival", tone: "solar" },
  ascension: { label: "Ascension", tone: "arcane" },
};

export interface TimelineNation {
  name: string;
  color: string;
}

interface WorldTimelineProps {
  eras: Era[];
  events: TimelineEvent[];
  nations: Record<string, TimelineNation>;
  /** Present-day label shown at the end of the rail, e.g. "AS 436". */
  present: string;
}

type KindFilter = "all" | TimelineEventKind;

const EASE = [0.16, 1, 0.3, 1] as const;

function EventItem({ event, side, open, onToggle, nations }: { event: TimelineEvent; side: "left" | "right"; open: boolean; onToggle: () => void; nations: Record<string, TimelineNation> }) {
  const reduce = useReducedMotion();
  const meta = KIND_META[event.kind];
  const left = side === "left";
  const panelId = `timeline-${event.id}-details`;

  return (
    <li id={`event-${event.id}`} className="relative scroll-mt-40 pl-14 md:grid md:grid-cols-2 md:pl-0" style={toneStyle(meta.tone)}>
      <span aria-hidden="true" className="absolute top-7 left-5 z-10 grid size-4 -translate-x-1/2 place-items-center rounded-full border-2 border-night tone-bg-strong tone-glow md:left-1/2">
        {open && <span className="absolute inset-0 animate-ping rounded-full tone-bg-strong opacity-60" />}
      </span>
      <p
        aria-hidden="true"
        className={cn(
          "hidden pt-4 font-display text-3xl font-bold text-white/15 md:row-start-1 md:block",
          left ? "md:col-start-2 md:pl-12 md:text-left" : "md:col-start-1 md:pr-12 md:text-right",
        )}
      >
        {event.yearLabel}
      </p>
      <motion.div
        className={cn("md:row-start-1", left ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12")}
        initial={reduce ? false : { opacity: 0, x: left ? -28 : 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className={cn("surface overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-500", open ? "tone-border shadow-lift" : "hover:border-white/20")}>
          <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={panelId} className="group flex w-full items-start gap-4 p-5 text-left">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 tone-bg tone-text transition-transform duration-500 group-hover:scale-110">
              <Icon name={event.icon} className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold tracking-[0.16em] uppercase">
                <span className="tone-text">{event.yearLabel}</span>
                <span className="text-mist/50">{meta.label}</span>
              </span>
              <span className="mt-1 block font-display text-lg leading-snug font-bold text-white">{event.title}</span>
              <span className="mt-1.5 block text-sm leading-relaxed text-mist/80">{event.summary}</span>
            </span>
            <ChevronDown aria-hidden="true" className={cn("mt-1 size-5 shrink-0 text-mist/60 transition-transform duration-500 ease-out-expo", open && "rotate-180 text-white")} />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                key="details"
                initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/8 px-5 pt-4 pb-5">
                  <p className="text-sm leading-relaxed text-mist">{renderInline(event.details)}</p>
                  {Boolean(event.nations?.length || event.loreSlug) && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {event.nations?.map((slug) =>
                        nations[slug] ? (
                          <TransitionLink
                            key={slug}
                            href={`/nations/${slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white transition-colors hover:bg-white/10"
                          >
                            <span className="size-2 rounded-full" style={{ background: nations[slug].color }} />
                            {nations[slug].name}
                          </TransitionLink>
                        ) : null,
                      )}
                      {event.loreSlug && (
                        <TransitionLink href={`/lore/${event.loreSlug}`} className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold tone-text hover:underline">
                          <Icon name="scroll-text" className="size-3.5" />
                          Read the chronicle
                        </TransitionLink>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </li>
  );
}

/** Scroll-linked, era-grouped world timeline with expandable events. */
export function WorldTimeline({ eras, events, nations, present }: WorldTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const [kind, setKind] = useState<KindFilter>("all");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  const kinds = useMemo(() => [...new Set(events.map((e) => e.kind))], [events]);
  const options: ChipOption<KindFilter>[] = [
    { value: "all", label: "All events", count: events.length, icon: "hourglass" },
    ...kinds.map((k) => ({ value: k, label: KIND_META[k].label, count: events.filter((e) => e.kind === k).length })),
  ];

  const visible = kind === "all" ? events : events.filter((e) => e.kind === kind);
  const allOpen = visible.length > 0 && visible.every((e) => open.has(e.id));
  const grouped = eras
    .map((era) => ({ era, items: visible.filter((e) => e.era === era.slug).sort((a, b) => a.year - b.year) }))
    .filter((group) => group.items.length > 0);
  const sideOf = new Map(grouped.flatMap((group) => group.items).map((event, i) => [event.id, i % 2 === 0 ? ("left" as const) : ("right" as const)]));

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips options={options} value={kind} onChange={setKind} label="Filter timeline by event type" />
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(visible.map((e) => e.id)))}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
        >
          {allOpen ? <ChevronsDownUp className="size-4" /> : <ChevronsUpDown className="size-4" />}
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div ref={ref} className="relative mt-12">
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-5 w-px -translate-x-1/2 bg-white/10 md:left-1/2" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: reduce ? 1 : progress }}
          className="absolute top-0 bottom-0 left-5 w-[3px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-solar via-aether to-arcane shadow-[0_0_18px_rgba(56,189,248,0.6)] md:left-1/2"
        />

        {grouped.map(({ era, items: eraEvents }) => {
          return (
            <section key={era.slug} id={`era-${era.slug}`} aria-labelledby={`era-${era.slug}-title`} className="relative scroll-mt-32 pb-6" style={toneStyle(era.tone)}>
              <motion.div
                className="relative py-10 pl-14 md:pl-0 md:text-center"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <span aria-hidden="true" className="absolute top-10 left-5 z-10 grid size-12 -translate-x-1/2 place-items-center rounded-full border-2 tone-border bg-night tone-text tone-glow md:left-1/2">
                  <Icon name={era.icon} className="size-5" />
                </span>
                <div className="md:mx-auto md:max-w-xl md:rounded-3xl md:bg-night/80 md:px-6 md:pt-16 md:pb-2 md:backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-[0.24em] uppercase tone-text">{era.span}</p>
                  <h3 id={`era-${era.slug}-title`} className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{era.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist/85">{era.description}</p>
                </div>
              </motion.div>
              <ol className="space-y-6">
                {eraEvents.map((event) => (
                  <EventItem key={event.id} event={event} side={sideOf.get(event.id) ?? "left"} open={open.has(event.id)} onToggle={() => toggle(event.id)} nations={nations} />
                ))}
              </ol>
            </section>
          );
        })}

        <div className="relative pt-8 pb-2 pl-14 md:pl-0 md:text-center">
          <span aria-hidden="true" className="absolute top-8 left-5 grid size-6 -translate-x-1/2 place-items-center md:left-1/2">
            <span className="absolute inset-0 animate-ping rounded-full bg-solar/50" />
            <span className="relative size-3 rounded-full bg-solar shadow-[0_0_18px_#FBBF24]" />
          </span>
          <div className="md:pt-10">
            <p className="text-xs font-semibold tracking-[0.24em] text-solar uppercase">{present} · Present day</p>
            <p className="mt-1 font-display text-xl font-bold text-white">The next chapter is yours to write.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
