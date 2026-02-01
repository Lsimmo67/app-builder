"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityStickyScrollRevealProps {
  items?: {
    title: string
    description: string
    content?: string
    image?: string
    bgColor?: string
  }[]
  className?: string
}

export default function AceternityStickyScrollReveal({
  items = [
    {
      title: "Collaborative Editing",
      description:
        "Work together in real-time with your team. See changes as they happen and collaborate seamlessly on projects of any size.",
      image: "https://placehold.co/600x400/1a1a2e/ffffff?text=Collab",
      bgColor: "linear-gradient(to bottom right, #06b6d4, #3b82f6)",
    },
    {
      title: "Real-Time Changes",
      description:
        "See changes as they happen. Every edit, every update, reflected instantly across all collaborators without any delays.",
      image: "https://placehold.co/600x400/16213e/ffffff?text=Real+Time",
      bgColor: "linear-gradient(to bottom right, #8b5cf6, #ec4899)",
    },
    {
      title: "Version Control",
      description:
        "Never lose your work. Every change is tracked and versioned, giving you the confidence to experiment freely.",
      image: "https://placehold.co/600x400/0f3460/ffffff?text=Version",
      bgColor: "linear-gradient(to bottom right, #f59e0b, #ef4444)",
    },
    {
      title: "Running Out of Content",
      description:
        "Experience the power of our platform with real-time collaboration, version control, and seamless deployment workflows.",
      image: "https://placehold.co/600x400/533483/ffffff?text=Deploy",
      bgColor: "linear-gradient(to bottom right, #10b981, #3b82f6)",
    },
  ],
  className,
}: AceternityStickyScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const activeIndex = useTransform(
    scrollYProgress,
    items.map((_, i) => i / items.length),
    items.map((_, i) => i)
  )

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="flex gap-10 max-w-7xl mx-auto px-4">
        {/* Left side - scrolling text */}
        <div className="flex-1 relative">
          {items.map((item, i) => (
            <div key={i} className="min-h-screen flex items-center py-20">
              <motion.div
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                  {item.title}
                </h2>
                <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  {item.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Right side - sticky visual */}
        <div className="flex-1 hidden md:block">
          <div className="sticky top-20 h-[calc(100vh-10rem)] flex items-center">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-2xl flex items-center justify-center"
                  style={{ background: item.bgColor || "#1a1a2e" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <p className="text-white text-xl font-bold">
                      {item.title}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
