'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Integration {
  name: string
  description: string
  iconPath?: string
}

interface Props {
  headline?: string
  subheadline?: string
  integrations?: Integration[]
  className?: string
}

const defaultIntegrations: Integration[] = [
  {
    name: 'Slack',
    description: 'Real-time notifications and team collaboration.',
    iconPath: 'M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5zm-5 0c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5S11 2.67 11 3.5v5c0 .83-.67 1.5-1.5 1.5z',
  },
  {
    name: 'GitHub',
    description: 'Sync repos, PRs, and deployment workflows.',
    iconPath: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    name: 'Figma',
    description: 'Import designs directly into your project.',
    iconPath: 'M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12V2zm0 9.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zm-7 0A3.5 3.5 0 018.5 8H12v7H8.5A3.5 3.5 0 015 11.5zm0 7A3.5 3.5 0 018.5 15H12v3.5a3.5 3.5 0 11-7 0z',
  },
  {
    name: 'Stripe',
    description: 'Payment processing and subscription management.',
    iconPath: 'M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z',
  },
  {
    name: 'Vercel',
    description: 'One-click deploy and preview environments.',
    iconPath: 'M12 2L2 19.5h20L12 2z',
  },
  {
    name: 'AWS',
    description: 'Cloud infrastructure and serverless functions.',
    iconPath: 'M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.152c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586z',
  },
  {
    name: 'Notion',
    description: 'Sync documentation and project knowledge bases.',
    iconPath: 'M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5v2.947a1.5 1.5 0 01-.724 1.283L14 11.618V20.5a1.5 1.5 0 01-2.191 1.332l-4-2.063A1.5 1.5 0 017 18.437V11.618l-5.276-2.888A1.5 1.5 0 011 7.447V4.5z',
  },
  {
    name: 'Linear',
    description: 'Issue tracking and project management sync.',
    iconPath: 'M3 12a9 9 0 1118 0 9 9 0 01-18 0zm9-7a7 7 0 100 14 7 7 0 000-14z',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function IntegrationsGrid({
  headline = 'Integrates with your stack',
  subheadline = 'Connect with the tools your team already uses. Seamless integration, zero friction.',
  integrations = defaultIntegrations,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
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
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              variants={cardVariants}
              whileHover={{
                y: -4,
                boxShadow: '0 0 20px rgba(var(--primary), 0.08)',
                transition: { duration: 0.25, ease: 'easeOut' as const },
              }}
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
              >
                <svg
                  className="h-6 w-6 text-foreground transition-colors group-hover:text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={integration.iconPath || 'M12 2L2 19.5h20L12 2z'} />
                </svg>
              </motion.div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {integration.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {integration.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
