'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface MorphingShapesProps {
  className?: string
  title?: string
  description?: string
  duration?: number
  colors?: string[]
}

const shapes = [
  // Circle
  'M150,30 A120,120 0 1,1 149.99,30 Z',
  // Rounded square
  'M70,30 L230,30 Q270,30 270,70 L270,230 Q270,270 230,270 L70,270 Q30,270 30,230 L30,70 Q30,30 70,30 Z',
  // Triangle
  'M150,20 L280,260 L20,260 Z',
  // Star
  'M150,20 L179,100 L265,100 L195,148 L215,235 L150,185 L85,235 L105,148 L35,100 L121,100 Z',
  // Hexagon
  'M150,30 L255,82 L255,218 L150,270 L45,218 L45,82 Z',
]

const defaultColors = [
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#ec4899',
  '#6366f1',
]

export default function MorphingShapes({
  className,
  title = 'Morphing Shapes',
  description = 'SVG paths smoothly morph between different geometric forms using GSAP path animation.',
  duration = 1.5,
  colors = defaultColors,
}: MorphingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const indexRef = useRef(0)

  useGSAP(
    () => {
      if (!pathRef.current) return

      const morphToNext = () => {
        indexRef.current = (indexRef.current + 1) % shapes.length
        const nextShape = shapes[indexRef.current]
        const nextColor = colors[indexRef.current % colors.length]

        gsap.to(pathRef.current, {
          attr: { d: nextShape, fill: nextColor },
          duration,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.delayedCall(0.5, morphToNext)
          },
        })
      }

      gsap.delayedCall(1, morphToNext)
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6 text-center', className)}
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-neutral-400">{description}</p>

        <div className="mt-10 flex justify-center">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-10">
            <svg
              viewBox="0 0 300 300"
              className="h-48 w-48 sm:h-64 sm:w-64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={pathRef}
                d={shapes[0]}
                fill={colors[0]}
                opacity={0.85}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
