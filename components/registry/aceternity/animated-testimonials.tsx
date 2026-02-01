"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityAnimatedTestimonialsProps {
  testimonials?: {
    quote: string
    name: string
    designation: string
    src: string
  }[]
  autoplay?: boolean
  className?: string
}

export default function AceternityAnimatedTestimonials({
  testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://placehold.co/200x200/3b82f6/ffffff?text=SC",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://placehold.co/200x200/8b5cf6/ffffff?text=MR",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://placehold.co/200x200/ec4899/ffffff?text=EW",
    },
    {
      quote:
        "Outstanding support and continuous innovation. It's rare to find a platform that truly listens to its users.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://placehold.co/200x200/f59e0b/ffffff?text=JK",
    },
  ],
  autoplay = true,
  className,
}: AceternityAnimatedTestimonialsProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const isActive = (index: number) => index === active

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Image section */}
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(i) ? 1 : 0.7,
                  scale: isActive(i) ? 1 : 0.95,
                  z: isActive(i) ? 0 : -100,
                  rotate: isActive(i) ? 0 : randomRotateY(),
                  zIndex: isActive(i) ? 999 : testimonials.length - i,
                  y: isActive(i) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
              >
                <img
                  src={t.src}
                  alt={t.name}
                  className="h-full w-full rounded-3xl object-cover object-center"
                  draggable={false}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Text section */}
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500 mt-1">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-gray-500 dark:text-neutral-300 mt-8">
              {testimonials[active].quote.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * i }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-8 w-8 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="h-8 w-8 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
