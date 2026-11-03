import type { ReactNode } from "react";
import { SceneArt } from "@/components/art/SceneArt";
import { Starfield } from "@/components/art/Starfield";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { enter } from "@/lib/enter";
import { TONES, toneStyle } from "@/lib/tones";
import type { IconKey, SceneKind, Tone } from "@/types/content";

interface PageHeroProps {
  title: ReactNode;
  eyebrow?: string;
  icon?: IconKey;
  description?: ReactNode;
  scene?: SceneKind;
  seed?: number;
  tone?: Tone;
  breadcrumbs?: Crumb[];
  /** Rendered under the description (actions, search...). */
  children?: ReactNode;
  /** Rendered beside the text on large screens (banner, stats...). */
  aside?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Shared header for every inner page: illustrated sky, eyebrow, title and optional actions. */
export function PageHero({
  title,
  eyebrow,
  icon,
  description,
  scene = "isles",
  seed = 3,
  tone = "aether",
  breadcrumbs,
  children,
  aside,
  align = "left",
  className,
}: PageHeroProps) {
  const centered = align === "center";
  const hex = TONES[tone].hex;

  return (
    <header className={cn("relative isolate overflow-hidden border-b border-white/5", className)} style={toneStyle(tone)}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a1030] via-[#101a3d] to-night" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-70">
        <Starfield count={80} seed={seed * 13 + 5} height={0.85} className="size-full" />
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 -z-10 w-full opacity-[0.42] sm:w-[78%] lg:w-[64%]",
          centered ? "inset-x-0 mx-auto [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" : "right-0 [mask-image:linear-gradient(to_left,#000_20%,transparent_92%)]",
        )}
      >
        <SceneArt kind={scene} seed={seed} accent={hex} />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${hex}33, transparent)` }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-night to-transparent" />

      <div
        className={cn(
          "container-x pt-[calc(var(--nav-h)+2.75rem)] pb-14 sm:pb-20",
          aside && "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]",
        )}
      >
        <div className={cn("min-w-0", centered && "mx-auto max-w-3xl text-center")}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className={cn("enter mb-6", centered && "flex justify-center")} style={enter(0.05, 10)}>
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          {eyebrow && (
            <p
              className={cn(
                "enter mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.28em] uppercase tone-text",
                centered && "justify-center",
              )}
              style={enter(0.1, 14)}
            >
              {icon && <Icon name={icon} className="size-4" />}
              {eyebrow}
            </p>
          )}
          <h1
            className="enter font-display text-4xl leading-[1.08] font-bold tracking-tight text-white drop-shadow-[0_4px_30px_rgba(2,6,23,0.6)] sm:text-5xl lg:text-6xl"
            style={enter(0.18, 26, 1.2)}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn("enter mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg", centered && "mx-auto")}
              style={enter(0.3, 22)}
            >
              {description}
            </p>
          )}
          {children && (
            <div className={cn("enter mt-8", centered && "flex flex-wrap justify-center")} style={enter(0.42, 20)}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="enter" style={enter(0.35, 30, 1.3)}>
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
