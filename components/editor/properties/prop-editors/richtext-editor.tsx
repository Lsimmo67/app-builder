'use client'

import { useState, useEffect, useCallback } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RotateCcw, Bold, Italic, Underline } from 'lucide-react'
import { useDebouncedCallback } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  value: string
  defaultValue?: string
  placeholder?: string
  onChange: (value: string) => void
  disabled?: boolean
  rows?: number
}

export function RichTextEditor({
  value,
  defaultValue = '',
  placeholder = 'Enter text...',
  onChange,
  disabled = false,
  rows = 4,
}: RichTextEditorProps) {
  const [localValue, setLocalValue] = useState(value || '')
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null)

  useEffect(() => {
    setLocalValue(value || '')
  }, [value])

  const debouncedOnChange = useDebouncedCallback((newValue: string) => {
    onChange(newValue)
  }, 300)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      setLocalValue(newValue)
      debouncedOnChange(newValue)
    },
    [debouncedOnChange]
  )

  const handleReset = useCallback(() => {
    setLocalValue(defaultValue)
    onChange(defaultValue)
  }, [defaultValue, onChange])

  const wrapSelection = useCallback(
    (wrapper: string, endWrapper?: string) => {
      const textarea = document.querySelector('textarea[data-richtext]') as HTMLTextAreaElement
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = localValue.substring(start, end)
      const endWrap = endWrapper || wrapper

      if (selectedText.length === 0) return

      const newValue =
        localValue.substring(0, start) +
        wrapper +
        selectedText +
        endWrap +
        localValue.substring(end)

      setLocalValue(newValue)
      onChange(newValue)

      // Restore selection
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(
          start + wrapper.length,
          end + wrapper.length
        )
      }, 0)
    },
    [localValue, onChange]
  )

  const showReset = localValue !== defaultValue && defaultValue !== undefined

  return (
    <div className="space-y-2">
      <div className="flex gap-1 border-b pb-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => wrapSelection('**')}
          disabled={disabled}
          title="Bold (Markdown)"
        >
          <Bold className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => wrapSelection('*')}
          disabled={disabled}
          title="Italic (Markdown)"
        >
          <Italic className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => wrapSelection('<u>', '</u>')}
          disabled={disabled}
          title="Underline (HTML)"
        >
          <Underline className="h-3 w-3" />
        </Button>
        <div className="flex-1" />
        {showReset && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleReset}
            title="Reset to default"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        )}
      </div>
      <Textarea
        data-richtext
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className="text-sm resize-none"
      />
      <div className="text-xs text-muted-foreground">
        Supports Markdown: **bold**, *italic*, `code`
      </div>
    </div>
  )
}
