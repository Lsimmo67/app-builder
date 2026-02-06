'use client'

import { cn } from '@/lib/utils/cn'

interface ShadcnFaqTwoColumnProps {
  headline?: string
  description?: string
  faqs?: { question: string; answer: string }[]
  className?: string
}

export default function ShadcnFaqTwoColumn({
  headline = 'Frequently asked questions',
  description = 'Everything you need to know about our product and billing.',
  faqs = [
    { question: 'How does the free trial work?', answer: 'You get full access to all features for 14 days. No credit card required. Cancel anytime.' },
    { question: 'Can I change plans later?', answer: 'Yes, you can upgrade or downgrade your plan at any time from your dashboard.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.' },
    { question: 'Is my data secure?', answer: 'Absolutely. We use industry-standard encryption and are SOC2 compliant.' },
    { question: 'Can I export my data?', answer: 'Yes, you can export all your data at any time in standard formats like CSV and JSON.' },
    { question: 'Do you offer discounts for nonprofits?', answer: 'Yes, we offer a 50% discount for verified nonprofit organizations. Contact sales for details.' },
  ],
  className,
}: ShadcnFaqTwoColumnProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
