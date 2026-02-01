'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { CSSProperties, ReactNode } from 'react'

const phoneVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 150,
      damping: 20,
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const contentItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 250,
      damping: 20,
    },
  },
}

export default function PhoneMockup({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <motion.div
      className={cn(
        'relative w-[280px] h-[560px] rounded-[3rem] border-4 border-white/15 bg-black/70 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden',
        className
      )}
      style={{ ...style, perspective: 1000 }}
      variants={phoneVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        y: -8,
        boxShadow: '0 30px 60px -15px rgba(139, 92, 246, 0.2)',
        transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
      }}
    >
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.3, ease: 'easeOut' as const }}
      />
      <div className="absolute inset-0 rounded-[2.6rem] overflow-hidden">
        <div className="w-full h-full p-4 pt-10 text-white/70 text-sm">
          {children ?? (
            <motion.div
              className="flex flex-col gap-3 items-center pt-8"
              variants={phoneVariants}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500"
                variants={contentItemVariants}
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(139, 92, 246, 0.3)',
                    '0 0 30px rgba(139, 92, 246, 0.6)',
                    '0 0 15px rgba(139, 92, 246, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
              />
              <motion.div
                className="h-3 w-24 rounded bg-white/10"
                variants={contentItemVariants}
              />
              <motion.div
                className="h-3 w-16 rounded bg-white/10"
                variants={contentItemVariants}
              />
              <motion.div className="mt-4 w-full space-y-2" variants={contentItemVariants}>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="h-12 w-full rounded-xl bg-white/5 border border-white/10"
                    whileHover={{
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      x: 4,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/20"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
    </motion.div>
  )
}
