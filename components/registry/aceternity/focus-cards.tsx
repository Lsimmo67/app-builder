"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityFocusCardsProps {
  cards?: { title: string; src: string }[]
  className?: string
}

function FocusCard({
  card,
  index,
  focusedIndex,
  setFocusedIndex,
}: {
  card: { title: string; src: string }
  index: number
  focusedIndex: number | null
  setFocusedIndex: (index: number | null) => void
}) {
  const isFocused = focusedIndex === index
  const isBlurred = focusedIndex !== null && focusedIndex !== index

  return (
    <motion.div
      className={cn(
        "relative rounded-lg overflow-hidden cursor-pointer h-60 md:h-96 w-full"
      )}
      onClick={() => setFocusedIndex(isFocused ? null : index)}
      animate={{
        filter: isBlurred ? "blur(4px)" : "blur(0px)",
        scale: isFocused ? 1.02 : isBlurred ? 0.98 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <img
        src={card.src}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6"
        animate={{ opacity: isFocused || focusedIndex === null ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl md:text-2xl font-medium text-white">
          {card.title}
        </h3>
      </motion.div>
    </motion.div>
  )
}

export default function AceternityFocusCards({
  cards = [
    { title: "Forest Adventure", src: "https://placehold.co/600x400/2d5a27/ffffff?text=Forest" },
    { title: "Ocean Breeze", src: "https://placehold.co/600x400/1a3a5c/ffffff?text=Ocean" },
    { title: "Mountain Peak", src: "https://placehold.co/600x400/4a3a2a/ffffff?text=Mountain" },
    { title: "Desert Sunset", src: "https://placehold.co/600x400/8b4513/ffffff?text=Desert" },
    { title: "City Lights", src: "https://placehold.co/600x400/1a1a2e/ffffff?text=City" },
    { title: "Northern Lights", src: "https://placehold.co/600x400/0a3a3a/ffffff?text=Aurora" },
  ],
  className,
}: AceternityFocusCardsProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto w-full",
        className
      )}
    >
      {cards.map((card, i) => (
        <FocusCard
          key={i}
          card={card}
          index={i}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
        />
      ))}
    </div>
  )
}
