'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Zap, Star, Award } from 'lucide-react'

interface ShadcnHeroWithBadgesProps {
  headline?: string
  description?: string
  primaryCta?: string
  badges?: { label: string; icon: string }[]
  className?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  zap: Zap,
  star: Star,
  award: Award,
}

export default function ShadcnHeroWithBadges({
  headline = 'Trusted by thousands of teams worldwide',
  description = 'Our platform is built on trust, security, and performance. Join the community of innovators building the future.',
  primaryCta = 'Get Started Free',
  badges = [
    { label: 'SOC2 Compliant', icon: 'shield' },
    { label: '99.9% Uptime', icon: 'zap' },
    { label: '4.9/5 Rating', icon: 'star' },
    { label: 'Award Winning', icon: 'award' },
  ],
  className,
}: ShadcnHeroWithBadgesProps) {
  return (
    <section className={cn('py-20 px-4 md:py-32', className)}>
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mt-8">
          <Button size="lg">{primaryCta}</Button>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {badges.map((badge, index) => {
            const Icon = iconMap[badge.icon] || Shield
            return (
              <Badge
                key={index}
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Icon className="h-4 w-4" />
                {badge.label}
              </Badge>
            )
          })}
        </div>
      </div>
    </section>
  )
}
