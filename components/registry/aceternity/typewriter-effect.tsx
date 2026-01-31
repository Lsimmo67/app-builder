'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface TypewriterWord {
  text: string
  className?: string
}

interface TypewriterEffectProps {
  className?: string
  words?: TypewriterWord[]
  cursorClassName?: string
  typingSpeed?: number
}

const defaultWords: TypewriterWord[] = [
  { text: 'Build' },
  { text: 'amazing' },
  { text: 'websites' },
  { text: 'with' },
  { text: 'Aceternity', className: 'text-blue-500' },
  { text: 'UI', className: 'text-blue-500' },
]

export default function TypewriterEffect({
  className,
  words = defaultWords,
  cursorClassName,
  typingSpeed = 80,
}: TypewriterEffectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayedChars, setDisplayedChars] = useState(0)

  const fullText = words.map((w) => w.text).join(' ')
  const totalChars = fullText.length

  useEffect(() => {
    if (!isInView) return

    let current = 0
    const interval = setInterval(() => {
      current++
      setDisplayedChars(current)
      if (current >= totalChars) {
        clearInterval(interval)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [isInView, totalChars, typingSpeed])

  const renderWords = () => {
    let charIndex = 0
    return words.map((word, wordIdx) => {
      const startIdx = charIndex
      const wordWithSpace = wordIdx < words.length - 1 ? word.text + ' ' : word.text
      charIndex += wordWithSpace.length

      const visibleLength = Math.max(
        0,
        Math.min(wordWithSpace.length, displayedChars - startIdx)
      )
      const visibleText = wordWithSpace.slice(0, visibleLength)

      if (visibleLength === 0) return null

      return (
        <span key={wordIdx} className={cn('text-white', word.className)}>
          {visibleText}
        </span>
      )
    })
  }

  return (
    <div
      ref={ref}
      className={cn('flex items-center justify-center px-4 py-20', className)}
    >
      <div className="text-center text-3xl font-bold md:text-5xl lg:text-6xl">
        {renderWords()}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className={cn(
            'ml-1 inline-block h-8 w-[4px] rounded-full bg-blue-500 align-middle md:h-12',
            cursorClassName
          )}
        />
      </div>
    </div>
  )
}
