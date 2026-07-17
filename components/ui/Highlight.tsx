"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 -bottom-[0.06em] h-[3px] origin-left rounded-full bg-[color:var(--vs-accent-2)]"
      />
    </span>
  );
}
