'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface ScaleInProps {
  className?: string
  children?: ReactNode
  duration?: number
  delay?: number
  ease?: string
}

export default function ScaleIn({
  className,
  children,
  duration = 0.8,
  delay = 0,
  ease = 'back.out(1.7)',
}: ScaleInProps) {
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
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      if (!isVisible || !containerRef.current) return

      gsap.from(containerRef.current, {
        scale: 0,
        opacity: 0,
        duration,
        delay,
        ease,
      })
    },
    { scope: containerRef, dependencies: [isVisible] }
  )

  return (
    <div
      ref={containerRef}
      className={cn(!isVisible && 'scale-0 opacity-0', className)}
    >
      {children ?? (
        <div className="w-full py-20 px-6">
          <div className="mx-auto max-w-sm">
            <div className="flex flex-col items-center rounded-3xl border border-neutral-800 bg-neutral-900/60 p-10 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Scale In Effect</h3>
              <p className="mt-2 text-sm text-neutral-400">
                This element scales up from zero with a satisfying bounce
                animation when it enters the viewport.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
