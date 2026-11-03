import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TransitionLink } from "@/components/layout/TransitionLink";

export type ButtonVariant = "primary" | "gold" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  /** Force new-tab behaviour. Detected automatically for absolute URLs. */
  external?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  title?: string;
}

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide whitespace-nowrap select-none " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out-expo active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-aether via-[#7ab1fb] to-arcane text-night shadow-[0_8px_30px_-10px_rgba(56,189,248,0.75)] hover:-translate-y-0.5 hover:shadow-[0_16px_42px_-10px_rgba(56,189,248,0.9)]",
  gold: "bg-gradient-to-r from-solar via-[#fcd34d] to-[#f59e0b] text-night shadow-[0_8px_30px_-10px_rgba(251,191,36,0.75)] hover:-translate-y-0.5 hover:shadow-[0_16px_42px_-10px_rgba(251,191,36,0.9)]",
  secondary: "glass text-white hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10",
  ghost: "text-mist hover:bg-white/10 hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-13 px-8 text-base",
};

function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function Button({
  children,
  href,
  external,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  fullWidth,
  className,
  type = "button",
  disabled,
  onClick,
  ...aria
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
  const content = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-white/40 opacity-0 blur-[2px] transition-all duration-700 ease-out group-hover/btn:left-[130%] group-hover/btn:opacity-100"
        />
      )}
      {icon}
      <span className="relative">{children}</span>
      {iconRight}
    </>
  );

  if (href) {
    if (external ?? isExternalHref(href)) {
      const newTab = !href.startsWith("mailto:") && !href.startsWith("tel:");
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...aria}
        >
          {content}
        </a>
      );
    }
    return (
      <TransitionLink href={href} className={classes} onClick={onClick} {...aria}>
        {content}
      </TransitionLink>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...aria}>
      {content}
    </button>
  );
}
