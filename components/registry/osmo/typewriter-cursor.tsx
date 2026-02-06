'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/cn'

export interface OsmoTypewriterCursorProps {
  phrases?: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  cursorColor?: string
  className?: string
}

export default function OsmoTypewriterCursor({
  phrases = ['Creative Developer', 'UI Engineer', 'Design Enthusiast', 'Problem Solver'],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  cursorColor = '#8b5cf6',
  className,
}: OsmoTypewriterCursorProps) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const currentPhrase = phrases[phraseIndex]

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        return typingSpeed
      } else {
        setIsDeleting(true)
        return pauseDuration
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1))
        return deletingSpeed
      } else {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
        return typingSpeed
      }
    }
  }, [displayText, phraseIndex, isDeleting, phrases, typingSpeed, deletingSpeed, pauseDuration])

  useEffect(() => {
    const delay = tick()
    const timer = setTimeout(() => {
      tick()
      setDisplayText((prev) => {
        const currentPhrase = phrases[phraseIndex]
        if (!isDeleting) {
          return currentPhrase.slice(0, prev.length + 1)
        } else {
          return currentPhrase.slice(0, prev.length - 1)
        }
      })
    }, delay)

    return () => clearTimeout(timer)
  }, [displayText, phraseIndex, isDeleting, phrases, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <div
      className={cn(
        'flex items-center justify-center py-20 px-8',
        className
      )}
    >
      <div className="text-center">
        <p className="text-white/40 text-lg mb-2">I am a</p>
        <div className="flex items-center justify-center gap-1">
          <span className="text-white text-4xl md:text-6xl font-bold tracking-tight min-h-[1.2em]">
            {displayText}
          </span>
          <motion.span
            className="inline-block w-[3px] h-[1em] text-4xl md:text-6xl align-middle"
            style={{ backgroundColor: cursorColor }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>
      </div>
    </div>
  )
}
