"use client";

import { motion } from "framer-motion";

const checklist = [
  { label: "Pattern identified", done: true },
  { label: "Architecture sketched", done: true },
  { label: "Build sequence set", done: true },
];

export function SessionPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      className="overflow-hidden rounded-[var(--vs-radius-lg)] border border-[color:var(--vs-line)] bg-[color:var(--vs-surface)] shadow-[var(--vs-shadow-lg)]"
    >
      <div className="flex items-center gap-2 border-b border-[color:var(--vs-line)] px-5 py-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--vs-line-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--vs-line-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--vs-line-strong)]" />
        <span className="ml-3 text-[12px] font-semibold text-[color:var(--vs-subtle)]">
          Session · Week 12
        </span>
      </div>

      <div className="space-y-6 p-6">
        <div className="space-y-4">
          {checklist.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="flex items-center gap-3"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.15, ease: "backOut" }}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--vs-accent)] text-[11px] font-bold text-white"
              >
                &#10003;
              </motion.span>
              <span className="text-[14px] font-medium text-[color:var(--vs-ink-soft)]">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-[12px] font-semibold text-[color:var(--vs-subtle)]">
            <span>Pattern clarity</span>
            <span>72%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--vs-surface-2)]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "72%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="h-full rounded-full bg-[color:var(--vs-accent)]"
            />
          </div>
        </div>

        <div className="rounded-[var(--vs-radius)] bg-[color:var(--vs-surface-2)] px-4 py-3 text-[12px] font-medium text-[color:var(--vs-muted)]">
          Next check-in in 3 days
        </div>
      </div>
    </motion.div>
  );
}
