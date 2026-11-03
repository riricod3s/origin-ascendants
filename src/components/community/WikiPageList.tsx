import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";

type WikiPage = { id: string; slug: string; title: string; summary: string; category_id: string; updated_at: string };
type Category = { id: string; name: string; slug: string };

export function WikiPageList({ pages, categories }: { pages: WikiPage[]; categories: Category[] }) {
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  if (!pages.length) return <p className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 text-center text-sm text-mist/60">No articles yet. Create the first page in the community wiki.</p>;
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {pages.map((page) => {
        const category = categoryById.get(page.category_id);
        return (
          <li key={page.id} className="group rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-aether/25 hover:bg-white/[0.04]">
            {category && <TransitionLink href={`/wiki/category/${category.slug}`} className="text-[0.65rem] font-semibold tracking-[0.18em] text-aether uppercase hover:text-white">{category.name}</TransitionLink>}
            <TransitionLink href={`/wiki/${page.slug}`} className="mt-2 flex items-start justify-between gap-3">
              <span className="font-display text-lg font-semibold text-white transition-colors group-hover:text-aether">{page.title}</span>
              <ArrowRight className="mt-1 size-4 shrink-0 text-mist/30 transition-transform group-hover:translate-x-1 group-hover:text-aether" />
            </TransitionLink>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist/65">{page.summary || "A community-written reference page."}</p>
            <p className="mt-4 flex items-center gap-2 text-xs text-mist/40"><BookOpen className="size-3.5" /> <Clock3 className="size-3.5" /> Updated {new Date(page.updated_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
          </li>
        );
      })}
    </ul>
  );
}
