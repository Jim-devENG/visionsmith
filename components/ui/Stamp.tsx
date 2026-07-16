"use client";

import { motion } from "framer-motion";

export function Stamp({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -14 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: "backOut" }}
        className="relative flex h-40 w-40 items-center justify-center"
      >
        <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full">
          <motion.circle
            cx={80}
            cy={80}
            r={72}
            fill="none"
            stroke="var(--vs-accent)"
            strokeWidth={2}
            strokeDasharray="3 6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          />
          <motion.circle
            cx={80}
            cy={80}
            r={58}
            fill="none"
            stroke="var(--vs-accent)"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          />
        </svg>
        <span className="text-center text-[13px] font-extrabold uppercase leading-tight tracking-[0.14em] text-[color:var(--vs-accent-strong)]">
          {label}
        </span>
      </motion.div>
    </div>
  );
}
