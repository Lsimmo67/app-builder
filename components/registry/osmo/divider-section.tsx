'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Props {
  pattern?: 'line' | 'dots' | 'wave'
  spacing?: 'sm' | 'md' | 'lg'
  className?: string
}

const spacingMap = {
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-16',
}

export default function DividerSection({
  pattern = 'line',
  spacing = 'md',
  className,
}: Props) {
  return (
    <section
      className={cn(
        'bg-background px-6 md:px-12 lg:px-24',
        spacingMap[spacing],
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        {pattern === 'line' && (
          <motion.div
            className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
          />
        )}

        {pattern === 'dots' && (
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-px flex-1 bg-gradient-to-r from-transparent to-border"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              style={{ transformOrigin: 'left' }}
            />
            <div className="flex gap-1.5">
              {[0.3, 0.5, 0.3].map((opacity, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                  style={{ opacity }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 0.3,
                    type: 'spring' as const,
                    stiffness: 300,
                  }}
                />
              ))}
            </div>
            <motion.div
              className="h-px flex-1 bg-gradient-to-l from-transparent to-border"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              style={{ transformOrigin: 'right' }}
            />
          </motion.div>
        )}

        {pattern === 'wave' && (
          <div className="flex justify-center">
            <motion.svg
              className="h-6 w-full max-w-lg text-border"
              viewBox="0 0 600 24"
              fill="none"
              preserveAspectRatio="none"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: 'easeOut' as const }}
            >
              <motion.path
                d="M0 12C50 12 50 2 100 2C150 2 150 22 200 22C250 22 250 2 300 2C350 2 350 22 400 22C450 22 450 2 500 2C550 2 550 12 600 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' as const }}
              />
            </motion.svg>
          </div>
        )}
      </div>
    </section>
  )
}
