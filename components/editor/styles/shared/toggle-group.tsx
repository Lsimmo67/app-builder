'use client'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ToggleOption<T extends string> {
  value: T
  icon?: React.ReactNode
  label: string
}

interface ToggleGroupProps<T extends string> {
  value: T | undefined
  onChange: (value: T) => void
  options: ToggleOption<T>[]
  disabled?: boolean
  allowDeselect?: boolean
}

export function ToggleGroup<T extends string>({
  value,
  onChange,
  options,
  disabled = false,
  allowDeselect = true,
}: ToggleGroupProps<T>) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex gap-0.5 bg-muted/50 rounded-md p-0.5">
        {options.map((option) => {
          const isActive = value === option.value
          return (
            <Tooltip key={option.value}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  disabled={disabled}
                  className={cn(
                    'flex items-center justify-center h-6 min-w-[28px] px-1.5 rounded text-xs transition-all',
                    isActive
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  onClick={() => {
                    if (isActive && allowDeselect) {
                      onChange('' as T)
                    } else {
                      onChange(option.value)
                    }
                  }}
                >
                  {option.icon || option.label}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {option.label}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
