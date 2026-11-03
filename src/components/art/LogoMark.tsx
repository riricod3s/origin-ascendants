import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoMarkProps {
  className?: string;
  /** Adds a slow, warm halo without rotating or distorting the detailed emblem. */
  animated?: boolean;
}

/**
 * The Origin Ascendants eye emblem. `oa-logo-512.webp` is a lightweight raster
 * of the 1 MB master file `public/OA-logo.svg`; regenerate it if the master changes.
 */
export function LogoMark({ className, animated = false }: LogoMarkProps) {
  return (
    <Image
      src="/oa-logo-512.webp"
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      unoptimized
      draggable={false}
      className={cn("size-10 shrink-0 object-contain", animated && "logo-mark-breathe", className)}
    />
  );
}
