'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  subheadline?: string
  buttonText?: string
  className?: string
}

export default function HeroVideo({
  headline = 'See the future in motion',
  subheadline = 'Watch how we are transforming the way teams build and ship digital products at scale.',
  buttonText = 'Watch Demo',
  className,
}: Props) {
  return (
    <section
      className={cn(
        'relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className,
      )}
    >
      {/* Background video placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-950/60 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          {subheadline}
        </p>
        <div className="mt-12 flex justify-center">
          <button className="group inline-flex items-center gap-3 rounded-full bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            {/* Play icon */}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <svg
                className="ml-0.5 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}
