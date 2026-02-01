"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils/cn"

export interface ShadcnProgressProps {
  value?: number
  max?: number
  showLabel?: boolean
  className?: string
}

export default function ShadcnProgress({
  value = 60,
  max = 100,
  showLabel = false,
  className,
}: ShadcnProgressProps) {
  const percentage = Math.round((value / max) * 100)

  return (
    <div className={cn("grid w-full gap-2", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <Progress value={percentage} />
    </div>
  )
}
