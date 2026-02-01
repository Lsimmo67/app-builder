"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityMeteorsProps {
  count?: number
  title?: string
  description?: string
  ctaText?: string
  className?: string
}

function Meteor({ delay, left, duration }: { delay: number; left: number; duration: number }) {
  return (
    <motion.span
      className="absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
      style={{
        top: -5,
        left: `${left}%`,
      }}
      initial={{ y: -20, x: 0, opacity: 0 }}
      animate={{
        y: ["-20px", "calc(100vh + 20px)"],
        x: ["0px", "calc(100vw * 0.3)"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
    </motion.span>
  )
}

export default function AceternityMeteors({
  count = 20,
  title = "Meteors because they look cool",
  description = "A beautiful meteor shower effect that adds a dynamic, cosmic feel to your sections. Each meteor travels across the screen with a trail effect.",
  ctaText = "Explore",
  className,
}: AceternityMeteorsProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 5,
      })),
    [count]
  )

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-8 py-10 shadow-2xl">
        <div className="absolute inset-0 overflow-hidden">
          {meteors.map((m) => (
            <Meteor
              key={m.id}
              left={m.left}
              delay={m.delay}
              duration={m.duration}
            />
          ))}
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="mb-6 text-base text-slate-400 leading-relaxed">
            {description}
          </p>
          {ctaText && (
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              {ctaText}
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
