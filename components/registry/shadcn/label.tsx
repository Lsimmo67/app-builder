"use client"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"

export interface ShadcnLabelProps {
  text?: string
  htmlFor?: string
  className?: string
}

export default function ShadcnLabel({
  text = "Label",
  htmlFor,
  className,
}: ShadcnLabelProps) {
  return (
    <Label htmlFor={htmlFor} className={cn(className)}>
      {text}
    </Label>
  )
}
