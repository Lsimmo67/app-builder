"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityLinkPreviewProps {
  text?: string
  url?: string
  className?: string
  previewImage?: string
}

export default function AceternityLinkPreview({
  text = "Visit Aceternity UI",
  url = "https://ui.aceternity.com",
  className,
  previewImage = "https://placehold.co/400x250/1a1a2e/ffffff?text=Link+Preview",
}: AceternityLinkPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)
  const translateX = useSpring(x, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2
    x.set(offsetFromCenter)
  }

  return (
    <span className={cn("inline-block relative", className)}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-500 transition-all"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onMouseMove={handleMouseMove}
      >
        {text}
      </a>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 260, damping: 20 },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{ translateX }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50"
          >
            <div className="shadow-xl rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <img
                src={previewImage}
                alt={`Preview of ${url}`}
                className="w-[250px] h-[160px] object-cover"
              />
              <div className="p-3">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[240px]">
                  {url}
                </p>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-white dark:border-t-neutral-950" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
