'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const faqItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function FaqAccordion({
  headline = 'Frequently asked questions',
  subheadline = "Everything you need to know about the product. Can't find your answer? Contact our support team.",
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
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            variants={itemVariants}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            variants={itemVariants}
          >
            {subheadline}
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-12 divide-y divide-border"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div key={index} variants={faqItemVariants}>
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
                >
                  <span className="pr-4 text-base font-medium text-foreground">
                    {item.question}
                  </span>
                  <motion.svg
                    className="h-5 w-5 shrink-0 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' as const }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' as const }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
