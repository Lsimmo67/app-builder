'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils/cn'

interface InfiniteScrollProps {
  /** Array of label strings for each scrolling card */
  items?: string[]
  /** Speed multiplier (higher = faster). Default 1 */
  speed?: number
  /** Additional CSS class names */
  className?: string
  style?: React.CSSProperties
}

const defaultItems = Array.from({ length: 8 }, (_, i) => `Project ${i + 1}`)

export default function InfiniteScroll({
  items = defaultItems,
  speed = 1,
  className,
  style,
}: InfiniteScrollProps) {
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    if (!row1 || !row2) return

    const ctx = gsap.context(() => {
      // We duplicate items inside each row so that when the first set
      // scrolls out, the second set is already visible, creating a loop.
      // The modifiers plugin wraps the x value so it never exceeds bounds.

      const cards1 = row1.querySelectorAll<HTMLElement>('.scroll-card')
      const cards2 = row2.querySelectorAll<HTMLElement>('.scroll-card')

      // Calculate total width of one set of cards (half the children, since duplicated)
      const cardWidth = 272 // w-64 (256px) + gap-4 (16px)
      const totalWidth = cardWidth * items.length

      // Row 1: scroll left
      gsap.to(cards1, {
        x: `-=${totalWidth}`,
        duration: 30 / speed,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => {
            return ((parseFloat(String(x)) % totalWidth) + totalWidth) % totalWidth - totalWidth
          }),
        },
      })

      // Row 2: scroll right (opposite direction)
      // Start shifted left and move right
      gsap.set(cards2, { x: -totalWidth })
      gsap.to(cards2, {
        x: `+=${totalWidth}`,
        duration: 30 / speed,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => {
            return (parseFloat(String(x)) % totalWidth)
          }),
        },
      })
    })

    return () => ctx.revert()
  }, [items.length, speed])

  const renderCards = (hueOffset: number) =>
    // Render items twice for seamless loop
    [...items, ...items].map((label, i) => {
      const hue = ((i % items.length) * 45 + hueOffset) % 360
      return (
        <div
          key={i}
          className="scroll-card h-44 w-64 shrink-0 rounded-xl border border-neutral-800 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, hsl(${hue}, 60%, 15%), hsl(${hue + 30}, 60%, 8%))`,
          }}
        >
          <span className="text-sm font-medium text-neutral-400">{label}</span>
        </div>
      )
    })

  return (
    <div className={cn('w-full py-20 px-6 overflow-hidden', className)} style={style}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white">
          Infinite Scroll Gallery
        </h2>
        <p className="mb-12 text-center text-neutral-400">
          A seamless looping gallery that never ends
        </p>
        <div className="mb-4 flex gap-4 overflow-hidden">
          <div ref={row1Ref} className="flex shrink-0 gap-4">
            {renderCards(0)}
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          <div ref={row2Ref} className="flex shrink-0 gap-4">
            {renderCards(180)}
          </div>
        </div>
      </div>
    </div>
  )
}
