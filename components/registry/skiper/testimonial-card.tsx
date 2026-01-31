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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        'group relative w-full max-w-md overflow-hidden rounded-2xl',
        className
      )}
    >
      {/* Gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-2xl border border-transparent bg-zinc-950/80 p-8 backdrop-blur-xl">
        {/* Background blur accent */}
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-violet-500/5 blur-3xl transition-all duration-700 group-hover:bg-violet-500/10" />

        {/* Stars */}
        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={cn(
                'h-4 w-4',
                i < rating ? 'text-amber-400' : 'text-neutral-700'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <p className="mb-6 text-base leading-relaxed text-neutral-300">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Divider */}
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Author */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white',
              avatarGradient
            )}
          >
            {avatarInitials}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-neutral-500">
              {role} at {company}
            </p>
          </div>
          {/* Company logo placeholder */}
          <div className="ml-auto rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-neutral-500">
            {company}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
