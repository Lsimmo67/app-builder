'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface GridBackgroundProps {
  className?: string
  children?: React.ReactNode
  gridSize?: number
  gridColor?: string
  fadeColor?: string
}

export default function GridBackground({
  className,
  children,
  gridSize = 40,
  gridColor = 'rgba(255, 255, 255, 0.03)',
  fadeColor = 'rgb(0, 0, 0)',
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-black',
        className
      )}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Radial gradient fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, ${fadeColor} 100%)`,
        }}
      />

      {/* Optional accent glow */}
      <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {children || (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-neutral-400">
                Grid Background
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-6xl">
                Content with a Subtle
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Grid Pattern
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base text-neutral-400 md:text-lg">
                A clean, minimal grid background that adds depth and structure
                to your sections without overwhelming the content. The radial
                gradient fade creates a natural vignette effect.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200">
                  Get Started
                </button>
                <button className="rounded-lg border border-neutral-700 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-neutral-500">
                  Documentation
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
