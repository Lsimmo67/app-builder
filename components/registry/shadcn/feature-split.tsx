'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface ShadcnFeatureSplitProps {
  headline?: string
  description?: string
  features?: string[]
  ctaText?: string
  imageSrc?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

export default function ShadcnFeatureSplit({
  headline = 'Built for developers who care',
  description = 'We believe great tools should get out of your way. Our platform is designed to help you focus on building, not configuring.',
  features = [
    'Hot module replacement for instant feedback',
    'TypeScript support with full type safety',
    'Built-in testing framework',
    'Automatic code splitting',
  ],
  ctaText = 'Learn More',
  imageSrc = '',
  imagePosition = 'right',
  className,
}: ShadcnFeatureSplitProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className={cn(
        'mx-auto max-w-6xl grid grid-cols-1 items-center gap-12 lg:grid-cols-2',
        imagePosition === 'left' && 'lg:[&>*:first-child]:order-2'
      )}>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
          <ul className="mt-6 space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          {ctaText && (
            <div className="mt-8">
              <Button size="lg">{ctaText}</Button>
            </div>
          )}
        </div>
        <div className="aspect-square rounded-xl bg-muted border flex items-center justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt="Feature" className="h-full w-full object-cover rounded-xl" />
          ) : (
            <span className="text-muted-foreground text-sm">Image Placeholder</span>
          )}
        </div>
      </div>
    </section>
  )
}
