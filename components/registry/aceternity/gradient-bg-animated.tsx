'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface GradientBgAnimatedProps {
  className?: string
  children?: React.ReactNode
  colors?: string[]
  speed?: number
}

export default function GradientBgAnimated({
  className,
  children,
  colors = [
    'rgba(59, 130, 246, 0.3)',
    'rgba(139, 92, 246, 0.3)',
    'rgba(236, 72, 153, 0.3)',
    'rgba(34, 211, 238, 0.3)',
    'rgba(59, 130, 246, 0.3)',
  ],
  speed = 15,
}: GradientBgAnimatedProps) {
  const gradientStops = colors.join(', ')

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black',
        className
      )}
    >
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute -inset-[100px] opacity-50"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, ${colors[0] || 'rgba(59,130,246,0.3)'} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${colors[1] || 'rgba(139,92,246,0.3)'} 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, ${colors[2] || 'rgba(236,72,153,0.3)'} 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, ${colors[3] || 'rgba(34,211,238,0.3)'} 0%, transparent 50%)
          `,
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.05, 0.98, 1.02, 1],
          rotate: [0, 2, -1, 1, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary morphing layer */}
      <motion.div
        className="absolute -inset-[50px] opacity-30"
        style={{
          background: `
            radial-gradient(circle at 60% 30%, ${colors[2] || 'rgba(236,72,153,0.3)'} 0%, transparent 40%),
            radial-gradient(circle at 30% 70%, ${colors[3] || 'rgba(34,211,238,0.3)'} 0%, transparent 40%)
          `,
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 0.95, 1.08, 1],
          rotate: [0, -3, 2, 0],
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: speed * 1.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {children || (
          <>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/50 backdrop-blur"
            >
              Animated Gradient
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold text-transparent md:text-7xl"
            >
              Morphing Colors
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-6 max-w-xl text-base text-neutral-400 md:text-lg"
            >
              A slowly morphing gradient background that creates an ambient,
              ever-changing atmosphere. Subtle color transitions keep the
              visual experience fresh and engaging.
            </motion.p>
          </>
        )}
      </div>
    </div>
  )
}
