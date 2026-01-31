'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface Stat {
  label: string
  value: number
  suffix?: string
  prefix?: string
}

interface CounterSectionProps {
  className?: string
  stats?: Stat[]
  duration?: number
  title?: string
  description?: string
}

const defaultStats: Stat[] = [
  { label: 'Projects Completed', value: 500, suffix: '+' },
  { label: 'Happy Clients', value: 10000, suffix: '' },
  { label: 'Uptime Guaranteed', value: 99, suffix: '%' },
  { label: 'Team Members', value: 45, suffix: '+' },
]

export default function CounterSection({
  className,
  stats = defaultStats,
  duration = 2,
  title = 'Trusted by Numbers',
  description = 'Our track record speaks for itself. These numbers reflect our commitment to excellence and client satisfaction.',
}: CounterSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      if (!isVisible || !containerRef.current) return

      stats.forEach((stat, i) => {
        const el = containerRef.current!.querySelector(
          `[data-counter="${i}"]`
        )
        if (!el) return

        const obj = { value: 0 }
        gsap.to(obj, {
          value: stat.value,
          duration,
          delay: i * 0.15,
          ease: 'power2.out',
          snap: { value: 1 },
          onUpdate: () => {
            const formatted =
              obj.value >= 1000
                ? `${(obj.value / 1000).toFixed(obj.value >= 10000 ? 0 : 1)}K`
                : Math.round(obj.value).toString()
            el.textContent = `${stat.prefix ?? ''}${formatted}${stat.suffix ?? ''}`
          },
        })
      })
    },
    { scope: containerRef, dependencies: [isVisible] }
  )

  const formatValue = (stat: Stat) => {
    const display =
      stat.value >= 1000
        ? `${(stat.value / 1000).toFixed(stat.value >= 10000 ? 0 : 1)}K`
        : stat.value.toString()
    return `${stat.prefix ?? ''}${display}${stat.suffix ?? ''}`
  }

  return (
    <div
      ref={containerRef}
      className={cn('w-full py-20 px-6', className)}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 text-center"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/5 to-transparent" />
              <div
                data-counter={i}
                className="relative text-4xl font-bold text-white sm:text-5xl"
              >
                {isVisible ? '0' : formatValue(stat)}
              </div>
              <div className="relative mt-3 text-sm font-medium text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
