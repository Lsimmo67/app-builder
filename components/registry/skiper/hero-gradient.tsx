'use client'

import { cn } from '@/lib/utils/cn'

interface HeroGradientProps {
  className?: string
  headline?: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
}

export default function HeroGradient({
  className,
  headline = 'Build Beautiful Interfaces at Lightning Speed',
  subtitle = 'A modern design system that empowers you to create stunning, responsive web experiences with minimal effort.',
  ctaText = 'Start Building',
  onCtaClick,
}: HeroGradientProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[600px] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Mesh gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-violet-600 opacity-30 mix-blend-multiply blur-3xl"
          style={{ animation: 'blob 7s infinite' }}
        />
        <div
          className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-indigo-600 opacity-30 mix-blend-multiply blur-3xl"
          style={{ animation: 'blob 7s infinite 2s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-96 w-96 rounded-full bg-fuchsia-600 opacity-30 mix-blend-multiply blur-3xl"
          style={{ animation: 'blob 7s infinite 4s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60 backdrop-blur-sm">
          Introducing v2.0
        </div>
        <h1 className="mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-7xl">
          {headline}
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onCtaClick}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30"
          >
            {ctaText}
          </button>
          <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur transition-all hover:bg-white/10">
            Learn More
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </section>
  )
}
