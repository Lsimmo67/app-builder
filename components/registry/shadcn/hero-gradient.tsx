'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnHeroGradientProps {
  headline?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  gradientFrom?: string
  gradientTo?: string
  className?: string
}

export default function ShadcnHeroGradient({
  headline = 'Elevate your digital presence',
  description = 'Stand out with a beautiful, modern website that captures attention and drives results. Built for speed and designed for impact.',
  primaryCta = 'Get Started',
  secondaryCta = 'See Examples',
  gradientFrom = '#6366f1',
  gradientTo = '#8b5cf6',
  className,
}: ShadcnHeroGradientProps) {
  return (
    <section
      className={cn('relative py-20 px-4 md:py-32 overflow-hidden', className)}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-white/80 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg" variant="secondary">{primaryCta}</Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            {secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  )
}
