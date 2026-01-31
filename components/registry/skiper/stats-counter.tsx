'use client'

import { cn } from '@/lib/utils/cn'
import { useEffect, useRef, useState } from 'react'

interface StatItem {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

interface StatsCounterProps {
  className?: string
  stats?: StatItem[]
  duration?: number
  title?: string
}

const defaultStats: StatItem[] = [
  { value: 10000, suffix: '+', label: 'Active Users' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA' },
  { value: 50, suffix: 'M+', label: 'API Requests / Day' },
  { value: 4.9, prefix: '', suffix: '/5', label: 'Customer Rating' },
]

function useCountUp(target: number, duration: number, shouldStart: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number | null = null
    const isDecimal = target % 1 !== 0
    const decimals = isDecimal ? (target.toString().split('.')[1]?.length || 1) : 0

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target

      setCount(Number(current.toFixed(decimals)))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [target, duration, shouldStart])

  return count
}

function StatCard({
  stat,
  duration,
  shouldAnimate,
}: {
  stat: StatItem
  duration: number
  shouldAnimate: boolean
}) {
  const count = useCountUp(stat.value, duration, shouldAnimate)

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950 p-8 text-center transition-all duration-500 hover:border-white/10">
      {/* Hover gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <p className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-bold tabular-nums text-transparent md:text-5xl">
          {stat.prefix}
          {count}
          {stat.suffix}
        </p>
        <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
      </div>
    </div>
  )
}

export default function StatsCounter({
  className,
  stats = defaultStats,
  duration = 2,
  title = 'Trusted by thousands of teams worldwide',
}: StatsCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('w-full bg-black px-4 py-20', className)}
    >
      <div className="mx-auto max-w-5xl">
        {title && (
          <h2 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl">
            {title}
          </h2>
        )}

        <div
          className={cn(
            'grid grid-cols-2 gap-4 md:grid-cols-4',
            stats.length === 3 && 'md:grid-cols-3'
          )}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              duration={duration}
              shouldAnimate={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
