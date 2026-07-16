"use client";

import { motion } from "framer-motion";

export function EventTicket({
  day,
  month,
  time,
}: {
  day: string;
  month: string;
  time: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative overflow-hidden rounded-[var(--vs-radius-lg)] bg-[color:var(--vs-ink)] text-white"
    >
      <div className="flex items-center justify-between px-8 py-8">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--vs-accent-2)]">
            {month}
          </p>
          <p className="mt-1 text-[3.25rem] font-extrabold leading-none">{day}</p>
        </div>
        <div className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--vs-accent-2)] opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[color:var(--vs-accent-2)]" />
        </div>
      </div>

      <div className="relative border-t border-dashed border-white/20 px-8 py-5">
        <span className="absolute -left-2.5 top-0 h-5 w-5 -translate-y-1/2 rounded-full bg-[color:var(--vs-surface)]" />
        <span className="absolute -right-2.5 top-0 h-5 w-5 -translate-y-1/2 rounded-full bg-[color:var(--vs-surface)]" />
        <p className="text-[13px] font-semibold text-white/70">{time}</p>
      </div>
    </motion.div>
  );
}
