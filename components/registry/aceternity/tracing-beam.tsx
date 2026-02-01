"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityTracingBeamProps {
  content?: {
    title: string
    description: string
    badge?: string
    image?: string
  }[]
  className?: string
}

export default function AceternityTracingBeam({
  content = [
    {
      title: "Getting Started",
      description:
        "Begin your journey by setting up the development environment. Install the required dependencies and configure your project settings for optimal performance.",
      badge: "Step 1",
      image: "https://placehold.co/600x300/1a1a2e/ffffff?text=Step+1",
    },
    {
      title: "Building Components",
      description:
        "Create reusable components that follow best practices. Use composition patterns and proper state management to build scalable applications.",
      badge: "Step 2",
      image: "https://placehold.co/600x300/16213e/ffffff?text=Step+2",
    },
    {
      title: "Deploying to Production",
      description:
        "Deploy your application with confidence. Set up CI/CD pipelines, configure monitoring, and ensure your app is ready for real-world traffic.",
      badge: "Step 3",
      image: "https://placehold.co/600x300/0f3460/ffffff?text=Step+3",
    },
  ],
  className,
}: AceternityTracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const contentRef = useRef<HTMLDivElement>(null)

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 0]),
    { stiffness: 500, damping: 90 }
  )
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 0]),
    { stiffness: 500, damping: 90 }
  )
  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div ref={ref} className={cn("relative w-full max-w-4xl mx-auto py-20", className)}>
      <div className="absolute left-8 top-0 bottom-0 w-px overflow-hidden">
        {/* Background beam line */}
        <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
        {/* Animated progress line */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent"
          style={{ height: heightTransform, opacity: opacityTransform }}
        />
      </div>
      <div ref={contentRef} className="relative pl-20">
        {content.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-20 last:mb-0"
          >
            {/* Dot indicator */}
            <div className="absolute left-[25px] w-[10px] h-[10px] rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black" style={{ marginTop: 6 }} />
            {item.badge && (
              <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-black dark:bg-white text-white dark:text-black rounded-full">
                {item.badge}
              </span>
            )}
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              {item.description}
            </p>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="rounded-lg w-full max-w-md shadow-md"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
