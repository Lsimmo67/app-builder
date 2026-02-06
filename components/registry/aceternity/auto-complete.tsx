"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityAutoCompleteProps {
  options?: string[]
  placeholder?: string
  label?: string
  className?: string
}

const defaultOptions = [
  "Apple",
  "Banana",
  "Cherry",
  "Dragon Fruit",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Raspberry",
  "Strawberry",
]

export default function AceternityAutoComplete({
  options = defaultOptions,
  placeholder = "Search fruits...",
  label = "Select a fruit",
  className,
}: AceternityAutoCompleteProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options

  useEffect(() => {
    setSelectedIndex(-1)
  }, [query])

  const handleSelect = (option: string) => {
    setQuery(option)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      handleSelect(filtered[selectedIndex])
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("relative w-full max-w-sm mx-auto", className)}
    >
      {label && (
        <label className="block text-sm text-neutral-400 mb-2">{label}</label>
      )}

      {/* Input */}
      <div
        className={cn(
          "relative rounded-xl border bg-neutral-950 transition-colors overflow-hidden",
          isOpen ? "border-purple-500/50 shadow-lg shadow-purple-500/5" : "border-neutral-800"
        )}
      >
        <div className="flex items-center">
          <svg className="w-4 h-4 text-neutral-600 ml-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent text-white text-sm outline-none py-3 px-3 placeholder:text-neutral-600"
          />
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => {
                setQuery("")
                inputRef.current?.focus()
              }}
              className="shrink-0 mr-3 text-neutral-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && filtered.length > 0 && (
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: "top" }}
            className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto"
          >
            {filtered.map((option, idx) => {
              const isSelected = idx === selectedIndex

              // Highlight matching text
              const matchIndex = option.toLowerCase().indexOf(query.toLowerCase())
              const before = option.slice(0, matchIndex)
              const match = option.slice(matchIndex, matchIndex + query.length)
              const after = option.slice(matchIndex + query.length)

              return (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "w-full px-4 py-2.5 text-sm text-left transition-colors flex items-center gap-2",
                    isSelected
                      ? "bg-purple-500/10 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  )}
                >
                  <span>
                    {query ? (
                      <>
                        {before}
                        <span className="text-purple-400 font-medium">{match}</span>
                        {after}
                      </>
                    ) : (
                      option
                    )}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        )}

        {isOpen && filtered.length === 0 && query && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-neutral-800 bg-neutral-950 p-6 text-center z-50"
          >
            <p className="text-sm text-neutral-500">No results found</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
