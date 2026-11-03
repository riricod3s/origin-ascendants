"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 720));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glass fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full text-aether shadow-glow-aether transition-colors hover:bg-white/10 sm:right-8 sm:bottom-8"
        >
          <ChevronUp aria-hidden="true" className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
