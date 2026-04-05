"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/animated";

export function CTASection() {
  return (
    <Section padding="xl" className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1518837695000-672f9b68445a?w=1920&q=80"
          alt="Person looking at horizon"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/95 via-white/90 to-primary-100/95" />
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-bg opacity-30 z-[1]" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-300/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container size="md" className="relative z-10">
        <FadeIn className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-200 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-neutral-700">
              Your journey begins here
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Ready to Forge Your
            <span className="text-gradient block mt-2">Best Self?</span>
          </h2>

          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of visionaries who have transformed scattered ambition
            into systematic achievement. The life you want is waiting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="premium" size="xl" className="group min-w-[200px]">
              Start Free Today
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-sm text-neutral-500">
              No credit card required • Cancel anytime
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500" />
                256-bit encryption
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500" />
                GDPR compliant
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500" />
                SOC 2 certified
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
