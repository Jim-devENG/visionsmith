"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChaosField } from "../ui/ChaosField";
import { Magnetic } from "../ui/Magnetic";

const headline = "Build a standard that can govern your weeks.";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.15 },
  },
};

const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <section className="vs-section vs-section-dark relative isolate overflow-hidden">
      <ChaosField variant="dark" className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 30% 35%, rgba(23,20,15,0) 0%, rgba(23,20,15,0.55) 75%)",
        }}
      />

      <div className="vs-wrap relative vs-section-inner-open">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="vs-label vs-label-on-dark mb-8"
        >
          Direction before activity
        </motion.p>

        <h1 className="vs-display max-w-[52rem] text-white" aria-label={headline}>
          <motion.span
            variants={container}
            initial="hidden"
            animate="show"
            aria-hidden="true"
            className="block"
          >
            {headline.split(" ").map((w, i) => (
              <span key={i} className="mr-[0.26em] inline-block overflow-hidden pb-1 align-top">
                <motion.span variants={word} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="vs-copy mt-8 max-w-[38rem]"
        >
          VisionSmith is a platform for serious people who are no longer
          asking for more ideas. The work here is to make standards visible,
          apply them under pressure, and keep review close enough to
          execution that drift is caught early.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <Magnetic>
            <Link href="/join" className="vs-btn vs-btn-on-dark">
              Enter VisionSmith
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/how-it-works" className="vs-btn vs-btn-ghost-on-color">
              Learn how it works
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 flex items-center gap-3 text-[13px] font-medium text-white/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--vs-accent-2)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--vs-accent-2)]" />
          </span>
          Live cohort currently in session
        </motion.div>
      </div>
    </section>
  );
}
