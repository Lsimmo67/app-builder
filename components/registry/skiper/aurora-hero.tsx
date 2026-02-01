'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface AuroraHeroProps {
  className?: string
  headline?: string
  subtitle?: string
  ctaText?: string
  onCtaClick?: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
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

const auroraLayers = [
  {
    gradient: 'linear-gradient(135deg, transparent 30%, #22d3ee 50%, transparent 70%)',
    blur: 60,
    opacity: 0.3,
    animate: {
      x: ['-20%', '20%', '-20%'],
      y: ['-10%', '10%', '-10%'],
      rotate: [0, 10, 0],
    },
    duration: 8,
  },
  {
    gradient: 'linear-gradient(225deg, transparent 30%, #a78bfa 50%, transparent 70%)',
    blur: 80,
    opacity: 0.25,
    animate: {
      x: ['20%', '-30%', '20%'],
      y: ['10%', '-15%', '10%'],
      rotate: [0, -15, 0],
    },
    duration: 10,
  },
  {
    gradient: 'linear-gradient(315deg, transparent 30%, #34d399 50%, transparent 70%)',
    blur: 70,
    opacity: 0.2,
    animate: {
      x: ['10%', '-20%', '10%'],
      y: ['20%', '-20%', '20%'],
      rotate: [5, -10, 5],
    },
    duration: 12,
  },
  {
    gradient: 'linear-gradient(45deg, transparent 20%, #f472b6 50%, transparent 80%)',
    blur: 90,
    opacity: 0.15,
    animate: {
      x: ['-15%', '25%', '-15%'],
      y: ['-20%', '15%', '-20%'],
      rotate: [-5, 15, -5],
    },
    duration: 9,
  },
]

export default function AuroraHero({
  className,
  headline = 'Experience the Aurora',
  subtitle = 'Immerse yourself in a breathtaking display of animated light, inspired by the beauty of the northern lights.',
  ctaText = 'Explore Now',
  onCtaClick,
}: AuroraHeroProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[600px] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Aurora layers powered by Framer Motion */}
      <div className="pointer-events-none absolute inset-0">
        {auroraLayers.map((layer, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              background: layer.gradient,
              filter: `blur(${layer.blur}px)`,
              opacity: layer.opacity,
            }}
            animate={layer.animate}
            transition={{
              duration: layer.duration,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          />
        ))}
      </div>

      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-zinc-950/40" />

      {/* Starfield dots */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px rounded-full bg-white"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut' as const,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-xl text-lg text-zinc-300"
        >
          {subtitle}
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onCtaClick}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-sm"
            whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(34,211,238,0.2)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' as const }}
            />
            <span className="relative z-10">{ctaText}</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
