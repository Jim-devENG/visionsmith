"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLMotionProps<"section"> {
  variant?: "default" | "muted" | "elevated" | "gradient";
  padding?: "sm" | "md" | "lg" | "xl";
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", padding = "lg", children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-transparent",
      muted: "bg-neutral-100",
      elevated: "bg-white shadow-sm",
      gradient: "bg-gradient-to-b from-transparent via-primary-50/30 to-transparent",
    };

    const paddingClasses = {
      sm: "py-12 md:py-16",
      md: "py-16 md:py-24",
      lg: "py-24 md:py-32",
      xl: "py-32 md:py-40",
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative w-full",
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);
Section.displayName = "Section";

export { Section };
