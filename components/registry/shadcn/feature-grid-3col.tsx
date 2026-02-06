'use client'

import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Layers, Zap, Shield } from 'lucide-react'

interface ShadcnFeatureGrid3ColProps {
  headline?: string
  description?: string
  features?: { title: string; description: string; icon: string }[]
  className?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  layers: Layers,
  zap: Zap,
  shield: Shield,
}

export default function ShadcnFeatureGrid3Col({
  headline = 'Everything you need',
  description = 'Our platform comes packed with powerful features designed to help you succeed.',
  features = [
    { title: 'Lightning Fast', description: 'Optimized performance that keeps your users engaged and your metrics growing.', icon: 'zap' },
    { title: 'Modular Design', description: 'Build with reusable components that scale with your product and team.', icon: 'layers' },
    { title: 'Enterprise Security', description: 'Bank-grade security with encryption, SSO, and compliance built in.', icon: 'shield' },
  ],
  className,
}: ShadcnFeatureGrid3ColProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap
            return (
              <Card key={index} className="border bg-background">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
