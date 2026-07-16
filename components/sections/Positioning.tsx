"use client";

import { motion } from "framer-motion";

const notThis = [
  "A place to accumulate better language without changing conduct.",
  "Built to keep people emotionally activated or endlessly inspired.",
  "Interested in performance, identity construction, or public virtue.",
];

export function Positioning() {
  return (
    <section className="vs-section">
      <div className="grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="vs-surface-alt px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
        >
          <p className="vs-label vs-label-alt mb-8">What it is not</p>
          <ul className="space-y-6">
            {notThis.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[color:var(--vs-line-strong)] text-[10px] text-[color:var(--vs-subtle)]">
                  &times;
                </span>
                <p className="vs-copy text-[color:var(--vs-subtle)] line-through decoration-[color:var(--vs-line-strong)]">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="vs-section-accent px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
        >
          <p className="vs-label vs-label-on-accent mb-8">What it is instead</p>
          <h2 className="vs-title max-w-[26rem]">
            A place to make inner governance explicit.
          </h2>
          <p className="vs-copy mt-6 max-w-[28rem]">
            The point is to close the distance between stated values and
            repeated behavior. VisionSmith gives that work a frame: not loose
            journaling, not performance theater, but disciplined inspection —
            built for people who would rather be corrected than flattered.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
