'use client'

import { cn } from '@/lib/utils/cn'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Tab {
  id: string
  label: string
  content: string
}

interface AnimatedTabsProps {
  className?: string
  tabs?: Tab[]
  defaultTab?: string
}

const defaultTabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    content:
      'Get a bird-eye view of your entire project with real-time metrics, team activity, and milestone tracking all in one dashboard.',
  },
  {
    id: 'features',
    label: 'Features',
    content:
      'Packed with powerful features including drag-and-drop workflows, automated testing, CI/CD pipelines, and smart code review tools.',
  },
  {
    id: 'pricing',
    label: 'Pricing',
    content:
      'Simple, transparent pricing that scales with your team. Start free and upgrade when you need more power and collaboration features.',
  },
  {
    id: 'docs',
    label: 'Documentation',
    content:
      'Comprehensive documentation with guides, API references, examples, and tutorials to help you get up and running quickly.',
  },
]

const contentVariants = {
  enter: { opacity: 0, y: 12, filter: 'blur(4px)' },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
}

export default function AnimatedTabs({
  className,
  tabs = defaultTabs,
  defaultTab,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  const activeContent = tabs.find((t) => t.id === activeTab)

  return (
    <motion.div
      className={cn('mx-auto w-full max-w-2xl px-4 py-10', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      viewport={{ once: true }}
    >
      {/* Tab header */}
      <div className="relative flex items-center rounded-xl border border-white/[0.06] bg-zinc-950 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative z-10 flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200',
              activeTab === tab.id
                ? 'text-white'
                : 'text-neutral-500 hover:text-neutral-300'
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg bg-white/[0.08] shadow-sm"
                transition={{
                  type: 'spring' as const,
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.h3
              className="mb-3 text-lg font-bold text-white"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' as const }}
            >
              {activeContent?.label}
            </motion.h3>
            <motion.p
              className="leading-relaxed text-neutral-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' as const }}
            >
              {activeContent?.content}
            </motion.p>

            {/* Decorative animated bar */}
            <motion.div
              className="mt-6 h-1 rounded-full bg-gradient-to-r from-violet-500/40 via-indigo-500/40 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' as const }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
