'use client'

import { cn } from '@/lib/utils/cn'

interface GlassCardProps {
  className?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function GlassCard({
  className,
  title = 'Glassmorphism',
  description = 'A beautifully frosted glass card with depth and translucency. Perfect for layered, modern interfaces.',
  children,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl',
        'p-8 shadow-2xl',
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />

      {/* Accent glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10">
        {children ?? (
          <>
            <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur">
              Featured
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              {description}
            </p>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400" />
              <div>
                <p className="text-sm font-medium text-white">Alex Morgan</p>
                <p className="text-xs text-white/40">Product Designer</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
