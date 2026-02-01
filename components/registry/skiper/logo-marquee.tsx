'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Logo {
  name: string
  width?: string
}

interface LogoMarqueeProps {
  className?: string
  logos?: Logo[]
  speed?: number
  direction?: 'left' | 'right'
  label?: string
}

const defaultLogos: Logo[] = [
  { name: 'Acme Corp' },
  { name: 'Globex' },
  { name: 'Initech' },
  { name: 'Hooli' },
  { name: 'Pied Piper' },
  { name: 'Stark Ind.' },
  { name: 'Wayne Ent.' },
  { name: 'Umbrella' },
  { name: 'Cyberdyne' },
  { name: 'Soylent' },
]

const labelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export default function LogoMarquee({
  className,
  logos = defaultLogos,
  speed = 30,
  direction = 'left',
  label = 'Trusted by industry leaders',
}: LogoMarqueeProps) {
  const duplicatedLogos = [...logos, ...logos]

  return (
    <motion.div
      className={cn('w-full overflow-hidden bg-zinc-950 py-12', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      viewport={{ once: true }}
    >
      {/* Label */}
      {label && (
        <motion.p
          className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-neutral-500"
          variants={labelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {label}
        </motion.p>
      )}

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-zinc-950 to-transparent" />

        {/* Scrolling track */}
        <motion.div
          className="flex w-max items-center gap-12"
          animate={{
            x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
          }}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              ease: 'linear' as const,
            },
          }}
        >
          {duplicatedLogos.map((logo, i) => (
            <motion.div
              key={i}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-6 py-3 text-sm font-semibold text-neutral-400"
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
              }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
            >
              {/* Abstract logo icon */}
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-white/10 to-white/5">
                <span className="text-xs font-bold text-white/40">
                  {logo.name.charAt(0)}
                </span>
              </div>
              {logo.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
