'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useMotionValue, useSpring, useInView, useTransform } from 'framer-motion'
import { CSSProperties, useEffect, useRef } from 'react'

export default function NumberTicker({
  className,
  style,
  target = 10000,
  duration = 2,
  prefix = '',
  suffix = '+',
}: {
  className?: string
  style?: CSSProperties
  target?: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, {
    stiffness: 60,
    damping: 20,
    duration: duration,
  })
  const displayVal = useTransform(springVal, (v: number) =>
    Math.floor(v).toLocaleString()
  )

  useEffect(() => {
    if (isInView) {
      motionVal.set(target)
    }
  }, [isInView, target, motionVal])

  return (
    <motion.div
      ref={ref}
      className={cn('text-center py-4', className)}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent tabular-nums inline-flex items-baseline"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring' as const, stiffness: 400, damping: 15 }}
      >
        {prefix && <span>{prefix}</span>}
        <motion.span>{displayVal}</motion.span>
        {suffix && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: duration * 0.8, duration: 0.3 }}
          >
            {suffix}
          </motion.span>
        )}
      </motion.div>
      <motion.div
        className="mt-3 h-px mx-auto bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: '60%' } : {}}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' as const }}
      />
    </motion.div>
  )
}
