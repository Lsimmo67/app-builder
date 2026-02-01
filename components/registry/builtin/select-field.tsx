'use client'

import { cn } from '@/lib/utils/cn'

interface SelectFieldProps {
  className?: string
  style?: React.CSSProperties
  label?: string
  name?: string
  options?: string[]
  placeholder?: string
  required?: boolean
}

export default function SelectField({
  className,
  style,
  label = 'Select',
  name = 'select',
  options = ['Option 1', 'Option 2', 'Option 3'],
  placeholder = 'Choose an option...',
  required = false,
}: SelectFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)} style={style}>
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        name={name}
        required={required}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
