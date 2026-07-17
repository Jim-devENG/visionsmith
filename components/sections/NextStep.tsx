"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "../ui/Magnetic";
import { Marquee } from "../ui/Marquee";

export function NextStep() {
  return (
    <section className="vs-section vs-section-dark relative overflow-hidden">
      <div className="pt-14 text-white/[0.06]">
        <Marquee items={["PATTERN", "STRUCTURE", "THINKING", "BUILDING"]} />
      </div>

      <div className="vs-wrap relative vs-section-inner-tight text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mx-auto max-w-2xl"
        >
          <p className="vs-label vs-label-on-dark mx-auto mb-6">Path forward</p>
          <h2 className="vs-title">Clarity outlasts motivation.</h2>
          <p className="vs-copy mx-auto mt-6 max-w-xl">
            First understand the pattern. Then test whether you can think
            this way. Only then decide how much structure you want around
            your own building.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Magnetic>
              <Link href="/join" className="vs-btn vs-btn-on-dark">
                Build with Clarity
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/how-it-works" className="vs-btn vs-btn-ghost-on-color">
                Explore the Pattern
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
