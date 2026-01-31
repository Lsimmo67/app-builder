'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface DotBackgroundProps {
  className?: string
  children?: React.ReactNode
  dotSize?: number
  dotSpacing?: number
  dotColor?: string
  fadeColor?: string
}

export default function DotBackground({
  className,
  children,
  dotSize = 1.2,
  dotSpacing = 24,
  dotColor = 'rgba(255, 255, 255, 0.15)',
  fadeColor = 'rgb(0, 0, 0)',
}: DotBackgroundProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-black',
        className
      )}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
        }}
      />

      {/* Radial gradient fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, transparent 30%, ${fadeColor} 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {children || (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white md:text-6xl">
                Content with a
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Dot Pattern
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base text-neutral-400 md:text-lg">
                A subtle dot pattern background that adds texture and depth. The
                dots create a sophisticated technical feel, perfect for
                developer-focused products and SaaS landing pages.
              </p>

              {/* Feature cards */}
              <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    title: 'Fast',
                    desc: 'Optimized for performance',
                    icon: '~',
                  },
                  {
                    title: 'Flexible',
                    desc: 'Fully customizable patterns',
                    icon: '+',
                  },
                  {
                    title: 'Beautiful',
                    desc: 'Stunning visual effects',
                    icon: '*',
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm"
                  >
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-lg text-emerald-400">
                      {feature.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
