'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { CSSProperties, ReactNode } from 'react'

const chromeVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 22,
      staggerChildren: 0.08,
    },
  },
}

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 500, damping: 25 },
  },
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: 0.3 },
  },
}

export default function BrowserMockup({
  className,
  style,
  children,
  url = 'https://example.com',
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  url?: string
}) {
  return (
    <motion.div
      className={cn(
        'w-full max-w-3xl rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden',
        className
      )}
      style={style}
      variants={chromeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        boxShadow: '0 25px 60px -12px rgba(139, 92, 246, 0.15)',
        borderColor: 'rgba(139, 92, 246, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="flex gap-1.5">
          {['bg-red-500/80', 'bg-yellow-500/80', 'bg-green-500/80'].map((color, i) => (
            <motion.span
              key={i}
              className={cn('w-3 h-3 rounded-full', color)}
              variants={dotVariants}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
        <div className="flex-1 mx-4">
          <motion.div
            className="rounded-md bg-white/10 px-3 py-1 text-xs text-white/50 text-center truncate"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {url}
          </motion.div>
        </div>
      </div>
      <motion.div
        className="p-6 min-h-[200px] text-white/70 text-sm"
        variants={contentVariants}
      >
        {children ?? (
          <div className="flex flex-col gap-3">
            <motion.div
              className="h-4 w-3/4 rounded bg-white/10"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
            />
            <motion.div
              className="h-4 w-1/2 rounded bg-white/10"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.3 }}
            />
            <motion.div
              className="h-20 w-full rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mt-2"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.6 }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
