"use client";

import { motion } from "framer-motion";

export function Checklist({
  items,
  onDark = false,
}: {
  items: string[];
  onDark?: boolean;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`vs-card vs-card-accent-top flex items-start gap-4 ${onDark ? "vs-card-on-dark" : ""}`}
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: "backOut" }}
            className={`vs-icon-badge !h-9 !w-9 shrink-0 text-[13px] ${onDark ? "vs-icon-badge-on-dark" : ""}`}
          >
            &#10003;
          </motion.span>
          <p className="vs-copy pt-1.5">{item}</p>
        </motion.div>
      ))}
    </div>
  );
}
