"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternitySearchBarProps {
  placeholder?: string
  suggestions?: string[]
  className?: string
}

const defaultSuggestions = [
  "Getting started guide",
  "API documentation",
  "Component library",
  "Design tokens",
  "Theme configuration",
  "Animation presets",
]

export default function AceternitySearchBar({
  placeholder = "Search...",
  suggestions = defaultSuggestions,
  className,
}: AceternitySearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredSuggestions = query
    ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : []

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)}>
      <motion.div
        layout
        className={cn(
          "relative flex items-center rounded-2xl border bg-neutral-950 overflow-hidden transition-colors",
          isExpanded
            ? "border-purple-500/40 shadow-lg shadow-purple-500/10"
            : "border-neutral-800"
        )}
      >
        {/* Search icon / trigger */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0 p-3 text-neutral-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.button>

        {/* Input */}
        <motion.div
          initial={false}
          animate={{ width: isExpanded ? "100%" : "0px", opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            onBlur={() => {
              if (!query) setIsExpanded(false)
            }}
            className="w-full bg-transparent text-white text-sm outline-none py-3 pr-3 placeholder:text-neutral-600"
          />
        </motion.div>

        {/* Close button */}
        <AnimatePresence>
          {isExpanded && query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                setQuery("")
                inputRef.current?.focus()
              }}
              className="shrink-0 p-2 mr-1 text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Keyboard shortcut hint */}
        {!isExpanded && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-neutral-600 border border-neutral-800 rounded px-1.5 py-0.5 mr-3"
          >
            /
          </motion.span>
        )}
      </motion.div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isExpanded && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-xl z-50"
          >
            {filteredSuggestions.map((suggestion, idx) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors text-left"
                onClick={() => {
                  setQuery(suggestion)
                  setIsExpanded(false)
                }}
              >
                <svg className="w-4 h-4 text-neutral-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
