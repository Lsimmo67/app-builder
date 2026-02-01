'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { CSSProperties, useMemo } from 'react'

const defaultOrbits = [
  { radius: 60, duration: 6, items: ['\u26A1'] },
  { radius: 100, duration: 10, items: ['\u{1F52E}', '\u{1F48E}'] },
  { radius: 140, duration: 14, items: ['\u2728', '\u{1F680}', '\u{1F300}'] },
]

const centerVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
}

const ringVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 150,
      damping: 18,
      delay: 0.3 + i * 0.15,
    },
  }),
}

export default function OrbitAnimation({
  className,
  style,
  orbits = defaultOrbits,
}: {
  className?: string
  style?: CSSProperties
  orbits?: { radius: number; duration: number; items: string[] }[]
}) {
  return (
    <motion.div
      className={cn('relative w-80 h-80 flex items-center justify-center', className)}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/50 z-10 flex items-center justify-center text-white font-bold"
        variants={centerVariants}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(139, 92, 246, 0.5)',
            '0 0 40px rgba(139, 92, 246, 0.8)',
            '0 0 20px rgba(139, 92, 246, 0.5)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        *
      </motion.div>

      {orbits.map((orbit, oi) => (
        <motion.div
          key={oi}
          className="absolute inset-0 flex items-center justify-center"
          variants={ringVariants}
          custom={oi}
        >
          <motion.div
            className="absolute rounded-full border border-white/10"
            style={{ width: orbit.radius * 2, height: orbit.radius * 2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + oi * 0.15 }}
          />
          <motion.div
            className="absolute"
            style={{ width: orbit.radius * 2, height: orbit.radius * 2 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: orbit.duration,
              repeat: Infinity,
              ease: 'linear' as const,
            }}
          >
            {orbit.items.map((item, ii) => {
              const angle = (360 / orbit.items.length) * ii
              const rad = (angle * Math.PI) / 180
              const x = Math.cos(rad) * orbit.radius
              const y = Math.sin(rad) * orbit.radius
              return (
                <motion.span
                  key={ii}
                  className="absolute text-lg"
                  style={{
                    left: '50%',
                    top: '50%',
                    x: x - 8,
                    y: y - 8,
                  }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: orbit.duration,
                    repeat: Infinity,
                    ease: 'linear' as const,
                  }}
                  whileHover={{ scale: 1.5 }}
                >
                  {item}
                </motion.span>
              )
            })}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
