"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityFloatingNavbarProps {
  items?: { name: string; link: string; icon?: string }[]
  className?: string
}

export default function AceternityFloatingNavbar({
  items = [
    { name: "Home", link: "#", icon: "🏠" },
    { name: "About", link: "#about", icon: "👤" },
    { name: "Contact", link: "#contact", icon: "✉️" },
  ],
  className,
}: AceternityFloatingNavbarProps) {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - lastScroll
      if (current < 0.05) {
        setVisible(true)
      } else {
        if (direction < 0) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      }
      setLastScroll(current)
    }
  })

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {items.map((item, i) => (
          <a
            key={i}
            href={item.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 text-sm transition-colors"
            )}
          >
            {item.icon && <span className="text-sm">{item.icon}</span>}
            <span className="hidden sm:block">{item.name}</span>
          </a>
        ))}
        <a
          href="#"
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
        >
          Login
        </a>
      </motion.nav>
    </AnimatePresence>
  )
}
