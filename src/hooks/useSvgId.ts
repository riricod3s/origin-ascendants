import { useId } from "react";

/** Stable, selector-safe id prefix for SVG gradients/clip paths (safe in server and client components). */
export function useSvgId(prefix = "oa") {
  const raw = useId();
  return `${prefix}${raw.replace(/[^A-Za-z0-9_-]/g, "")}`;
}
