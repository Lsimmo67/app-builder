'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface TeamMember {
  name: string
  title: string
  initials?: string
}

interface Props {
  headline?: string
  subheadline?: string
  members?: TeamMember[]
  className?: string
}

const defaultMembers: TeamMember[] = [
  { name: 'Alex Johnson', title: 'CEO & Co-founder', initials: 'AJ' },
  { name: 'Priya Sharma', title: 'CTO & Co-founder', initials: 'PS' },
  { name: 'David Kim', title: 'Head of Design', initials: 'DK' },
  { name: 'Maria Santos', title: 'Head of Engineering', initials: 'MS' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function TeamSection({
  headline = 'Meet the team',
  subheadline = 'We are a passionate group of people building tools that empower creators and developers worldwide.',
  members = defaultMembers,
  className,
}: Props) {
  return (
    <section
      className={cn('bg-background px-6 py-20 md:px-12 lg:px-24', className)}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            variants={itemVariants}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            variants={itemVariants}
          >
            {subheadline}
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
              >
                <span className="text-2xl font-bold text-primary">
                  {member.initials ||
                    member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                </span>
              </motion.div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {member.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
