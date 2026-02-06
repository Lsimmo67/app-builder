"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityChipInputProps {
  placeholder?: string
  initialChips?: string[]
  maxChips?: number
  className?: string
}

const chipColors = [
  "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-300",
  "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-300",
  "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-300",
  "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300",
  "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-300",
  "from-amber-500/20 to-amber-600/20 border-amber-500/30 text-amber-300",
]

export default function AceternityChipInput({
  placeholder = "Type and press Enter...",
  initialChips = ["React", "Next.js", "Tailwind"],
  maxChips = 10,
  className,
}: AceternityChipInputProps) {
  const [chips, setChips] = useState<string[]>(initialChips)
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addChip = (value: string) => {
    const trimmed = value.trim()
    if (trimmed && !chips.includes(trimmed) && chips.length < maxChips) {
      setChips((prev) => [...prev, trimmed])
      setInputValue("")
    }
  }

  const removeChip = (chipToRemove: string) => {
    setChips((prev) => prev.filter((c) => c !== chipToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault()
      addChip(inputValue)
    } else if (e.key === "Backspace" && !inputValue && chips.length > 0) {
      removeChip(chips[chips.length - 1])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full max-w-md mx-auto", className)}
    >
      <motion.div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "min-h-[52px] rounded-xl border bg-neutral-950 p-2 flex flex-wrap gap-2 items-center cursor-text transition-colors",
          isFocused
            ? "border-purple-500/50 shadow-lg shadow-purple-500/5"
            : "border-neutral-800"
        )}
      >
        <AnimatePresence mode="popLayout">
          {chips.map((chip, idx) => (
            <motion.span
              key={chip}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r border text-sm",
                chipColors[idx % chipColors.length]
              )}
            >
              {chip}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation()
                  removeChip(chip)
                }}
                className="hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.span>
          ))}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={chips.length === 0 ? placeholder : chips.length >= maxChips ? "Max reached" : "Add more..."}
          disabled={chips.length >= maxChips}
          className="flex-1 min-w-[100px] bg-transparent text-sm text-white outline-none placeholder:text-neutral-600 py-1 px-1 disabled:cursor-not-allowed"
        />
      </motion.div>

      {/* Helper text */}
      <div className="flex items-center justify-between mt-2 px-1">
        <p className="text-xs text-neutral-600">
          Press Enter to add, Backspace to remove
        </p>
        <p className="text-xs text-neutral-600">
          {chips.length}/{maxChips}
        </p>
      </div>
    </motion.div>
  )
}
