"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"

export interface ShadcnTextareaProps {
  placeholder?: string
  rows?: number
  resize?: "none" | "vertical" | "horizontal" | "both"
  disabled?: boolean
  label?: string
  error?: string
  className?: string
}

export default function ShadcnTextarea({
  placeholder = "Type your message here...",
  rows = 4,
  resize = "vertical",
  disabled = false,
  label,
  error,
  className,
}: ShadcnTextareaProps) {
  const id = "textarea-field"

  const resizeClass = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  }

  return (
    <div className={cn("grid w-full gap-1.5", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={cn(
          resizeClass[resize],
          error && "border-destructive"
        )}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
