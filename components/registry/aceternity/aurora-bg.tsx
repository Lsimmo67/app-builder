'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface AuroraBgProps {
  className?: string
  children?: React.ReactNode
  primaryColor?: string
  secondaryColor?: string
  tertiaryColor?: string
}

export default function AuroraBg({
  className,
  children,
  primaryColor = 'rgba(34, 211, 238, 0.15)',
  secondaryColor = 'rgba(139, 92, 246, 0.15)',
  tertiaryColor = 'rgba(59, 130, 246, 0.1)',
}: AuroraBgProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black',
        className
      )}
    >
      {/* Aurora layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* First aurora band */}
        <motion.div
          className="absolute h-[600px] w-[1200px] rounded-full blur-[120px]"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, transparent, ${secondaryColor})`,
            top: '-10%',
            left: '-10%',
          }}
          animate={{
            x: [0, 100, -50, 80, 0],
            y: [0, -60, 30, -40, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
            rotate: [0, 5, -3, 4, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Second aurora band */}
        <motion.div
          className="absolute h-[500px] w-[1000px] rounded-full blur-[100px]"
          style={{
            background: `linear-gradient(225deg, ${secondaryColor}, transparent, ${tertiaryColor})`,
            top: '10%',
            right: '-15%',
          }}
          animate={{
            x: [0, -80, 60, -30, 0],
            y: [0, 50, -40, 20, 0],
            scale: [1, 0.95, 1.1, 1, 1],
            rotate: [0, -4, 6, -2, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Third aurora band */}
        <motion.div
          className="absolute h-[400px] w-[900px] rounded-full blur-[110px]"
          style={{
            background: `linear-gradient(180deg, ${tertiaryColor}, transparent, ${primaryColor})`,
            bottom: '5%',
            left: '10%',
          }}
          animate={{
            x: [0, 60, -80, 40, 0],
            y: [0, -30, 50, -20, 0],
            scale: [1, 1.05, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Subtle top light strip */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${primaryColor.replace('0.15', '0.4')}, transparent)`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")' }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {children || (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-4xl font-bold text-transparent md:text-7xl"
            >
              Aurora Borealis
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-6 max-w-xl text-base text-neutral-400 md:text-lg"
            >
              A mesmerizing animated aurora background that brings the beauty
              of the northern lights to your web experience. Soft, organic
              light movements create an ethereal atmosphere.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <button className="rounded-full bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20">
                Get Started
              </button>
              <button className="rounded-full border border-white/10 px-8 py-3 text-sm font-medium text-white/70 transition-all hover:text-white">
                Learn More
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
