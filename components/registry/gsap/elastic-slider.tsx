'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface ElasticSliderProps {
  className?: string
  style?: React.CSSProperties
}

const slides = [
  { title: 'Momentum', color: 'bg-indigo-500', desc: 'Physics-based elastic motion' },
  { title: 'Velocity', color: 'bg-purple-500', desc: 'Speed-driven animations' },
  { title: 'Tension', color: 'bg-pink-500', desc: 'Spring-like interactions' },
  { title: 'Friction', color: 'bg-cyan-500', desc: 'Smooth deceleration curves' },
]

export default function ElasticSlider({ className, style }: ElasticSliderProps) {
  const [active, setActive] = useState(0)

  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">Elastic Slider</h2>
        <p className="mb-12 text-center text-neutral-400">Snap between slides with elastic easing</p>
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: 'translateX(-' + (active * 100) + '%)',
              transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="w-full shrink-0 p-16 text-center">
                <div className={cn('mx-auto mb-6 h-20 w-20 rounded-2xl animate-[elasticPulse_2s_ease-in-out_infinite]', slide.color)} />
                <h3 className="text-3xl font-bold text-white">{slide.title}</h3>
                <p className="mt-2 text-neutral-400">{slide.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 pb-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-500',
                  i === active ? 'w-10 bg-white' : 'w-2.5 bg-neutral-600 hover:bg-neutral-500'
                )}
              />
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes elasticPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        ` }} />
      </div>
    </div>
  )
}
