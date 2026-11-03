"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useTransitionNavigate } from "@/components/layout/TransitionProvider";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Drop-in `next/link` that plays the route curtain when travelling between top-level sections. */
export function TransitionLink({ href, onNavigate, replace, scroll, ...rest }: TransitionLinkProps) {
  const { navigate } = useTransitionNavigate();

  return (
    <Link
      href={href}
      replace={replace}
      scroll={scroll}
      {...rest}
      onNavigate={(event) => {
        onNavigate?.(event);
        if (replace || scroll === false) return;
        if (navigate(href)) event.preventDefault();
      }}
    />
  );
}
