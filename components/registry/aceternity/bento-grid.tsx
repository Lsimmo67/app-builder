"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityBentoGridProps {
  items?: {
    title: string
    description: string
    icon?: string
    colSpan?: 1 | 2
    rowSpan?: 1 | 2
    className?: string
  }[]
  className?: string
}

function BentoGridItem({
  item,
  index,
}: {
  item: {
    title: string
    description: string
    icon?: string
    colSpan?: 1 | 2
    rowSpan?: 1 | 2
    className?: string
  }
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition-shadow duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        item.colSpan === 2 && "md:col-span-2",
        item.rowSpan === 2 && "md:row-span-2",
        item.className
      )}
    >
      <div className="flex-1 flex flex-col justify-end">
        {/* Decorative header area */}
        <div className="h-24 w-full rounded-lg bg-gradient-to-br from-neutral-200 dark:from-neutral-900 to-neutral-100 dark:to-neutral-800 mb-4 flex items-center justify-center">
          {item.icon && <span className="text-4xl">{item.icon}</span>}
        </div>
        <div className="group-hover/bento:translate-x-2 transition-transform duration-200">
          {item.icon && !item.icon.startsWith("<") && (
            <span className="text-2xl mb-2 inline-block">{item.icon}</span>
          )}
          <h3 className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {item.title}
          </h3>
          <p className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function AceternityBentoGrid({
  items = [
    {
      title: "The Dawn of Innovation",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      icon: "🌅",
      colSpan: 2 as const,
      rowSpan: 1 as const,
    },
    {
      title: "The Digital Revolution",
      description: "Dive into the transformative power of technology.",
      icon: "💻",
    },
    {
      title: "The Art of Design",
      description: "Discover the beauty of thoughtful and functional design.",
      icon: "🎨",
    },
    {
      title: "The Power of Communication",
      description: "Understand the impact of effective communication in our lives.",
      icon: "💬",
    },
    {
      title: "The Pursuit of Knowledge",
      description: "Join the quest for understanding and enlightenment.",
      icon: "📚",
      colSpan: 2 as const,
    },
    {
      title: "The Joy of Creation",
      description: "Experience the thrill of bringing ideas to life.",
      icon: "🚀",
    },
    {
      title: "The Spirit of Adventure",
      description: "Embark on exciting journeys and discover new horizons.",
      icon: "🌍",
    },
  ],
  className,
}: AceternityBentoGridProps) {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {items.map((item, i) => (
        <BentoGridItem key={i} item={item} index={i} />
      ))}
    </div>
  )
}
