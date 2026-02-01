'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { CSSProperties, ReactNode } from 'react'

const blobVariants = (delay: number) => ({
  animate: {
    x: [0, 30, -20, 10, 0],
    y: [0, -30, 20, -10, 0],
    scale: [1, 1.1, 0.9, 1.05, 1],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  },
})

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut' as const,
      staggerChildren: 0.15,
    },
  },
}

const childVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
}

export default function MeshGradient({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <motion.div
      className={cn('relative w-full min-h-[400px] overflow-hidden rounded-2xl', className)}
      style={style}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[500px] h-[500px] -top-40 -left-40 rounded-full bg-purple-600/40 blur-[120px]"
          {...blobVariants(0)}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] top-20 right-0 rounded-full bg-cyan-500/30 blur-[120px]"
          {...blobVariants(2)}
        />
        <motion.div
          className="absolute w-[450px] h-[450px] -bottom-20 left-1/3 rounded-full bg-fuchsia-500/30 blur-[120px]"
          {...blobVariants(4)}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[100px]"
          {...blobVariants(1.5)}
        />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full min-h-[400px] p-8 text-white">
        {children ?? (
          <motion.div
            className="text-center"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl font-bold mb-3"
              variants={childVariant}
            >
              Mesh Gradient
            </motion.h2>
            <motion.p
              className="text-white/60 max-w-md"
              variants={childVariant}
            >
              Beautiful organic gradients that blend and animate smoothly.
            </motion.p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
