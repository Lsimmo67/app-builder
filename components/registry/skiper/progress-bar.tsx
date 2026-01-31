'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface SkillBar {
  label: string
  value: number
  gradient?: string
}

interface ProgressBarProps {
  className?: string
  skills?: SkillBar[]
  title?: string
  animationDuration?: number
  showPercentage?: boolean
}

const defaultSkills: SkillBar[] = [
  { label: 'React & Next.js', value: 95, gradient: 'from-cyan-500 to-blue-500' },
  { label: 'TypeScript', value: 90, gradient: 'from-blue-500 to-indigo-500' },
  { label: 'Node.js', value: 85, gradient: 'from-emerald-500 to-teal-500' },
  { label: 'UI/UX Design', value: 80, gradient: 'from-violet-500 to-purple-500' },
  { label: 'DevOps & CI/CD', value: 75, gradient: 'from-amber-500 to-orange-500' },
]

export default function ProgressBar({
  className,
  skills = defaultSkills,
  title = 'Skills & Expertise',
  animationDuration = 1.2,
  showPercentage = true,
}: ProgressBarProps) {
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
      className={cn('mx-auto w-full max-w-xl px-4 py-10', className)}
    >
      {title && (
        <h3 className="mb-8 text-xl font-bold text-white">{title}</h3>
      )}

      <div className="space-y-6">
        {skills.map((skill, idx) => (
          <div key={idx}>
            {/* Label row */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-300">
                {skill.label}
              </span>
              {showPercentage && (
                <motion.span
                  className="text-sm tabular-nums text-neutral-500"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: idx * 0.1 + animationDuration * 0.5 }}
                >
                  {skill.value}%
                </motion.span>
              )}
            </div>

            {/* Bar track */}
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              {/* Filled bar */}
              <motion.div
                className={cn(
                  'absolute inset-y-0 left-0 rounded-full bg-gradient-to-r',
                  skill.gradient || 'from-violet-500 to-indigo-500'
                )}
                initial={{ width: '0%' }}
                animate={isVisible ? { width: `${skill.value}%` } : {}}
                transition={{
                  duration: animationDuration,
                  delay: idx * 0.1,
                  ease: [0.33, 1, 0.68, 1],
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
