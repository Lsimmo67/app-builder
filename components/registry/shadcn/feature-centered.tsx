'use client'

import { cn } from '@/lib/utils/cn'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

interface ShadcnFeatureCenteredProps {
  badgeText?: string
  headline?: string
  description?: string
  features?: string[]
  imageSrc?: string
  className?: string
}

export default function ShadcnFeatureCentered({
  badgeText = 'Features',
  headline = 'Everything you need to ship faster',
  description = 'Our comprehensive toolkit gives you all the building blocks to create production-ready applications in record time.',
  features = [
    'Responsive components',
    'Dark mode support',
    'TypeScript ready',
    'Accessible by default',
    'Fully customizable',
    'Regular updates',
  ],
  imageSrc = '',
  className,
}: ShadcnFeatureCenteredProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-4xl text-center">
        {badgeText && (
          <Badge variant="secondary" className="mb-4">{badgeText}</Badge>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-xl mx-auto text-left">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary shrink-0" />
              <span className="text-foreground">{feature}</span>
            </div>
          ))}
        </div>
        {imageSrc ? (
          <div className="mt-12 rounded-xl border overflow-hidden">
            <img src={imageSrc} alt="Feature preview" className="w-full" />
          </div>
        ) : (
          <div className="mt-12 aspect-video rounded-xl bg-muted border flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Feature Preview</span>
          </div>
        )}
      </div>
    </section>
  )
}
