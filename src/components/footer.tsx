"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Link2, Mail, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/animated";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Roadmap", href: "#" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Community", href: "#" },
    { label: "Support", href: "#" },
    { label: "API", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { icon: ArrowUpRight, href: "#", label: "Twitter" },
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: ExternalLink, href: "#", label: "GitHub" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative bg-neutral-100 border-t border-neutral-200">
      <Container size="lg" className="py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <FadeIn>
              <motion.a
                href="/"
                className="inline-block text-xl font-bold tracking-tight mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-gradient">VisionSmith</span>
              </motion.a>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6 max-w-xs">
                The discipline platform for those who refuse to drift.
                Clarity, structure, and execution—for the life you actually want.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <FadeIn key={category} delay={index * 0.1}>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-4 capitalize">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Bar */}
        <FadeIn delay={0.4}>
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-neutral-500">
                © {new Date().getFullYear()} VisionSmith. All rights reserved.
              </p>
              <p className="text-sm text-neutral-500">
                Crafted with intention for those who build.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </footer>
  );
}
