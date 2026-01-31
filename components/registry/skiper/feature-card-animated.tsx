'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface FeatureCardAnimatedProps {
  className?: string
  title?: string
  description?: string
  iconPath?: string
  accentColor?: string
  delay?: number
}

export default function FeatureCardAnimated({
  className,
  title = 'Lightning Fast',
  description = 'Optimized for performance with sub-millisecond response times and intelligent caching built in.',
  iconPath = 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  accentColor = 'violet',
  delay = 0,
}: FeatureCardAnimatedProps) {
  const colorMap: Record<string, { bg: string; text: string; glow: string; ring: string }> = {
    violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'bg-violet-500/20', ring: 'group-hover:ring-violet-500/20' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'bg-blue-500/20', ring: 'group-hover:ring-blue-500/20' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'bg-cyan-500/20', ring: 'group-hover:ring-cyan-500/20' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'bg-emerald-500/20', ring: 'group-hover:ring-emerald-500/20' },
    pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', glow: 'bg-pink-500/20', ring: 'group-hover:ring-pink-500/20' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'bg-amber-500/20', ring: 'group-hover:ring-amber-500/20' },
  }

  const colors = colorMap[accentColor] || colorMap.violet

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950 p-8 ring-1 ring-transparent transition-all duration-500',
        colors.ring,
        className
      )}
    >
      {/* Animated icon background glow */}
      <div className="relative mb-6">
        <motion.div
          className={cn(
            'absolute -inset-4 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100',
            colors.glow
          )}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <div
          className={cn(
            'relative flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-500',
            colors.bg
          )}
        >
          <svg
            className={cn('h-7 w-7', colors.text)}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
          </svg>
        </div>
      </div>

      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-400">{description}</p>

      {/* Bottom gradient line on hover */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100',
          `via-${accentColor}-500/50`
        )}
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, var(--tw-gradient-stops, rgba(139,92,246,0.5)), transparent)`,
        }}
      />
    </motion.div>
  )
}
