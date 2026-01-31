'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface FormSectionProps {
  className?: string
  title?: string
  description?: string
  submitLabel?: string
  fields?: {
    name: string
    label: string
    type: 'text' | 'email' | 'textarea'
    placeholder?: string
    required?: boolean
  }[]
}

const defaultFields = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text' as const,
    placeholder: 'John Doe',
    required: true,
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email' as const,
    placeholder: 'john@example.com',
    required: true,
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text' as const,
    placeholder: 'How can we help?',
    required: false,
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea' as const,
    placeholder: 'Tell us more about your project...',
    required: true,
  },
]

export default function FormSection({
  className,
  title = 'Get in Touch',
  description = 'Have a question or want to work together? Fill out the form below and we will get back to you as soon as possible.',
  submitLabel = 'Send Message',
  fields = defaultFields,
}: FormSectionProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className={cn('w-full py-20 px-6', className)}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto">
            {description}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 sm:p-10"
        >
          <div className="space-y-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-red-400">*</span>
                  )}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={5}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-sm text-white placeholder-neutral-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 text-sm text-white placeholder-neutral-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className={cn(
                'inline-flex h-11 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
                submitted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500'
              )}
            >
              {submitted ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Message Sent!
                </span>
              ) : (
                submitLabel
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
