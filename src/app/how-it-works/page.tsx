"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Circle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/ui/animated";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
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
      "Quarterly milestone setting",
    ],
    duration: "Week 1-2",
  },
  {
    number: "02",
    title: "Architect Your Path",
    description: "Break your vision into quarterly milestones, monthly objectives, and weekly targets. Strategy meets structure.",
    details: [
      "Reverse-engineered goal mapping",
      "Resource allocation planning",
      "Obstacle anticipation systems",
      "Backup strategy development",
    ],
    duration: "Week 3-4",
  },
  {
    number: "03",
    title: "Execute Daily",
    description: "Transform plans into action through disciplined daily practices. Small wins compound into massive results.",
    details: [
      "Morning and evening protocols",
      "Focus block scheduling",
      "Progress tracking rituals",
      "Weekly review sessions",
    ],
    duration: "Ongoing",
  },
  {
    number: "04",
    title: "Evolve Continuously",
    description: "Weekly reviews, monthly retrospectives, quarterly recalibrations. Constant refinement toward excellence.",
    details: [
      "Data-driven adjustments",
      "Habit optimization cycles",
      "Vision expansion protocols",
      "Performance analytics",
    ],
    duration: "Monthly",
  },
];

const principles = [
  {
    title: "Clarity Over Complexity",
    description: "Simple systems work. Complex ones fail. We strip away the noise to reveal what truly matters.",
  },
  {
    title: "Action Over Analysis",
    description: "Perfect plans don't exist. Imperfect action beats perfect inaction every time.",
  },
  {
    title: "Consistency Over Intensity",
    description: "Small daily improvements compound into transformation. Consistency is the ultimate force multiplier.",
  },
  {
    title: "Systems Over Willpower",
    description: "Willpower is finite. Systems are infinite. Build structures that make success inevitable.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-white" />
        <Container size="lg" className="relative z-10">
          <AnimatedGroup stagger={0.1} className="text-center max-w-3xl mx-auto">
            <AnimatedItem>
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-4 block">
                The Process
              </span>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                From Vision to Reality
                <span className="text-gradient block mt-2">In Four Phases</span>
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                A proven methodology refined over years of research and practice.
                Each phase builds on the last, creating unstoppable momentum toward your goals.
              </p>
            </AnimatedItem>
          </AnimatedGroup>
        </Container>
      </section>

      {/* Timeline Section */}
      <Section padding="xl">
        <Container size="lg">
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Progress Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-400 to-primary-600 transform md:-translate-x-1/2" />
            
            {/* Steps */}
            <div className="space-y-12 md:space-y-16">
              {steps.map((step, index) => (
                <FadeIn key={step.number} delay={index * 0.15}>
                  <motion.div
                    className={cn(
                      "relative flex items-start gap-6 md:gap-0",
                      "md:grid md:grid-cols-2 md:gap-8 md:items-center"
                    )}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Step Number */}
                    <div className={cn(
                      "hidden md:flex flex-col items-center",
                      index % 2 === 0 ? "md:justify-end md:pr-8" : "md:justify-start md:pl-8 md:order-2"
                    )}>
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary-200 opacity-50" />
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary-500/30">
                          {step.number}
                        </div>
                        <motion.div
                          className="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary-400"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        />
                      </motion.div>
                      <span className="mt-3 text-sm font-medium text-primary-600">
                        {step.duration}
                      </span>
                    </div>

                    {/* Content Card */}
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
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400" />
                        
                        {/* Mobile header */}
                        <div className="md:hidden flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                            {step.number}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-neutral-900">{step.title}</h3>
                            <span className="text-sm text-primary-600">{step.duration}</span>
                          </div>
                        </div>

                        {/* Desktop title */}
                        <h3 className="hidden md:block text-2xl font-semibold text-neutral-900 mb-2">
                          {step.title}
                        </h3>

                        <p className="text-neutral-600 leading-relaxed mb-5">
                          {step.description}
                        </p>

                        <ul className="space-y-2.5">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-primary-600" />
                              </div>
                              <span className="text-sm text-neutral-700">{detail}</span>
                            </li>
                          ))}
                        </ul>

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

                    {/* Spacer for alternating layout */}
                    <div className={cn("hidden md:block", index % 2 === 1 && "md:order-1")} />
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Principles Section */}
      <Section variant="muted" padding="xl">
        <Container size="lg">
          <AnimatedGroup stagger={0.1} className="text-center mb-12">
            <AnimatedItem>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Guiding Principles
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-lg text-neutral-600 max-w-xl mx-auto">
                The beliefs that shape our methodology
              </p>
            </AnimatedItem>
          </AnimatedGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {principles.map((principle, index) => (
              <FadeIn key={principle.title} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-6 border border-neutral-200"
                  style={{
                    boxShadow: "0 2px 4px rgba(102, 0, 7, 0.02), 0 8px 16px rgba(102, 0, 7, 0.04)",
                  }}
                  whileHover={{ y: -2 }}
                >
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-50 via-white to-primary-100/50">
        <Container size="md">
          <FadeIn className="text-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 mx-auto mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-7 h-7" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Begin?
            </h2>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto mb-8">
              Your transformation starts with a single decision. Join thousands who have already begun their journey.
            </p>
            <Button variant="primary" size="xl" className="group">
              Start Your Transformation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
