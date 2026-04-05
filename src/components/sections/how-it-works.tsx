"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Circle, CircleDot } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/ui/animated";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Define Your Vision",
    description: "Clarify exactly what you want across every dimension of life. No vague dreams—specific, measurable outcomes.",
    details: [
      "Life audit across 8 key areas",
      "Values and priorities alignment",
      "5-year vision crystallization",
    ],
  },
  {
    number: "02",
    title: "Architect Your Path",
    description: "Break your vision into quarterly milestones, monthly objectives, and weekly targets. Strategy meets structure.",
    details: [
      "Reverse-engineered goal mapping",
      "Resource allocation planning",
      "Obstacle anticipation systems",
    ],
  },
  {
    number: "03",
    title: "Execute Daily",
    description: "Transform plans into action through disciplined daily practices. Small wins compound into massive results.",
    details: [
      "Morning and evening protocols",
      "Focus block scheduling",
      "Progress tracking rituals",
    ],
  },
  {
    number: "04",
    title: "Evolve Continuously",
    description: "Weekly reviews, monthly retrospectives, quarterly recalibrations. Constant refinement toward excellence.",
    details: [
      "Data-driven adjustments",
      "Habit optimization cycles",
      "Vision expansion protocols",
    ],
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" variant="muted" padding="xl">
      <Container size="lg">
        <AnimatedGroup stagger={0.1} className="text-center mb-16 md:mb-20">
          <AnimatedItem>
            <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-4 block">
              The Process
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              From Vision to Reality
              <span className="text-gradient block mt-2">In Four Phases</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              A proven methodology refined over years of research and practice.
              Each phase builds on the last, creating unstoppable momentum.
            </p>
          </AnimatedItem>
        </AnimatedGroup>

        {/* Diagonal Stepped Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-400 to-primary-600 transform md:-translate-x-1/2" />
          
          {/* Steps with Diagonal Offset */}
          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 0.15}>
                <motion.div
                  className={cn(
                    "relative flex items-start gap-6 md:gap-0",
                    "md:grid md:grid-cols-2 md:gap-12 md:items-center",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Step Number Circle - Left Side (odd) or Right Side (even) */}
                  <div className={cn(
                    "hidden md:flex items-center justify-center",
                    index % 2 === 0 ? "md:justify-end md:pr-12" : "md:justify-start md:pl-12 md:order-2"
                  )}>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* Outer ring */}
                      <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary-200 opacity-50" />
                      {/* Inner circle */}
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary-500/30">
                        {step.number}
                      </div>
                      {/* Pulse animation */}
                      <motion.div
                        className="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Content Card - Right Side (odd) or Left Side (even) */}
                  <div className={cn(
                    "flex-1 md:flex-none",
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  )}>
                    <motion.div
                      className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 relative overflow-hidden"
                      style={{
                        boxShadow: "0 4px 6px -1px rgba(102, 0, 7, 0.03), 0 10px 20px -5px rgba(102, 0, 7, 0.05)",
                      }}
                      whileHover={{ y: -4 }}
                    >
                      {/* Top accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400" />
                      
                      {/* Mobile step number */}
                      <div className="md:hidden flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                          {step.number}
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900">
                          {step.title}
                        </h3>
                      </div>

                      {/* Desktop title */}
                      <h3 className="hidden md:block text-2xl font-semibold text-neutral-900 mb-3">
                        {step.title}
                      </h3>

                      <p className="text-neutral-600 leading-relaxed mb-5">
                        {step.description}
                      </p>

                      {/* Details list */}
                      <ul className="space-y-2.5">
                        {step.details.map((detail, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="w-5 h-5 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-primary-600" />
                            </div>
                            <span className="text-sm text-neutral-700">
                              {detail}
                            </span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Phase indicator */}
                      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">
                          Phase {index + 1}
                        </span>
                        <div className="flex gap-1">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-2 h-2 rounded-full",
                                i <= index ? "bg-primary-500" : "bg-neutral-200"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center node for mobile */}
                  <div className="absolute left-8 top-8 md:hidden">
                    <div className="w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-sm" />
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Final CTA */}
          <FadeIn delay={0.6} className="text-center mt-16">
            <div className="inline-flex flex-col items-center">
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-7 h-7" />
              </motion.div>
              <Button variant="primary" size="lg" className="group">
                Start Your Transformation
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
