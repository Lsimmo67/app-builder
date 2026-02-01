'use client'

import { cn } from '@/lib/utils/cn'

interface InputFieldProps {
  className?: string
  style?: React.CSSProperties
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date'
  placeholder?: string
  label?: string
  name?: string
  required?: boolean
}

export default function InputField({
  className,
  style,
  type = 'text',
  placeholder = 'Enter text...',
  label = 'Label',
  name = 'field',
  required = false,
}: InputFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)} style={style}>
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}
