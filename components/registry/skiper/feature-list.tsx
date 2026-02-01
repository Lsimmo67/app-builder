'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface FeatureItem {
  icon: string
  title: string
  desc: string
}

interface FeatureListProps {
  className?: string
  features?: FeatureItem[]
}

const defaultFeatures: FeatureItem[] = [
  { icon: '\u26A1', title: 'Lightning Fast', desc: 'Sub-millisecond response times' },
  { icon: '\uD83D\uDD12', title: 'Secure by Default', desc: 'Enterprise-grade encryption' },
  { icon: '\uD83C\uDFA8', title: 'Beautiful UI', desc: 'Pixel-perfect components' },
  { icon: '\uD83D\uDE80', title: 'Easy Deploy', desc: 'One-click deployment pipeline' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 400, damping: 15, delay: 0.2 },
  },
}

export default function FeatureList({
  className,
  features = defaultFeatures,
}: FeatureListProps) {
  return (
    <motion.div
      className={cn('mx-auto w-full max-w-xl space-y-3 py-6', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {features.map((f, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className="group flex cursor-pointer items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors"
          whileHover={{
            borderColor: 'rgba(139,92,246,0.3)',
            backgroundColor: 'rgba(139,92,246,0.05)',
            x: 4,
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
        >
          <motion.div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-xl"
            variants={checkVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
          >
            {f.icon}
          </motion.div>
          <div>
            <h4 className="text-sm font-semibold text-white transition-colors group-hover:text-violet-300">
              {f.title}
            </h4>
            <p className="mt-0.5 text-xs text-white/40">{f.desc}</p>
          </div>
          <motion.div
            className="ml-auto text-white/20 transition-colors group-hover:text-violet-400"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
