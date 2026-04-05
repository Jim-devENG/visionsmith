"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextProps extends HTMLMotionProps<"div"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  variant?: "display" | "hero" | "h1" | "h2" | "h3" | "h4" | "body" | "lead" | "small";
  gradient?: boolean;
  weight?: "normal" | "medium" | "semibold" | "bold";
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, as: Component = "p", variant = "body", gradient = false, weight, children, ...props }, ref) => {
    const variantClasses = {
      display: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]",
      hero: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]",
      h1: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight",
      h2: "text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug",
      h3: "text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-snug",
      h4: "text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-snug",
      body: "text-base md:text-lg leading-relaxed",
      lead: "text-lg md:text-xl lg:text-2xl leading-relaxed text-neutral-600 dark:text-neutral-400",
      small: "text-sm md:text-base leading-normal text-neutral-500 dark:text-neutral-400",
    };

    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const MotionComponent = motion[Component as keyof typeof motion] as React.FC<HTMLMotionProps<any>>;

    return (
      <MotionComponent
        ref={ref}
        className={cn(
          variantClasses[variant],
          weight && weightClasses[weight],
          gradient && "text-gradient",
          className
        )}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);
Text.displayName = "Text";

export { Text };
