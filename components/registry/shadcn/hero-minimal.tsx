'use client'

import { cn } from '@/lib/utils/cn'

interface ShadcnHeroMinimalProps {
  headline?: string
  subheadline?: string
  className?: string
}

export default function ShadcnHeroMinimal({
  headline = 'Simplicity is the ultimate sophistication.',
  subheadline = 'Less is more. Build with intention.',
  className,
}: ShadcnHeroMinimalProps) {
  return (
    <section className={cn('py-24 px-4 md:py-40', className)}>
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-tight">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-8 text-xl text-muted-foreground md:text-2xl">
            {subheadline}
          </p>
        )}
      </div>
    </section>
  )
}
