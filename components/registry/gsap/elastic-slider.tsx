'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils/cn'

interface SlideItem {
  title: string
  description: string
}

interface ElasticSliderProps {
  /** Array of slide items to display */
  items?: SlideItem[]
  /** Additional CSS class names */
  className?: string
  style?: React.CSSProperties
}

const defaultItems: SlideItem[] = [
  { title: 'Momentum', description: 'Physics-based elastic motion' },
  { title: 'Velocity', description: 'Speed-driven animations' },
  { title: 'Tension', description: 'Spring-like interactions' },
  { title: 'Friction', description: 'Smooth deceleration curves' },
]

const slideColors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500']

export default function ElasticSlider({
  items = defaultItems,
  className,
  style,
}: ElasticSliderProps) {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const indicatorRefs = useRef<(HTMLButtonElement | null)[]>([])

  const goToSlide = useCallback(
    (index: number) => {
      if (index === active || !trackRef.current) return

      const direction = index > active ? 1 : -1

      // Elastic slide of the track
      gsap.to(trackRef.current, {
        x: -(index * 100) + '%',
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      })

      // Animate the leaving icon (squash in direction of travel)
      const leavingIcon = iconRefs.current[active]
      if (leavingIcon) {
        gsap.to(leavingIcon, {
          scaleX: 0.6,
          scaleY: 1.3,
          rotation: direction * 15,
          opacity: 0.3,
          duration: 0.4,
          ease: 'power2.in',
        })
      }

      // Animate the entering icon (elastic bounce in)
      const enteringIcon = iconRefs.current[index]
      if (enteringIcon) {
        gsap.fromTo(
          enteringIcon,
          {
            scaleX: 1.4,
            scaleY: 0.6,
            rotation: -direction * 10,
            opacity: 0.3,
          },
          {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'elastic.out(1.2, 0.4)',
          }
        )
      }

      // Animate indicators
      indicatorRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          width: i === index ? 40 : 10,
          backgroundColor: i === index ? '#ffffff' : '#525252',
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        })
      })

      setActive(index)
    },
    [active]
  )

  // Initial setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure track starts at correct position
      gsap.set(trackRef.current, { x: '0%' })

      // Add a subtle floating animation to the active icon
      iconRefs.current.forEach((el, i) => {
        if (!el) return
        if (i === 0) {
          gsap.to(el, {
            y: -6,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        } else {
          gsap.set(el, { opacity: 0.3 })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className={cn('w-full py-20 px-6', className)} style={style}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">
          Elastic Slider
        </h2>
        <p className="mb-12 text-center text-neutral-400">
          Snap between slides with elastic easing
        </p>
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
          <div ref={trackRef} className="flex" style={{ width: `${items.length * 100}%` }}>
            {items.map((item, i) => (
              <div
                key={i}
                className="shrink-0 p-16 text-center"
                style={{ width: `${100 / items.length}%` }}
              >
                <div
                  ref={(el) => { iconRefs.current[i] = el }}
                  className={cn(
                    'mx-auto mb-6 h-20 w-20 rounded-2xl',
                    slideColors[i % slideColors.length]
                  )}
                />
                <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 pb-8">
            {items.map((_, i) => (
              <button
                key={i}
                ref={(el) => { indicatorRefs.current[i] = el }}
                onClick={() => goToSlide(i)}
                className="h-2.5 rounded-full transition-none"
                style={{
                  width: i === 0 ? 40 : 10,
                  backgroundColor: i === 0 ? '#ffffff' : '#525252',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
