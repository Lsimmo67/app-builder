"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface DynamicIslandItem {
  icon: React.ReactNode
  label: string
  expandedContent: React.ReactNode
}

export interface SkiperDynamicIslandProps {
  items?: DynamicIslandItem[]
  variant?: "default" | "compact" | "wide"
  className?: string
}

const defaultItems: DynamicIslandItem[] = [
  {
    icon: <span className="text-sm">🎵</span>,
    label: "Now Playing",
    expandedContent: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
        <div>
          <p className="text-sm font-medium text-white">Blinding Lights</p>
          <p className="text-xs text-white/60">The Weeknd</p>
        </div>
      </div>
    ),
  },
  {
    icon: <span className="text-sm">📞</span>,
    label: "Incoming Call",
    expandedContent: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">
          JD
        </div>
        <div>
          <p className="text-sm font-medium text-white">John Doe</p>
          <p className="text-xs text-white/60">Mobile</p>
        </div>
      </div>
    ),
  },
  {
    icon: <span className="text-sm">⏱️</span>,
    label: "Timer",
    expandedContent: (
      <div className="text-center">
        <p className="text-2xl font-mono font-bold text-white">03:24</p>
        <p className="text-xs text-white/60">Running</p>
      </div>
    ),
  },
]

export default function SkiperDynamicIsland({
  items = defaultItems,
  variant = "default",
  className,
}: SkiperDynamicIslandProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const isExpanded = expandedIndex !== null

  const widthMap = {
    default: "w-[180px]",
    compact: "w-[140px]",
    wide: "w-[220px]",
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <motion.div
        className="relative cursor-pointer overflow-hidden rounded-full bg-black shadow-2xl"
        animate={{
          width: isExpanded ? 320 : undefined,
          height: isExpanded ? "auto" : 36,
          borderRadius: isExpanded ? 24 : 18,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={() => setExpandedIndex(null)}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              {items[expandedIndex!]?.expandedContent}
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex h-9 items-center justify-center gap-2 px-4",
                widthMap[variant]
              )}
            >
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <div className="h-2 w-6 rounded-full bg-white/20" />
              <div className="h-2 w-2 rounded-full bg-white/40" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex gap-2">
        {items.map((item, index) => (
          <motion.button
            key={index}
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
              expandedIndex === index
                ? "border-white/30 bg-white/10 text-white"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
