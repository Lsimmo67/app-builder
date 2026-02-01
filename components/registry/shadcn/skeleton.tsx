"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils/cn"

export interface ShadcnSkeletonProps {
  width?: string
  height?: string
  variant?: "line" | "circle" | "rect"
  className?: string
}

export default function ShadcnSkeleton({
  width = "100%",
  height = "20px",
  variant = "line",
  className,
}: ShadcnSkeletonProps) {
  const variantClasses = {
    line: "rounded-md",
    circle: "rounded-full",
    rect: "rounded-lg",
  }

  return (
    <Skeleton
      className={cn(variantClasses[variant], className)}
      style={{
        width: variant === "circle" ? height : width,
        height,
      }}
    />
  )
}
