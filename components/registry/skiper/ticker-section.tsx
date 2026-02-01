'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface TickerItem {
  label: string
  value: string
  change: string
  up: boolean
}

interface TickerSectionProps {
  className?: string
  items?: TickerItem[]
  speed?: number
}

const defaultItems: TickerItem[] = [
  { label: 'AAPL', value: '189.50', change: '+2.3%', up: true },
  { label: 'GOOG', value: '141.80', change: '+1.1%', up: true },
  { label: 'TSLA', value: '248.42', change: '-0.8%', up: false },
  { label: 'MSFT', value: '378.91', change: '+1.5%', up: true },
  { label: 'AMZN', value: '178.25', change: '-0.3%', up: false },
  { label: 'META', value: '505.75', change: '+3.2%', up: true },
]

export default function TickerSection({
  className,
  items = defaultItems,
  speed = 20,
}: TickerSectionProps) {
  const doubled = [...items, ...items]

  return (
    <motion.div
      className={cn(
        'w-full overflow-hidden border-y border-white/10 bg-black/60 py-3 backdrop-blur-xl',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      viewport={{ once: true }}
    >
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black/60 to-transparent" />

        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              ease: 'linear' as const,
            },
          }}
        >
          {doubled.map((item, i) => (
            <motion.div
              key={i}
              className="mx-6 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
            >
              <span className="text-sm font-bold font-mono text-white/80">{item.label}</span>
              <span className="text-sm font-mono text-white/50">{item.value}</span>
              <motion.span
                className={cn(
                  'text-sm font-mono font-semibold',
                  item.up ? 'text-emerald-400' : 'text-red-400'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3, ease: 'easeOut' as const }}
              >
                <motion.span
                  className="inline-block"
                  animate={{
                    y: item.up ? [0, -2, 0] : [0, 2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut' as const,
                  }}
                >
                  {item.up ? '\u25B2' : '\u25BC'}
                </motion.span>
                {' '}{item.change}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
