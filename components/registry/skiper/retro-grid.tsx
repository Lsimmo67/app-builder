'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface RetroGridProps {
  className?: string
  headline?: string
  subtitle?: string
  gridColor?: string
  children?: React.ReactNode
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

export default function RetroGrid({
  className,
  headline = 'Retro Future',
  subtitle = 'A nostalgic perspective grid stretching into the horizon, reminiscent of 80s sci-fi aesthetics. Perfect for bold, retro-themed sections.',
  gridColor = 'rgba(139, 92, 246, 0.3)',
  children,
}: RetroGridProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Retro grid floor with motion */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ perspective: '500px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' as const }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[60%] origin-bottom"
          style={{
            transform: 'rotateX(60deg)',
            backgroundImage: `
              linear-gradient(to right, ${gridColor} 1px, transparent 1px),
              linear-gradient(to top, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: '60px 40px',
            maskImage: 'linear-gradient(to top, white 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, white 30%, transparent 100%)',
          }}
          animate={{
            backgroundPositionY: ['0px', '-40px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear' as const,
          }}
        />
      </motion.div>

      {/* Horizon glow */}
      <motion.div
        className="pointer-events-none absolute bottom-[38%] left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${gridColor.replace('0.3', '0.6')}, transparent)`,
          boxShadow: `0 0 30px 10px ${gridColor}`,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' as const }}
      />

      {/* Sun/circle */}
      <motion.div
        className="pointer-events-none absolute bottom-[35%] left-1/2 -translate-x-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, type: 'spring' as const, stiffness: 150, damping: 15 }}
      >
        <motion.div
          className="h-32 w-32 rounded-full md:h-48 md:w-48"
          style={{
            background: 'linear-gradient(to bottom, #f43f5e, #8b5cf6)',
            boxShadow: '0 0 80px 20px rgba(244, 63, 94, 0.2)',
            maskImage: 'linear-gradient(to bottom, white 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 50%, transparent 100%)',
          }}
          animate={{
            boxShadow: [
              '0 0 80px 20px rgba(244, 63, 94, 0.2)',
              '0 0 120px 30px rgba(244, 63, 94, 0.3)',
              '0 0 80px 20px rgba(244, 63, 94, 0.2)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </motion.div>

      {/* Scan lines effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)',
        }}
        animate={{ backgroundPositionY: ['0px', '5px'] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' as const }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {children ?? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl"
            >
              {headline}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-lg text-lg text-zinc-400"
            >
              {subtitle}
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
