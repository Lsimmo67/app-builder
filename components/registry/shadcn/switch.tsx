"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"

export interface ShadcnSwitchProps {
  checked?: boolean
  label?: string
  disabled?: boolean
  description?: string
  className?: string
}

export default function ShadcnSwitch({
  checked = false,
  label = "Airplane Mode",
  disabled = false,
  description,
  className,
}: ShadcnSwitchProps) {
  const id = "switch-field"

  return (
    <div className={cn("flex items-center justify-between space-x-4", className)}>
      <div className="space-y-0.5">
        {label && (
          <Label htmlFor={id} className="text-sm font-medium">
            {label}
          </Label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        defaultChecked={checked}
        disabled={disabled}
      />
    </div>
  )
}
