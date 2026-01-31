'use client'

import { cn } from '@/lib/utils/cn'

interface RetroGridProps {
  className?: string
  headline?: string
  subtitle?: string
  gridColor?: string
  children?: React.ReactNode
}

export default function RetroGrid({
  className,
  headline = 'Retro Future',
  subtitle = 'A nostalgic perspective grid stretching into the horizon, reminiscent of 80s sci-fi aesthetics. Perfect for bold, retro-themed sections.',
  gridColor = 'rgba(139, 92, 246, 0.3)',
  children,
}: RetroGridProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Retro grid floor */}
      <div className="pointer-events-none absolute inset-0" style={{ perspective: '500px' }}>
        <div
          className="absolute bottom-0 left-0 right-0 h-[60%] origin-bottom"
          style={{
            transform: 'rotateX(60deg)',
            backgroundImage: `
              linear-gradient(to right, ${gridColor} 1px, transparent 1px),
              linear-gradient(to top, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: '60px 40px',
            maskImage: 'linear-gradient(to top, white 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, white 30%, transparent 100%)',
          }}
        />
      </div>

      {/* Horizon glow */}
      <div
        className="pointer-events-none absolute bottom-[38%] left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${gridColor.replace('0.3', '0.6')}, transparent)`,
          boxShadow: `0 0 30px 10px ${gridColor}`,
        }}
      />

      {/* Sun/circle */}
      <div className="pointer-events-none absolute bottom-[35%] left-1/2 -translate-x-1/2">
        <div
          className="h-32 w-32 rounded-full md:h-48 md:w-48"
          style={{
            background: `linear-gradient(to bottom, #f43f5e, #8b5cf6)`,
            boxShadow: `0 0 80px 20px rgba(244, 63, 94, 0.2)`,
            maskImage: 'linear-gradient(to bottom, white 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {children ?? (
          <>
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
              {headline}
            </h1>
            <p className="mx-auto max-w-lg text-lg text-zinc-400">
              {subtitle}
            </p>
          </>
        )}
      </div>
    </section>
  )
}
