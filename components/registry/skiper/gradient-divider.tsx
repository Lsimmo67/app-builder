'use client'

import { cn } from '@/lib/utils/cn'

interface GradientDividerProps {
  className?: string
  variant?: 'simple' | 'glow' | 'dotted' | 'fade'
  gradient?: string
  height?: number
}

export default function GradientDivider({
  className,
  variant = 'simple',
  gradient = 'from-transparent via-violet-500/50 to-transparent',
  height = 1,
}: GradientDividerProps) {
  if (variant === 'dotted') {
    return (
      <div className={cn('flex w-full items-center justify-center py-4', className)}>
        <div className="flex items-center gap-1">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className="h-px w-2 rounded-full"
              style={{
                opacity: Math.abs(i - 20) < 5 ? 0.6 : Math.abs(i - 20) < 10 ? 0.3 : 0.1,
                backgroundColor:
                  i < 15
                    ? 'rgba(139, 92, 246, 0.5)'
                    : i < 25
                      ? 'rgba(99, 102, 241, 0.5)'
                      : 'rgba(139, 92, 246, 0.5)',
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'glow') {
    return (
      <div className={cn('relative w-full py-4', className)}>
        {/* Glow behind the line */}
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-8 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r blur-xl',
            gradient
          )}
        />
        <div
          className={cn('relative mx-auto w-full bg-gradient-to-r', gradient)}
          style={{ height: `${height}px` }}
        />
      </div>
    )
  }

  if (variant === 'fade') {
    return (
      <div className={cn('relative w-full py-8', className)}>
        <div
          className={cn('mx-auto w-full max-w-2xl bg-gradient-to-r', gradient)}
          style={{ height: `${height}px` }}
        />
        {/* Decorative dots at center */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-violet-500/40" />
          <div className="h-1.5 w-1.5 rounded-full bg-violet-500/60" />
          <div className="h-1 w-1 rounded-full bg-violet-500/40" />
        </div>
      </div>
    )
  }

  // Simple variant
  return (
    <div className={cn('w-full py-4', className)}>
      <div
        className={cn('mx-auto w-full bg-gradient-to-r', gradient)}
        style={{ height: `${height}px` }}
      />
    </div>
  )
}
