"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "../ui/Magnetic";
import { Marquee } from "../ui/Marquee";

export function NextStep() {
  return (
    <section className="vs-section vs-section-dark relative overflow-hidden">
      <div className="pt-14 text-white/[0.06]">
        <Marquee items={["STANDARDS", "REVIEW", "EXECUTION", "CORRECTION"]} />
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
          <h2 className="vs-title">Progression matters more than persuasion.</h2>
          <p className="vs-copy mx-auto mt-6 max-w-xl">
            First understand the frame. Then test whether you can work inside
            it. Only then choose the level of structure you want around you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Magnetic>
              <Link href="/join" className="vs-btn vs-btn-on-dark">
                Enter VisionSmith
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/how-it-works" className="vs-btn vs-btn-ghost-on-color">
                Read the framework
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
