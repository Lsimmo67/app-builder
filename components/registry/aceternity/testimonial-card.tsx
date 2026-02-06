"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityTestimonialCardProps {
  quote?: string
  author?: string
  role?: string
  avatar?: string
  rating?: number
  className?: string
}

export default function AceternityTestimonialCard({
  quote = "This product completely transformed our workflow. The attention to detail and smooth experience is unmatched.",
  author = "Sarah Chen",
  role = "CTO at TechCorp",
  avatar = "",
  rating = 5,
  className,
}: AceternityTestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative w-full max-w-md mx-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-8 overflow-hidden",
        className
      )}
    >
      {/* Subtle gradient background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full" />

      <div className="relative z-10">
        {/* Quote icon */}
        <motion.svg
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-12 h-12 text-purple-400 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </motion.svg>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.svg
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 200 }}
              className={cn(
                "w-4 h-4",
                i < rating ? "text-yellow-400" : "text-neutral-700"
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>

        {/* Quote text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-neutral-300 text-base leading-relaxed mb-6 italic"
        >
          &ldquo;{quote}&rdquo;
        </motion.p>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden shrink-0">
            {avatar ? (
              <img src={avatar} alt={author} className="w-full h-full object-cover" />
            ) : (
              author.charAt(0)
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{author}</p>
            <p className="text-xs text-neutral-500">{role}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
