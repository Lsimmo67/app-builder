"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface TextRollNavItem {
  label: string
  href: string
}

export interface SkiperTextRollNavigationProps {
  items?: TextRollNavItem[]
  className?: string
}

const defaultItems: TextRollNavItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Work", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
]

function RollingLink({ item }: { item: TextRollNavItem }) {
  return (
    <motion.a
      href={item.href}
      className="group relative block overflow-hidden"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.span
        className="block text-lg font-medium text-white transition-colors"
        variants={{
          rest: { y: 0 },
          hover: { y: "-100%" },
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
      >
        {item.label}
      </motion.span>
      <motion.span
        className="absolute left-0 top-0 block text-lg font-medium text-white/60"
        variants={{
          rest: { y: "100%" },
          hover: { y: 0 },
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
      >
        {item.label}
      </motion.span>
    </motion.a>
  )
}

export default function SkiperTextRollNavigation({
  items = defaultItems,
  className,
}: SkiperTextRollNavigationProps) {
  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {items.map((item, index) => (
        <RollingLink key={index} item={item} />
      ))}
    </nav>
  )
}
