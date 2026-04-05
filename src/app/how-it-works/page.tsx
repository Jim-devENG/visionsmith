"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, ArrowRight, Play, Lightbulb, Target, Rocket, TrendingUp, Clock, Users, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/ui/animated";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const phases = [
  {
    number: 1,
    title: "Discovery",
    subtitle: "Find Your True North",
    description: "We start by understanding who you are, what drives you, and what you truly want. This isn't surface-level goal setting—it's deep excavation of your authentic desires.",
    icon: Target,
    duration: "2 weeks",
    color: "from-primary-400 to-primary-500",
    activities: [
      "Complete life audit across 8 dimensions",
      "Uncover core values and beliefs",
      "Define your 5-year vision with precision",
      "Identify limiting patterns and blocks",
    ],
    outcome: "Crystal-clear vision document",
  },
  {
    number: 2,
    title: "Architecture",
    subtitle: "Build Your Blueprint",
    description: "Transform your vision into a strategic roadmap. We reverse-engineer your goals into quarterly milestones, monthly objectives, and weekly action plans.",
    icon: Lightbulb,
    duration: "2 weeks",
    color: "from-primary-500 to-primary-600",
    activities: [
      "Create milestone mapping system",
      "Design daily success routines",
      "Build obstacle anticipation frameworks",
      "Establish tracking mechanisms",
    ],
    outcome: "Complete action roadmap",
  },
  {
    number: 3,
    title: "Execution",
    subtitle: "Take Consistent Action",
    description: "This is where transformation happens. Daily disciplines compound into extraordinary results. We provide the structure, accountability, and tools to stay on track.",
    icon: Rocket,
    duration: "Ongoing",
    color: "from-primary-600 to-primary-700",
    activities: [
      "Morning and evening protocols",
      "Weekly review and planning sessions",
      "Real-time progress tracking",
      "Habit stacking and optimization",
    ],
    outcome: "Consistent daily progress",
  },
  {
    number: 4,
    title: "Evolution",
    subtitle: "Refine and Expand",
    description: "Growth isn't linear—it's iterative. We continuously analyze results, optimize systems, and expand your vision as you achieve what once seemed impossible.",
    icon: TrendingUp,
    duration: "Monthly",
    color: "from-primary-500 to-primary-600",
    activities: [
      "Monthly retrospective analysis",
      "System optimization cycles",
      "Vision expansion protocols",
      "Performance analytics review",
    ],
    outcome: "Accelerated achievement",
  },
];

const stats = [
  { value: "94%", label: "Success Rate", icon: Target },
  { value: "2.5M+", label: "Goals Achieved", icon: TrendingUp },
  { value: "10K+", label: "Active Users", icon: Users },
  { value: "45+", label: "Countries", icon: Rocket },
];

const features = [
  {
    icon: Clock,
    title: "Time-Boxed Sprints",
    description: "Work in focused 2-week cycles with clear deliverables and milestones.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with fellow practitioners for accountability and inspiration.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Real-time analytics show your progress and highlight optimization opportunities.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32a4c?w=1920&q=80"
            alt="Mountain landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-primary-50/80" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl" />
        
        <Container size="lg" className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedGroup stagger={0.1}>
              <AnimatedItem>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-6">
                  <Play className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-medium text-primary-700">Watch Demo</span>
                </div>
              </AnimatedItem>
              <AnimatedItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                  A Proven Path to
                  <span className="text-gradient block">Your Best Life</span>
                </h1>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed mb-8 max-w-2xl">
                  Four phases. Countless transformations. Our methodology has helped thousands turn scattered ambition into systematic achievement.
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" size="lg" className="group">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" size="lg">
                    See Success Stories
                  </Button>
                </div>
              </AnimatedItem>
            </AnimatedGroup>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="relative py-8 bg-primary-600">
        <Container size="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-6 h-6 text-primary-200 mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Process Section - Card Based */}
      <Section padding="xl">
        <Container size="lg">
          <AnimatedGroup stagger={0.1} className="text-center mb-16">
            <AnimatedItem>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                The Four-Phase Framework
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Each phase builds on the previous, creating compound momentum toward your goals.
              </p>
            </AnimatedItem>
          </AnimatedGroup>

          {/* Phase Cards - Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => (
              <FadeIn key={phase.number} delay={index * 0.15}>
                <motion.div
                  className="group relative bg-white rounded-3xl p-6 border border-neutral-100 h-full"
                  style={{
                    boxShadow: "0 4px 6px -1px rgba(102, 0, 7, 0.03), 0 20px 40px -10px rgba(102, 0, 7, 0.08)",
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Phase number badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30">
                    {phase.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br",
                    phase.color
                  )}>
                    <phase.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-primary-600 font-medium mb-3">
                    {phase.subtitle}
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {phase.description}
                  </p>

                  {/* Duration badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 mb-4">
                    <Clock className="w-3.5 h-3.5 text-primary-600" />
                    <span className="text-xs font-medium text-primary-700">{phase.duration}</span>
                  </div>

                  {/* Activities */}
                  <ul className="space-y-2 mb-4">
                    {phase.activities.slice(0, 3).map((activity, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-neutral-600">{activity}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Outcome */}
                  <div className="pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                      <span className="text-xs font-medium text-neutral-500">Outcome:</span>
                    </div>
                    <p className="text-sm font-medium text-neutral-900 mt-1">{phase.outcome}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Detailed Process Flow */}
      <Section variant="muted" padding="xl">
        <Container size="lg">
          <div className="max-w-5xl mx-auto">
            <AnimatedGroup stagger={0.1} className="text-center mb-12">
              <AnimatedItem>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  How Each Phase Works
                </h2>
              </AnimatedItem>
            </AnimatedGroup>

            <div className="space-y-8">
              {phases.map((phase, index) => (
                <FadeIn key={phase.number} delay={index * 0.1}>
                  <motion.div
                    className={cn(
                      "flex flex-col md:flex-row gap-6 md:gap-8 items-start",
                      index % 2 === 1 && "md:flex-row-reverse"
                    )}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Visual */}
                    <div className="flex-1 w-full md:w-auto">
                      <div className="bg-white rounded-2xl p-6 border border-neutral-200 h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                            phase.color
                          )}>
                            <phase.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-neutral-900">{phase.title}</h3>
                            <p className="text-sm text-primary-600">{phase.subtitle}</p>
                          </div>
                        </div>
                        
                        {/* Activity list */}
                        <ul className="space-y-3">
                          {phase.activities.map((activity, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3.5 h-3.5 text-primary-600" />
                              </div>
                              <span className="text-sm text-neutral-700">{activity}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Connection Arrow */}
                    <div className="hidden lg:flex items-center justify-center w-16 flex-shrink-0">
                      {index < phases.length - 1 && (
                        <motion.div
                          className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4 text-primary-600" />
                        </motion.div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="flex-1 w-full md:w-auto">
                      <div className="prose prose-neutral">
                        <p className="text-neutral-600 leading-relaxed">
                          {phase.description}
                        </p>
                        <div className="mt-4 p-4 rounded-xl bg-primary-50 border border-primary-100">
                          <p className="text-sm font-medium text-primary-900">
                            ✓ Deliverable: {phase.outcome}
                          </p>
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

      {/* Features Grid */}
      <Section padding="xl">
        <Container size="lg">
          <AnimatedGroup stagger={0.1} className="text-center mb-12">
            <AnimatedItem>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Built for Success
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-lg text-neutral-600 max-w-xl mx-auto">
                Everything you need to turn intentions into achievements
              </p>
            </AnimatedItem>
          </AnimatedGroup>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-6 border border-neutral-200 text-center"
                  style={{
                    boxShadow: "0 2px 4px rgba(102, 0, 7, 0.02), 0 8px 16px rgba(102, 0, 7, 0.04)",
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-600 to-primary-700">
        <Container size="md">
          <FadeIn className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-lg text-primary-100 max-w-xl mx-auto mb-8">
              Join thousands who have already started their journey. Your future self will thank you.
            </p>
            <Button variant="outline" size="xl" className="group bg-white text-primary-600 hover:bg-primary-50">
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
