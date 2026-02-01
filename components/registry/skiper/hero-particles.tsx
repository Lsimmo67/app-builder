'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface HeroParticlesProps {
  className?: string
  headline?: string
  subtitle?: string
  particleCount?: number
  particleColor?: string
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

export default function HeroParticles({
  className,
  headline = 'Particle Universe',
  subtitle = 'Floating particles drift gently across the background, creating an ethereal and immersive atmosphere.',
  particleCount = 50,
  particleColor = 'rgba(139, 92, 246, 0.5)',
}: HeroParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.5 + 0.2,
      driftX: (Math.random() - 0.5) * 80,
      driftY: -(Math.random() * 100 + 40),
    }))
  }, [particleCount])

  return (
    <section
      className={cn(
        'relative flex min-h-[600px] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Animated particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: particleColor,
            }}
            animate={{
              x: [0, p.driftX * 0.3, p.driftX * -0.2, p.driftX * 0.5, 0],
              y: [0, p.driftY * 0.25, p.driftY * 0.5, p.driftY * 0.75, p.driftY],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity, p.opacity * 0.5, 0],
              scale: [1, 1.2, 0.8, 1.1, 0.6],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut' as const,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />

      {/* Gentle center glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-xl text-lg text-zinc-400"
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-violet-400"
              animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
          >
            Explore the cosmos
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  )
}
