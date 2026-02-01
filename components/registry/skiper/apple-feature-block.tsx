"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "motion/react"
import { cn } from "@/lib/utils"

export interface AppleFeature {
  title: string
  description: string
  image: string
}

export interface SkiperAppleFeatureBlockProps {
  title?: string
  subtitle?: string
  features?: AppleFeature[]
  className?: string
}

const defaultFeatures: AppleFeature[] = [
  {
    title: "Blazingly Fast",
    description:
      "Experience performance like never before with our optimized architecture.",
    image: "https://placehold.co/600x400/1a1a2e/e94560?text=Performance",
  },
  {
    title: "Beautiful Design",
    description:
      "Every pixel is crafted with care to deliver a stunning visual experience.",
    image: "https://placehold.co/600x400/16213e/0f3460?text=Design",
  },
  {
    title: "Secure by Default",
    description:
      "Built with security in mind from the ground up. Your data is always safe.",
    image: "https://placehold.co/600x400/1a1a2e/533483?text=Security",
  },
]

function FeatureCard({ feature, index }: { feature: AppleFeature; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-neutral-900"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <motion.img
          src={feature.image}
          alt={feature.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 -mt-16 p-8">
        <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
        <p className="mt-2 text-base text-white/60 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function SkiperAppleFeatureBlock({
  title = "Designed for the future.",
  subtitle = "Packed with features that redefine what's possible.",
  features = defaultFeatures,
  className,
}: SkiperAppleFeatureBlockProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className={cn("w-full py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-white/50">{subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
