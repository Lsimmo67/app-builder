'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface MagneticElementProps {
  className?: string
  children?: ReactNode
  strength?: number
  duration?: number
}

export default function MagneticElement({
  className,
  children,
  strength = 0.3,
  duration = 0.4,
}: MagneticElementProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el) return

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: duration * 1.5,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto',
        })
      }

      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
    },
    { scope: containerRef }
  )

  return (
    <div className={cn('flex items-center justify-center py-20 px-6', className)}>
      <div ref={containerRef} className="will-change-transform cursor-pointer">
        {children ?? (
          <div className="group relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-xl transition-opacity group-hover:opacity-40" />
            <div className="relative flex flex-col items-center gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-12 backdrop-blur-sm transition-colors group-hover:border-neutral-700">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                  />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">
                  Magnetic Effect
                </h3>
                <p className="mt-2 max-w-xs text-sm text-neutral-400">
                  Move your cursor over this element. It gently follows your
                  mouse with a smooth magnetic pull and snaps back on leave.
                </p>
              </div>
              <button className="rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-400">
                Hover Me
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
