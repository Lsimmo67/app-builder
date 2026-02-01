"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"

export interface RadioOption {
  label: string
  value: string
}

export interface ShadcnRadioGroupProps {
  options?: RadioOption[]
  value?: string
  disabled?: boolean
  label?: string
  className?: string
}

export default function ShadcnRadioGroup({
  options = [
    { label: "Default", value: "default" },
    { label: "Comfortable", value: "comfortable" },
    { label: "Compact", value: "compact" },
  ],
  value = "default",
  disabled = false,
  label,
  className,
}: ShadcnRadioGroupProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <RadioGroup defaultValue={value} disabled={disabled}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`radio-${option.value}`} />
            <Label htmlFor={`radio-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
