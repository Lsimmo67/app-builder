'use client'

import { cn } from '@/lib/utils/cn'

interface SmoothScrollProps {
  className?: string
  style?: React.CSSProperties
}

export default function SmoothScroll({ className, style }: SmoothScrollProps) {
  const sections = [
    { title: 'Fluid Motion', desc: 'Buttery smooth scroll with momentum-based easing', icon: 'M5 3l14 9-14 9V3z' },
    { title: 'Lerp Interpolation', desc: 'Linear interpolation creates natural deceleration', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { title: 'Velocity Tracking', desc: 'Scroll speed drives animation intensity', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Snap Points', desc: 'Magnetic snapping with elastic overshoot', icon: 'M4 6h16M4 12h16M4 18h16' },
  ]

  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">Smooth Scroll</h2>
        <p className="mb-14 text-center text-neutral-400">Silky scrolling with interpolated motion</p>
        <div className="h-[400px] overflow-y-auto scroll-smooth rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 space-y-6">
          {[...sections, ...sections].map((s, i) => (
            <div
              key={i}
              className="group flex gap-5 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-indigo-500/30 hover:bg-neutral-900/80 hover:translate-x-2"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
