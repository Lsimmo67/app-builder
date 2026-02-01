'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils/cn'

interface MorphTextProps {
  /** Array of words to cycle through with the scramble/decode effect */
  words?: string[]
  /** Time in seconds between word transitions */
  interval?: number
  /** Additional CSS class names */
  className?: string
  style?: React.CSSProperties
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function MorphText({
  words = ['Innovate', 'Disrupt', 'Transform', 'Evolve'],
  interval = 3,
  className,
  style,
}: MorphTextProps) {
  const [displayText, setDisplayText] = useState(words[0] || '')
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const wordIndexRef = useRef(0)

  useEffect(() => {
    if (words.length === 0) return

    const ctx = gsap.context(() => {
      const scrambleTo = (targetWord: string) => {
        const currentWord = displayText
        const maxLen = Math.max(currentWord.length, targetWord.length)

        // Object to tween - progress from 0 to 1
        const proxy = { progress: 0 }

        gsap.to(proxy, {
          progress: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          onUpdate: () => {
            const p = proxy.progress
            let result = ''

            for (let i = 0; i < maxLen; i++) {
              // Each character resolves at a staggered point
              const charThreshold = i / maxLen

              if (p > charThreshold + 0.5) {
                // Character has resolved to the target
                result += targetWord[i] || ''
              } else if (p > charThreshold) {
                // Character is scrambling
                result += CHARS[Math.floor(Math.random() * CHARS.length)]
              } else {
                // Character still shows old text
                result += currentWord[i] || CHARS[Math.floor(Math.random() * CHARS.length)]
              }
            }

            setDisplayText(result)
          },
          onComplete: () => {
            setDisplayText(targetWord)
          },
        })

        // Scale/opacity punch on the text element
        if (textRef.current) {
          gsap.fromTo(
            textRef.current,
            { scale: 0.95, opacity: 0.7 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' }
          )
        }
      }

      // Set up the repeating cycle
      const cycleInterval = setInterval(() => {
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length
        scrambleTo(words[wordIndexRef.current])
      }, interval * 1000)

      return () => clearInterval(cycleInterval)
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, interval])

  return (
    <div className={cn('w-full py-24 px-6', className)} style={style}>
      <div ref={containerRef} className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-indigo-400">
          Morphing Text
        </p>
        <div className="relative flex items-center justify-center overflow-hidden min-h-[7rem]">
          <span
            ref={textRef}
            className="text-6xl sm:text-8xl font-black text-white font-mono"
          >
            {displayText}
          </span>
        </div>
        <p className="mt-8 text-neutral-400 max-w-lg mx-auto">
          Words dissolve and reform through a character-by-character scramble/decode effect, creating a fluid text transformation.
        </p>
        <div className="mt-10 inline-flex gap-2">
          {words.map((w, i) => (
            <span
              key={i}
              className="rounded-md bg-neutral-800/60 px-3 py-1 text-xs text-neutral-400"
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
