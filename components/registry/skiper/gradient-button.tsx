'use client'

import { cn } from '@/lib/utils/cn'

interface GradientButtonProps {
  className?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function GradientButton({
  className,
  children = 'Get Started',
  size = 'md',
  onClick,
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold text-white transition-all duration-300',
        'bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600',
        'hover:from-fuchsia-600 hover:via-pink-600 hover:to-rose-600',
        'hover:shadow-lg hover:shadow-violet-500/25',
        'active:scale-[0.98]',
        sizeClasses[size],
        className
      )}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {/* Inner highlight */}
      <div className="pointer-events-none absolute inset-px rounded-[11px] bg-gradient-to-b from-white/20 to-transparent" />

      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </button>
  )
}
