'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface HeroLampProps {
  className?: string
  headline?: string
  subheadline?: string
}

export default function HeroLamp({
  className,
  headline = 'Build Things That\nMatter, Together',
  subheadline = 'Illuminate your ideas with powerful tools designed for the modern web. Create, collaborate, and ship faster than ever.',
}: HeroLampProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950',
        className
      )}
    >
      {/* Lamp container */}
      <div className="relative z-0 flex w-full flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' as const }}
          style={{
            backgroundImage:
              'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible bg-gradient-to-r from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' as const }}
          style={{
            backgroundImage:
              'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className="absolute inset-auto left-1/2 h-56 bg-gradient-to-l from-cyan-500 via-transparent to-transparent [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Top blur overlay */}
        <div className="absolute top-1/2 z-50 h-48 w-full -translate-y-1/2 bg-slate-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Glow line */}
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' as const }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-cyan-400"
        />

        {/* Ambient glow */}
        <motion.div
          initial={{ width: '8rem', opacity: 0 }}
          whileInView={{ width: '16rem', opacity: 0.5 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' as const }}
          className="absolute inset-auto z-30 h-44 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-50 -mt-40 flex flex-col items-center px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 whitespace-pre-line bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl"
        >
          {headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 max-w-lg text-center text-base text-neutral-400 md:text-lg"
        >
          {subheadline}
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-8 py-3 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20"
        >
          Get Started
        </motion.button>
      </div>

      {/* Bottom spacer */}
      <div className="h-40" />
    </div>
  )
}
