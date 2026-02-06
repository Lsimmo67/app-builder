'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ShadcnCtaWithFormProps {
  headline?: string
  description?: string
  placeholder?: string
  buttonText?: string
  disclaimer?: string
  className?: string
}

export default function ShadcnCtaWithForm({
  headline = 'Get early access',
  description = 'Be the first to try new features. Sign up for early access and get exclusive updates.',
  placeholder = 'Enter your email',
  buttonText = 'Sign Up',
  disclaimer = 'We respect your privacy. Unsubscribe at any time.',
  className,
}: ShadcnCtaWithFormProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-muted/50 border p-8 md:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {headline}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input type="email" placeholder={placeholder} className="flex-1 bg-background" />
                <Button size="lg" className="whitespace-nowrap">{buttonText}</Button>
              </div>
              {disclaimer && (
                <p className="mt-3 text-sm text-muted-foreground">{disclaimer}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
