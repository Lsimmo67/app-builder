"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityAnimatedModalProps {
  trigger?: string
  title?: string
  content?: string
  image?: string
  className?: string
}

export default function AceternityAnimatedModal({
  trigger = "Open Modal",
  title = "Book your flight today!",
  content = "Experience the best of air travel with our premium booking service. We offer competitive prices, flexible booking options, and exceptional customer service.",
  image = "https://placehold.co/800x400/1a1a2e/ffffff?text=Modal+Image",
  className,
}: AceternityAnimatedModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div className={cn(className)}>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
      >
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
                {/* Close button */}
                <div className="flex justify-end p-4 pb-0">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-neutral-600 dark:text-neutral-300"
                    >
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* Image */}
                {image && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="px-6"
                  >
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </motion.div>
                )}
                {/* Content */}
                <div className="p-6">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-3"
                  >
                    {title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed"
                  >
                    {content}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mt-6 flex gap-3 justify-end"
                  >
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 text-sm rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity">
                      Book Now
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
