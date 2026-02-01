'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils/cn'

interface CircularTextProps {
  /** The text to display along the circular path */
  text?: string
  /** Radius of the circle in SVG units */
  radius?: number
  /** Font size in px for the circular text */
  fontSize?: number
  /** Duration of one full rotation in seconds */
  duration?: number
  /** Additional CSS class names */
  className?: string
  style?: React.CSSProperties
}

export default function CircularText({
  text = 'GSAP ANIMATION \u2022 CIRCULAR TEXT \u2022 ROTATE \u2022 ',
  radius = 80,
  fontSize = 12,
  duration = 10,
  className,
  style,
}: CircularTextProps) {
  const spinnerRef = useRef<SVGSVGElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous rotation of the text ring
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      // Subtle pulse on the center badge
      gsap.to(centerRef.current, {
        scale: 1.08,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    return () => ctx.revert()
  }, [duration])

  const viewBox = `0 0 ${radius * 2 + 40} ${radius * 2 + 40}`
  const cx = radius + 20
  const cy = radius + 20
  const pathD = `M${cx},${cy} m-${radius},0 a${radius},${radius} 0 1,1 ${radius * 2},0 a${radius},${radius} 0 1,1 -${radius * 2},0`

  return (
    <div className={cn('w-full py-24 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        <h2 className="mb-12 text-4xl font-bold tracking-tight text-white text-center">
          Circular Rotating Text
        </h2>
        <div className="relative" style={{ width: (radius + 20) * 2, height: (radius + 20) * 2 }}>
          <svg
            ref={spinnerRef}
            viewBox={viewBox}
            className="h-full w-full"
          >
            <defs>
              <path id="circlePath" d={pathD} fill="none" />
            </defs>
            <text
              className="fill-neutral-300 font-semibold uppercase"
              style={{ fontSize: `${fontSize}px`, letterSpacing: '0.3em' }}
            >
              <textPath href="#circlePath">{text}</textPath>
            </text>
          </svg>
          <div
            ref={centerRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-2xl font-bold text-white">G</span>
            </div>
          </div>
        </div>
        <p className="mt-10 text-center text-neutral-400 max-w-md">
          Text orbiting along a circular SVG path with continuous GSAP-powered rotation, perfect for badges and decorative elements.
        </p>
      </div>
    </div>
  )
}
