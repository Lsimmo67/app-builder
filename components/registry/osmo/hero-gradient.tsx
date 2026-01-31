'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  subheadline?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  className?: string
}

export default function HeroGradient({
  headline = 'The future of building is here',
  subheadline = 'Leverage cutting-edge tools and frameworks to create exceptional digital experiences. Fast, reliable, and beautifully crafted.',
  primaryButtonText = 'Start Building',
  secondaryButtonText = 'See Examples',
  className,
}: Props) {
  return (
    <section
      className={cn(
        'relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-6 py-24 md:px-12 lg:px-24',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
          Now available in beta
        </div>
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {subheadline}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {primaryButtonText}
          </button>
          <button className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background/80 px-8 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </section>
  )
}
