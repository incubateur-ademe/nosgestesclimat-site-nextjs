import {
  ChangeEvent,
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  name: string
  label?: string | ReactNode
  error?: string
  helperText?: string
  className?: string
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  value?: string | number
  required?: boolean
}

// TODO: This is a bit light
export default forwardRef(function Select(
  {
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
  }: PropsWithChildren<Props>,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <div className={`flex flex-col ${className}`} aria-live="polite">
      <label
        htmlFor={name}
        className={`max-w-[30rem] text-sm font-bold text-slate-900 ${
          error ? '!text-red-700' : ''
        }`}>
        {label}
      </label>

      {helperText && (
        <span className="mt-1 max-w-[30rem] text-xs text-slate-500">
          {helperText}
        </span>
      )}

      <select
        name={name}
        ref={ref}
        value={value}
        onChange={onChange ?? (() => {})}
        aria-describedby={`error-${name}`}
        required={required}
        className={twMerge(
          'max-w-[30rem] !cursor-pointer rounded-xl border-2 border-solid border-gray-300 bg-gray-100 p-4 text-sm transition-colors focus:border-primary-700 focus:ring-2 focus:ring-primary-700',
          `${className} ${helperText || label ? ' mt-3' : ''} ${
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
})
