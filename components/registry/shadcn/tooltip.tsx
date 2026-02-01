"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"

export interface ShadcnTooltipProps {
  content?: string
  trigger?: string
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export default function ShadcnTooltip({
  content = "Add to library",
  trigger = "Hover me",
  side = "top",
  className,
}: ShadcnTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className={cn(className)}>
            {trigger}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
