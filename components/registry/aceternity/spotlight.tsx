"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternitySpotlightProps {
  title?: string
  subtitle?: string
  description?: string
  ctaButtons?: { text: string; href: string; variant?: "primary" | "secondary" }[]
  className?: string
}

function Spotlight({ className, fill }: { className?: string; fill?: string }) {
  return (
    <motion.svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </motion.svg>
  )
}

export default function AceternitySpotlight({
  title = "Spotlight Effect That Draws Attention",
  subtitle = "Beautiful animated spotlight",
  description = "Illuminate your content with a stunning spotlight effect that guides the user's eye to what matters most.",
  ctaButtons = [
    { text: "Get Started", href: "#", variant: "primary" as const },
    { text: "Learn More", href: "#", variant: "secondary" as const },
  ],
  className,
}: AceternitySpotlightProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[600px] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased bg-grid-white/[0.02] items-center justify-center",
        className
      )}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="relative z-10 mx-auto w-full max-w-4xl p-4 pt-20 md:pt-0 text-center">
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-7xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-6 max-w-lg text-base font-normal text-neutral-300"
          >
            {description}
          </motion.p>
        )}
        {ctaButtons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            {ctaButtons.map((btn, i) => (
              <a
                key={i}
                href={btn.href}
                className={cn(
                  "px-6 py-3 rounded-full font-medium text-sm transition-all duration-200",
                  btn.variant === "secondary"
                    ? "border border-neutral-600 text-neutral-300 hover:bg-neutral-800"
                    : "bg-white text-black hover:bg-neutral-200 shadow-lg"
                )}
              >
                {btn.text}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
