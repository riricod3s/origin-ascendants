import { cn } from "@/lib/cn";

interface OrnamentProps {
  className?: string;
  /** Hex or CSS colour for the diamond. */
  color?: string;
}

/** Thin divider with a glowing diamond. Purely decorative. */
export function Ornament({ className, color = "#FBBF24" }: OrnamentProps) {
  return (
    <div aria-hidden="true" className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
      <span className="size-2 rotate-45" style={{ background: color, boxShadow: `0 0 14px ${color}` }} />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
    </div>
  );
}
