"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityHeroHighlightProps {
  title?: string
  highlightedText?: string
  subtitle?: string
  ctaButtons?: { text: string; href: string; variant?: "primary" | "secondary" }[]
  image?: string
  className?: string
}

function HeroHighlightBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-purple-50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at var(--x, 50%) var(--y, 50%), rgba(120,119,198,0.15), transparent 80%)",
        }}
        animate={{
          "--x": ["40%", "60%", "40%"],
          "--y": ["40%", "60%", "40%"],
        } as any}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      className="relative inline-block px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500 bg-no-repeat bg-left-bottom"
      style={{ backgroundPosition: "0 85%" }}
    >
      {children}
    </motion.span>
  )
}

export default function AceternityHeroHighlight({
  title = "Build amazing websites with",
  highlightedText = "incredible speed",
  subtitle = "Create stunning, responsive web experiences using our powerful platform. No coding required.",
  ctaButtons = [
    { text: "Get Started", href: "#", variant: "primary" as const },
    { text: "Learn More", href: "#", variant: "secondary" as const },
  ],
  image,
  className,
}: AceternityHeroHighlightProps) {
  return (
    <div className={cn("relative min-h-[600px] flex items-center justify-center overflow-hidden", className)}>
      <HeroHighlightBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-neutral-800 dark:text-white leading-tight"
        >
          {title}{" "}
          <Highlight>{highlightedText}</Highlight>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
        {ctaButtons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            {ctaButtons.map((btn, i) => (
              <a
                key={i}
                href={btn.href}
                className={cn(
                  "px-6 py-3 rounded-full font-medium text-sm transition-all duration-200",
                  btn.variant === "secondary"
                    ? "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                    : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-lg"
                )}
              >
                {btn.text}
              </a>
            ))}
          </motion.div>
        )}
        {image && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="mt-12"
          >
            <img
              src={image}
              alt="Hero"
              className="rounded-2xl shadow-2xl mx-auto max-w-full"
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
