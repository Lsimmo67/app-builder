"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { cn } from "@/lib/utils/cn"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bold: Bold,
  italic: Italic,
  underline: Underline,
  "align-left": AlignLeft,
  "align-center": AlignCenter,
  "align-right": AlignRight,
}

export interface ToggleGroupItemData {
  value: string
  label?: string
  icon?: string
}

export interface ShadcnToggleGroupProps {
  items?: ToggleGroupItemData[]
  type?: "single" | "multiple"
  variant?: "default" | "outline"
  className?: string
}

export default function ShadcnToggleGroup({
  items = [
    { value: "bold", icon: "bold", label: "Bold" },
    { value: "italic", icon: "italic", label: "Italic" },
    { value: "underline", icon: "underline", label: "Underline" },
  ],
  type = "multiple",
  variant = "default",
  className,
}: ShadcnToggleGroupProps) {
  return (
    <ToggleGroup type={type} variant={variant} className={cn(className)}>
      {items.map((item) => {
        const Icon = item.icon ? iconMap[item.icon] : null

        return (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            aria-label={item.label || item.value}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {!Icon && item.label && <span>{item.label}</span>}
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}
