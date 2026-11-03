import { ArrowLeft, ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { cn } from "@/lib/cn";

export interface PagerLink {
  title: string;
  href: string;
}

/** Previous / next navigation at the end of a series (guides, origins, nations...). */
export function PrevNext({ prev, next, label = "More pages", className }: { prev?: PagerLink; next?: PagerLink; label?: string; className?: string }) {
  if (!prev && !next) return null;
  return (
    <nav aria-label={label} className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {prev ? (
        <TransitionLink href={prev.href} className="group surface flex items-center gap-4 rounded-2xl p-4 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-white/20">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-mist transition-transform duration-500 group-hover:-translate-x-1 group-hover:text-white"><ArrowLeft className="size-4" /></span>
          <span className="min-w-0">
            <span className="block text-xs tracking-[0.16em] text-mist/60 uppercase">Previous</span>
            <span className="block truncate font-semibold text-white">{prev.title}</span>
          </span>
        </TransitionLink>
      ) : <span className="hidden sm:block" />}
      {next && (
        <TransitionLink href={next.href} className="group surface flex items-center justify-end gap-4 rounded-2xl p-4 text-right transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-white/20">
          <span className="min-w-0">
            <span className="block text-xs tracking-[0.16em] text-mist/60 uppercase">Next</span>
            <span className="block truncate font-semibold text-white">{next.title}</span>
          </span>
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-mist transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white"><ArrowRight className="size-4" /></span>
        </TransitionLink>
      )}
    </nav>
  );
}

/** Neighbours of an item in an ordered list. */
export function neighbours<T>(items: T[], index: number): { prev?: T; next?: T } {
  return { prev: index > 0 ? items[index - 1] : undefined, next: index < items.length - 1 ? items[index + 1] : undefined };
}
