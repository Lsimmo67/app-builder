'use client'

import { cn } from '@/lib/utils/cn'
import { Separator } from '@/components/ui/separator'

interface ShadcnFaqSimpleProps {
  headline?: string
  description?: string
  faqs?: { question: string; answer: string }[]
  className?: string
}

export default function ShadcnFaqSimple({
  headline = 'Common questions',
  description = 'Quick answers to questions you might have.',
  faqs = [
    { question: 'Is there a free plan?', answer: 'Yes, our free plan includes all core features with usage limits that work great for individuals and small projects.' },
    { question: 'How long is the free trial?', answer: 'All paid plans include a 14-day free trial with full access to every feature. No credit card required.' },
    { question: 'Can I cancel anytime?', answer: 'Absolutely. You can cancel your subscription at any time. Your data will remain accessible until the end of your billing period.' },
    { question: 'Do you offer support?', answer: 'Yes, all plans include email support. Paid plans include priority support with faster response times.' },
  ],
  className,
}: ShadcnFaqSimpleProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index}>
              {index > 0 && <Separator />}
              <div className="py-6">
                <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
