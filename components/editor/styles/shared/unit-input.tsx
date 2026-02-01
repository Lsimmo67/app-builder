'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const UNITS = ['px', '%', 'rem', 'em', 'vw', 'vh', 'auto', 'none'] as const
type CSSUnit = typeof UNITS[number]

interface UnitInputProps {
  value: string | undefined
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  showUnit?: boolean
  min?: number
  max?: number
  step?: number
  label?: string
}

function parseValueAndUnit(raw: string | undefined): { num: string; unit: CSSUnit } {
  if (!raw || raw === 'auto' || raw === 'none') return { num: '', unit: (raw as CSSUnit) || 'px' }
  const match = raw.match(/^(-?[\d.]+)\s*(px|%|rem|em|vw|vh)?$/)
  if (match) {
    return { num: match[1], unit: (match[2] as CSSUnit) || 'px' }
  }
  return { num: raw, unit: 'px' }
}

export function UnitInput({
  value,
  onChange,
  placeholder = '0',
  disabled = false,
  className,
  showUnit = true,
  min,
  max,
  step = 1,
  label,
}: UnitInputProps) {
  const { num, unit } = parseValueAndUnit(value)
  const [localNum, setLocalNum] = useState(num)
  const [currentUnit, setCurrentUnit] = useState<CSSUnit>(unit)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const parsed = parseValueAndUnit(value)
    setLocalNum(parsed.num)
    setCurrentUnit(parsed.unit)
  }, [value])

  const emitValue = useCallback(
    (n: string, u: CSSUnit) => {
      if (u === 'auto' || u === 'none') {
        onChange(u)
      } else if (!n || n === '') {
        onChange('')
      } else {
        onChange(`${n}${u}`)
      }
    },
    [onChange]
  )

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setLocalNum(v)
    emitValue(v, currentUnit)
  }

  const handleUnitCycle = () => {
    if (disabled) return
    const valueUnits: CSSUnit[] = ['px', '%', 'rem', 'em', 'vw', 'vh']
    const idx = valueUnits.indexOf(currentUnit)
    const next = valueUnits[(idx + 1) % valueUnits.length]
    setCurrentUnit(next)
    emitValue(localNum, next)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const current = parseFloat(localNum) || 0
      const mult = e.shiftKey ? 10 : 1
      const delta = e.key === 'ArrowUp' ? step * mult : -step * mult
      let next = current + delta
      if (min !== undefined) next = Math.max(min, next)
      if (max !== undefined) next = Math.min(max, next)
      const str = Number.isInteger(next) ? String(next) : next.toFixed(1)
      setLocalNum(str)
      emitValue(str, currentUnit)
    }
  }

  return (
    <div className={cn('flex items-center gap-0', className)}>
      {label && (
        <span className="text-[10px] text-muted-foreground w-6 shrink-0">{label}</span>
      )}
      <div className="relative flex-1">
        <Input
          ref={inputRef}
          value={localNum}
          onChange={handleNumChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="h-7 text-xs pr-8 font-mono"
        />
        {showUnit && (
          <button
            type="button"
            onClick={handleUnitCycle}
            disabled={disabled}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-medium text-muted-foreground hover:text-foreground bg-muted px-1 py-0.5 rounded cursor-pointer disabled:cursor-not-allowed"
          >
            {currentUnit}
          </button>
        )}
      </div>
    </div>
  )
}
