import { ChangeEvent, HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  name: string
  label?: string | ReactNode
  type?: string
  isInvalid?: boolean
  error?: string
  helperText?: string
  className?: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string | number
  required?: boolean
}

export default function TextInputGroup({
  name,
  label,
  type = 'text',
  error,
  helperText,
  className,
  placeholder,
  onChange,
  value,
  required = false,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  return (
    <div className={`flex flex-col ${className}`} aria-live="polite">
      <label htmlFor={name}>
        <span
          className={`text-sm font-bold text-slate-900 ${
            error ? '!text-red-700' : ''
          }`}>
          {label}
        </span>
      </label>
      {helperText && (
        <span className="mt-1 text-xs text-slate-500">{helperText}</span>
      )}

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        aria-describedby={`error-${name}`}
        value={value}
        required={required}
        {...props}
        className={twMerge(
          `border-grey-300 ${
            helperText || label ? ' mt-3' : ''
          } max-w-[30rem] rounded-md border border-solid bg-grey-100 p-4 text-base transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500`,
          `${className} ${
            error ? '!border-red-200 !bg-red-50 ring-2 !ring-red-700' : ''
          }`
        )}
      />

      {error && (
        <span id={`error-${name}`} className="mt-2 text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  )
}
