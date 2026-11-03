import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Icon } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { ResolvedRef } from "@/lib/content";
import { toneStyle } from "@/lib/tones";

interface RelatedLinksProps {
  items: ResolvedRef[];
  title?: string;
  eyebrow?: string;
  className?: string;
  /** Narrow single-column list for sidebars. */
  compact?: boolean;
}

/** Grid of cross-reference cards ("Related pages"). */
export function RelatedLinks({ items, title = "Related pages", eyebrow = "Keep exploring", className, compact = false }: RelatedLinksProps) {
  if (items.length === 0) return null;

  return (
    <section aria-label={title} className={className}>
      <p className="text-xs font-semibold tracking-[0.22em] text-aether uppercase">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-white">{title}</h2>
      <Stagger className={cn("mt-5 grid gap-3", !compact && "sm:grid-cols-2 xl:grid-cols-3")} gap={0.06}>
        {items.map((item) => (
          <StaggerItem key={item.key}>
            <TransitionLink
              href={item.href}
              style={toneStyle(item.tone)}
              className="group surface flex h-full items-start gap-3.5 rounded-2xl p-4 transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:tone-border hover:shadow-lift"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl tone-bg tone-text transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                <Icon name={item.icon} className="size-[1.15rem]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase tone-text">{item.kind}</span>
                <span className="mt-0.5 flex items-center gap-1 font-semibold text-white">
                  <span className="truncate">{item.title}</span>
                  <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </span>
                <span className="mt-1 line-clamp-2 block text-sm leading-snug text-mist/75">{item.summary}</span>
              </span>
            </TransitionLink>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
