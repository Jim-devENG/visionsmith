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

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {systemOutcomes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
              className="vs-card vs-card-accent-top"
            >
              <span className="vs-icon-badge">{index + 1}</span>
              <h3 className="vs-subtitle mt-6">{item.title}</h3>
              <p className="vs-copy mt-3">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
