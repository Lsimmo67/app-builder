"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"

export interface DialogFooterButton {
  text: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export interface ShadcnDialogProps {
  trigger?: string
  title?: string
  description?: string
  content?: string
  footerButtons?: DialogFooterButton[]
  className?: string
}

export default function ShadcnDialog({
  trigger = "Open Dialog",
  title = "Dialog Title",
  description = "This is a dialog description that provides context.",
  content = "Dialog content goes here. You can place any content in this area.",
  footerButtons = [
    { text: "Cancel", variant: "outline" },
    { text: "Save Changes", variant: "default" },
  ],
  className,
}: ShadcnDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn(className)}>
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        {content && (
          <div className="py-4">
            <p className="text-sm text-muted-foreground">{content}</p>
          </div>
        )}
        {footerButtons && footerButtons.length > 0 && (
          <DialogFooter>
            {footerButtons.map((btn, i) => (
              <Button key={i} variant={btn.variant || "default"}>
                {btn.text}
              </Button>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
