'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface FooterLink {
  label: string
  href?: string
}

interface Props {
  copyright?: string
  links?: FooterLink[]
  className?: string
}

const defaultLinks: FooterLink[] = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Status', href: '#' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function FooterSimple({
  copyright = `\u00A9 ${new Date().getFullYear()} Acme Inc. All rights reserved.`,
  links = defaultLinks,
  className,
}: Props) {
  return (
    <footer
      className={cn(
        'border-t border-border bg-background px-6 py-8 md:px-12 lg:px-24',
        className,
      )}
    >
      <motion.div
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.p
          className="text-sm text-muted-foreground"
          variants={itemVariants}
        >
          {copyright}
        </motion.p>
        <nav className="flex flex-wrap items-center gap-6">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href || '#'}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              variants={itemVariants}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.15 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </footer>
  )
}
