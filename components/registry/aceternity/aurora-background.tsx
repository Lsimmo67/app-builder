"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityAuroraBackgroundProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  showRadial?: boolean
  className?: string
}

export default function AceternityAuroraBackground({
  title = "Background lights are cool, you know.",
  subtitle = "A subtle yet beautiful aurora effect that adds depth to your hero sections.",
  ctaText = "Debug Now",
  ctaLink = "#",
  showRadial = true,
  className,
}: AceternityAuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-[600px] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -inset-[10px] opacity-50",
            showRadial &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
          )}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1d4ed8] via-[#7c3aed] to-[#db2777] blur-[80px] saturate-150"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "300% 300%" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-l from-[#0ea5e9] via-[#6366f1] to-[#a855f7] blur-[80px] saturate-150 mix-blend-overlay"
            animate={{
              backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 200%" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#22d3ee] via-transparent to-[#f472b6] blur-[60px] opacity-40"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-4 items-center justify-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="text-3xl md:text-7xl font-bold dark:text-white text-center"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="font-light text-base md:text-xl dark:text-neutral-200 text-center max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}
        {ctaText && (
          <motion.a
            href={ctaLink}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
            className="bg-black dark:bg-white rounded-full text-white dark:text-black px-6 py-3 text-sm font-medium mt-4 hover:opacity-80 transition-opacity"
          >
            {ctaText}
          </motion.a>
        )}
      </div>
    </div>
  )
}
