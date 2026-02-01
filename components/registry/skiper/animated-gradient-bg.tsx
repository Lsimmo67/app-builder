'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface AnimatedGradientBgProps {
  className?: string
  headline?: string
  subtitle?: string
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
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

const gradientOrbs = [
  {
    color: 'bg-purple-700',
    size: 'h-[500px] w-[500px]',
    position: '-top-32 -left-32',
    animate: { x: [0, 100, 50, 0], y: [0, 60, 120, 0], scale: [1, 1.2, 0.9, 1] },
    duration: 15,
  },
  {
    color: 'bg-indigo-800',
    size: 'h-[450px] w-[450px]',
    position: '-bottom-20 -right-20',
    animate: { x: [0, -80, -20, 0], y: [0, -50, -100, 0], scale: [1, 0.9, 1.15, 1] },
    duration: 18,
  },
  {
    color: 'bg-cyan-800',
    size: 'h-[400px] w-[400px]',
    position: 'top-1/3 right-1/4',
    animate: { x: [0, 60, -40, 0], y: [0, -80, 40, 0], scale: [1, 1.1, 1, 1] },
    duration: 12,
  },
  {
    color: 'bg-fuchsia-800',
    size: 'h-[350px] w-[350px]',
    position: 'bottom-1/4 left-1/4',
    animate: { x: [0, -50, 80, 0], y: [0, 60, -30, 0], scale: [0.9, 1.1, 1, 0.9] },
    duration: 20,
  },
]

export default function AnimatedGradientBg({
  className,
  headline = 'Living Gradient',
  subtitle = 'A slowly morphing gradient background that breathes life into any section. The seamless color transitions create a mesmerizing, ever-changing canvas.',
  children,
}: AnimatedGradientBgProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[500px] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24',
        className
      )}
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        {gradientOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className={cn(
              'absolute rounded-full opacity-40 blur-[100px]',
              orb.color,
              orb.size,
              orb.position
            )}
            animate={orb.animate}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          />
        ))}
      </div>

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {children ?? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mb-10 max-w-xl text-lg text-white/60"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.button
                className="rounded-xl bg-white px-8 py-3.5 font-semibold text-zinc-900"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="rounded-xl border border-white/20 px-8 py-3.5 font-semibold text-white"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
              >
                Documentation
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
