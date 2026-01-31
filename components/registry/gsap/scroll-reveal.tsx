'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface ScrollRevealProps {
  className?: string
  children?: ReactNode
  delay?: number
  duration?: number
  y?: number
}

export default function ScrollReveal({
  className,
  children,
  delay = 0,
  duration = 1,
  y = 60,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      if (!isVisible || !containerRef.current) return

      gsap.from(containerRef.current, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: 'power3.out',
      })
    },
    { scope: containerRef, dependencies: [isVisible] }
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full py-20 px-6',
        !isVisible && 'opacity-0',
        className
      )}
    >
      <div className="mx-auto max-w-4xl">
        {children ?? (
          <div className="space-y-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Revealed on Scroll
            </h2>
            <p className="text-lg leading-relaxed text-neutral-400">
              This entire section fades in and slides up as you scroll it into
              view. The animation triggers once and stays visible, creating a
              polished reveal experience for your page sections.
            </p>
            <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-3">
              {['Design', 'Develop', 'Deploy'].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item}</h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Quality-driven workflow step.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
