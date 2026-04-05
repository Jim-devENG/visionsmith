"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd4c2985?w=800&q=80",
  },
  {
    icon: Compass,
    title: "Strategic Direction",
    description: "Every step mapped with intention. No wandering, no wasted effort—only deliberate progress toward your vision.",
    color: "primary-500",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32a4c?w=800&q=80",
  },
  {
    icon: Zap,
    title: "Disciplined Execution",
    description: "Turn plans into reality through structured daily practices. Build momentum that compounds into transformation.",
    color: "primary-700",
    image: "https://images.unsplash.com/photo-1480070585560-940a29cc7c50?w=800&q=80",
  },
  {
    icon: Shield,
    title: "Resilient Mindset",
    description: "Develop the mental frameworks to stay the course when motivation fades and obstacles arise.",
    color: "primary-600",
    image: "https://images.unsplash.com/photo-1499750315032-8793872e5ee3?w=800&q=80",
  },
  {
    icon: Layers,
    title: "Integrated Systems",
    description: "Connect every area of your life—health, wealth, relationships, growth—into one cohesive architecture.",
    color: "primary-500",
    image: "https://images.unsplash.com/photo-1496128850523-5b8a6e4e67e4?w=800&q=80",
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
                  className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-100"
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
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    {/* Icon overlay */}
                    <div className="absolute bottom-4 left-6 z-10">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur-sm border border-primary-100 shadow-lg">
                        <feature.icon className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-base md:text-lg">
                      {feature.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600">0{index + 1}</span>
                      <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                        <svg className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
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
                    "group relative bg-white rounded-3xl overflow-hidden border border-neutral-100",
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
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    {/* Icon overlay */}
                    <div className="absolute bottom-4 left-6 z-10">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur-sm border border-primary-100 shadow-lg">
                        <feature.icon className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                      {feature.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600">0{index + 3}</span>
                      <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                        <svg className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
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
