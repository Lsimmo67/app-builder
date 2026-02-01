'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Props {
  headline?: string
  subheadline?: string
  buttonText?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const textSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const imageVariantsLeft = {
  hidden: { opacity: 0, scale: 0.92, x: -40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const floatAnimation = {
  y: [-8, 8, -8],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

export default function HeroSplit({
  headline = 'Design. Build. Ship. All in one place.',
  subheadline = 'Empower your team with the tools they need to create world-class digital products. From concept to deployment, streamline every step of your workflow.',
  buttonText = 'Start Building',
  imagePosition = 'right',
  className,
}: Props) {
  const textContent = (
    <motion.div
      variants={containerVariants}
      className="flex flex-col justify-center px-6 py-12 md:px-12 lg:py-0"
    >
      <motion.h1
        variants={textSlideUp}
        className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
      >
        {headline}
      </motion.h1>
      <motion.p
        variants={textSlideUp}
        className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
      >
        {subheadline}
      </motion.p>
      <motion.div variants={textSlideUp} className="mt-8 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {buttonText}
        </motion.button>
      </motion.div>
      <motion.div
        variants={textSlideUp}
        className="mt-8 flex items-center gap-4 text-sm text-muted-foreground"
      >
        <div className="flex -space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 w-8 rounded-full border-2 border-background bg-muted"
            />
          ))}
        </div>
        <span>Trusted by 10,000+ teams</span>
      </motion.div>
    </motion.div>
  )

  const imageContent = (
    <motion.div
      variants={imagePosition === 'left' ? imageVariantsLeft : imageVariants}
      className="flex items-center justify-center px-6 py-12 md:px-12 lg:py-0"
    >
      <motion.div
        animate={floatAnimation}
        className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted to-muted/50 shadow-2xl"
      >
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-400/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <div className="h-3 w-3 rounded-full bg-green-400/60" />
            <div className="ml-4 h-5 flex-1 rounded bg-muted-foreground/10" />
          </div>
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="space-y-3 w-full max-w-xs">
              <div className="h-3 w-3/4 rounded bg-muted-foreground/15" />
              <div className="h-3 w-full rounded bg-muted-foreground/10" />
              <div className="h-3 w-5/6 rounded bg-muted-foreground/10" />
              <div className="mt-4 h-8 w-24 rounded-md bg-primary/20" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      className={cn('min-h-[80vh] bg-background', className)}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {imagePosition === 'left' ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </motion.section>
  )
}
