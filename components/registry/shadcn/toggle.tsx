"use client"

import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bold: Bold,
  italic: Italic,
  underline: Underline,
}

export interface ShadcnToggleProps {
  pressed?: boolean
  icon?: string
  label?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export default function ShadcnToggle({
  pressed = false,
  icon = "bold",
  label,
  variant = "default",
  size = "default",
  className,
}: ShadcnToggleProps) {
  const Icon = iconMap[icon]

  return (
    <Toggle
      variant={variant}
      size={size}
      defaultPressed={pressed}
      aria-label={label || `Toggle ${icon}`}
      className={cn(className)}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label && <span className={cn(Icon && "ml-2")}>{label}</span>}
    </Toggle>
  )
}
