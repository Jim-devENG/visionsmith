"use client";

import { motion } from "framer-motion";

const systemOutcomes = [
  {
    title: "Name the line",
    text: "State the principles, boundaries, and obligations that should still hold when convenience starts arguing.",
  },
  {
    title: "Build the cadence",
    text: "Translate judgment into weekly review, recurring examination, and concrete commitments that survive mood shifts.",
  },
  {
    title: "Inspect the evidence",
    text: "Keep a visible record so promises are measured against conduct, correction, and completed work.",
  },
];

export function System() {
  return (
    <section className="vs-section vs-surface">
      <div className="vs-wrap vs-section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-[36rem]"
        >
          <p className="vs-label mb-4">System value</p>
          <h2 className="vs-title">
            The platform helps turn private standards into repeatable conduct.
          </h2>
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row md:items-start">
          {systemOutcomes.map((item, index) => (
            <div key={item.title} className="flex flex-1 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex-1"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--vs-accent-soft)] text-[13px] font-bold text-[color:var(--vs-accent-strong)]">
                  {index + 1}
                </span>
                <h3 className="vs-subtitle mt-6 max-w-[16rem]">{item.title}</h3>
                <p className="vs-copy mt-3 max-w-[18rem]">{item.text}</p>
              </motion.div>

              {index < systemOutcomes.length - 1 ? (
                <div className="hidden items-start px-6 pt-5 md:flex">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7, delay: index * 0.12 + 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                    className="h-px w-12 origin-left bg-[color:var(--vs-line-strong)]"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
