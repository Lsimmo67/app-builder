"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"

export interface ShadcnPopoverProps {
  trigger?: string
  content?: string
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export default function ShadcnPopover({
  trigger = "Open Popover",
  content = "This is the popover content. Place any information or interactive elements here.",
  side = "bottom",
  className,
}: ShadcnPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn(className)}>
          {trigger}
        </Button>
      </PopoverTrigger>
      <PopoverContent side={side} className="w-80">
        <p className="text-sm text-muted-foreground">{content}</p>
      </PopoverContent>
    </Popover>
  )
}
