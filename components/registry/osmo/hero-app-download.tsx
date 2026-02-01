'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface Props {
  headline?: string
  subheadline?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const phoneVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.3 },
  },
}

const floatAnimation = {
  y: [-10, 10, -10],
  rotate: [-1, 1, -1],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

export default function HeroAppDownload({
  headline = 'Your world, one tap away',
  subheadline = 'Download our app and experience seamless productivity on the go. Available on iOS and Android.',
  primaryButtonText = 'App Store',
  secondaryButtonText = 'Google Play',
  className,
}: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      className={cn(
        'flex min-h-[80vh] items-center bg-background px-6 py-24 md:px-12 lg:px-24',
        className,
      )}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left: Content */}
        <motion.div variants={containerVariants}>
          <motion.div variants={slideUp}>
            <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              Available on mobile
            </span>
          </motion.div>

          <motion.h1
            variants={slideUp}
            className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {headline}
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            {subheadline}
          </motion.p>

          <motion.div variants={slideUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
            {/* App Store Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
              className="inline-flex h-14 items-center gap-3 rounded-xl bg-foreground px-6 text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] leading-tight opacity-80">Download on the</div>
                <div className="text-sm font-semibold leading-tight">{primaryButtonText}</div>
              </div>
            </motion.button>

            {/* Google Play Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
              className="inline-flex h-14 items-center gap-3 rounded-xl bg-foreground px-6 text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.56.69.56 1.19s-.22.92-.56 1.19l-2.29 1.32-2.5-2.5 2.5-2.5 2.29 1.3M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] leading-tight opacity-80">Get it on</div>
                <div className="text-sm font-semibold leading-tight">{secondaryButtonText}</div>
              </div>
            </motion.button>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              4.9 rating
            </div>
            <div>100K+ downloads</div>
          </motion.div>
        </motion.div>

        {/* Right: Phone mockup */}
        <motion.div
          variants={phoneVariants}
          className="flex items-center justify-center"
        >
          <motion.div animate={floatAnimation} className="relative mx-auto w-64">
            {/* Phone shadow */}
            <motion.div
              className="absolute -bottom-4 left-1/2 h-8 w-48 -translate-x-1/2 rounded-full bg-black/10 blur-xl"
              animate={{
                scale: [1, 0.9, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
            />

            <div className="relative rounded-[3rem] border-4 border-foreground/10 bg-muted p-3 shadow-2xl">
              <div className="flex h-[500px] flex-col items-center justify-center rounded-[2.5rem] bg-gradient-to-b from-primary/10 to-primary/5 overflow-hidden">
                {/* App UI mockup */}
                <div className="w-full space-y-4 px-6">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-20 rounded bg-foreground/10" />
                    <div className="h-6 w-6 rounded-full bg-primary/20" />
                  </div>
                  <div className="h-28 w-full rounded-xl bg-primary/10" />
                  <div className="space-y-2">
                    <div className="h-2.5 w-3/4 rounded bg-foreground/10" />
                    <div className="h-2.5 w-1/2 rounded bg-foreground/8" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 rounded-lg bg-primary/8" />
                    <div className="h-20 rounded-lg bg-primary/8" />
                  </div>
                  <div className="flex justify-center pt-2">
                    <div className="h-8 w-32 rounded-full bg-primary/15" />
                  </div>
                </div>
              </div>
            </div>

            {/* Notch */}
            <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-foreground/10" />

            {/* Floating notification badge */}
            <motion.div
              className="absolute -right-4 top-24 rounded-xl bg-card p-3 shadow-lg border border-border"
              animate={{
                y: [-4, 4, -4],
                rotate: [-2, 2, -2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground">Synced</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
