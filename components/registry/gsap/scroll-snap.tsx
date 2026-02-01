'use client'

import { cn } from '@/lib/utils/cn'

interface ScrollSnapProps {
  className?: string
  style?: React.CSSProperties
}

export default function ScrollSnap({ className, style }: ScrollSnapProps) {
  const sections = [
    { title: 'Discover', subtitle: 'Explore new possibilities', gradient: 'from-indigo-600 to-indigo-900' },
    { title: 'Create', subtitle: 'Build something remarkable', gradient: 'from-purple-600 to-purple-900' },
    { title: 'Launch', subtitle: 'Ship with confidence', gradient: 'from-pink-600 to-pink-900' },
    { title: 'Scale', subtitle: 'Grow without limits', gradient: 'from-cyan-600 to-cyan-900' },
  ]

  return (
    <div
      className={cn('w-full h-[480px] overflow-y-auto snap-y snap-mandatory rounded-2xl border border-neutral-800', className)}
      style={style}
    >
      {sections.map((section, i) => (
        <div
          key={i}
          className={cn(
            'snap-start h-[480px] w-full flex flex-col items-center justify-center bg-gradient-to-b',
            section.gradient
          )}
        >
          <span className="mb-2 text-sm font-medium uppercase tracking-widest text-white/50">
            0{i + 1} / 0{sections.length}
          </span>
          <h2 className="text-5xl font-bold text-white">{section.title}</h2>
          <p className="mt-3 text-lg text-white/70">{section.subtitle}</p>
          <div className="mt-8 flex gap-2">
            {sections.map((_, j) => (
              <div
                key={j}
                className={cn('h-1.5 rounded-full transition-all', j === i ? 'w-8 bg-white' : 'w-2 bg-white/30')}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
