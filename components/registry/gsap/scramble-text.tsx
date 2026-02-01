'use client'

import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface ScrambleTextProps {
  className?: string
  children?: React.ReactNode
  text?: string
  speed?: number
  scrambleChars?: string
  trigger?: 'hover' | 'scroll' | 'auto'
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'
const DEFAULT_TEXT = 'Scrambled Reality'

export default function ScrambleText({
  className,
  children,
  text = DEFAULT_TEXT,
  speed = 1,
  scrambleChars = DEFAULT_CHARS,
  trigger = 'hover',
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const runScramble = useCallback(() => {
    if (!textRef.current) return
    if (tweenRef.current && tweenRef.current.isActive()) return

    const el = textRef.current
    const target = text
    const duration = (target.length * 0.05) / speed

    tweenRef.current = gsap.to(
      { progress: 0 },
      {
        progress: 1,
        duration,
        ease: 'none',
        onUpdate() {
          const progress = this.targets()[0].progress
          const revealedCount = Math.floor(progress * target.length)

          let result = ''
          for (let i = 0; i < target.length; i++) {
            if (target[i] === ' ') {
              result += ' '
            } else if (i < revealedCount) {
              result += target[i]
            } else {
              result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            }
          }

          el.textContent = result
        },
        onComplete() {
          el.textContent = target
        },
      }
    )
  }, [text, speed, scrambleChars])

  useGSAP(
    () => {
      if (!textRef.current || !containerRef.current) return

      if (trigger === 'auto') {
        runScramble()
      }

      if (trigger === 'scroll') {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => runScramble(),
        })
      }
    },
    { scope: containerRef, dependencies: [trigger, runScramble] }
  )

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      runScramble()
    }
  }

  return (
    <div ref={containerRef} className={cn('w-full py-24 px-6', className)}>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-indigo-400">
          Text Scramble Effect
        </p>

        <h2
          ref={textRef}
          className="cursor-pointer text-5xl sm:text-7xl font-mono font-bold text-white tracking-tight transition-colors hover:text-indigo-300"
          onMouseEnter={handleMouseEnter}
        >
          {text}
        </h2>

        {children ?? (
          <>
            <p className="mt-8 text-neutral-400 max-w-md mx-auto">
              {trigger === 'hover'
                ? 'Hover over the text to trigger a character-by-character scramble decode animation.'
                : trigger === 'scroll'
                  ? 'Scroll this section into view to trigger the scramble decode animation.'
                  : 'The text scramble plays automatically on mount.'}
            </p>
            <div className="mt-10 flex justify-center gap-6">
              {[
                `${Math.round((text.length * 50) / speed)}ms total`,
                `Speed: ${speed}x`,
                `${scrambleChars.length} char set`,
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2"
                >
                  <p className="text-xs font-mono text-neutral-400">{stat}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
