"use client";

import { motion } from "framer-motion";

const rings = [
  { r: 88, label: "Values" },
  { r: 66, label: "Standards" },
  { r: 44, label: "Review" },
  { r: 22, label: "Execution" },
];

export function FrameRings() {
  return (
    <div className="flex items-center justify-center py-6">
      <svg viewBox="0 0 200 200" className="h-auto w-full max-w-[15rem]" role="img" aria-label="Values, standards, review, and execution converging into one governed frame">
        <g transform="translate(100,100)">
          {rings.map((ring, index) => (
            <motion.circle
              key={ring.label}
              cx={0}
              cy={0}
              r={ring.r}
              fill="none"
              stroke="var(--vs-accent)"
              strokeOpacity={0.25 + index * 0.15}
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
          <motion.circle
            cx={0}
            cy={0}
            r={3}
            fill="var(--vs-accent)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7, ease: "backOut" }}
          />
        </g>
      </svg>
    </div>
  );
}
