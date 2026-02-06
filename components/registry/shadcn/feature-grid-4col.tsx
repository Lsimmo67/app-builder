'use client'

import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/ui/card'
import { Zap, Shield, Globe, BarChart3 } from 'lucide-react'

interface ShadcnFeatureGrid4ColProps {
  headline?: string
  description?: string
  features?: { title: string; description: string; icon: string }[]
  className?: string
}

const iconMap: Record<string, React.ElementType> = {
  zap: Zap,
  shield: Shield,
  globe: Globe,
  chart: BarChart3,
}

export default function ShadcnFeatureGrid4Col({
  headline = 'Powerful features for modern teams',
  description = 'Everything you need to build, ship, and grow your product.',
  features = [
    { title: 'Blazing Fast', description: 'Sub-second load times that keep users happy.', icon: 'zap' },
    { title: 'Secure by Default', description: 'Enterprise-grade security out of the box.', icon: 'shield' },
    { title: 'Global CDN', description: 'Content delivery from edge locations worldwide.', icon: 'globe' },
    { title: 'Analytics', description: 'Real-time insights into your performance.', icon: 'chart' },
  ],
  className,
}: ShadcnFeatureGrid4ColProps) {
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap
            return (
              <Card key={index} className="border bg-background text-center">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
