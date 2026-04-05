"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Target, Compass, Zap, Shield, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/ui/animated";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Target,
    title: "Crystal Clear Vision",
    description: "Define what truly matters. Cut through noise, distractions, and half-hearted goals to find your true north.",
    color: "primary-600",
  },
  {
    icon: Compass,
    title: "Strategic Direction",
    description: "Every step mapped with intention. No wandering, no wasted effort—only deliberate progress toward your vision.",
    color: "primary-500",
  },
  {
    icon: Zap,
    title: "Disciplined Execution",
    description: "Turn plans into reality through structured daily practices. Build momentum that compounds into transformation.",
    color: "primary-700",
  },
  {
    icon: Shield,
    title: "Resilient Mindset",
    description: "Develop the mental frameworks to stay the course when motivation fades and obstacles arise.",
    color: "primary-600",
  },
  {
    icon: Layers,
    title: "Integrated Systems",
    description: "Connect every area of your life—health, wealth, relationships, growth—into one cohesive architecture.",
    color: "primary-500",
  },
];

export function FeaturesSection() {
  return (
    <Section id="features" variant="default" padding="xl">
      <Container size="lg">
        <AnimatedGroup stagger={0.1} className="text-center mb-16 md:mb-20">
          <AnimatedItem>
            <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-4 block">
              Core Pillars
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              The Framework for
              <span className="text-gradient block mt-2">Exceptional Living</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              Five interconnected pillars that transform scattered ambition into
              systematic achievement.
            </p>
          </AnimatedItem>
        </AnimatedGroup>

        {/* Unique Staggered Card Layout */}
        <div className="relative">
          {/* First Row - 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {features.slice(0, 2).map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 0.1}>
                <motion.div
                  className="group relative bg-white rounded-3xl p-8 md:p-10 border border-neutral-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    boxShadow: "0 4px 6px -1px rgba(102, 0, 7, 0.05), 0 10px 20px -5px rgba(102, 0, 7, 0.08), 0 25px 50px -12px rgba(102, 0, 7, 0.1)",
                  }}
                >
                  {/* Accent Line */}
                  <div className={cn(
                    "absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-transparent via-primary-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  )} />
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200/50"
                    )}>
                      <feature.icon className={cn("w-8 h-8", `text-${feature.color}`)} style={{ color: `var(--${feature.color})` }} />
                    </div>
                    {/* Decorative dot */}
                    <div className={cn(
                      "absolute -top-1 -right-1 w-3 h-3 rounded-full",
                      `bg-${feature.color}`
                    )} style={{ backgroundColor: `var(--${feature.color})` }} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-base md:text-lg">
                    {feature.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-600">0{index + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                      <svg className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Second Row - 3 Cards with middle one elevated */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.slice(2).map((feature, index) => (
              <FadeIn key={feature.title} delay={(index + 2) * 0.1}>
                <motion.div
                  className={cn(
                    "group relative bg-white rounded-3xl p-8 md:p-10 border border-neutral-100",
                    index === 1 && "md:-mt-8"
                  )}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    boxShadow: "0 4px 6px -1px rgba(102, 0, 7, 0.05), 0 10px 20px -5px rgba(102, 0, 7, 0.08), 0 25px 50px -12px rgba(102, 0, 7, 0.1)",
                  }}
                >
                  {/* Accent Line */}
                  <div className={cn(
                    "absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r from-transparent via-primary-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  )} />
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200/50"
                    )}>
                      <feature.icon className={cn("w-8 h-8", `text-${feature.color}`)} style={{ color: `var(--${feature.color})` }} />
                    </div>
                    {/* Decorative dot */}
                    <div className={cn(
                      "absolute -top-1 -right-1 w-3 h-3 rounded-full",
                      `bg-${feature.color}`
                    )} style={{ backgroundColor: `var(--${feature.color})` }} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-base md:text-lg">
                    {feature.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-600">0{index + 3}</span>
                    <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                      <svg className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
