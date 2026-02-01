'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxLayer {
  content: ReactNode
  speed: number
}

interface ParallaxLayersProps {
  className?: string
  children?: ReactNode
  layers?: ParallaxLayer[]
}

const defaultLayers: ParallaxLayer[] = [
  {
    content: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-gradient-to-br from-indigo-900/30 to-transparent blur-3xl" />
      </div>
    ),
    speed: 0.2,
  },
  {
    content: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-48 w-48 translate-x-32 rounded-full bg-gradient-to-br from-purple-900/40 to-transparent blur-2xl" />
      </div>
    ),
    speed: 0.5,
  },
  {
    content: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-32 w-32 -translate-x-20 translate-y-16 rounded-full bg-gradient-to-br from-pink-900/30 to-transparent blur-xl" />
      </div>
    ),
    speed: 0.8,
  },
]

const layerLabels = ['Background', 'Midground', 'Foreground']

export default function ParallaxLayers({
  className,
  children,
  layers = defaultLayers,
}: ParallaxLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      if (!containerRef.current) return

      layerRefs.current.forEach((layerEl, i) => {
        if (!layerEl) return

        const speed = layers[i]?.speed ?? 0.5

        gsap.to(layerEl, {
          yPercent: -100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: containerRef, dependencies: [layers] }
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden py-32 px-6', className)}
    >
      {/* Parallax layers */}
      {layers.map((layer, i) => (
        <div
          key={i}
          ref={(el) => {
            layerRefs.current[i] = el
          }}
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: i }}
        >
          {layer.content}
        </div>
      ))}

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center" style={{ zIndex: layers.length }}>
        {children ?? (
          <>
            <h2 className="text-5xl font-bold tracking-tight text-white">
              Multi-Layer Parallax
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Layered depth creates an immersive sense of dimension as elements
              move at different speeds on scroll.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {layerLabels.map((label, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm p-4"
                >
                  <p className="text-sm font-semibold text-white">Layer {i + 1}</p>
                  <p className="text-xs text-neutral-500">{label}</p>
                  <p className="mt-1 text-xs font-mono text-indigo-400">
                    {layers[i] ? `${layers[i].speed}x` : '--'}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
