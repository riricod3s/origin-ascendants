import { Fragment, type ReactNode } from "react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { cn } from "@/lib/cn";

/**
 * Content strings support a tiny markdown dialect: **bold**, *italic* and [label](/path).
 * Anything else is rendered as plain text.
 */
const TOKEN = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

const LINK_CLASS =
  "font-medium text-aether underline decoration-aether/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60";

export function renderInline(text: string, linkClassName?: string): ReactNode {
  return text.split(TOKEN).map((part, index) => {
    if (!part) return null;

    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {renderInline(part.slice(2, -2), linkClassName)}
        </strong>
      );
    }

    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="text-white/90">
          {renderInline(part.slice(1, -1), linkClassName)}
        </em>
      );
    }

    const link = LINK.exec(part);
    if (link) {
      const [, label, href] = link;
      const className = cn(LINK_CLASS, linkClassName);
      if (href.startsWith("/")) {
        return (
          <TransitionLink key={index} href={href} className={className}>
            {label}
          </TransitionLink>
        );
      }
      return (
        <a key={index} href={href} className={className} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

/** Plain-text version of a mini-markdown string (for cards, meta tags and search). */
export function stripInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*\s][^*]*)\*/g, "$1");
}
