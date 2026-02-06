'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnCtaCenteredProps {
  headline?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  className?: string
}

export default function ShadcnCtaCentered({
  headline = 'Ready to get started?',
  description = 'Join thousands of teams already using our platform to build better products faster.',
  primaryCta = 'Start Free Trial',
  secondaryCta = 'Talk to Sales',
  className,
}: ShadcnCtaCenteredProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg">{primaryCta}</Button>
          {secondaryCta && (
            <Button variant="outline" size="lg">{secondaryCta}</Button>
          )}
        </div>
      </div>
    </section>
  )
}
