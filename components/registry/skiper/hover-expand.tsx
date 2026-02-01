"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface HoverExpandItem {
  title: string
  image: string
  description: string
}

export interface SkiperHoverExpandProps {
  items?: HoverExpandItem[]
  className?: string
}

const defaultItems: HoverExpandItem[] = [
  {
    title: "Strategy",
    image: "https://placehold.co/600x400/6366f1/ffffff?text=Strategy",
    description: "We craft digital strategies that drive growth and engagement.",
  },
  {
    title: "Design",
    image: "https://placehold.co/600x400/ec4899/ffffff?text=Design",
    description: "Beautiful interfaces that delight users and achieve goals.",
  },
  {
    title: "Development",
    image: "https://placehold.co/600x400/14b8a6/ffffff?text=Development",
    description: "Robust code that scales and performs flawlessly.",
  },
  {
    title: "Launch",
    image: "https://placehold.co/600x400/f97316/ffffff?text=Launch",
    description: "Seamless deployment with ongoing support and optimization.",
  },
]

export default function SkiperHoverExpand({
  items = defaultItems,
  className,
}: SkiperHoverExpandProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className={cn("flex w-full gap-2", className)}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative cursor-pointer overflow-hidden rounded-2xl"
          animate={{
            flex: expandedIndex === index ? 4 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
          onMouseEnter={() => setExpandedIndex(index)}
          onMouseLeave={() => setExpandedIndex(null)}
        >
          <div className="relative h-[400px] w-full overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h3
              className="text-xl font-bold text-white"
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {item.title}
            </motion.h3>
            <motion.p
              className="mt-2 text-sm text-white/70"
              animate={{
                opacity: expandedIndex === index ? 1 : 0,
                height: expandedIndex === index ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {item.description}
            </motion.p>
          </div>

          {/* Index number */}
          <motion.span
            className="absolute left-4 top-4 font-mono text-sm text-white/40"
            animate={{
              opacity: expandedIndex === index ? 1 : 0.5,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}
