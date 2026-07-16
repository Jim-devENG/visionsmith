"use client";

import { motion } from "framer-motion";

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="flex items-start gap-3"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: "backOut" }}
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--vs-accent)] text-[11px] font-bold text-white"
          >
            &#10003;
          </motion.span>
          <p className="vs-copy">{item}</p>
        </motion.li>
      ))}
    </ul>
  );
}
