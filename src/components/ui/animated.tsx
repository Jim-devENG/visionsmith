"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGroupProps extends HTMLMotionProps<"div"> {
  stagger?: number;
  delay?: number;
}

const AnimatedGroup = React.forwardRef<HTMLDivElement, AnimatedGroupProps>(
  ({ className, stagger = 0.1, delay = 0, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
        className={cn("", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedGroup.displayName = "AnimatedGroup";

interface AnimatedItemProps extends HTMLMotionProps<"div"> {}

const AnimatedItem = React.forwardRef<HTMLDivElement, AnimatedItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }}
        className={cn("", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedItem.displayName = "AnimatedItem";

interface FadeInProps extends HTMLMotionProps<"div"> {
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ className, direction = "up", delay = 0, duration = 0.5, children, ...props }, ref) => {
    const directionOffset = {
      up: { y: 30 },
      down: { y: -30 },
      left: { x: 30 },
      right: { x: -30 },
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, ...directionOffset[direction] }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn("", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
FadeIn.displayName = "FadeIn";

interface ScaleInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

const ScaleIn = React.forwardRef<HTMLDivElement, ScaleInProps>(
  ({ className, delay = 0, duration = 0.5, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn("", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ScaleIn.displayName = "ScaleIn";

export { AnimatedGroup, AnimatedItem, FadeIn, ScaleIn };
