'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils/cn'

gsap.registerPlugin(ScrollTrigger)

interface DrawSvgProps {
  /** SVG path d attribute string */
  path?: string
  /** Stroke color for the drawn path */
  strokeColor?: string
  /** Stroke width for the drawn path */
  strokeWidth?: number
  /** Additional CSS class names */
  className?: string
  style?: React.CSSProperties
}

const defaultPaths = [
  { d: 'M10 80 Q 95 10 180 80', label: 'Paths' },
  { d: 'M10 10 L 90 90 L 170 10', label: 'Shapes' },
  { d: 'M20 50 A 30 30 0 1 1 80 50 A 30 30 0 1 1 20 50', label: 'Icons' },
]

export default function DrawSvg({
  path,
  strokeColor = '#818cf8',
  strokeWidth = 3,
  className,
  style,
}: DrawSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([])

  const paths = path
    ? [{ d: path, label: 'Custom' }]
    : defaultPaths

  useEffect(() => {
    const ctx = gsap.context(() => {
      pathRefs.current.forEach((pathEl, i) => {
        if (!pathEl) return

        // Measure the actual path length for accurate dasharray
        const length = pathEl.getTotalLength()

        // Set up the dash pattern to hide the entire stroke
        gsap.set(pathEl, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        // Animate strokeDashoffset to 0 when scrolled into view
        gsap.to(pathEl, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.inOut',
          delay: i * 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [path, strokeColor, strokeWidth])

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6', className)}
      style={style}
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">
          SVG Line Drawing
        </h2>
        <p className="mb-12 text-neutral-400">
          Watch paths trace themselves into view on scroll
        </p>
        <div className="flex items-center justify-center gap-12">
          {paths.map((item, i) => (
            <svg key={i} viewBox="0 0 200 100" className="h-32 w-48">
              <defs>
                <linearGradient
                  id={`drawGrad-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={strokeColor} />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <path
                ref={(el) => { pathRefs.current[i] = el }}
                d={item.d}
                fill="none"
                stroke={`url(#drawGrad-${i})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            </svg>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6">
          {paths.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5"
            >
              <p className="text-sm font-medium text-indigo-400">
                {item.label}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Animated SVG stroke drawing
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
