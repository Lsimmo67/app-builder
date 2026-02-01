"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"

export interface ShadcnInputProps {
  placeholder?: string
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search"
  label?: string
  disabled?: boolean
  error?: string
  className?: string
}

export default function ShadcnInput({
  placeholder = "Enter text...",
  type = "text",
  label,
  disabled = false,
  error,
  className,
}: ShadcnInputProps) {
  const id = `input-${type}`

  return (
    <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(error && "border-destructive")}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
