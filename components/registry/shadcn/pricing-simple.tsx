'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface ShadcnPricingSimpleProps {
  headline?: string
  description?: string
  price?: string
  period?: string
  features?: string[]
  ctaText?: string
  className?: string
}

export default function ShadcnPricingSimple({
  headline = 'One plan, everything included',
  description = 'No tiers, no surprises. Just a simple, fair price for everyone.',
  price = '$19',
  period = '/month',
  features = [
    'Unlimited projects',
    '100GB storage',
    'Priority support',
    'Custom domains',
    'Advanced analytics',
    'Team collaboration',
  ],
  ctaText = 'Start Your Free Trial',
  className,
}: ShadcnPricingSimpleProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        <Card className="mt-10">
          <CardHeader className="text-center pb-2">
            <div>
              <span className="text-5xl font-bold text-foreground">{price}</span>
              <span className="text-xl text-muted-foreground">{period}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full">{ctaText}</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
