"use client";
import React, { useEffect, useRef, useState, useId } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Trace an existing page without moving or replacing its content. */
export function TracingBeam({ target, children, className }: {
  target?: HTMLElement;
  children?: React.ReactNode;
  className?: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const gradientId = `tracing-${useId().replace(/:/g, "")}`;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const content = target ?? contentRef.current;
    if (!content) return;
    // The fixed overlay cannot contribute to document height, so measuring the
    // full scrolling document stays stable as images and sections change size.
    const measure = () => setHeight(target
      ? document.documentElement.scrollHeight
      : content.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    if (target) observer.observe(document.documentElement);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [target]);

  // One source of truth: 0 at the document top, 1 at its maximum scroll.
  // No spring or reading-line offset: reversing direction follows the scroll
  // immediately and restored scroll positions render without a catch-up tween.
  const { scrollY, scrollYProgress } = useScroll();
  const position = useTransform(scrollYProgress, [0, 1], [3, Math.max(3, height - 3)]);
  const pageOffset = useTransform(scrollY, value => target ? -value : 0);
  const tail = useTransform(position, value => value - 220);
  const head = useTransform(position, value => value + 40);

  const beam = height > 0 && (
    <motion.svg style={{ y: pageOffset }} className="cc-tracing-beam" width="20" height={height}
      viewBox={`0 0 20 ${height}`} aria-hidden="true" focusable="false">
      <path d={`M 10 0 V ${height}`} fill="none" stroke="currentColor" strokeOpacity="0.16" />
      {!reduceMotion && <>
        <motion.path d={`M 10 0 V ${height}`} fill="none"
          stroke={`url(#${gradientId})`} strokeWidth="1.5" />
        <motion.circle cx="10" cy={position} r="3" fill="#6344F5" />
        <defs>
          <motion.linearGradient id={gradientId} gradientUnits="userSpaceOnUse"
            x1="0" x2="0" y1={tail} y2={head}>
            <stop stopColor="#18CCFC" stopOpacity="0" />
            <stop offset="0.35" stopColor="#18CCFC" />
            <stop offset="0.75" stopColor="#6344F5" />
            <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </>}
    </motion.svg>
  );

  if (target) return beam;
  return <div ref={contentRef} className={cn("cc-tracing-content", className)}>{beam}{children}</div>;
}
