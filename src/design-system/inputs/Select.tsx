import { ChangeEvent, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  name: string
  label?: string
  error?: string
  helperText?: string
  className?: string
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  value: string | number
  required?: boolean
}

// TODO: This is a bit light
export default function Select({
  children,
  name,
  label,
  error,
  helperText,
  className,
  onChange,
  value,
  required = false,
  ...props
}: PropsWithChildren<Props>) {
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

      <select
        value={value}
        onChange={onChange}
        aria-describedby={`error-${name}`}
        required={required}
        className={twMerge(
          `border-gray-300 ${
            helperText || label ? ' mt-3' : ''
          } max-w-[30rem] rounded-full border-2 border-solid bg-gray-100 p-4 text-sm transition-colors focus:border-primary-700 focus:ring-2 focus:ring-primary-700`,
          `${className} ${
            error ? '!border-red-200 !bg-red-50 ring-2 !ring-red-700' : ''
          }`
        )}
        {...props}>
        {children}
      </select>

      {error && (
        <span id={`error-${name}`} className="mt-2 text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  )
}
