import { ChangeEventHandler, HTMLAttributes, ReactNode } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { twMerge } from 'tailwind-merge'

type Props = {
  name: string
  label?: string | ReactNode
  type?: string
  isInvalid?: boolean
  error?: string
  helperText?: string | ReactNode
  className?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string | number
  required?: boolean
  maxLength?: number
  disabled?: boolean
  debounceTimeout?: number
  readOnly?: boolean
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
  disabled,
  debounceTimeout = 100,
  readOnly = false,
  ...props
}: HTMLAttributes<HTMLInputElement> & Props) {
  return (
    <div className="flex flex-col" aria-live="polite">
      {label ? (
        <label htmlFor={name} className="max-w-[30rem]">
          <span
            className={` text-sm font-bold text-slate-900 ${
              error ? '!text-red-700' : ''
            }`}>
            {label}
          </span>
        </label>
      ) : null}

      {helperText ? (
        <span className="mt-1 text-xs text-slate-500">{helperText}</span>
      ) : null}

      <DebounceInput
        readOnly={readOnly}
        debounceTimeout={debounceTimeout}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange ?? (() => null)}
        aria-describedby={`error-${name}`}
        value={value}
        required={required}
        aria-disabled={disabled}
        {...props}
        className={twMerge(
          helperText || label ? ' !mt-3' : '',
          `border-grey-300 max-w-[30rem] rounded-md border border-solid bg-grey-100 p-4 text-sm transition-colors read-only:bg-grey-200`,
          error ? '!border-red-200 !bg-red-50 ring-2 !ring-red-700' : '',
          disabled ? 'cursor-not-allowed opacity-50' : '',
          readOnly
            ? 'cursor-not-allowed'
            : 'focus:border-primary-500 focus:ring-2 focus:ring-primary-500',
          className
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
