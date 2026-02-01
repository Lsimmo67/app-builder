"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface Member {
  name: string
  role: string
  image: string
}

export interface SkiperHoverMembersProps {
  members?: Member[]
  className?: string
}

const defaultMembers: Member[] = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: "https://placehold.co/400x500/6366f1/ffffff?text=AJ",
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    image: "https://placehold.co/400x500/ec4899/ffffff?text=SC",
  },
  {
    name: "Marcus Williams",
    role: "CTO",
    image: "https://placehold.co/400x500/14b8a6/ffffff?text=MW",
  },
  {
    name: "Emma Davis",
    role: "Product Manager",
    image: "https://placehold.co/400x500/f97316/ffffff?text=ED",
  },
]

export default function SkiperHoverMembers({
  members = defaultMembers,
  className,
}: SkiperHoverMembersProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("w-full", className)}>
      <div className="divide-y divide-white/10">
        {members.map((member, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
              <div className="flex items-center gap-6">
                <motion.span
                  className="text-sm font-mono text-white/30"
                  animate={{
                    color:
                      hoveredIndex === index
                        ? "rgba(255,255,255,0.8)"
                        : "rgba(255,255,255,0.3)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
                <motion.h3
                  className="text-2xl font-bold text-white md:text-4xl"
                  animate={{
                    x: hoveredIndex === index ? 20 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
                >
                  {member.name}
                </motion.h3>
              </div>
              <motion.span
                className="text-sm text-white/40 md:text-base"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0.6,
                }}
              >
                {member.role}
              </motion.span>
            </div>

            {/* Image popup on hover */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute right-20 top-1/2 z-20 -translate-y-1/2"
                >
                  <div className="h-32 w-24 overflow-hidden rounded-xl shadow-2xl md:h-48 md:w-36">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background highlight */}
            <motion.div
              className="absolute inset-0 -z-10 bg-white/5"
              initial={{ opacity: 0 }}
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
