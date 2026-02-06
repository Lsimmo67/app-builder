'use client'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail } from 'lucide-react'

interface ShadcnNewsletterFormProps {
  headline?: string
  description?: string
  placeholder?: string
  buttonText?: string
  disclaimer?: string
  className?: string
}

export default function ShadcnNewsletterForm({
  headline = 'Join our newsletter',
  description = 'Get weekly insights, tips, and updates delivered to your inbox. Join 10,000+ subscribers.',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  disclaimer = 'We care about your data. Read our privacy policy.',
  className,
}: ShadcnNewsletterFormProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-xl">
        <Card className="bg-muted/30">
          <CardContent className="pt-8 pb-8 px-6 md:px-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{headline}</h2>
            <p className="mt-3 text-muted-foreground">{description}</p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder={placeholder} className="flex-1 bg-background" />
              <Button type="submit" className="whitespace-nowrap">{buttonText}</Button>
            </form>
            {disclaimer && (
              <p className="mt-3 text-xs text-muted-foreground">{disclaimer}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
