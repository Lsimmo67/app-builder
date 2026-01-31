'use client'

import { cn } from '@/lib/utils/cn'

interface ShimmerButtonProps {
  className?: string
  children?: React.ReactNode
  shimmerColor?: string
  backgroundColor?: string
  onClick?: () => void
}

export default function ShimmerButton({
  className,
  children = 'Shimmer Effect',
  shimmerColor = 'rgba(255, 255, 255, 0.3)',
  backgroundColor,
  onClick,
}: ShimmerButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          'shimmer-btn group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-3.5 font-semibold text-white transition-all duration-300',
          'hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98]',
          className
        )}
        style={{
          background: backgroundColor ?? 'linear-gradient(135deg, #7c3aed, #4f46e5)',
        }}
      >
        {/* Shimmer sweep */}
        <div
          className="shimmer-sweep pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(
              105deg,
              transparent 20%,
              transparent 40%,
              ${shimmerColor} 50%,
              transparent 60%,
              transparent 80%
            )`,
            backgroundSize: '200% 100%',
            animation: 'shimmerSweep 2.5s ease-in-out infinite',
          }}
        />

        {/* Top inner highlight */}
        <div className="pointer-events-none absolute inset-px rounded-[11px] bg-gradient-to-b from-white/20 via-transparent to-transparent" />

        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>

      <style jsx>{`
        @keyframes shimmerSweep {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </>
  )
}
