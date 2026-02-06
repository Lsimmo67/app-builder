'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ShadcnHeroCenteredProps {
  headline?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  badgeText?: string
  className?: string
}

export default function ShadcnHeroCentered({
  headline = 'Build something amazing today',
  description = 'Create beautiful, responsive websites with our powerful platform. Ship faster, collaborate better, and scale with confidence.',
  primaryCta = 'Get Started',
  secondaryCta = 'Learn More',
  badgeText = 'Now in Beta',
  className,
}: ShadcnHeroCenteredProps) {
  return (
    <section className={cn('py-20 px-4 md:py-32', className)}>
      <div className="mx-auto max-w-4xl text-center">
        {badgeText && (
          <Badge variant="secondary" className="mb-6">
            {badgeText}
          </Badge>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg">{primaryCta}</Button>
          <Button variant="outline" size="lg">{secondaryCta}</Button>
        </div>
      </div>
    </section>
  )
}
