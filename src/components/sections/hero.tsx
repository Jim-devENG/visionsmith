"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/ui/animated";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32a4c?w=1920&q=80"
          alt="Mountain landscape at sunrise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90" />
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-bg opacity-50 z-[1]" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl z-[2]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-400/15 rounded-full blur-3xl z-[2]"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl z-[2]"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container size="lg" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedGroup stagger={0.15}>
            {/* Badge */}
            <AnimatedItem>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  The Future of Self-Mastery
                </span>
              </motion.div>
            </AnimatedItem>

            {/* Headline */}
            <AnimatedItem>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-6">
                <span className="block">Forge Your</span>
                <span className="block text-gradient">Vision Into</span>
                <span className="block">Reality</span>
              </h1>
            </AnimatedItem>

            {/* Subheadline */}
            <AnimatedItem>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                VisionSmith is the discipline platform for those who refuse to drift.
                Clarity, structure, and execution—for the life you actually want.
              </p>
            </AnimatedItem>

            {/* CTAs */}
            <AnimatedItem>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="premium" size="xl" className="group">
                  Begin Your Journey
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="xl">
                  See How It Works
                </Button>
              </div>
            </AnimatedItem>

            {/* Social Proof */}
            <AnimatedItem>
              <div className="mt-16 pt-8 border-t border-neutral-200">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-500">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white"
                        />
                      ))}
                    </div>
                    <span>2,000+ visionaries</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-neutral-300" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-primary-500">★</span>
                    <span>4.9/5 from 500+ reviews</span>
                  </div>
                </div>
              </div>
            </AnimatedItem>
          </AnimatedGroup>
        </div>
      </Container>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
