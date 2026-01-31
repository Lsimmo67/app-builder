'use client'

import { cn } from '@/lib/utils/cn'

interface Props {
  headline?: string
  buttonText?: string
  className?: string
}

export default function HeroMinimal({
  headline = 'Less noise. More signal.',
  buttonText = 'Get Started',
  className,
}: Props) {
  return (
    <section
      className={cn(
        'flex min-h-screen items-center justify-center bg-background px-6 py-32',
        className,
      )}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <div className="mt-12">
          <button className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-10 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}
