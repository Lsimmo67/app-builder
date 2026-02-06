'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnCtaSplitProps {
  headline?: string
  description?: string
  ctaText?: string
  imageSrc?: string
  className?: string
}

export default function ShadcnCtaSplit({
  headline = 'Start building today',
  description = 'Get up and running in minutes. Our platform handles the infrastructure so you can focus on what matters most - building great products.',
  ctaText = 'Get Started Free',
  imageSrc = '',
  className,
}: ShadcnCtaSplitProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 rounded-2xl bg-muted/50 p-8 md:p-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {headline}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="mt-8">
              <Button size="lg">{ctaText}</Button>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-background border flex items-center justify-center">
            {imageSrc ? (
              <img src={imageSrc} alt="CTA visual" className="h-full w-full object-cover rounded-xl" />
            ) : (
              <span className="text-muted-foreground text-sm">Image Placeholder</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
