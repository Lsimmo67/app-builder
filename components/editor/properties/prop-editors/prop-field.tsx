'use client'

import { ComponentProp } from '@/types/component'
import { StringEditor } from './string-editor'
import { NumberEditor } from './number-editor'
import { BooleanEditor } from './boolean-editor'
import { SelectEditor } from './select-editor'
import { ColorEditor } from './color-editor'
import { ImageEditor } from './image-editor'
import { RichTextEditor } from './richtext-editor'
import { ArrayEditor } from './array-editor'
import { ObjectEditor } from './object-editor'
import { Badge } from '@/components/ui/badge'
import { HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface PropFieldProps {
  prop: ComponentProp
  value: unknown
  onChange: (value: unknown) => void
  disabled?: boolean
}

export function PropField({ prop, value, onChange, disabled = false }: PropFieldProps) {
  const renderEditor = () => {
    switch (prop.type) {
      case 'string':
      case 'children':
        return (
          <StringEditor
            value={value as string}
            defaultValue={prop.default as string}
            placeholder={prop.description}
            onChange={onChange}
            disabled={disabled}
          />
        )

      case 'number':
        return (
          <NumberEditor
            value={value as number}
            defaultValue={prop.default as number}
            onChange={onChange}
            disabled={disabled}
          />
        )

      case 'boolean':
        return (
          <BooleanEditor
            value={value as boolean}
            defaultValue={prop.default as boolean}
            onChange={onChange}
            disabled={disabled}
          />
        )

      case 'select':
        return (
          <SelectEditor
            value={value as string}
            defaultValue={prop.default as string}
            options={prop.options || []}
            onChange={onChange}
            disabled={disabled}
          />
        )

      case 'color':
        return (
          <ColorEditor
            value={value as string}
            defaultValue={prop.default as string}
            onChange={onChange}
            disabled={disabled}
          />
        )

      case 'image':
        return (
          <ImageEditor
            value={value as string}
            defaultValue={prop.default as string}
            onChange={onChange}
            disabled={disabled}
          />
        )

      case 'richtext':
        return (
          <RichTextEditor
            value={value as string}
            defaultValue={prop.default as string}
            onChange={onChange}
            disabled={disabled}
          />
        )

      case 'array':
        return (
          <ArrayEditor
            value={(value as string[]) || []}
            defaultValue={(prop.default as string[]) || []}
            onChange={onChange}
            disabled={disabled}
          />
        )

      case 'object':
        return (
          <ObjectEditor
            value={value as Record<string, unknown>}
            defaultValue={prop.default as Record<string, unknown>}
            onChange={onChange}
            disabled={disabled}
          />
        )

      default:
        return (
          <StringEditor
            value={String(value ?? '')}
            onChange={(v) => onChange(v)}
            disabled={disabled}
          />
        )
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-foreground">
          {prop.name}
        </label>
        {prop.required && (
          <Badge variant="destructive" className="h-4 px-1 text-[10px]">
            Required
          </Badge>
        )}
        <Badge variant="outline" className="h-4 px-1 text-[10px]">
          {prop.type}
        </Badge>
        {prop.description && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">{prop.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {renderEditor()}
    </div>
  )
}
