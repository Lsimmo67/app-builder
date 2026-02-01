'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'

interface HighlightedWord {
  text: string
  highlight?: boolean
}

interface HeroHighlightProps {
  className?: string
  headline?: HighlightedWord[]
  subheadline?: string
  highlightGradient?: string
}

const defaultHeadline: HighlightedWord[] = [
  { text: 'Create ' },
  { text: 'stunning websites ' },
  { text: 'with ' },
  { text: 'beautiful highlights', highlight: true },
  { text: ' that grab attention and ' },
  { text: 'drive conversions', highlight: true },
]

export default function HeroHighlight({
  className,
  headline = defaultHeadline,
  subheadline = 'A dynamic hero section where key phrases get animated gradient highlights, drawing the eye to what matters most.',
  highlightGradient = 'linear-gradient(120deg, rgba(59,130,246,0) 40%, rgba(59,130,246,0.3) 50%, rgba(139,92,246,0.3) 55%, rgba(139,92,246,0) 65%)',
}: HeroHighlightProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black',
        className
      )}
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          {headline.map((word, i) =>
            word.highlight ? (
              <motion.span
                key={i}
                className="relative inline-block"
                initial={{ backgroundSize: '0% 100%' }}
                animate={{ backgroundSize: '100% 100%' }}
                transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: 'easeOut' as const }}
                style={{
                  backgroundImage: highlightGradient,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '0 0',
                  padding: '0 4px',
                  borderRadius: '4px',
                }}
              >
                <span className="relative z-10 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  {word.text}
                </span>
              </motion.span>
            ) : (
              <span key={i}>{word.text}</span>
            )
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-8 max-w-xl text-base text-neutral-400 md:text-lg"
        >
          {subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/25">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          <button className="rounded-full border border-neutral-700 px-8 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  )
}
