"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityFloatingDockProps {
  items?: { title: string; icon: string; href: string }[]
  position?: "bottom" | "top"
  className?: string
}

function DockIcon({
  item,
  mouseX,
}: {
  item: { title: string; icon: string; href: string }
  mouseX: any
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center cursor-pointer relative group"
    >
      <a href={item.href} className="flex items-center justify-center w-full h-full">
        <span className="text-lg" style={{ fontSize: "clamp(14px, 50%, 28px)" }}>
          {item.icon}
        </span>
      </a>
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {item.title}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black dark:border-t-white" />
      </div>
    </motion.div>
  )
}

export default function AceternityFloatingDock({
  items = [
    { title: "Home", icon: "🏠", href: "#" },
    { title: "Products", icon: "📦", href: "#" },
    { title: "Components", icon: "🧩", href: "#" },
    { title: "Pricing", icon: "💰", href: "#" },
    { title: "Changelog", icon: "📝", href: "#" },
    { title: "Twitter", icon: "🐦", href: "#" },
    { title: "GitHub", icon: "🐙", href: "#" },
  ],
  position = "bottom",
  className,
}: AceternityFloatingDockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <div
      className={cn(
        "flex items-center justify-center w-full",
        position === "bottom" ? "fixed bottom-6 left-0 right-0 z-50" : "fixed top-6 left-0 right-0 z-50",
        className
      )}
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3 border border-gray-200 dark:border-neutral-700 shadow-lg"
      >
        {items.map((item, i) => (
          <DockIcon key={i} item={item} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  )
}
