'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface PageTransitionProps {
  className?: string
  style?: React.CSSProperties
}

export default function PageTransition({ className, style }: PageTransitionProps) {
  const [activePage, setActivePage] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const pages = [
    { title: 'Home', bg: 'from-indigo-950 to-neutral-950', accent: 'bg-indigo-500' },
    { title: 'About', bg: 'from-purple-950 to-neutral-950', accent: 'bg-purple-500' },
    { title: 'Work', bg: 'from-pink-950 to-neutral-950', accent: 'bg-pink-500' },
  ]

  const navigate = (idx: number) => {
    if (idx === activePage || transitioning) return
    setTransitioning(true)
    setTimeout(() => { setActivePage(idx); setTransitioning(false) }, 600)
  }

  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">Page Transitions</h2>
        <p className="mb-10 text-center text-neutral-400">Click navigation to trigger transitions</p>
        <div className="relative h-72 overflow-hidden rounded-2xl border border-neutral-800">
          <div className={cn('absolute inset-0 bg-gradient-to-br flex items-center justify-center transition-all duration-500', pages[activePage].bg, transitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100')}>
            <div className="text-center">
              <div className={cn('mx-auto mb-4 h-3 w-16 rounded-full', pages[activePage].accent)} />
              <h3 className="text-4xl font-bold text-white">{pages[activePage].title}</h3>
              <p className="mt-2 text-neutral-500">Page content goes here</p>
            </div>
          </div>
          {transitioning && (
            <div className="absolute inset-0 bg-white animate-[pageWipe_0.6s_ease-in-out_forwards]" />
          )}
        </div>
        <style>{`
          @keyframes pageWipe {
            0% { clip-path: circle(0% at 50% 50%); }
            50% { clip-path: circle(75% at 50% 50%); }
            100% { clip-path: circle(0% at 50% 50%); }
          }
        `}</style>
        <div className="mt-6 flex justify-center gap-3">
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              className={cn('rounded-lg px-5 py-2 text-sm font-medium transition-colors', i === activePage ? 'bg-white text-neutral-900' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700')}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
