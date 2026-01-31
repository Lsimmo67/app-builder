'use client'

import { useState, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'

interface ObjectEditorProps {
  value: Record<string, unknown> | undefined
  defaultValue?: Record<string, unknown>
  onChange: (value: unknown) => void
  disabled?: boolean
}

export function ObjectEditor({ value, defaultValue, onChange, disabled }: ObjectEditorProps) {
  const [jsonText, setJsonText] = useState(
    JSON.stringify(value ?? defaultValue ?? {}, null, 2)
  )
  const [error, setError] = useState<string | null>(null)

  const handleChange = useCallback(
    (text: string) => {
      setJsonText(text)
      try {
        const parsed = JSON.parse(text)
        setError(null)
        onChange(parsed)
      } catch (e) {
        setError((e as Error).message)
      }
    },
    [onChange]
  )

  return (
    <div className="space-y-1">
      <textarea
        value={jsonText}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] resize-y"
        placeholder="{}"
      />
      {error && (
        <Badge variant="destructive" className="text-[10px]">
          Invalid JSON
        </Badge>
      )}
    </div>
  )
}
