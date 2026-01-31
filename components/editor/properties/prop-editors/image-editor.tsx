'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RotateCcw, Upload, ExternalLink, X, Image as ImageIcon } from 'lucide-react'
import { useDebouncedCallback } from '@/hooks/use-debounce'

interface ImageEditorProps {
  value: string
  defaultValue?: string
  placeholder?: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function ImageEditor({
  value,
  defaultValue = '',
  placeholder = 'https://...',
  onChange,
  disabled = false,
}: ImageEditorProps) {
  const [localValue, setLocalValue] = useState(value || '')
  const [previewError, setPreviewError] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    setLocalValue(value || '')
    setPreviewError(false)
  }, [value])

  const debouncedOnChange = useDebouncedCallback((newValue: string) => {
    onChange(newValue)
  }, 500)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setLocalValue(newValue)
      setPreviewError(false)
      debouncedOnChange(newValue)
    },
    [debouncedOnChange]
  )

  const handleReset = useCallback(() => {
    setLocalValue(defaultValue)
    setPreviewError(false)
    onChange(defaultValue)
  }, [defaultValue, onChange])

  const handleClear = useCallback(() => {
    setLocalValue('')
    setPreviewError(false)
    onChange('')
  }, [onChange])

  const showReset = localValue !== defaultValue && defaultValue !== ''
  const hasValue = localValue.length > 0
  const isValidUrl = hasValue && (localValue.startsWith('http://') || localValue.startsWith('https://') || localValue.startsWith('/'))

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        <Input
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="h-8 text-sm"
        />
        {hasValue && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleClear}
            title="Clear"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        {showReset && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleReset}
            title="Reset to default"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-7 text-xs"
          disabled={disabled}
          onClick={() => {
            // Placeholder for upload functionality
            // In a real app, this would open a file picker
            console.log('Upload clicked')
          }}
        >
          <Upload className="h-3 w-3 mr-1" />
          Upload
        </Button>
        {isValidUrl && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setShowPreview(!showPreview)}
            >
              <ImageIcon className="h-3 w-3 mr-1" />
              {showPreview ? 'Hide' : 'Preview'}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => window.open(localValue, '_blank')}
              title="Open in new tab"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>

      {showPreview && isValidUrl && !previewError && (
        <div className="relative rounded border overflow-hidden bg-muted">
          <img
            src={localValue}
            alt="Preview"
            className="w-full h-32 object-contain"
            onError={() => setPreviewError(true)}
          />
        </div>
      )}

      {previewError && (
        <div className="text-xs text-destructive">
          Failed to load image preview
        </div>
      )}
    </div>
  )
}
