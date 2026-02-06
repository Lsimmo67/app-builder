'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface ShadcnPricingCardsProps {
  headline?: string
  description?: string
  plans?: {
    name: string
    price: string
    period: string
    features: string[]
    cta: string
  }[]
  className?: string
}

export default function ShadcnPricingCards({
  headline = 'Choose your plan',
  description = 'Start free, upgrade when you need more.',
  plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: ['1 Project', '1GB Storage', 'Community Support'],
      cta: 'Get Started Free',
    },
    {
      name: 'Team',
      price: '$49',
      period: '/month',
      features: ['10 Projects', '50GB Storage', 'Priority Support', 'Custom Domain'],
      cta: 'Start Free Trial',
    },
  ],
  className,
}: ShadcnPricingCardsProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={index === 0 ? 'outline' : 'default'}>{plan.cta}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
