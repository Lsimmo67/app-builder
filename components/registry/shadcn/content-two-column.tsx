'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

interface ShadcnContentTwoColumnProps {
  headline?: string
  content?: string
  ctaText?: string
  imageSrc?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

export default function ShadcnContentTwoColumn({
  headline = 'Built for the modern web',
  content = 'Our platform combines the latest technologies with best practices to deliver an exceptional developer experience. From server-side rendering to edge deployment, we handle the complexity so you can focus on building great products.\n\nWith built-in support for TypeScript, automated testing, and CI/CD pipelines, your team can ship with confidence every time.',
  ctaText = 'Learn More',
  imageSrc = '',
  imagePosition = 'right',
  className,
}: ShadcnContentTwoColumnProps) {
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
          <div className="mt-6 space-y-4">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          {ctaText && (
            <div className="mt-8">
              <Button size="lg">{ctaText}</Button>
            </div>
          )}
        </div>
        <div className="aspect-square rounded-xl bg-muted border flex items-center justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt={headline} className="h-full w-full object-cover rounded-xl" />
          ) : (
            <span className="text-muted-foreground text-sm">Image Placeholder</span>
          )}
        </div>
      </div>
    </section>
  )
}
