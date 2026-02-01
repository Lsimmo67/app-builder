'use client'

import { cn } from '@/lib/utils/cn'

interface CircularTextProps {
  className?: string
  style?: React.CSSProperties
}

export default function CircularText({ className, style }: CircularTextProps) {
  const text = 'GSAP ANIMATION \u2022 CIRCULAR TEXT \u2022 ROTATE \u2022 '
  const chars = text.split('')

  return (
    <div className={cn('w-full py-24 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        <h2 className="mb-12 text-4xl font-bold tracking-tight text-white text-center">Circular Rotating Text</h2>
        <div className="relative h-64 w-64">
          <div className="absolute inset-0 animate-[spinSlow_12s_linear_infinite]">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path id="circlePath" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" fill="none" />
              </defs>
              <text className="fill-neutral-300 text-[12px] font-semibold uppercase tracking-[0.3em]">
                <textPath href="#circlePath">
                  {text}
                </textPath>
              </text>
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-2xl font-bold text-white">G</span>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
        <p className="mt-10 text-center text-neutral-400 max-w-md">
          Text orbiting along a circular SVG path with continuous rotation, perfect for badges and decorative elements.
        </p>
      </div>
    </div>
  )
}
