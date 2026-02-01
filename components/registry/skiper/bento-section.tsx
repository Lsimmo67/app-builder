'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { CSSProperties, ReactNode } from 'react'

const defaultItems = [
  { title: 'Analytics', desc: 'Real-time insights and dashboards', span: 'col-span-2 row-span-2' },
  { title: 'Speed', desc: 'Lightning fast performance', span: 'col-span-1 row-span-1' },
  { title: 'Security', desc: 'Enterprise-grade protection', span: 'col-span-1 row-span-1' },
  { title: 'Scale', desc: 'Infinite horizontal growth', span: 'col-span-1 row-span-2' },
  { title: 'AI Powered', desc: 'Smart automation built in', span: 'col-span-2 row-span-1' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const tileVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
    },
  },
}

export default function BentoSection({
  className,
  style,
  items = defaultItems,
  children,
}: {
  className?: string
  style?: CSSProperties
  items?: { title: string; desc: string; span: string }[]
  children?: ReactNode
}) {
  return (
    <div className={cn('w-full max-w-4xl mx-auto py-8', className)} style={style}>
      <motion.div
        className="grid grid-cols-3 auto-rows-[140px] gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {(children ? [] : items).map((item, i) => (
          <motion.div
            key={i}
            variants={tileVariants}
            whileHover={{
              scale: 1.03,
              borderColor: 'rgba(139, 92, 246, 0.4)',
              transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
            }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 flex flex-col justify-end cursor-pointer group overflow-hidden relative',
              item.span
            )}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-fuchsia-600/0 group-hover:from-violet-600/10 group-hover:to-fuchsia-600/5 transition-all duration-500"
            />
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="relative z-10">
              <h3 className="text-white font-semibold group-hover:text-violet-300 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-white/40 text-sm mt-1 group-hover:text-white/60 transition-colors duration-300">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
        {children}
      </motion.div>
    </div>
  )
}
