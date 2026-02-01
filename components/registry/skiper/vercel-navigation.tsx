"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface VercelNavItem {
  label: string
  href: string
  badge?: string
}

export interface SkiperVercelNavigationProps {
  items?: VercelNavItem[]
  logo?: string
  className?: string
}

const defaultItems: VercelNavItem[] = [
  { label: "Overview", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Activity", href: "#" },
  { label: "Domains", href: "#" },
  { label: "Usage", href: "#" },
  { label: "Monitoring", href: "#", badge: "New" },
  { label: "Settings", href: "#" },
]

export default function SkiperVercelNavigation({
  items = defaultItems,
  logo = "Vercel",
  className,
}: SkiperVercelNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav
      className={cn(
        "w-full border-b border-white/10 bg-black",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center px-6">
        {/* Logo */}
        <div className="mr-8 flex items-center gap-2 py-3">
          <svg
            width="20"
            height="18"
            viewBox="0 0 76 65"
            fill="none"
            className="text-white"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
          </svg>
          <span className="text-sm font-semibold text-white">{logo}</span>
          <span className="text-white/30">/</span>
          <span className="text-sm text-white/60">project</span>
        </div>

        {/* Nav items */}
        <div className="flex items-center gap-0.5 overflow-x-auto">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="relative"
              onClick={(e) => {
                e.preventDefault()
                setActiveIndex(index)
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative flex items-center gap-1.5 px-3 py-3 text-sm">
                <span
                  className={cn(
                    "transition-colors",
                    activeIndex === index ? "text-white" : "text-white/50"
                  )}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span className="rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-medium text-blue-400">
                    {item.badge}
                  </span>
                )}

                {/* Active indicator */}
                {activeIndex === index && (
                  <motion.div
                    layoutId="vercel-nav-active"
                    className="absolute bottom-0 left-3 right-3 h-px bg-white"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}

                {/* Hover background */}
                {hoveredIndex === index && activeIndex !== index && (
                  <motion.div
                    layoutId="vercel-nav-hover"
                    className="absolute inset-0 rounded-md bg-white/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
