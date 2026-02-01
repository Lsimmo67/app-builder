'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  className?: string
  children?: ReactNode
  speed?: number
}

const defaultSections = [
  { title: 'Fluid Motion', desc: 'Buttery smooth scroll with momentum-based easing', icon: 'M5 3l14 9-14 9V3z' },
  { title: 'Lerp Interpolation', desc: 'Linear interpolation creates natural deceleration', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Velocity Tracking', desc: 'Scroll speed drives animation intensity', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Snap Points', desc: 'Magnetic snapping with elastic overshoot', icon: 'M4 6h16M4 12h16M4 18h16' },
]

export default function SmoothScroll({
  className,
  children,
  speed = 0.08,
}: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const currentY = useRef(0)
  const targetY = useRef(0)
  const rafId = useRef<number>(0)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    const content = contentRef.current
    if (!scrollContainer || !content) return

    // Set the container to fixed height and allow the outer wrapper to
    // create the scrollable area based on content height
    const setBodyHeight = () => {
      const contentHeight = content.offsetHeight
      scrollContainer.style.height = `${contentHeight}px`
    }

    setBodyHeight()

    const resizeObserver = new ResizeObserver(() => {
      setBodyHeight()
    })
    resizeObserver.observe(content)

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const smoothScroll = () => {
      targetY.current = scrollContainer.scrollTop
      currentY.current = lerp(currentY.current, targetY.current, speed)

      // Avoid tiny sub-pixel jitter
      if (Math.abs(currentY.current - targetY.current) < 0.5) {
        currentY.current = targetY.current
      }

      gsap.set(content, {
        y: -currentY.current,
      })

      rafId.current = requestAnimationFrame(smoothScroll)
    }

    rafId.current = requestAnimationFrame(smoothScroll)

    return () => {
      cancelAnimationFrame(rafId.current)
      resizeObserver.disconnect()
    }
  }, [speed])

  // Animate child cards in with stagger on scroll
  useGSAP(
    () => {
      const cards = contentRef.current?.querySelectorAll('.smooth-scroll-card')
      if (!cards?.length) return

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={cn('w-full py-20 px-6', className)}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">
          Smooth Scroll
        </h2>
        <p className="mb-14 text-center text-neutral-400">
          Silky scrolling with interpolated motion (lerp: {speed})
        </p>

        <div
          ref={scrollContainerRef}
          className="relative overflow-y-auto overflow-x-hidden rounded-2xl border border-neutral-800 bg-neutral-950/80"
          style={{ height: 400, maxHeight: 400 }}
        >
          <div ref={contentRef} className="p-6 space-y-6 will-change-transform">
            {children ??
              [...defaultSections, ...defaultSections].map((s, i) => (
                <div
                  key={i}
                  className="smooth-scroll-card group flex gap-5 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:border-indigo-500/30 hover:bg-neutral-900/80"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
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
    </div>
  )
}
