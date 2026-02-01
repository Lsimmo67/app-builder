'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useInView } from 'framer-motion'
import { CSSProperties, useRef, useMemo } from 'react'

const wavePaths = [
  'M0,40 C360,100 720,0 1080,60 C1260,90 1380,40 1440,50 L1440,120 L0,120 Z',
  'M0,60 C360,10 720,90 1080,30 C1260,10 1380,70 1440,40 L1440,120 L0,120 Z',
  'M0,50 C360,80 720,20 1080,70 C1260,50 1380,30 1440,60 L1440,120 L0,120 Z',
  'M0,40 C360,100 720,0 1080,60 C1260,90 1380,40 1440,50 L1440,120 L0,120 Z',
]

export default function WavyDivider({
  className,
  style,
  flip = false,
}: {
  className?: string
  style?: CSSProperties
  flip?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const gradientId = useMemo(() => `wave-grad-${Math.random().toString(36).slice(2, 9)}`, [])

  return (
    <motion.div
      ref={ref}
      className={cn('w-full overflow-hidden leading-none', flip && 'rotate-180', className)}
      style={style}
      initial={{ opacity: 0, y: flip ? -20 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
    >
      <svg
        className="w-full h-20 md:h-28"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <motion.stop
              offset="0%"
              stopOpacity="0.6"
              animate={{ stopColor: ['#7c3aed', '#d946ef', '#7c3aed'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
            />
            <motion.stop
              offset="50%"
              stopOpacity="0.4"
              animate={{ stopColor: ['#d946ef', '#06b6d4', '#d946ef'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
            />
            <motion.stop
              offset="100%"
              stopOpacity="0.6"
              animate={{ stopColor: ['#06b6d4', '#7c3aed', '#06b6d4'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
            />
          </linearGradient>
        </defs>
        <motion.path
          fill={`url(#${gradientId})`}
          initial={{ d: wavePaths[0], opacity: 0 }}
          animate={
            isInView
              ? {
                  d: wavePaths,
                  opacity: 1,
                }
              : {}
          }
          transition={{
            d: {
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            },
            opacity: { duration: 0.5 },
          }}
        />
        <motion.path
          fill={`url(#${gradientId})`}
          opacity={0.3}
          initial={{ d: wavePaths[2] }}
          animate={
            isInView
              ? {
                  d: [...wavePaths].reverse(),
                }
              : {}
          }
          transition={{
            d: {
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            },
          }}
        />
      </svg>
    </motion.div>
  )
}
