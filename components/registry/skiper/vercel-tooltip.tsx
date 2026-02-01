"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface VercelTooltipItem {
  name: string
  image: string
  href: string
}

export interface SkiperVercelTooltipProps {
  items?: VercelTooltipItem[]
  className?: string
}

const defaultItems: VercelTooltipItem[] = [
  {
    name: "Guillermo Rauch",
    image: "https://placehold.co/80x80/6366f1/ffffff?text=GR",
    href: "#",
  },
  {
    name: "Lee Robinson",
    image: "https://placehold.co/80x80/ec4899/ffffff?text=LR",
    href: "#",
  },
  {
    name: "Delba de Oliveira",
    image: "https://placehold.co/80x80/14b8a6/ffffff?text=DO",
    href: "#",
  },
  {
    name: "Tim Neutkens",
    image: "https://placehold.co/80x80/f97316/ffffff?text=TN",
    href: "#",
  },
  {
    name: "Shu Ding",
    image: "https://placehold.co/80x80/8b5cf6/ffffff?text=SD",
    href: "#",
  },
]

export default function SkiperVercelTooltip({
  items = defaultItems,
  className,
}: SkiperVercelTooltipProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="absolute -top-12 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap"
              >
                <div className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-black shadow-xl">
                  {item.name}
                  {/* Arrow */}
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            href={item.href}
            className="relative z-10 block h-10 w-10 overflow-hidden rounded-full border-2 border-black bg-neutral-800"
            whileHover={{
              scale: 1.15,
              zIndex: 30,
            }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </motion.a>
        </div>
      ))}

      {/* Overflow indicator */}
      <motion.div
        className="relative z-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-neutral-800"
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-xs font-medium text-white/60">+3</span>
      </motion.div>
    </div>
  )
}
