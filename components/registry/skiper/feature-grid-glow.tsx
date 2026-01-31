'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface FeatureItem {
  title: string
  description: string
  iconPath: string
  glowColor: string
}

interface FeatureGridGlowProps {
  className?: string
  features?: FeatureItem[]
  title?: string
  subtitle?: string
}

const defaultFeatures: FeatureItem[] = [
  {
    title: 'Lightning Fast',
    description: 'Sub-millisecond response times with edge computing and intelligent caching.',
    iconPath: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    glowColor: 'rgba(250, 204, 21, 0.4)',
  },
  {
    title: 'Secure by Default',
    description: 'Enterprise-grade security with end-to-end encryption and SOC 2 compliance.',
    iconPath: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    glowColor: 'rgba(34, 197, 94, 0.4)',
  },
  {
    title: 'Smart Analytics',
    description: 'Real-time dashboards with AI-powered insights and predictive analytics.',
    iconPath: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    title: 'Team Collaboration',
    description: 'Real-time multiplayer editing with role-based access control and audit logs.',
    iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    title: 'Global Scale',
    description: 'Deploy to 30+ regions with automatic failover and zero-downtime migrations.',
    iconPath: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    glowColor: 'rgba(6, 182, 212, 0.4)',
  },
  {
    title: 'Developer First',
    description: 'Comprehensive APIs, SDKs, and CLI tools with excellent documentation.',
    iconPath: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
    glowColor: 'rgba(244, 63, 94, 0.4)',
  },
]

export default function FeatureGridGlow({
  className,
  features = defaultFeatures,
  title = 'Everything you need',
  subtitle = 'A comprehensive suite of tools designed to help you build, deploy, and scale with confidence.',
}: FeatureGridGlowProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      className={cn('w-full bg-black px-4 py-24', className)}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white md:text-4xl"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mx-auto mt-4 max-w-xl text-base text-neutral-400"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950 p-8 transition-all duration-500 hover:border-white/10"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                boxShadow:
                  hoveredIndex === idx
                    ? `0 0 40px 4px ${feature.glowColor.replace('0.4', '0.15')}, inset 0 0 30px 0 ${feature.glowColor.replace('0.4', '0.03')}`
                    : '0 0 0 0 transparent',
                transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
              }}
            >
              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] transition-colors duration-500 group-hover:border-white/10">
                <svg
                  className="h-6 w-6 text-neutral-400 transition-colors duration-500 group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.iconPath} />
                </svg>
              </div>

              <h3 className="mb-2 text-lg font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
