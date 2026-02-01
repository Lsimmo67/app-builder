'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface NavLink {
  label: string
  href?: string
}

interface Props {
  brandName?: string
  links?: NavLink[]
  ctaText?: string
  className?: string
}

const defaultLinks: NavLink[] = [
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Blog', href: '#' },
]

const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
}

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
}

export default function NavbarSimple({
  brandName = 'Acme',
  links = defaultLinks,
  ctaText = 'Get Started',
  className,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md',
        className,
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' as const }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        <motion.a
          href="#"
          className="text-lg font-bold text-foreground"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.15 }}
        >
          {brandName}
        </motion.a>

        <motion.nav
          className="hidden items-center gap-8 md:flex"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href || '#'}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              variants={navItemVariants}
              whileHover={{ y: -1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.nav>

        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.35, ease: 'easeOut' as const }}
        >
          <motion.button
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaText}
          </motion.button>
        </motion.div>

        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground md:hidden"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.svg
                key="close"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="border-t border-border bg-background px-6 py-4 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col gap-3">
              {links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href || '#'}
                  className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' as const }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05, duration: 0.3 }}
              >
                {ctaText}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
