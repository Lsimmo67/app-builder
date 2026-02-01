"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils/cn"

export interface AceternityHeroParallaxProps {
  title?: string
  subtitle?: string
  products?: { title: string; thumbnail: string; link: string }[]
  className?: string
}

function ProductCard({
  product,
  translate,
}: {
  product: { title: string; thumbnail: string; link: string }
  translate: any
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product relative flex-shrink-0 h-72 w-[30rem] rounded-xl overflow-hidden"
    >
      <a href={product.link} className="block">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover object-left-top"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/product:opacity-80 transition-opacity duration-300" />
        <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
          {product.title}
        </h3>
      </a>
    </motion.div>
  )
}

export default function AceternityHeroParallax({
  title = "The Ultimate Development Studio",
  subtitle = "We build beautiful products with the latest technologies and frameworks.",
  products = [
    { title: "Moonbeam", thumbnail: "https://placehold.co/600x400/1a1a2e/ffffff?text=Moonbeam", link: "#" },
    { title: "Cursor", thumbnail: "https://placehold.co/600x400/16213e/ffffff?text=Cursor", link: "#" },
    { title: "Rogue", thumbnail: "https://placehold.co/600x400/0f3460/ffffff?text=Rogue", link: "#" },
    { title: "Editorially", thumbnail: "https://placehold.co/600x400/533483/ffffff?text=Editorially", link: "#" },
    { title: "Editrix AI", thumbnail: "https://placehold.co/600x400/e94560/ffffff?text=Editrix+AI", link: "#" },
    { title: "Pixel Perfect", thumbnail: "https://placehold.co/600x400/1a1a2e/ffffff?text=Pixel+Perfect", link: "#" },
    { title: "Algochurn", thumbnail: "https://placehold.co/600x400/16213e/ffffff?text=Algochurn", link: "#" },
    { title: "Aceternity UI", thumbnail: "https://placehold.co/600x400/0f3460/ffffff?text=Aceternity+UI", link: "#" },
    { title: "Tailwind Master Kit", thumbnail: "https://placehold.co/600x400/533483/ffffff?text=Tailwind+Kit", link: "#" },
  ],
  className,
}: AceternityHeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
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
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 0]),
    springConfig
  )

  const firstRow = products.slice(0, 3)
  const secondRow = products.slice(3, 6)
  const thirdRow = products.slice(6, 9)

  return (
    <div
      ref={ref}
      className={cn(
        "h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]",
        className
      )}
    >
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
        <h1 className="text-2xl md:text-7xl font-bold text-neutral-800 dark:text-white">
          {title}
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-600 dark:text-neutral-200">
          {subtitle}
        </p>
      </div>
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-row-reverse gap-10 mb-10">
          {firstRow.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </div>
        <div className="flex flex-row gap-10 mb-10">
          {secondRow.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </div>
        <div className="flex flex-row-reverse gap-10">
          {thirdRow.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
