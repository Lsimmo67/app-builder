"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface ExpandOnHoverItem {
  title: string
  content: string
  image: string
}

export interface SkiperExpandOnHoverProps {
  items?: ExpandOnHoverItem[]
  className?: string
}

const defaultItems: ExpandOnHoverItem[] = [
  {
    title: "Web Applications",
    content:
      "Full-stack web applications built with modern frameworks. React, Next.js, and Node.js are our bread and butter.",
    image: "https://placehold.co/500x300/6366f1/ffffff?text=Web+Apps",
  },
  {
    title: "Mobile Development",
    content:
      "Native and cross-platform mobile apps that feel right at home on any device. iOS, Android, and React Native.",
    image: "https://placehold.co/500x300/ec4899/ffffff?text=Mobile",
  },
  {
    title: "Cloud Infrastructure",
    content:
      "Scalable cloud architecture on AWS, GCP, or Azure. We handle DevOps so you can focus on your product.",
    image: "https://placehold.co/500x300/14b8a6/ffffff?text=Cloud",
  },
  {
    title: "AI & Machine Learning",
    content:
      "Integrate intelligent features into your product. From NLP to computer vision, we make AI accessible.",
    image: "https://placehold.co/500x300/f97316/ffffff?text=AI+%26+ML",
  },
]

export default function SkiperExpandOnHover({
  items = defaultItems,
  className,
}: SkiperExpandOnHoverProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("w-full space-y-3", className)}>
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index

        return (
          <motion.div
            key={index}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            layout
          >
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
                  animate={{
                    backgroundColor: isHovered
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.1)",
                    rotate: isHovered ? 45 : 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M8 3V13M3 8H13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>

              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-white/40"
                >
                  <path
                    d="M5 8L10 13L15 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-6 px-6 pb-6">
                    <div className="flex-1">
                      <p className="text-base text-white/60 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="hidden h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl md:block"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
