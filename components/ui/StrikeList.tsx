"use client";

import { motion } from "framer-motion";

export function StrikeList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="flex items-start gap-4"
        >
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[10px] opacity-40">
            &times;
          </span>
          <p className="vs-copy opacity-70 line-through decoration-current/30">{item}</p>
        </motion.li>
      ))}
    </ul>
  );
}
