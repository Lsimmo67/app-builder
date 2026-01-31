'use client'

import { cn } from '@/lib/utils/cn'
import { useRef, useState } from 'react'

interface MagneticButtonProps {
  className?: string
  children?: React.ReactNode
  magnetStrength?: number
  onClick?: () => void
}

export default function MagneticButton({
  className,
  children = 'Magnetic Button',
  magnetStrength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    setTranslate({
      x: dx * magnetStrength,
      y: dy * magnetStrength,
    })
  }

  function handleMouseLeave() {
    setTranslate({ x: 0, y: 0 })
  }

  return (
    <div
      className="inline-flex items-center justify-center p-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={btnRef}
        onClick={onClick}
        className={cn(
          'group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-zinc-900',
          'shadow-lg shadow-black/10',
          'hover:shadow-xl hover:shadow-black/20',
          'active:scale-[0.97]',
          className
        )}
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px)`,
          transition: translate.x === 0 && translate.y === 0
            ? 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
            : 'transform 0.15s ease-out',
        }}
      >
        {/* Hover gradient */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
          {children}
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>
    </div>
  )
}
