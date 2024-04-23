import { ChangeEvent, ReactNode } from 'react'

type Props = {
  name: string
  label: string | ReactNode
  isInvalid?: boolean
  error?: string
  helperText?: string
  className?: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  required?: boolean
}

export default function TextAreaInputGroup({
  name,
  label,
  error,
  helperText,
  className,
  placeholder,
  onChange,
  value,
  required = false,
  ...props
}: Props) {
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
      <textarea
        name={name}
        placeholder={placeholder}
        className={`mt-3 max-w-[30rem] rounded-md border-2 border-solid border-gray-200 bg-gray-100 !p-4 text-sm transition-colors focus:border-primary-700 focus:ring-2 focus:ring-primary-700 ${
          error ? '!border-red-200 !bg-red-50 ring-2 !ring-red-700' : ''
        }`}
        onChange={onChange}
        aria-describedby={`error-${name}`}
        value={value}
        required={required}
        {...props}
      />
      {error && (
        <span id={`error-${name}`} className="mt-2 text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  )
}
