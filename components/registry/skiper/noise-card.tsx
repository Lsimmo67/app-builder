'use client'

import { cn } from '@/lib/utils/cn'

interface NoiseCardProps {
  className?: string
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function NoiseCard({
  className,
  title = 'Noise Texture',
  description = 'A card with subtle grain texture overlaying a rich purple gradient. The noise adds a tactile, organic quality to digital surfaces.',
  children,
}: NoiseCardProps) {
  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950 p-8',
        'border border-white/5',
        className
      )}
    >
      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: noiseSvg,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Subtle light effect */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-400/10 blur-3xl" />

      <div className="relative z-10">
        {children ?? (
          <>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <svg className="h-7 w-7 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-violet-200/60">{description}</p>
            <div className="flex gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-violet-300">Texture</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-violet-300">Grain</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-violet-300">Design</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
