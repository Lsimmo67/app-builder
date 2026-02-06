'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnCtaBannerProps {
  headline?: string
  description?: string
  ctaText?: string
  className?: string
}

export default function ShadcnCtaBanner({
  headline = 'Boost your productivity today',
  description = 'Start your 14-day free trial. No credit card required.',
  ctaText = 'Get Started',
  className,
}: ShadcnCtaBannerProps) {
  return (
    <section className={cn('py-12 px-4', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-primary px-8 py-12 md:px-16 md:py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {description}
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary">{ctaText}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
