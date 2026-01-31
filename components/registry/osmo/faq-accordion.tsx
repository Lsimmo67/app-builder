'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface FaqItem {
  question: string
  answer: string
}

interface Props {
  headline?: string
  subheadline?: string
  items?: FaqItem[]
  className?: string
}

const defaultItems: FaqItem[] = [
  {
    question: 'How do I get started?',
    answer:
      'Getting started is easy. Simply create an account, choose your plan, and you can begin building right away. Our onboarding wizard will guide you through the setup process step by step.',
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes, you can cancel your subscription at any time with no cancellation fees. Your account will remain active until the end of your current billing period, and you will retain access to all your data.',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      'We offer a 14-day free trial on all plans. No credit card is required to start your trial. You will have full access to all features during the trial period so you can evaluate the platform thoroughly.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We offer email support on all plans, with priority support available on Pro and Enterprise plans. Enterprise customers also get access to a dedicated account manager and 24/7 phone support.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use bank-level AES-256 encryption for data at rest and TLS 1.3 for data in transit. Our platform is SOC 2 Type II certified and GDPR compliant. We also offer data residency options for Enterprise customers.',
  },
  {
    question: 'Can I integrate with other tools?',
    answer:
      'Yes, we offer integrations with dozens of popular tools including Slack, GitHub, Jira, Figma, and more. We also provide a comprehensive REST API and webhooks for custom integrations.',
  },
]

export default function FaqAccordion({
  headline = 'Frequently asked questions',
  subheadline = 'Everything you need to know about the product. Can\'t find your answer? Contact our support team.',
  items = defaultItems,
  className,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {subheadline}
          </p>
        </div>
        <div className="mt-12 divide-y divide-border">
          {items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div key={index}>
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
                >
                  <span className="pr-4 text-base font-medium text-foreground">
                    {item.question}
                  </span>
                  <svg
                    className={cn(
                      'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    isOpen ? 'max-h-96 pb-5' : 'max-h-0',
                  )}
                >
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
