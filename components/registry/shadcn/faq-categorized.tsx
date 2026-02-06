'use client'

import { cn } from '@/lib/utils/cn'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface ShadcnFaqCategorizedProps {
  headline?: string
  description?: string
  categories?: { label: string; value: string; faqs: { question: string; answer: string }[] }[]
  className?: string
}

export default function ShadcnFaqCategorized({
  headline = 'Help center',
  description = 'Browse frequently asked questions by category.',
  categories = [
    {
      label: 'General',
      value: 'general',
      faqs: [
        { question: 'What is this product?', answer: 'Our product is a comprehensive platform for building, deploying, and scaling web applications with ease.' },
        { question: 'Who is this for?', answer: 'It is designed for developers, designers, and teams of all sizes who want to ship products faster.' },
      ],
    },
    {
      label: 'Billing',
      value: 'billing',
      faqs: [
        { question: 'How does billing work?', answer: 'We bill monthly or annually based on your chosen plan. All plans include a 14-day free trial.' },
        { question: 'Can I get a refund?', answer: 'Yes, we offer a 30-day money-back guarantee on all paid plans.' },
      ],
    },
    {
      label: 'Technical',
      value: 'technical',
      faqs: [
        { question: 'What technologies do you support?', answer: 'We support React, Next.js, Vue, and more. Our platform is framework-agnostic at its core.' },
        { question: 'Is there an API?', answer: 'Yes, we provide a comprehensive REST and GraphQL API with full documentation.' },
      ],
    },
  ],
  className,
}: ShadcnFaqCategorizedProps) {
  return (
    <section className={cn('py-16 px-4 md:py-24', className)}>
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{headline}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        </div>
        <Tabs defaultValue={categories[0]?.value} className="w-full">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value}>{cat.label}</TabsTrigger>
            ))}
          </TabsList>
          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value} className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                {cat.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`${cat.value}-${index}`}>
                    <AccordionTrigger className="text-left text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
