"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityBreadcrumbAnimatedProps {
  items?: { label: string; href?: string }[]
  separator?: string
  className?: string
}

const defaultItems = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#" },
  { label: "Categories", href: "#" },
  { label: "Current Page" },
]

export default function AceternityBreadcrumbAnimated({
  items = defaultItems,
  separator = "/",
  className,
}: AceternityBreadcrumbAnimatedProps) {
  return (
    <nav
      className={cn("flex items-center p-4", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1

          return (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: idx * 0.1,
                duration: 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className="flex items-center gap-1"
            >
              {idx > 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ delay: idx * 0.1 + 0.05 }}
                  className="text-neutral-600 text-sm mx-1"
                >
                  {separator}
                </motion.span>
              )}

              {isLast ? (
                <motion.span
                  className="text-sm font-medium text-white px-2.5 py-1 rounded-md bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/20"
                  layoutId="breadcrumb-active"
                >
                  {item.label}
                </motion.span>
              ) : (
                <motion.a
                  href={item.href || "#"}
                  className="relative text-sm text-neutral-400 hover:text-white transition-colors px-2 py-1 rounded-md group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-md bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId="breadcrumb-hover"
                  />
                  <span className="relative">{item.label}</span>
                </motion.a>
              )}
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}
