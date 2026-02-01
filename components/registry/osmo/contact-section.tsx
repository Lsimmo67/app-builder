'use client'

import { motion } from 'framer-motion'
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

const leftVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const rightVariants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.15 },
  },
}

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const infoVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const infoItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={leftVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <motion.dl
            className="mt-10 space-y-6"
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {contactInfo.map((item, index) => (
              <motion.div key={index} variants={infoItemVariants}>
                <dt className="text-sm font-semibold text-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {item.value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="rounded-xl border border-border bg-card p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={rightVariants}
        >
          <motion.form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
            variants={formContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fieldVariants}>
              <label htmlFor="contact-name" className="block text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                className="mt-2 block h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </motion.div>
            <motion.div variants={fieldVariants}>
              <label htmlFor="contact-email" className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 block h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </motion.div>
            <motion.div variants={fieldVariants}>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="How can we help?"
                className="mt-2 block w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </motion.div>
            <motion.button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              variants={fieldVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {buttonText}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
