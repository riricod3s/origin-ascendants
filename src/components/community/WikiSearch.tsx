"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { WikiPageList } from "@/components/community/WikiPageList";

type WikiPage = { id: string; slug: string; title: string; summary: string; category_id: string; updated_at: string };
type Category = { id: string; name: string; slug: string };

export function WikiSearch({ pages, categories }: { pages: WikiPage[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return pages.filter((page) =>
      (!categoryId || page.category_id === categoryId)
      && (!needle || `${page.title} ${page.summary}`.toLowerCase().includes(needle)),
    );
  }, [pages, query, categoryId]);

  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_15rem]">
        <label className="relative block">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mist/45" />
          <span className="sr-only">Search wiki pages</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search community wiki…" className="w-full rounded-xl border border-white/10 bg-night/60 py-3 pr-4 pl-11 text-sm text-white outline-none placeholder:text-mist/40 focus:border-aether/50" />
        </label>
        <label>
          <span className="sr-only">Filter by category</span>
          <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-sm text-white outline-none focus:border-aether/50">
            <option value="">All categories</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </label>
      </div>
      {filtered.length ? <WikiPageList pages={filtered} categories={categories} /> : <p className="rounded-2xl border border-white/8 p-8 text-center text-sm text-mist/60">No wiki pages match that search.</p>}
    </>
  );
}
