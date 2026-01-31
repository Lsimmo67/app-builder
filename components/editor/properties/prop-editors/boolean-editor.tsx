'use client'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface BooleanEditorProps {
  value: boolean
  defaultValue?: boolean
  label?: string
  onChange: (value: boolean) => void
  disabled?: boolean
}

export function BooleanEditor({
  value,
  defaultValue = false,
  label,
  onChange,
  disabled = false,
}: BooleanEditorProps) {
  const currentValue = value ?? defaultValue

  return (
    <div className="flex items-center justify-between">
      {label && (
        <Label className="text-sm text-muted-foreground">{label}</Label>
      )}
      <Switch
        checked={currentValue}
        onCheckedChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}
