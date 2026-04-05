"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Target, Compass, Zap, Shield, Layers, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/ui/animated";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Target,
    title: "Crystal Clear Vision",
    description: "Define what truly matters. Cut through noise, distractions, and half-hearted goals to find your true north.",
    details: [
      "Life audit across 8 key areas",
      "Values and priorities alignment",
      "5-year vision crystallization",
      "Quarterly vision reviews",
    ],
    color: "primary-600",
  },
  {
    icon: Compass,
    title: "Strategic Direction",
    description: "Every step mapped with intention. No wandering, no wasted effort—only deliberate progress toward your vision.",
    details: [
      "Reverse-engineered goal mapping",
      "Resource allocation planning",
      "Obstacle anticipation systems",
      "Milestone tracking dashboards",
    ],
    color: "primary-500",
  },
  {
    icon: Zap,
    title: "Disciplined Execution",
    description: "Turn plans into reality through structured daily practices. Build momentum that compounds into transformation.",
    details: [
      "Morning and evening protocols",
      "Focus block scheduling",
      "Progress tracking rituals",
      "Habit stacking frameworks",
    ],
    color: "primary-700",
  },
  {
    icon: Shield,
    title: "Resilient Mindset",
    description: "Develop the mental frameworks to stay the course when motivation fades and obstacles arise.",
    details: [
      "Mental resilience training",
      "Stress management protocols",
      "Recovery and rest cycles",
      "Emotional regulation tools",
    ],
    color: "primary-600",
  },
  {
    icon: Layers,
    title: "Integrated Systems",
    description: "Connect every area of your life—health, wealth, relationships, growth—into one cohesive architecture.",
    details: [
      "Cross-domain integration",
      "Life balance metrics",
      "Resource optimization",
      "Synergy identification",
    ],
    color: "primary-500",
  },
];

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507238691747-381b3b96a8e0?w=1920&q=80"
            alt="Person working on laptop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 via-white/85 to-white/95" />
        </div>
        <Container size="lg" className="relative z-10">
          <AnimatedGroup stagger={0.1} className="text-center max-w-3xl mx-auto">
            <AnimatedItem>
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-4 block">
                Core Pillars
              </span>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                The Framework for
                <span className="text-gradient block mt-2">Exceptional Living</span>
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                Five interconnected pillars that transform scattered ambition into
                systematic achievement. Each pillar builds on the others, creating
                an unshakeable foundation for the life you want.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button variant="primary" size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">
                  See How It Works
                </Button>
              </div>
            </AnimatedItem>
          </AnimatedGroup>
        </Container>
      </section>

      {/* Features Grid */}
      <Section padding="xl">
        <Container size="lg">
          <div className="space-y-16">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 0.1}>
                <motion.div
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
                    index % 2 === 1 && "lg:flex-row-reverse"
                  )}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Content */}
                  <div className={cn(index % 2 === 1 && "lg:order-2")}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200/50">
                        <feature.icon className="w-7 h-7 text-primary-600" />
                      </div>
                      <span className="text-sm font-semibold text-primary-600">
                        0{index + 1}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
                      {feature.title}
                    </h2>
                    
                    <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary-600" />
                          </div>
                          <span className="text-neutral-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className={cn("relative", index % 2 === 1 && "lg:order-1")}>
                    <motion.div
                      className="bg-white rounded-3xl p-8 border border-neutral-100"
                      style={{
                        boxShadow: "0 4px 6px -1px rgba(102, 0, 7, 0.05), 0 20px 40px -10px rgba(102, 0, 7, 0.1)",
                      }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400 rounded-t-3xl" />
                      
                      {/* Mock UI */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                              <feature.icon className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <div className="h-3 w-24 bg-neutral-200 rounded" />
                              <div className="h-2 w-16 bg-neutral-100 rounded mt-1" />
                            </div>
                          </div>
                          <div className="w-16 h-6 bg-primary-100 rounded-full" />
                        </div>
                        
                        <div className="h-px bg-neutral-100" />
                        
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded bg-primary-100" />
                              <div className="h-2 flex-1 bg-neutral-100 rounded" style={{ width: `${70 + i * 10}%` }} />
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-4 border-t border-neutral-100">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={cn("w-2 h-2 rounded-full", i <= index + 1 ? "bg-primary-500" : "bg-neutral-200")} />
                              ))}
                            </div>
                            <div className="h-4 w-20 bg-primary-100 rounded" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Build Your
              <span className="text-gradient block">Framework?</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto mb-8">
              Start with one pillar or integrate all five. The journey to exceptional living begins with a single step.
            </p>
            <Button variant="primary" size="xl" className="group">
              Get Started Free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
