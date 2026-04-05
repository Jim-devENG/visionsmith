"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Target, Users, Heart, Lightbulb } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/ui/animated";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Target,
    title: "Intentionality",
    description: "Every action, every decision, every moment guided by purpose. We don't drift—we direct.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Individuals transform. Communities sustain. We rise together, not alone.",
  },
  {
    icon: Heart,
    title: "Authenticity",
    description: "No pretense. No performance. Real growth requires real honesty with yourself.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We question everything. The best systems evolve, and so do we.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former McKinsey partner turned entrepreneur. Sarah built VisionSmith after years of studying high performers and their systems.",
  },
  {
    name: "Marcus Williams",
    role: "Head of Product",
    bio: "Ex-Google engineer with a passion for behavior change. Marcus leads product development with a focus on user experience.",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Community",
    bio: "Community builder at heart. Elena fosters connections among our 10,000+ practitioners worldwide.",
  },
];

const stats = [
  { value: "10,000+", label: "Active Practitioners" },
  { value: "2.5M+", label: "Goals Achieved" },
  { value: "94%", label: "Success Rate" },
  { value: "45+", label: "Countries" },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="Team collaboration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 via-white/85 to-white/95" />
        </div>
        <Container size="lg" className="relative z-10">
          <AnimatedGroup stagger={0.1} className="text-center max-w-3xl mx-auto">
            <AnimatedItem>
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-4 block">
                About Us
              </span>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                We Believe in the
                <span className="text-gradient block mt-2">Power of Vision</span>
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                VisionSmith was born from a simple observation: the most successful people
                aren't smarter or luckier—they have better systems. We're here to help you build yours.
              </p>
            </AnimatedItem>
          </AnimatedGroup>
        </Container>
      </section>

      {/* Stats */}
      <Section padding="lg">
        <Container size="lg">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-neutral-50 border border-neutral-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Story Section */}
      <Section variant="muted" padding="xl">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                From Frustration to Framework
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  In 2020, our founder Sarah Chen hit a wall. Despite checking all the boxes—prestigious career,
                  impressive credentials, external success—she felt deeply unfulfilled. The problem wasn't
                  a lack of achievement. It was a lack of alignment.
                </p>
                <p>
                  What followed was a two-year deep dive into the systems, habits, and frameworks used by
                  history's most effective people. The insight was clear: success isn't about willpower or
                  talent. It's about architecture.
                </p>
                <p>
                  VisionSmith is the result of that journey—a platform designed to help others build the
                  systems that lead to meaningful, sustainable success.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <motion.div
                className="bg-white rounded-3xl p-8 border border-neutral-200 relative"
                style={{
                  boxShadow: "0 4px 6px -1px rgba(102, 0, 7, 0.05), 0 20px 40px -10px rgba(102, 0, 7, 0.1)",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400 rounded-t-3xl" />
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600">SC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Sarah Chen</div>
                      <div className="text-sm text-neutral-500">Founder & CEO</div>
                    </div>
                  </div>
                  <blockquote className="text-neutral-700 italic leading-relaxed pl-4 border-l-2 border-primary-200">
                    "I built VisionSmith because I needed it myself. Every feature, every framework,
                    every piece of content comes from real struggle and real discovery."
                  </blockquote>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section padding="xl">
        <Container size="lg">
          <AnimatedGroup stagger={0.1} className="text-center mb-12">
            <AnimatedItem>
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-4 block">
                Our Values
              </span>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                What We Stand For
              </h2>
            </AnimatedItem>
          </AnimatedGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-6 border border-neutral-200 text-center h-full"
                  style={{
                    boxShadow: "0 2px 4px rgba(102, 0, 7, 0.02), 0 8px 16px rgba(102, 0, 7, 0.04)",
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200/50 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section variant="muted" padding="xl">
        <Container size="lg">
          <AnimatedGroup stagger={0.1} className="text-center mb-12">
            <AnimatedItem>
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-4 block">
                The Team
              </span>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Meet the Builders
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-lg text-neutral-600 max-w-xl mx-auto">
                A small team with a big mission
              </p>
            </AnimatedItem>
          </AnimatedGroup>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-6 border border-neutral-200 text-center"
                  style={{
                    boxShadow: "0 2px 4px rgba(102, 0, 7, 0.02), 0 8px 16px rgba(102, 0, 7, 0.04)",
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="text-sm text-primary-600 mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {member.bio}
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Join the Movement
            </h2>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto mb-8">
              Be part of a community dedicated to intentional living and systematic achievement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" className="group">
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
