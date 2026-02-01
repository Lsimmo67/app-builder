"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"

export interface SelectOption {
  label: string
  value: string
}

export interface ShadcnSelectProps {
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  label?: string
  className?: string
}

export default function ShadcnSelect({
  options = [
    { label: "Option 1", value: "option-1" },
    { label: "Option 2", value: "option-2" },
    { label: "Option 3", value: "option-3" },
  ],
  placeholder = "Select an option",
  disabled = false,
  label,
  className,
}: ShadcnSelectProps) {
  return (
    <div className={cn("grid w-full max-w-sm gap-1.5", className)}>
      {label && <Label>{label}</Label>}
      <Select disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
