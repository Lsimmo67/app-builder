"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"

export interface ShadcnCheckboxProps {
  label?: string
  checked?: boolean
  disabled?: boolean
  description?: string
  className?: string
}

export default function ShadcnCheckbox({
  label = "Accept terms and conditions",
  checked = false,
  disabled = false,
  description,
  className,
}: ShadcnCheckboxProps) {
  const id = "checkbox-field"

  return (
    <div className={cn("flex items-start space-x-2", className)}>
      <Checkbox
        id={id}
        defaultChecked={checked}
        disabled={disabled}
      />
      <div className="grid gap-1.5 leading-none">
        {label && (
          <Label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}
