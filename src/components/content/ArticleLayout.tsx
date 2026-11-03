import type { ReactNode } from "react";
import { ReadingProgress } from "@/components/content/ReadingProgress";
import { RichContent } from "@/components/content/RichContent";
import { TableOfContents } from "@/components/content/TableOfContents";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { getToc } from "@/lib/toc";
import { toneStyle } from "@/lib/tones";
import type { ContentBlock, IconKey, Tone } from "@/types/content";

export interface Fact {
  label: string;
  value: ReactNode;
  icon: IconKey;
}

/** Compact "at a glance" panel for sidebars. */
export function FactsPanel({ facts, title = "At a glance", tone = "aether", className }: { facts: Fact[]; title?: string; tone?: Tone; className?: string }) {
  return (
    <div className={cn("surface rounded-2xl p-5", className)} style={toneStyle(tone)}>
      <p className="text-xs font-semibold tracking-[0.2em] uppercase tone-text">{title}</p>
      <dl className="mt-4 space-y-3.5">
        {facts.map((fact) => (
          <div key={fact.label} className="flex gap-3">
            <dt className="sr-only">{fact.label}</dt>
            <span aria-hidden="true" className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg tone-bg tone-text">
              <Icon name={fact.icon} className="size-4" />
            </span>
            <dd className="min-w-0 text-sm">
              <span aria-hidden="true" className="block text-[0.7rem] tracking-wide text-mist/60 uppercase">{fact.label}</span>
              <span className="text-white">{fact.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface ArticleLayoutProps {
  blocks: ContentBlock[];
  /** Rendered above the body (lead paragraph, quote...). */
  lead?: ReactNode;
  /** Rendered after the body (related pages, prev/next...). */
  footer?: ReactNode;
  /** Extra sidebar content shown under the table of contents. */
  aside?: ReactNode;
  className?: string;
}

/** Two-column reading layout: rich article body plus a sticky outline and facts sidebar. */
export function ArticleLayout({ blocks, lead, footer, aside, className }: ArticleLayoutProps) {
  const toc = getToc(blocks);

  return (
    <>
      <ReadingProgress />
      <div className={cn("container-x grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14 lg:py-20", className)}>
        <article className="min-w-0">
          <div className="max-w-3xl">
            {lead}
            <RichContent blocks={blocks} />
          </div>
          {footer && <div className="mt-16 space-y-14">{footer}</div>}
        </article>
        <aside className="order-first space-y-6 lg:order-none lg:sticky lg:top-28 lg:h-fit">
          <TableOfContents items={toc} />
          {aside && <div className="hidden space-y-6 lg:block">{aside}</div>}
        </aside>
        {aside && <div className="space-y-6 lg:hidden">{aside}</div>}
      </div>
    </>
  );
}
