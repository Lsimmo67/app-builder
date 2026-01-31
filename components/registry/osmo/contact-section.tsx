'use client'

import { cn } from '@/lib/utils/cn'

interface ContactInfo {
  label: string
  value: string
}

interface Props {
  headline?: string
  description?: string
  contactInfo?: ContactInfo[]
  buttonText?: string
  className?: string
}

const defaultContactInfo: ContactInfo[] = [
  { label: 'Email', value: 'hello@acme.com' },
  { label: 'Phone', value: '+1 (555) 123-4567' },
  { label: 'Address', value: '123 Main St, San Francisco, CA 94102' },
]

export default function ContactSection({
  headline = 'Get in touch',
  description = 'Have a question or want to learn more? We would love to hear from you. Fill out the form and our team will get back to you within 24 hours.',
  contactInfo = defaultContactInfo,
  buttonText = 'Send Message',
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        {/* Left: Info */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <dl className="mt-10 space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index}>
                <dt className="text-sm font-semibold text-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: Form */}
        <div className="rounded-xl border border-border bg-card p-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                className="mt-2 block h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 block h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="How can we help?"
                className="mt-2 block w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
