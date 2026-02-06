"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AceternitySkeletonLoaderProps {
  variant?: "card" | "list" | "profile" | "article"
  lines?: number
  className?: string
}

function ShimmerBlock({
  className,
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-lg bg-neutral-800", className)}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.8, delay, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent -translate-x-full"
        animate={{ translateX: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.8, delay, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

function CardSkeleton() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-950 p-4 space-y-4">
      <ShimmerBlock className="w-full h-48 rounded-xl" />
      <ShimmerBlock className="w-3/4 h-5" delay={0.1} />
      <ShimmerBlock className="w-full h-4" delay={0.2} />
      <ShimmerBlock className="w-5/6 h-4" delay={0.3} />
      <div className="flex gap-2 pt-2">
        <ShimmerBlock className="w-20 h-8 rounded-full" delay={0.4} />
        <ShimmerBlock className="w-20 h-8 rounded-full" delay={0.5} />
      </div>
    </div>
  )
}

function ListSkeleton({ lines }: { lines: number }) {
  return (
    <div className="w-full max-w-md space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-950">
          <ShimmerBlock className="w-10 h-10 rounded-full shrink-0" delay={i * 0.1} />
          <div className="flex-1 space-y-2">
            <ShimmerBlock className="w-3/4 h-4" delay={i * 0.1 + 0.05} />
            <ShimmerBlock className="w-1/2 h-3" delay={i * 0.1 + 0.1} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex flex-col items-center gap-4">
      <ShimmerBlock className="w-20 h-20 rounded-full" />
      <ShimmerBlock className="w-32 h-5" delay={0.1} />
      <ShimmerBlock className="w-48 h-4" delay={0.2} />
      <div className="flex gap-8 mt-2">
        <div className="text-center space-y-2">
          <ShimmerBlock className="w-10 h-5 mx-auto" delay={0.3} />
          <ShimmerBlock className="w-14 h-3" delay={0.35} />
        </div>
        <div className="text-center space-y-2">
          <ShimmerBlock className="w-10 h-5 mx-auto" delay={0.4} />
          <ShimmerBlock className="w-14 h-3" delay={0.45} />
        </div>
        <div className="text-center space-y-2">
          <ShimmerBlock className="w-10 h-5 mx-auto" delay={0.5} />
          <ShimmerBlock className="w-14 h-3" delay={0.55} />
        </div>
      </div>
      <ShimmerBlock className="w-full h-10 rounded-xl mt-2" delay={0.6} />
    </div>
  )
}

function ArticleSkeleton({ lines }: { lines: number }) {
  return (
    <div className="w-full max-w-lg space-y-4">
      <ShimmerBlock className="w-3/4 h-7" />
      <ShimmerBlock className="w-1/3 h-4" delay={0.1} />
      <ShimmerBlock className="w-full h-52 rounded-xl" delay={0.15} />
      {Array.from({ length: lines }).map((_, i) => (
        <ShimmerBlock
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-4/5" : "w-full")}
          delay={0.2 + i * 0.05}
        />
      ))}
    </div>
  )
}

export default function AceternitySkeletonLoader({
  variant = "card",
  lines = 4,
  className,
}: AceternitySkeletonLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("p-4", className)}
    >
      {variant === "card" && <CardSkeleton />}
      {variant === "list" && <ListSkeleton lines={lines} />}
      {variant === "profile" && <ProfileSkeleton />}
      {variant === "article" && <ArticleSkeleton lines={lines} />}
    </motion.div>
  )
}
