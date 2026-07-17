"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChaosField } from "../ui/ChaosField";
import { Magnetic } from "../ui/Magnetic";

const headline = "Every chaos has a pattern.";

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
          Clarity before construction
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
          VisionSmith exists for builders who no longer need more
          inspiration. The work here is to find the structure inside
          complexity, think clearly before acting, and build with an
          architecture strong enough to hold what you're making.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
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
          Live session in progress
        </motion.div>
      </div>
    </section>
  );
}
