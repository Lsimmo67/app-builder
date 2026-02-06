'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

interface ShadcnHeroVideoProps {
  headline?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  videoUrl?: string
  className?: string
}

export default function ShadcnHeroVideo({
  headline = 'See it in action',
  description = 'Watch how our platform transforms the way teams work together. Experience the future of collaboration.',
  primaryCta = 'Start Free Trial',
  secondaryCta = 'Watch Video',
  videoUrl = '',
  className,
}: ShadcnHeroVideoProps) {
  return (
    <section className={cn('relative py-20 px-4 md:py-32 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-muted/50 -z-10" />
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button size="lg">{primaryCta}</Button>
          <Button variant="outline" size="lg">
            <Play className="mr-2 h-4 w-4" />
            {secondaryCta}
          </Button>
        </div>
        <div className="mt-12 relative aspect-video rounded-xl bg-background border overflow-hidden max-w-4xl mx-auto flex items-center justify-center">
          {videoUrl ? (
            <video src={videoUrl} controls className="h-full w-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Play className="h-8 w-8" />
              </div>
              <span className="text-sm">Video Placeholder</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
