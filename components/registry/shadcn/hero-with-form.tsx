'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ShadcnHeroWithFormProps {
  headline?: string
  description?: string
  placeholder?: string
  buttonText?: string
  disclaimerText?: string
  className?: string
}

export default function ShadcnHeroWithForm({
  headline = 'Stay ahead of the curve',
  description = 'Join thousands of professionals who trust our platform. Get early access and be the first to know about new features.',
  placeholder = 'Enter your email',
  buttonText = 'Get Early Access',
  disclaimerText = 'No spam. Unsubscribe at any time.',
  className,
}: ShadcnHeroWithFormProps) {
  return (
    <section className={cn('py-20 px-4 md:py-32', className)}>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={placeholder}
            className="w-full"
          />
          <Button size="lg" className="w-full sm:w-auto whitespace-nowrap">
            {buttonText}
          </Button>
        </div>
        {disclaimerText && (
          <p className="mt-3 text-sm text-muted-foreground">{disclaimerText}</p>
        )}
      </div>
    </section>
  )
}
