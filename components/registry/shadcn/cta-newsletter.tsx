'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

interface ShadcnCtaNewsletterProps {
  headline?: string
  description?: string
  placeholder?: string
  buttonText?: string
  className?: string
}

export default function ShadcnCtaNewsletter({
  headline = 'Subscribe to our newsletter',
  description = 'Get the latest updates, articles, and resources delivered straight to your inbox every week.',
  placeholder = 'you@example.com',
  buttonText = 'Subscribe',
  className,
}: ShadcnCtaNewsletterProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-xl text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input type="email" placeholder={placeholder} className="flex-1" />
          <Button className="whitespace-nowrap">{buttonText}</Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">No spam ever. Unsubscribe at any time.</p>
      </div>
    </section>
  )
}
