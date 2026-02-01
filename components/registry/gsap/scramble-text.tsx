'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils/cn'

interface ScrambleTextProps {
  className?: string
  style?: React.CSSProperties
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

export default function ScrambleText({ className, style }: ScrambleTextProps) {
  const target = 'Scrambled Reality'
  const [display, setDisplay] = useState(target)
  const [isScrambling, setIsScrambling] = useState(false)

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        target.split('').map((ch, i) => (i < iteration ? ch : ch === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])).join('')
      )
      iteration += 0.5
      if (iteration >= target.length) { clearInterval(interval); setIsScrambling(false) }
    }, 40)
  }, [isScrambling])

  useEffect(() => { scramble() }, [])

  return (
    <div className={cn('w-full py-24 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-indigo-400">Text Scramble Effect</p>
        <h2
          className="cursor-pointer text-5xl sm:text-7xl font-mono font-bold text-white tracking-tight hover:text-indigo-300 transition-colors"
          onMouseEnter={scramble}
        >
          {display}
        </h2>
        <p className="mt-8 text-neutral-400 max-w-md mx-auto">
          Hover over the text to trigger a character-by-character scramble decode animation.
        </p>
        <div className="mt-10 flex justify-center gap-6">
          {['40ms per tick', '0.5 chars/frame', `${chars.length} char set`].map((stat, i) => (
            <div key={i} className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2">
              <p className="text-xs font-mono text-neutral-400">{stat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
