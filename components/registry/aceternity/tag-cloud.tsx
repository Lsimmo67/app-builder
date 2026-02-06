"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityTagCloudProps {
  tags?: { label: string; count?: number }[]
  className?: string
}

const defaultTags = [
  { label: "React", count: 120 },
  { label: "Next.js", count: 95 },
  { label: "TypeScript", count: 88 },
  { label: "Tailwind CSS", count: 75 },
  { label: "Framer Motion", count: 65 },
  { label: "Node.js", count: 60 },
  { label: "GraphQL", count: 45 },
  { label: "Prisma", count: 40 },
  { label: "PostgreSQL", count: 35 },
  { label: "Docker", count: 30 },
  { label: "AWS", count: 28 },
  { label: "Vercel", count: 25 },
  { label: "Redis", count: 22 },
  { label: "Testing", count: 20 },
  { label: "CI/CD", count: 18 },
]

const colors = [
  "from-purple-500 to-purple-600",
  "from-cyan-500 to-cyan-600",
  "from-pink-500 to-pink-600",
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-amber-500 to-amber-600",
  "from-violet-500 to-violet-600",
  "from-rose-500 to-rose-600",
]

export default function AceternityTagCloud({
  tags = defaultTags,
  className,
}: AceternityTagCloudProps) {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  const maxCount = Math.max(...tags.map((t) => t.count || 1))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 p-8 max-w-2xl mx-auto",
        className
      )}
    >
      {tags.map((tag, idx) => {
        const size = tag.count ? (tag.count / maxCount) * 0.6 + 0.6 : 1
        const colorClass = colors[idx % colors.length]
        const isHovered = hoveredTag === tag.label

        return (
          <motion.button
            key={tag.label}
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{
              opacity: hoveredTag && !isHovered ? 0.4 : 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: idx * 0.04,
              duration: 0.4,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredTag(tag.label)}
            onMouseLeave={() => setHoveredTag(null)}
            className="relative group"
            style={{ fontSize: `${Math.max(size * 0.875, 0.75)}rem` }}
          >
            <motion.span
              className={cn(
                "relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-medium transition-colors",
                isHovered
                  ? "bg-gradient-to-r text-white border-transparent " + colorClass
                  : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600"
              )}
            >
              {tag.label}
              {tag.count && (
                <span
                  className={cn(
                    "text-[0.65em] transition-colors",
                    isHovered ? "text-white/70" : "text-neutral-600"
                  )}
                >
                  {tag.count}
                </span>
              )}
            </motion.span>

            {/* Glow effect */}
            {isHovered && (
              <motion.div
                layoutId="tag-glow"
                className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-r opacity-30 blur-md -z-10",
                  colorClass
                )}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </motion.button>
        )
      })}
    </motion.div>
  )
}
