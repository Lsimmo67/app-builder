'use client'

import { cn } from '@/lib/utils/cn'
import { CheckCircle } from 'lucide-react'

interface ShadcnFeatureListProps {
  headline?: string
  description?: string
  features?: { title: string; description: string }[]
  className?: string
}

export default function ShadcnFeatureList({
  headline = 'Why choose us',
  description = 'Here are the top reasons teams love our platform.',
  features = [
    { title: 'Easy Integration', description: 'Connect with your existing tools in minutes, not days.' },
    { title: 'Real-time Sync', description: 'Changes propagate instantly across all connected devices.' },
    { title: 'Advanced Analytics', description: 'Get deep insights into usage patterns and performance.' },
    { title: 'Custom Workflows', description: 'Automate repetitive tasks with our visual workflow builder.' },
    { title: '24/7 Support', description: 'Our team is always available to help you succeed.' },
  ],
  className,
}: ShadcnFeatureListProps) {
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
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
