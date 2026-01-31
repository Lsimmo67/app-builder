'use client'

import { cn } from '@/lib/utils/cn'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'

interface TracingBeamProps {
  className?: string
  children?: React.ReactNode
  beamColor?: string
}

const defaultContent = [
  {
    title: 'Getting Started',
    description:
      'Begin your journey with our comprehensive onboarding process. Set up your environment, configure your tools, and start building in minutes.',
  },
  {
    title: 'Build Your First Project',
    description:
      'Follow our step-by-step guide to create your first project. Learn the fundamentals of component architecture, state management, and styling.',
  },
  {
    title: 'Deploy to Production',
    description:
      'Ship your project with confidence. Our deployment pipeline handles optimization, CDN distribution, and monitoring out of the box.',
  },
  {
    title: 'Scale and Iterate',
    description:
      'Monitor performance, gather user feedback, and iterate on your product. Our analytics and A/B testing tools make data-driven decisions easy.',
  },
]

export default function TracingBeam({
  className,
  children,
  beamColor = '#06b6d4',
}: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 90,
  })

  const dotY = useTransform(scaleY, [0, 1], ['0%', '100%'])

  return (
    <div
      ref={ref}
      className={cn('relative mx-auto max-w-4xl px-4 py-20', className)}
    >
      {/* Beam track */}
      <div className="absolute left-8 top-20 bottom-0 w-[2px] bg-neutral-800 md:left-12">
        {/* Filled beam */}
        <motion.div
          className="absolute left-0 top-0 w-full origin-top"
          style={{
            scaleY,
            background: `linear-gradient(to bottom, ${beamColor}, transparent)`,
            height: '100%',
          }}
        />

        {/* Moving dot */}
        <motion.div
          className="absolute -left-[5px] h-3 w-3 rounded-full border-2 shadow-lg"
          style={{
            top: dotY,
            borderColor: beamColor,
            backgroundColor: beamColor,
            boxShadow: `0 0 12px ${beamColor}`,
          }}
        />
      </div>

      {/* Content */}
      <div className="ml-16 md:ml-24">
        {children || (
          <div className="space-y-20">
            {defaultContent.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-2 flex items-center gap-3">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: beamColor }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white md:text-2xl">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400 md:text-base">
                  {item.description}
                </p>
                {/* Decorative card */}
                <div className="mt-6 rounded-xl border border-white/[0.1] bg-neutral-900/50 p-6">
                  <div className="h-2 w-3/4 rounded bg-neutral-800" />
                  <div className="mt-3 h-2 w-1/2 rounded bg-neutral-800" />
                  <div className="mt-3 h-2 w-2/3 rounded bg-neutral-800" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
