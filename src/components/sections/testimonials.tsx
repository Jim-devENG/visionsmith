"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/ui/animated";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "VisionSmith transformed how I approach my goals. What felt like scattered ambition became a clear, executable system. The discipline I've built here has compounded into every area of my life.",
    author: "Sarah Chen",
    role: "Founder & CEO, Luminary Labs",
    avatar: "SC",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b593a4?w=200&h=200&fit=crop&q=80",
  },
  {
    quote: "I've tried every productivity system out there. This is different. It's not about hacks—it's about architecture. In 6 months, I've accomplished more than the previous 2 years combined.",
    author: "Marcus Williams",
    role: "Software Engineer, Former Google",
    avatar: "MW",
    image: "https://images.unsplash.com/photo-1507003211169-0a6dd7228fbb?w=200&h=200&fit=crop&q=80",
  },
  {
    quote: "The clarity I've gained is invaluable. VisionSmith helped me see that I wasn't lacking motivation—I was lacking structure. Now I have both, and the results speak for themselves.",
    author: "Elena Rodriguez",
    role: "Partner, McKinsey & Company",
    avatar: "ER",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d35?w=200&h=200&fit=crop&q=80",
  },
];

const stats = [
  { value: "10,000+", label: "Active Practitioners" },
  { value: "2.5M+", label: "Goals Achieved" },
  { value: "94%", label: "Success Rate" },
  { value: "4.9/5", label: "User Rating" },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials" variant="default" padding="xl">
      <Container size="lg">
        <AnimatedGroup stagger={0.1} className="text-center mb-16 md:mb-20">
          <AnimatedItem>
            <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-4 block">
              Testimonials
            </span>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Trusted by Those Who
              <span className="text-gradient block mt-2">Refuse to Settle</span>
            </h2>
          </AnimatedItem>
        </AnimatedGroup>

        {/* Stats */}
        <FadeIn className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-neutral-100 border border-neutral-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.author} delay={index * 0.15}>
              <motion.div
                className="h-full bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 relative"
                style={{
                  boxShadow: "0 4px 6px -1px rgba(102, 0, 7, 0.03), 0 10px 20px -5px rgba(102, 0, 7, 0.05)",
                }}
                whileHover={{ y: -4 }}
              >
                <Quote className="w-8 h-8 text-primary-200 mb-4" />
                <p className="text-neutral-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-primary-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary-500 border-2 border-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
