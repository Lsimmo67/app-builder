'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnHeroSplitProps {
  headline?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export default function ShadcnHeroSplit({
  headline = 'Grow your business with modern tools',
  description = 'Our platform provides everything you need to build, launch, and scale your product. Focus on what matters most while we handle the rest.',
  primaryCta = 'Start Free Trial',
  secondaryCta = 'Watch Demo',
  imageSrc = '',
  imageAlt = 'Hero image',
  className,
}: ShadcnHeroSplitProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-7xl grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg">{primaryCta}</Button>
            <Button variant="outline" size="lg">{secondaryCta}</Button>
          </div>
        </div>
        <div className="relative aspect-video rounded-xl bg-muted border overflow-hidden flex items-center justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
          ) : (
            <div className="text-muted-foreground text-sm">Image Placeholder</div>
          )}
        </div>
      </div>
    </section>
  )
}
