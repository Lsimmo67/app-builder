'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionSectionProps {
  className?: string
  title?: string
  description?: string
  items?: AccordionItem[]
}

const defaultItems: AccordionItem[] = [
  {
    question: 'How do I get started with the platform?',
    answer:
      'Getting started is simple. Create an account, choose your plan, and follow our guided setup wizard. You can have your first project running in under 5 minutes. Our documentation covers everything from basic setup to advanced configurations.',
  },
  {
    question: 'Can I upgrade or downgrade my plan at any time?',
    answer:
      'Absolutely. You can change your plan at any time from your account settings. When upgrading, you only pay the prorated difference. When downgrading, the remaining balance is credited to your account for future use.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes, we offer a 14-day free trial on all paid plans with full access to every feature. No credit card required to start. At the end of your trial, you can choose the plan that fits your needs or continue with our generous free tier.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We provide multiple support channels: community forums, detailed documentation, email support for all users, and priority live chat for Pro and Enterprise plans. Enterprise customers also get a dedicated account manager and custom SLAs.',
  },
  {
    question: 'How secure is my data on the platform?',
    answer:
      'Security is our top priority. We use AES-256 encryption at rest and TLS 1.3 in transit. Our infrastructure is SOC 2 Type II certified, and we conduct regular penetration testing. We also support SSO, 2FA, and role-based access controls.',
  },
]

export default function AccordionSection({
  className,
  title = 'Frequently Asked Questions',
  description = 'Find answers to the most common questions about our platform and services.',
  items = defaultItems,
}: AccordionSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={cn('w-full py-20 px-6', className)}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="divide-y divide-neutral-800 rounded-2xl border border-neutral-800 bg-neutral-900/50">
          {items.map((item, i) => {
            const isOpen = openIndex === i

            return (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-neutral-800/30"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-white">
                    {item.question}
                  </span>
                  <svg
                    className={cn(
                      'h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
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
                    'grid transition-all duration-200 ease-in-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-400">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
