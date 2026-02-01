"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"

export interface ShadcnSheetProps {
  trigger?: string
  title?: string
  description?: string
  content?: string
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export default function ShadcnSheet({
  trigger = "Open Sheet",
  title = "Sheet Title",
  description = "This is a sheet description that provides context about the panel content.",
  content = "Place your sheet content here. Sheets are useful for side panels, settings, and additional information.",
  side = "right",
  className,
}: ShadcnSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className={cn(className)}>
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && (
            <SheetDescription>{description}</SheetDescription>
          )}
        </SheetHeader>
        {content && (
          <div className="py-4">
            <p className="text-sm text-muted-foreground">{content}</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
