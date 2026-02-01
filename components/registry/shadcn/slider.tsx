"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"

export interface ShadcnSliderProps {
  min?: number
  max?: number
  step?: number
  value?: number
  disabled?: boolean
  showValue?: boolean
  label?: string
  className?: string
}

export default function ShadcnSlider({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  disabled = false,
  showValue = true,
  label,
  className,
}: ShadcnSliderProps) {
  const [currentValue, setCurrentValue] = React.useState([value])

  return (
    <div className={cn("grid w-full max-w-sm gap-2", className)}>
      <div className="flex items-center justify-between">
        {label && <Label>{label}</Label>}
        {showValue && (
          <span className="text-sm text-muted-foreground">
            {currentValue[0]}
          </span>
        )}
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onValueChange={setCurrentValue}
        disabled={disabled}
      />
    </div>
  )
}
