"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface ShadcnCollapsibleProps {
  trigger?: string
  content?: string
  defaultOpen?: boolean
  className?: string
}

export default function ShadcnCollapsible({
  trigger = "Toggle Content",
  content = "This is the collapsible content that can be shown or hidden.",
  defaultOpen = false,
  className,
}: ShadcnCollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full space-y-2", className)}
    >
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-sm font-semibold">{trigger}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          {content}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
