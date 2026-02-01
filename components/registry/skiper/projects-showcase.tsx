"use client"

import React, { useRef, useState } from "react"
import { motion, useInView } from "motion/react"
import { cn } from "@/lib/utils"

export interface ShowcaseProject {
  title: string
  category: string
  image: string
  link: string
}

export interface SkiperProjectsShowcaseProps {
  projects?: ShowcaseProject[]
  className?: string
}

const defaultProjects: ShowcaseProject[] = [
  {
    title: "Aurora Dashboard",
    category: "Web Application",
    image: "https://placehold.co/800x600/1a1a2e/e94560?text=Aurora",
    link: "#",
  },
  {
    title: "Nebula Mobile",
    category: "Mobile App",
    image: "https://placehold.co/800x600/16213e/0f3460?text=Nebula",
    link: "#",
  },
  {
    title: "Cosmos Brand",
    category: "Brand Identity",
    image: "https://placehold.co/800x600/1a1a2e/533483?text=Cosmos",
    link: "#",
  },
  {
    title: "Quantum Platform",
    category: "SaaS Product",
    image: "https://placehold.co/800x600/0a0a1a/4361ee?text=Quantum",
    link: "#",
  },
]

export default function SkiperProjectsShowcase({
  projects = defaultProjects,
  className,
}: SkiperProjectsShowcaseProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className={cn("w-full py-16", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0, 1],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative block overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  animate={{
                    scale: hoveredIndex === index ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
                />
                <motion.div
                  className="absolute inset-0 bg-black/40"
                  animate={{
                    opacity: hoveredIndex === index ? 0.6 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6"
                animate={{
                  y: hoveredIndex === index ? 0 : 10,
                  opacity: hoveredIndex === index ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="mb-1 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {project.title}
                </h3>
              </motion.div>

              <motion.div
                className="absolute right-6 top-6"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  x: hoveredIndex === index ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M4 12L12 4M12 4H6M12 4V10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
