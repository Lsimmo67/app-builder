'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealCardProps {
  className?: string
  title?: string
  revealTitle?: string
  description?: string
  bgColor?: string
  revealBgColor?: string
}

export default function TextRevealCard({
  className,
  title = 'You know the business',
  revealTitle = 'I know the chemistry',
  description = 'Hover over this card to reveal the hidden text beneath. A gradient mask follows your cursor to create an interactive reveal effect.',
  bgColor = 'bg-neutral-950',
  revealBgColor = 'bg-white',
}: TextRevealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const maskSize = 300

  const maskX = useTransform(x, (val) => `${val - maskSize / 2}px`)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      x.set(e.clientX - rect.left)
    }
  }

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-lg',
        className
      )}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] p-8',
          bgColor
        )}
      >
        {/* Default visible layer */}
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white/30 sm:text-4xl">
            {title}
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
            {description}
          </p>
        </div>

        {/* Reveal layer - masked by cursor position */}
        <motion.div
          className="absolute inset-0 z-20 flex items-start p-8 opacity-0 group-hover:opacity-100"
          style={{
            WebkitMaskImage: `radial-gradient(circle ${maskSize / 2}px at var(--mask-x) 50%, black 40%, transparent 100%)`,
            maskImage: `radial-gradient(circle ${maskSize / 2}px at var(--mask-x) 50%, black 40%, transparent 100%)`,
          }}
        >
          <motion.div
            style={{
              // @ts-expect-error -- CSS custom property
              '--mask-x': maskX,
            }}
            className={cn(
              'absolute inset-0',
              revealBgColor
            )}
          />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-black sm:text-4xl">
              {revealTitle}
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Gradient bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </div>
  )
}
