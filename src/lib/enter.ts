import type { CSSProperties } from "react";

/** CSS variables for the `.enter` entrance (see globals.css). Works without hydration. */
export function enter(delay = 0, rise = 22, duration = 1.1): CSSProperties {
  return {
    "--enter-delay": `${delay}s`,
    "--rise": `${rise}px`,
    "--enter-duration": `${duration}s`,
  } as CSSProperties;
}
