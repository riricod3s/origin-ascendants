import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/** Breadcrumb trail. The last item is the current page. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-mist/80">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li className="flex items-center">
                {item.href && !last ? (
                  <TransitionLink
                    href={item.href}
                    className="rounded-md px-1 py-0.5 transition-colors hover:bg-white/8 hover:text-white"
                  >
                    {item.label}
                  </TransitionLink>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={cn("px-1 py-0.5", last && "font-medium text-white")}>
                    {item.label}
                  </span>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className="flex items-center text-mist/40">
                  <ChevronRight className="size-3.5" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
