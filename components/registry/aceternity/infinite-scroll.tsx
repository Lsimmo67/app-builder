"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityInfiniteScrollProps {
  items?: { title: string; description: string; tag?: string }[]
  batchSize?: number
  className?: string
}

const defaultItems = Array.from({ length: 50 }, (_, i) => ({
  title: `Item ${i + 1}`,
  description: `This is the description for item number ${i + 1}. It contains useful information about this particular entry.`,
  tag: ["Design", "Dev", "Marketing", "Product", "Engineering"][i % 5],
}))

const tagColors: Record<string, string> = {
  Design: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  Dev: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  Marketing: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Product: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Engineering: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
}

export default function AceternityInfiniteScroll({
  items = defaultItems,
  batchSize = 8,
  className,
}: AceternityInfiniteScrollProps) {
  const [visibleCount, setVisibleCount] = useState(batchSize)
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    if (isLoading || visibleCount >= items.length) return
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + batchSize, items.length))
      setIsLoading(false)
    }, 800)
  }, [isLoading, visibleCount, items.length, batchSize])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const sentinel = sentinelRef.current
    if (sentinel) observer.observe(sentinel)
    return () => {
      if (sentinel) observer.unobserve(sentinel)
    }
  }, [loadMore])

  const visibleItems = items.slice(0, visibleCount)

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto h-[500px] overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950",
        className
      )}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-300">
          Items ({visibleCount} of {items.length})
        </p>
        <div className="w-16 h-1 rounded-full bg-neutral-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            animate={{ width: `${(visibleCount / items.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* List */}
      <div className="p-2 space-y-1">
        {visibleItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (idx % batchSize) * 0.05 }}
            whileHover={{ x: 4 }}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-800/30 transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-xs font-mono text-neutral-500 shrink-0 group-hover:bg-neutral-700 transition-colors">
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-neutral-300 truncate">
                  {item.title}
                </p>
                {item.tag && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded border font-medium shrink-0",
                      tagColors[item.tag] || "text-neutral-400 bg-neutral-800 border-neutral-700"
                    )}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-600 mt-0.5 truncate">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-6 gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-500"
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}

      {/* End message */}
      {visibleCount >= items.length && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-neutral-600 py-6"
        >
          You have reached the end
        </motion.p>
      )}

      {/* Intersection observer sentinel */}
      <div ref={sentinelRef} className="h-1" />
    </div>
  )
}
