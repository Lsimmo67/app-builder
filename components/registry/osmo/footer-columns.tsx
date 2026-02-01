'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface FooterLink {
  label: string
  href?: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface Props {
  companyName?: string
  companyDescription?: string
  columns?: FooterColumn[]
  copyright?: string
  className?: string
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Documentation', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function FooterColumns({
  companyName = 'Acme Inc',
  companyDescription = 'Building the future of web development with modern tools and frameworks that empower teams to ship faster.',
  columns = defaultColumns,
  copyright = `\u00A9 ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
  className,
}: Props) {
  return (
    <footer
      className={cn(
        'border-t border-border bg-background px-6 py-16 md:px-12 lg:px-24',
        className,
      )}
    >
      <motion.div
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <motion.div className="lg:col-span-2" variants={columnVariants}>
            <div className="text-lg font-bold text-foreground">
              {companyName}
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {companyDescription}
            </p>
          </motion.div>

          {columns.map((column, index) => (
            <motion.div key={index} variants={columnVariants}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href || '#'}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.15 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 border-t border-border pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">{copyright}</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
