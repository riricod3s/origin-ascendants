"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { TransitionProvider } from "@/components/layout/TransitionProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TransitionProvider>{children}</TransitionProvider>
    </MotionConfig>
  );
}
