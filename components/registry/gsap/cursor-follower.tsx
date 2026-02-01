'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface CursorFollowerProps {
  className?: string
  style?: React.CSSProperties
}

export default function CursorFollower({ className, style }: CursorFollowerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
    }
    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">Cursor Follower</h2>
        <p className="mb-10 text-center text-neutral-400">Move your mouse over the area below</p>
        <div
          ref={containerRef}
          className="relative h-80 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 cursor-none"
        >
          <div
            className="pointer-events-none absolute h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl transition-all duration-300 ease-out"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
          />
          <div
            className="pointer-events-none absolute h-5 w-5 rounded-full border-2 border-indigo-400 transition-all duration-150 ease-out"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
          />
          <div
            className="pointer-events-none absolute h-2 w-2 rounded-full bg-white transition-all duration-75"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-neutral-600 text-sm select-none">Hover to interact</p>
          </div>
        </div>
      </div>
    </div>
  )
}
