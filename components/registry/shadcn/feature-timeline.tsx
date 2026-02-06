'use client'

import { cn } from '@/lib/utils/cn'

interface ShadcnFeatureTimelineProps {
  headline?: string
  description?: string
  items?: { title: string; description: string; date: string }[]
  className?: string
}

export default function ShadcnFeatureTimeline({
  headline = 'Our journey',
  description = 'A look at the milestones that shaped our product.',
  items = [
    { title: 'Founded', description: 'Started with a vision to simplify web development for everyone.', date: '2021' },
    { title: 'First Release', description: 'Launched our MVP with core features and 100 early adopters.', date: '2022' },
    { title: 'Series A', description: 'Raised funding to expand the team and accelerate development.', date: '2023' },
    { title: '10K Users', description: 'Reached a major milestone with 10,000 active users worldwide.', date: '2024' },
  ],
  className,
}: ShadcnFeatureTimelineProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />
          <div className="space-y-12">
            {items.map((item, index) => (
              <div key={index} className={cn('relative flex items-start gap-6 md:gap-12', index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}>
                <div className={cn('flex-1', index % 2 === 0 ? 'md:text-right' : 'md:text-left')}>
                  <div className="pl-10 md:pl-0">
                    <span className="text-sm font-semibold text-primary">{item.date}</span>
                    <h3 className="text-xl font-bold text-foreground mt-1">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
