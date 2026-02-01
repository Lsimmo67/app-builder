'use client'

import { cn } from '@/lib/utils/cn'

interface DrawSvgProps {
  className?: string
  style?: React.CSSProperties
}

export default function DrawSvg({ className, style }: DrawSvgProps) {
  const paths = [
    'M10 80 Q 95 10 180 80',
    'M10 10 L 90 90 L 170 10',
    'M20 50 A 30 30 0 1 1 80 50 A 30 30 0 1 1 20 50',
  ]
  const labels = ['Paths', 'Shapes', 'Icons']

  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">SVG Line Drawing</h2>
        <p className="mb-12 text-neutral-400">Watch paths trace themselves into view</p>
        <div className="flex items-center justify-center gap-12">
          {paths.map((d, i) => (
            <svg key={i} viewBox="0 0 200 100" className="h-32 w-48">
              <path
                d={d}
                fill="none"
                stroke="url(#drawGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="400"
                strokeDashoffset="400"
                className="animate-[drawLine_2s_ease-in-out_forwards]"
                style={{ animationDelay: i * 0.4 + 's' }}
              />
              <defs>
                <linearGradient id="drawGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: '@keyframes drawLine { to { stroke-dashoffset: 0; } }' }} />
        <div className="mt-12 grid grid-cols-3 gap-6">
          {labels.map((label, i) => (
            <div key={i} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
              <p className="text-sm font-medium text-indigo-400">{label}</p>
              <p className="mt-1 text-xs text-neutral-500">Animated SVG stroke drawing</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
