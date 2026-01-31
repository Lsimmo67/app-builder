'use client'

import { cn } from '@/lib/utils/cn'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextGenerateProps {
  className?: string
  text?: string
  duration?: number
  staggerDelay?: number
  filter?: boolean
}

export default function TextGenerate({
  className,
  text = 'Generating text effects that captivate and engage your audience with beautiful word by word reveal animations that bring your content to life',
  duration = 0.5,
  staggerDelay = 0.06,
  filter = true,
}: TextGenerateProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.04 * i,
      },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: filter ? 'blur(10px)' : 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: filter ? 'blur(0px)' : 'none',
      transition: {
        duration,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  }

  return (
    <div ref={ref} className={cn('px-4 py-20', className)}>
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mx-auto flex max-w-4xl flex-wrap justify-center text-center text-2xl font-bold leading-snug tracking-tight text-white md:text-5xl md:leading-snug"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={child}
            className="mr-2.5 mt-1.5 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
