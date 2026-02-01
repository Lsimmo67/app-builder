"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/cn"

export interface ShadcnBadgeProps {
  text?: string
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}

export default function ShadcnBadge({
  text = "Badge",
  variant = "default",
  className,
}: ShadcnBadgeProps) {
  return (
    <Badge variant={variant} className={cn(className)}>
      {text}
    </Badge>
  )
}
