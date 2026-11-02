"use client";
import React from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Horizontal scroll-progress bar pinned to the top of the viewport. */
export function TracingBeam({ target, children, className }: {
  target?: HTMLElement;
  children?: React.ReactNode;
  className?: string;
}) {
  // 0 at the document top, 1 at its maximum scroll. No spring, so the bar
  // follows the scroll exactly and restored positions render without a tween.
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  const bar = (
    <div className="cc-tracing-beam" aria-hidden="true">
      {!reduceMotion && <motion.div className="cc-tracing-fill" style={{ scaleX: scrollYProgress }} />}
    </div>
  );

  if (target) return bar;
  return <div className={cn("cc-tracing-content", className)}>{bar}{children}</div>;
}
