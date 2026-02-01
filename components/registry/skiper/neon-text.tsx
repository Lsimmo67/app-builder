'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface NeonTextProps {
  className?: string
  text?: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  pulse?: boolean
}

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-7xl md:text-8xl',
}

export default function NeonText({
  className,
  text = 'NEON GLOW',
  color = '#8b5cf6',
  size = 'xl',
  pulse = true,
}: NeonTextProps) {
  const glowShadow = `
    0 0 7px ${color},
    0 0 10px ${color},
    0 0 21px ${color},
    0 0 42px ${color},
    0 0 82px ${color}88,
    0 0 92px ${color}44,
    0 0 102px ${color}22,
    0 0 151px ${color}11
  `

  const dimShadow = `
    0 0 4px ${color}88,
    0 0 8px ${color}66,
    0 0 16px ${color}44,
    0 0 32px ${color}22
  `

  return (
    <motion.div
      className={cn('relative flex items-center justify-center py-12', className)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
    >
      <motion.h2
        className={cn('font-extrabold tracking-wider', sizeClasses[size])}
        style={{ color }}
        animate={
          pulse
            ? {
                textShadow: [glowShadow, dimShadow, glowShadow],
                opacity: [1, 0.85, 1],
              }
            : { textShadow: glowShadow }
        }
        transition={
          pulse
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
            : { duration: 0.3 }
        }
        whileHover={{
          scale: 1.05,
          textShadow: `
            0 0 10px ${color},
            0 0 20px ${color},
            0 0 40px ${color},
            0 0 80px ${color},
            0 0 120px ${color}aa
          `,
        }}
      >
        {text}
      </motion.h2>

      {/* Reflected glow on surface */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2"
        style={{
          background: `radial-gradient(ellipse at center, ${color}66, transparent 70%)`,
        }}
        animate={
          pulse
            ? {
                boxShadow: [
                  `0 0 40px 20px ${color}22`,
                  `0 0 60px 30px ${color}33`,
                  `0 0 40px 20px ${color}22`,
                ],
                opacity: [0.6, 1, 0.6],
              }
            : { boxShadow: `0 0 40px 20px ${color}22`, opacity: 0.6 }
        }
        transition={
          pulse
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
            : undefined
        }
      />

      {/* Ambient glow behind text */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        animate={pulse ? { opacity: [0.1, 0.2, 0.1] } : { opacity: 0.15 }}
        transition={
          pulse
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
            : undefined
        }
      >
        <div
          className="h-32 w-full max-w-md rounded-full blur-3xl"
          style={{ backgroundColor: color }}
        />
      </motion.div>
    </motion.div>
  )
}
