'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  subheadline?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  overlayOpacity?: string
  className?: string
}

export default function HeroImage({
  headline = 'Craft experiences that inspire',
  subheadline = 'Build pixel-perfect products with confidence. Our platform gives you everything you need to turn your vision into reality.',
  primaryButtonText = 'Get Started Free',
  secondaryButtonText = 'Watch Demo',
  overlayOpacity = 'bg-black/60',
  className,
}: Props) {
  return (
    <section
      className={cn(
        'relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-24 md:px-12 lg:px-24',
        className,
      )}
    >
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
      </div>
      {/* Overlay */}
      <div className={cn('absolute inset-0', overlayOpacity)} />
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
          {subheadline}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            {primaryButtonText}
          </button>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </section>
  )
}
