'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SkiperNeonGlowTextProps {
  text?: string
  color?: string
  flickerSpeed?: number
  className?: string
}

export default function SkiperNeonGlowText({
  text = 'NEON GLOW',
  color = '#6366f1',
  flickerSpeed = 3,
  className,
}: SkiperNeonGlowTextProps) {
  return (
    <div className={cn('flex h-[300px] w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950', className)}>
      <div className="relative">
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: [0.5, 1, 0.7, 1, 0.5],
          }}
          transition={{
            duration: flickerSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span
            className="select-none whitespace-nowrap text-5xl font-black tracking-wider md:text-7xl lg:text-8xl"
            style={{
              color: 'transparent',
              textShadow: `0 0 20px ${color}80, 0 0 40px ${color}60, 0 0 80px ${color}40, 0 0 120px ${color}20`,
            }}
          >
            {text}
          </span>
        </motion.div>

        {/* Main text */}
        <motion.span
          className="relative select-none whitespace-nowrap text-5xl font-black tracking-wider md:text-7xl lg:text-8xl"
          style={{
            color,
            textShadow: `0 0 7px ${color}, 0 0 10px ${color}, 0 0 21px ${color}, 0 0 42px ${color}80, 0 0 82px ${color}40, 0 0 92px ${color}20`,
          }}
          animate={{
            textShadow: [
              `0 0 7px ${color}, 0 0 10px ${color}, 0 0 21px ${color}, 0 0 42px ${color}80, 0 0 82px ${color}40, 0 0 92px ${color}20`,
              `0 0 4px ${color}, 0 0 7px ${color}, 0 0 15px ${color}, 0 0 30px ${color}60, 0 0 60px ${color}30`,
              `0 0 7px ${color}, 0 0 10px ${color}, 0 0 21px ${color}, 0 0 42px ${color}80, 0 0 82px ${color}40, 0 0 92px ${color}20`,
            ],
          }}
          transition={{
            duration: flickerSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {text}
        </motion.span>

        {/* Reflection */}
        <motion.div
          className="mt-2 flex justify-center opacity-20"
          style={{
            transform: 'scaleY(-1)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 60%)',
          }}
        >
          <span
            className="select-none whitespace-nowrap text-5xl font-black tracking-wider md:text-7xl lg:text-8xl"
            style={{
              color,
              textShadow: `0 0 10px ${color}80`,
              filter: 'blur(2px)',
            }}
          >
            {text}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
