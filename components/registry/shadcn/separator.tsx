"use client"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils/cn"

export interface ShadcnSeparatorProps {
  orientation?: "horizontal" | "vertical"
  label?: string
  className?: string
}

export default function ShadcnSeparator({
  orientation = "horizontal",
  label,
  className,
}: ShadcnSeparatorProps) {
  if (label && orientation === "horizontal") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">{label}</span>
        <Separator className="flex-1" />
      </div>
    )
  }

  return (
    <Separator orientation={orientation} className={cn(className)} />
  )
}
