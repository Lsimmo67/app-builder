'use client'

import { cn } from '@/lib/utils/cn'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { useRef } from 'react'

interface ProductCard {
  title: string
  thumbnail: string
  link?: string
}

interface HeroParallaxProps {
  className?: string
  products?: ProductCard[]
  headline?: string
  subheadline?: string
}

const defaultProducts: ProductCard[] = Array.from({ length: 15 }, (_, i) => ({
  title: `Product ${i + 1}`,
  thumbnail: `https://picsum.photos/seed/${i + 10}/600/400`,
  link: '#',
}))

export default function HeroParallax({
  className,
  products = defaultProducts,
  headline = 'Build Amazing Products\nWith Modern Tools',
  subheadline = 'Leverage the power of cutting-edge technology to create world-class digital experiences that delight your users.',
}: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateXRow1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -200]),
    springConfig
  )
  const translateXRow2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    springConfig
  )
  const translateXRow3 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -200]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, -100]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )

  const row1 = products.slice(0, 5)
  const row2 = products.slice(5, 10)
  const row3 = products.slice(10, 15)

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-[300vh] flex-col self-auto overflow-hidden bg-black pt-40 antialiased [perspective:1000px] [transform-style:preserve-3d]',
        className
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-40">
        <h1 className="whitespace-pre-line text-2xl font-bold text-white md:text-7xl">
          {headline}
        </h1>
        <p className="mt-8 max-w-2xl text-base text-neutral-300 md:text-xl">
          {subheadline}
        </p>
      </div>

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="mb-20 flex flex-row-reverse space-x-4 space-x-reverse">
          {row1.map((product, i) => (
            <motion.div
              key={`row1-${i}`}
              style={{ x: translateXRow1 }}
              className="relative h-60 w-[30rem] flex-shrink-0 overflow-hidden rounded-xl border border-neutral-800 md:h-96"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-4 left-4">
                <p className="text-lg font-semibold text-white">
                  {product.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mb-20 flex space-x-4">
          {row2.map((product, i) => (
            <motion.div
              key={`row2-${i}`}
              style={{ x: translateXRow2 }}
              className="relative h-60 w-[30rem] flex-shrink-0 overflow-hidden rounded-xl border border-neutral-800 md:h-96"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-4 left-4">
                <p className="text-lg font-semibold text-white">
                  {product.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse space-x-4 space-x-reverse">
          {row3.map((product, i) => (
            <motion.div
              key={`row3-${i}`}
              style={{ x: translateXRow3 }}
              className="relative h-60 w-[30rem] flex-shrink-0 overflow-hidden rounded-xl border border-neutral-800 md:h-96"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-4 left-4">
                <p className="text-lg font-semibold text-white">
                  {product.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
