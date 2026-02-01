"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityTimelineProps {
  items?: { title: string; content: string }[]
  className?: string
}

function TimelineItem({
  item,
  index,
}: {
  item: { title: string; content: string }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.95, 1])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="flex gap-8 md:gap-12 relative pb-16 last:pb-0"
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center border-4 border-neutral-200 dark:border-neutral-800 z-10"
        >
          <div className="h-3 w-3 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        </motion.div>
        {/* Connector line */}
        <div className="flex-1 w-px bg-neutral-200 dark:bg-neutral-800" />
      </div>
      {/* Content */}
      <div className="pt-1 flex-1">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="text-lg md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3"
        >
          {item.title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
          className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed prose dark:prose-invert max-w-none"
        >
          {item.content}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function AceternityTimeline({
  items = [
    {
      title: "2024 - The Beginning",
      content:
        "We started our journey with a simple idea: make web development more accessible and enjoyable for everyone. Our first product launched to an overwhelmingly positive response.",
    },
    {
      title: "Early 2025 - Growth Phase",
      content:
        "Our user base grew by 10x as developers discovered the power of our component library. We expanded our team and introduced premium features that changed how people build websites.",
    },
    {
      title: "Mid 2025 - Platform Launch",
      content:
        "We launched our full platform with integrated design tools, component marketplace, and deployment pipelines. This marked a turning point in our company's evolution.",
    },
    {
      title: "Late 2025 - Community",
      content:
        "Our community reached 100,000 developers. Open-source contributions doubled, and we hosted our first developer conference with speakers from around the world.",
    },
    {
      title: "2026 - The Future",
      content:
        "Looking ahead, we're focused on AI-powered development tools, real-time collaboration features, and expanding our ecosystem to support more frameworks and platforms.",
    },
  ],
  className,
}: AceternityTimelineProps) {
  return (
    <div className={cn("max-w-4xl mx-auto px-4 py-20", className)}>
      <div className="relative">
        {items.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
