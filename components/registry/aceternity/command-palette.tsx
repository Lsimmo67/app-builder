"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternityCommandPaletteProps {
  commands?: { label: string; shortcut?: string; icon?: string; group?: string }[]
  placeholder?: string
  className?: string
}

const defaultCommands = [
  { label: "Go to Dashboard", shortcut: "G D", icon: "home", group: "Navigation" },
  { label: "Go to Settings", shortcut: "G S", icon: "settings", group: "Navigation" },
  { label: "Go to Profile", shortcut: "G P", icon: "user", group: "Navigation" },
  { label: "Create New Project", shortcut: "C P", icon: "plus", group: "Actions" },
  { label: "Upload File", shortcut: "U F", icon: "upload", group: "Actions" },
  { label: "Toggle Dark Mode", shortcut: "T D", icon: "moon", group: "Preferences" },
  { label: "Search Documentation", shortcut: "S D", icon: "search", group: "Help" },
  { label: "View Keyboard Shortcuts", shortcut: "?", icon: "keyboard", group: "Help" },
]

const iconMap: Record<string, React.ReactNode> = {
  home: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  settings: <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
  user: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />,
  upload: <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
  moon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />,
  search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  keyboard: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />,
}

export default function AceternityCommandPalette({
  commands = defaultCommands,
  placeholder = "Type a command or search...",
  className,
}: AceternityCommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  const groups = filtered.reduce<Record<string, typeof commands>>((acc, cmd) => {
    const group = cmd.group || "General"
    if (!acc[group]) acc[group] = []
    acc[group].push(cmd)
    return acc
  }, {})

  const flatFiltered = Object.values(groups).flat()

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((o) => !o)
      }
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Trigger button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 w-full max-w-sm mx-auto px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-500 text-sm hover:border-neutral-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="flex-1 text-left">Search commands...</span>
        <kbd className="text-xs border border-neutral-700 rounded px-1.5 py-0.5 text-neutral-600 font-mono">
          Ctrl+K
        </kbd>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
            >
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl">
                {/* Input */}
                <div className="flex items-center gap-3 px-4 border-b border-neutral-800">
                  <svg className="w-5 h-5 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent text-white text-sm outline-none py-4 placeholder:text-neutral-600"
                  />
                  <kbd className="text-xs text-neutral-600 border border-neutral-800 rounded px-1.5 py-0.5 font-mono">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto py-2">
                  {flatFiltered.length === 0 && (
                    <p className="text-center text-sm text-neutral-600 py-8">No results found</p>
                  )}

                  {Object.entries(groups).map(([group, cmds]) => (
                    <div key={group}>
                      <p className="text-xs text-neutral-600 px-4 py-2 uppercase tracking-wider font-medium">
                        {group}
                      </p>
                      {cmds.map((cmd) => {
                        const globalIdx = flatFiltered.indexOf(cmd)
                        const isSelected = globalIdx === selectedIndex

                        return (
                          <motion.button
                            key={cmd.label}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left",
                              isSelected
                                ? "bg-purple-500/10 text-white"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                            )}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            onClick={() => setIsOpen(false)}
                          >
                            <svg className="w-4 h-4 shrink-0 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              {iconMap[cmd.icon || "search"]}
                            </svg>
                            <span className="flex-1">{cmd.label}</span>
                            {cmd.shortcut && (
                              <span className="text-xs text-neutral-600 font-mono">
                                {cmd.shortcut}
                              </span>
                            )}
                          </motion.button>
                        )
                      })}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 px-4 py-2.5 border-t border-neutral-800 text-xs text-neutral-600">
                  <span className="flex items-center gap-1">
                    <kbd className="border border-neutral-700 rounded px-1 font-mono">&uarr;</kbd>
                    <kbd className="border border-neutral-700 rounded px-1 font-mono">&darr;</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="border border-neutral-700 rounded px-1 font-mono">&crarr;</kbd>
                    select
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
