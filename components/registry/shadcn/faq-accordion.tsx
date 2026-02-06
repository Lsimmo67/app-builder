'use client'

import { cn } from '@/lib/utils/cn'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface ShadcnFaqAccordionProps {
  headline?: string
  description?: string
  faqs?: { question: string; answer: string }[]
  className?: string
}

export default function ShadcnFaqAccordion({
  headline = 'Frequently asked questions',
  description = 'Find answers to common questions about our product.',
  faqs = [
    { question: 'What is included in the free plan?', answer: 'The free plan includes up to 3 projects, 1GB of storage, community support, and access to all core features. No credit card required to get started.' },
    { question: 'Can I upgrade or downgrade my plan?', answer: 'Yes, you can change your plan at any time. When upgrading, you will be charged the prorated difference. When downgrading, the credit will be applied to your next billing cycle.' },
    { question: 'Is there a free trial for paid plans?', answer: 'Absolutely! All paid plans come with a 14-day free trial. You can explore all features without any commitment or credit card.' },
    { question: 'How do I cancel my subscription?', answer: 'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.' },
    { question: 'Do you offer refunds?', answer: 'We offer a 30-day money-back guarantee for all paid plans. If you are not satisfied, contact our support team for a full refund.' },
  ],
  className,
}: ShadcnFaqAccordionProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
