"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityEmptyStateProps {
  title?: string
  description?: string
  icon?: string
  actionLabel?: string
  className?: string
}

export default function AceternityEmptyState({
  title = "No items yet",
  description = "Get started by creating your first item. It only takes a few seconds.",
  icon = "inbox",
  actionLabel = "Create New",
  className,
}: AceternityEmptyStateProps) {
  const icons: Record<string, React.ReactNode> = {
    inbox: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    search: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    file: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={cn(
        "flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50",
        className
      )}
    >
      {/* Animated icon */}
      <motion.div
        className="text-neutral-600 mb-6"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-cyan-500/10 blur-2xl rounded-full" />
          <div className="relative">
            {icons[icon] || icons.inbox}
          </div>
        </div>
      </motion.div>

      {/* Decorative dots */}
      <div className="flex gap-1 mb-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-neutral-700"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-neutral-300 mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-neutral-500 text-center max-w-sm mb-6"
      >
        {description}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-colors"
      >
        {actionLabel}
      </motion.button>
    </motion.div>
  )
}
