'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface TestimonialCardProps {
  className?: string
  quote?: string
  name?: string
  role?: string
  company?: string
  avatarGradient?: string
  avatarInitials?: string
  rating?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function TestimonialCard({
  className,
  quote = 'This platform completely transformed how we build products. The speed of iteration went from weeks to hours, and our design quality improved dramatically.',
  name = 'Sarah Chen',
  role = 'Head of Product',
  company = 'TechCorp',
  avatarGradient = 'from-violet-500 to-indigo-600',
  avatarInitials = 'SC',
  rating = 5,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative w-full max-w-md overflow-hidden rounded-2xl',
        className
      )}
    >
      {/* Gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative overflow-hidden rounded-2xl border border-transparent bg-zinc-950/80 p-8 backdrop-blur-xl">
        {/* Background blur accent */}
        <motion.div
          className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-violet-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Stars */}
          <motion.div variants={itemVariants} className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < rating ? 'text-amber-400' : 'text-neutral-700'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2 + i * 0.06,
                  type: 'spring' as const,
                  stiffness: 400,
                  damping: 12,
                }}
                viewport={{ once: true }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </motion.div>

          {/* Quote mark */}
          <motion.div
            variants={itemVariants}
            className="mb-2 text-3xl leading-none text-violet-500/30"
          >
            &ldquo;
          </motion.div>

          {/* Quote */}
          <motion.p
            variants={itemVariants}
            className="mb-6 text-base leading-relaxed text-neutral-300"
          >
            {quote}&rdquo;
          </motion.p>

          {/* Divider */}
          <motion.div
            className="mb-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' as const }}
            viewport={{ once: true }}
          />

          {/* Author */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <motion.div
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white',
                avatarGradient
              )}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
            >
              {avatarInitials}
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-white">{name}</p>
              <p className="text-xs text-neutral-500">
                {role} at {company}
              </p>
            </div>
            {/* Company logo placeholder */}
            <motion.div
              className="ml-auto rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-neutral-500"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.1)' }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
            >
              {company}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
