"use client"

import { cn } from "@/lib/utils"
import React from "react"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  )
}

export interface AceternityBentoGridProps {
  items?: {
    title: string
    description: string
    icon?: string
    colSpan?: 1 | 2
    rowSpan?: 1 | 2
    className?: string
  }[]
  className?: string
}

export default function AceternityBentoGridWrapper({
  items = [
    { title: "The Dawn of Innovation", description: "Explore the birth of groundbreaking ideas and inventions.", icon: "🌅", colSpan: 2 as const },
    { title: "The Digital Revolution", description: "Dive into the transformative power of technology.", icon: "💻" },
    { title: "The Art of Design", description: "Discover the beauty of thoughtful and functional design.", icon: "🎨" },
    { title: "The Power of Communication", description: "Understand the impact of effective communication.", icon: "💬" },
    { title: "The Pursuit of Knowledge", description: "Join the quest for understanding and enlightenment.", icon: "📚", colSpan: 2 as const },
  ],
  className,
}: AceternityBentoGridProps) {
  return (
    <BentoGrid className={className}>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          icon={item.icon ? <span className="text-2xl">{item.icon}</span> : undefined}
          header={
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
          }
          className={cn(
            item.colSpan === 2 && "md:col-span-2",
            item.rowSpan === 2 && "md:row-span-2",
            item.className
          )}
        />
      ))}
    </BentoGrid>
  )
}
