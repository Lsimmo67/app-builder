'use client'

import { cn } from '@/lib/utils/cn'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Star {
  id: number
  startX: number
  startY: number
  angle: number
  length: number
  duration: number
  delay: number
}

interface ShootingStarsProps {
  className?: string
  children?: React.ReactNode
  starCount?: number
  starColor?: string
  interval?: number
}

function generateStar(id: number): Star {
  return {
    id,
    startX: Math.random() * 100,
    startY: Math.random() * 50,
    angle: 30 + Math.random() * 30,
    length: 80 + Math.random() * 150,
    duration: 0.8 + Math.random() * 1.2,
    delay: Math.random() * 6,
  }
}

export default function ShootingStars({
  className,
  children,
  starCount = 8,
  starColor = 'white',
  interval = 6,
}: ShootingStarsProps) {
  const [stars, setStars] = useState<Star[]>(() =>
    Array.from({ length: starCount }, (_, i) => generateStar(i))
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setStars((prev) =>
        prev.map((star) => generateStar(star.id))
      )
    }, interval * 1000)
    return () => clearInterval(timer)
  }, [interval])

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black',
        className
      )}
    >
      {/* Static background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={`bg-star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${0.5 + Math.random() * 1.5}px`,
              height: `${0.5 + Math.random() * 1.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.6,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {stars.map((star) => {
        const rad = (star.angle * Math.PI) / 180
        const endX = star.startX + Math.cos(rad) * (star.length / 10)
        const endY = star.startY + Math.sin(rad) * (star.length / 10)
        return (
          <motion.div
            key={`${star.id}-${star.startX}`}
            className="pointer-events-none absolute"
            style={{
              top: `${star.startY}%`,
              left: `${star.startX}%`,
              width: `${star.length}px`,
              height: '1px',
              background: `linear-gradient(90deg, ${starColor}, transparent)`,
              transformOrigin: '0 0',
              transform: `rotate(${star.angle}deg)`,
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scaleX: [0, 1, 1, 1],
              x: [`0%`, `${(endX - star.startX) * 10}px`],
              y: [`0%`, `${(endY - star.startY) * 10}px`],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: interval,
              ease: 'easeOut' as const,
              times: [0, 0.1, 0.7, 1],
            }}
          />
        )
      })}

      {/* Subtle nebula glow */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-indigo-900/10 blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full bg-purple-900/10 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {children || (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
            >
              Under the Stars
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-6 max-w-lg text-base text-neutral-500 md:text-lg"
            >
              Watch shooting stars streak across a dark sky. A captivating
              animated background for hero sections and landing pages.
            </motion.p>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
