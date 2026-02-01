'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  },
}

export default function ProgressBar({
  className,
  skills = defaultSkills,
  title = 'Skills & Expertise',
  animationDuration = 1.2,
  showPercentage = true,
}: ProgressBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={containerRef}
      className={cn('mx-auto w-full max-w-xl px-4 py-10', className)}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {title && (
        <motion.h3
          className="mb-8 text-xl font-bold text-white"
          variants={itemVariants}
        >
          {title}
        </motion.h3>
      )}

      <div className="space-y-6">
        {skills.map((skill, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-300">
                {skill.label}
              </span>
              {showPercentage && (
                <motion.span
                  className="text-sm tabular-nums text-neutral-500"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: idx * 0.1 + animationDuration * 0.6,
                    type: 'spring' as const,
                    stiffness: 300,
                  }}
                >
                  {skill.value}%
                </motion.span>
              )}
            </div>

            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
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
                  ease: [0.33, 1, 0.68, 1] as const,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{
                    duration: 2,
                    delay: animationDuration + idx * 0.1,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut' as const,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
