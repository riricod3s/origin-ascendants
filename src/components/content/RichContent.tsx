import { Info, Lightbulb, ScrollText, TriangleAlert, type LucideIcon } from "lucide-react";
import { headingIds } from "@/lib/toc";
import { cn } from "@/lib/cn";
import { renderInline } from "@/lib/inline";
import { toneStyle } from "@/lib/tones";
import type { ContentBlock, Tone } from "@/types/content";

type CalloutVariant = Extract<ContentBlock, { type: "callout" }>["variant"];

const CALLOUTS: Record<CalloutVariant, { tone: Tone; icon: LucideIcon; title: string }> = {
  tip: { tone: "verdant", icon: Lightbulb, title: "Tip" },
  warning: { tone: "ember", icon: TriangleAlert, title: "Heads up" },
  info: { tone: "aether", icon: Info, title: "Good to know" },
  lore: { tone: "arcane", icon: ScrollText, title: "From the archives" },
};

const LINK = "font-medium text-aether underline decoration-aether/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60";

function renderBlock(block: ContentBlock, index: number, id: string | undefined) {
  switch (block.type) {
    case "p":
      return (
        <p key={index} className="text-[1.04rem] leading-8 text-mist">
          {renderInline(block.text, LINK)}
        </p>
      );

    case "h2":
      return (
        <h2 key={index} id={id} className="group mt-14 scroll-mt-28 font-display text-2xl font-bold tracking-tight text-white first:mt-0 sm:text-[1.9rem]">
          {renderInline(block.text, LINK)}
          <a href={`#${id}`} aria-label="Link to this section" className="ml-2 text-aether/0 transition-colors group-hover:text-aether/70 hover:!text-aether">
            #
          </a>
        </h2>
      );

    case "h3":
      return (
        <h3 key={index} id={id} className="group mt-9 scroll-mt-28 font-display text-xl font-semibold text-white">
          {renderInline(block.text, LINK)}
          <a href={`#${id}`} aria-label="Link to this section" className="ml-2 text-aether/0 transition-colors group-hover:text-aether/70 hover:!text-aether">
            #
          </a>
        </h3>
      );

    case "list": {
      const items = block.items.map((item, i) => (
        <li key={i} className={cn("leading-7 text-mist", !block.ordered && "flex gap-3")}>
          {!block.ordered && <span aria-hidden="true" className="mt-[0.62rem] size-1.5 shrink-0 rotate-45 bg-aether shadow-[0_0_8px_#38bdf8]" />}
          <span>{renderInline(item, LINK)}</span>
        </li>
      ));
      return block.ordered ? (
        <ol key={index} className="list-decimal space-y-2.5 pl-6 marker:font-semibold marker:text-aether">
          {items}
        </ol>
      ) : (
        <ul key={index} className="space-y-2.5">
          {items}
        </ul>
      );
    }

    case "callout": {
      const spec = CALLOUTS[block.variant];
      const CalloutIcon = spec.icon;
      return (
        <aside key={index} style={toneStyle(spec.tone)} className="tone-bg tone-border my-2 flex gap-4 rounded-2xl border p-5">
          <span className="tone-bg-strong grid size-9 shrink-0 place-items-center rounded-xl text-night">
            <CalloutIcon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="tone-text mb-1 text-sm font-bold tracking-wide uppercase">{block.title ?? spec.title}</p>
            <p className="leading-7 text-white/90">{renderInline(block.text, LINK)}</p>
          </div>
        </aside>
      );
    }

    case "quote":
      return (
        <blockquote key={index} className="my-3 rounded-2xl border-l-4 border-solar/70 bg-solar/[0.06] px-6 py-5">
          <p className="font-display text-lg leading-8 text-white italic">&ldquo;{renderInline(block.text, LINK)}&rdquo;</p>
          {block.cite && <footer className="mt-3 text-sm text-solar">&mdash; {block.cite}</footer>}
        </blockquote>
      );

    case "steps":
      return (
        <ol key={index} className="relative my-3 ml-4 space-y-7 border-l border-white/12 pl-9">
          {block.items.map((step, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-0 -left-[3.3rem] grid size-9 place-items-center rounded-full border border-aether/50 bg-night font-display text-sm font-bold text-aether shadow-glow-aether"
              >
                {i + 1}
              </span>
              <h3 className="font-semibold text-white">{renderInline(step.title, LINK)}</h3>
              <p className="mt-1.5 leading-7 text-mist">{renderInline(step.text, LINK)}</p>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div key={index} className="my-3 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
          <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06]">
                {block.headers.map((header) => (
                  <th key={header} scope="col" className="px-4 py-3 font-semibold tracking-wide text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-white/8 transition-colors hover:bg-white/[0.03]">
                  {row.map((cell, c) => (
                    <td key={c} className={cn("px-4 py-3 align-top text-mist", c === 0 && "font-medium text-white")}>
                      {renderInline(cell, LINK)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

interface RichContentProps {
  blocks: ContentBlock[];
  className?: string;
}

/** Renders structured article content (paragraphs, headings, callouts, steps, tables...). */
export function RichContent({ blocks, className }: RichContentProps) {
  const ids = headingIds(blocks);
  return <div className={cn("space-y-5", className)}>{blocks.map((block, index) => renderBlock(block, index, ids.get(index)))}</div>;
}
