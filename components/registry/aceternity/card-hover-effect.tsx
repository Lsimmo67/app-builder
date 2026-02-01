"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityCardHoverEffectProps {
  items?: { title: string; description: string; link: string; icon?: string }[]
  className?: string
}

function HoverCard({
  item,
  idx,
  hoveredIndex,
  setHoveredIndex,
}: {
  item: { title: string; description: string; link: string; icon?: string }
  idx: number
  hoveredIndex: number | null
  setHoveredIndex: (idx: number | null) => void
}) {
  return (
    <a
      href={item.link}
      className="relative group block p-2 h-full w-full"
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-10 rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 transition-colors duration-300">
        <div className="relative z-50 p-4">
          {item.icon && (
            <div className="text-3xl mb-3">{item.icon}</div>
          )}
          <h4 className="text-zinc-100 font-bold tracking-wide mt-2">
            {item.title}
          </h4>
          <p className="mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </a>
  )
}

export default function AceternityCardHoverEffect({
  items = [
    {
      title: "Stripe",
      description: "A technology company that builds economic infrastructure for the internet.",
      link: "#",
      icon: "💳",
    },
    {
      title: "Netflix",
      description: "A streaming service that offers a wide variety of award-winning TV shows and movies.",
      link: "#",
      icon: "🎬",
    },
    {
      title: "Google",
      description: "A multinational technology company that specializes in Internet-related services.",
      link: "#",
      icon: "🔍",
    },
    {
      title: "Meta",
      description: "A technology company that focuses on building products for people to connect.",
      link: "#",
      icon: "👥",
    },
    {
      title: "Amazon",
      description: "A multinational technology company focusing on e-commerce and cloud computing.",
      link: "#",
      icon: "📦",
    },
    {
      title: "Microsoft",
      description: "A multinational technology corporation that produces computer software and electronics.",
      link: "#",
      icon: "💻",
    },
  ],
  className,
}: AceternityCardHoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 max-w-5xl mx-auto",
        className
      )}
    >
      {items.map((item, idx) => (
        <HoverCard
          key={idx}
          item={item}
          idx={idx}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </div>
  )
}
