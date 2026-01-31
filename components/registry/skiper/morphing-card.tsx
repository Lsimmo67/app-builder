'use client'

import { cn } from '@/lib/utils/cn'

interface MorphingCardProps {
  className?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function MorphingCard({
  className,
  title = 'Morphing Shape',
  description = 'Hover to see this card morph into an organic blob shape. The smooth border-radius transition creates a fluid, playful interaction.',
  children,
}: MorphingCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white',
        'transition-all duration-700 ease-in-out',
        'rounded-2xl',
        className
      )}
      style={{
        borderRadius: '1rem',
        transition: 'border-radius 0.7s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.7s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%'
        e.currentTarget.style.boxShadow = '0 25px 60px -12px rgba(139, 92, 246, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderRadius = '1rem'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Inner glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10" />

      <div className="relative z-10">
        {children ?? (
          <>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">{title}</h3>
            <p className="text-sm leading-relaxed text-white/70">{description}</p>
          </>
        )}
      </div>
    </div>
  )
}
