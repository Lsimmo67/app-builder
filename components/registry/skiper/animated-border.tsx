'use client'

import { cn } from '@/lib/utils/cn'

interface AnimatedBorderProps {
  className?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function AnimatedBorder({
  className,
  title = 'Animated Border',
  description = 'A card with a continuously rotating gradient border that catches the eye. Ideal for highlighting premium content.',
  children,
}: AnimatedBorderProps) {
  return (
    <div className={cn('relative rounded-2xl p-px', className)}>
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(var(--border-angle, 0deg), #8b5cf6, #06b6d4, #8b5cf6, #f43f5e, #8b5cf6)',
          backgroundSize: '200% auto',
          animation: 'animatedBorderRotate 3s linear infinite',
        }}
      />

      {/* Inner card */}
      <div className="relative rounded-[15px] bg-zinc-950 p-8">
        {children ?? (
          <>
            <div className="mb-3 inline-flex rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              Premium
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
            <p className="mb-4 text-sm leading-relaxed text-zinc-400">{description}</p>
            <div className="flex gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-violet-500" />
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-500" />
              <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes animatedBorderRotate {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  )
}
