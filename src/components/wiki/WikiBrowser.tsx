"use client";

import { useMemo, useState } from "react";
import { FilterChips, type ChipOption } from "@/components/ui/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { SearchEntry, WikiCategorySlug } from "@/types/content";

type Filter = "all" | WikiCategorySlug;

interface WikiBrowserProps {
  entries: SearchEntry[];
  categories: { slug: WikiCategorySlug; title: string; icon: SearchEntry["icon"] }[];
  initialFilter?: Filter;
}

export function WikiBrowser({ entries, categories, initialFilter = "all" }: WikiBrowserProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const filters: ChipOption<Filter>[] = [
    { value: "all", label: "All pages", count: entries.length, icon: "compass" },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.title,
      count: entries.filter((entry) => entry.category === category.slug).length,
      icon: category.icon,
    })),
  ];
  const results = useMemo(() => {
    const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return entries.filter((entry) => {
      if (filter !== "all" && entry.category !== filter) return false;
      const haystack = [entry.title, entry.summary, entry.kind, ...entry.tags].join(" ").toLocaleLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [entries, filter, query]);

  return (
    <div>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search the Ascendants Wiki..."
        label="Search the Ascendants Wiki"
        size="lg"
        shortcut
        className="mx-auto max-w-3xl"
      />
      <div className="mt-7">
        <FilterChips options={filters} value={filter} onChange={setFilter} label="Filter wiki pages by category" />
      </div>
      <div className="mt-8 flex items-center justify-between gap-4 text-sm text-mist/70">
        <p aria-live="polite">{results.length} {results.length === 1 ? "page" : "pages"} found</p>
        {query && <button type="button" onClick={() => setQuery("")} className="text-aether hover:text-white">Clear search</button>}
      </div>
      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((entry) => (
            <Card key={entry.id} tone={entry.tone} interactive as="article" className="group min-h-48 p-5 sm:p-6">
              <TransitionLink href={entry.href} className="absolute inset-0 z-10 rounded-[inherit]" aria-label={`Read ${entry.title}`} />
              <div className="pointer-events-none relative z-0">
                <span className="tone-bg tone-text mb-5 grid size-11 place-items-center rounded-2xl">
                  <Icon name={entry.icon} className="size-5" />
                </span>
                <Badge tone={entry.tone}>{entry.kind}</Badge>
                <h2 className="mt-3 font-display text-xl font-bold text-white group-hover:text-aether">{entry.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist/80">{entry.summary}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="surface mt-5 rounded-3xl p-8 text-center">
          <Icon name="search" className="mx-auto size-8 text-mist/60" />
          <h2 className="mt-3 font-display text-xl font-semibold text-white">No matching pages</h2>
          <p className="mt-2 text-mist/75">Try another term or choose a different category.</p>
        </div>
      )}
    </div>
  );
}
