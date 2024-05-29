import {
  ChangeEventHandler,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react'
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
  containerClassName?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string | number
  required?: boolean
  maxLength?: number
  disabled?: boolean
  debounceTimeout?: number
  readOnly?: boolean
}

export default forwardRef(function TextInputGroup(
  {
    name,
    label,
    type = 'text',
    error,
    helperText,
    className,
    containerClassName,
    placeholder,
    onChange,
    value,
    required = false,
    disabled,
    debounceTimeout = 100,
    readOnly = false,
    ...props
  }: HTMLAttributes<HTMLInputElement> & Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div
      className={twMerge(
        'flex w-full flex-col items-start',
        containerClassName
      )}
      aria-live="polite">
      {label ? (
        <label htmlFor={name} className="w-full max-w-[30rem]">
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
        inputRef={ref}
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
          `border-grey-300 w-full max-w-[30rem] rounded-xl border-2 border-solid bg-white p-4 text-sm transition-colors read-only:bg-gray-200`,
          error ? '!border-red-200 !bg-red-50 ring-2 !ring-red-700' : '',
          disabled ? 'cursor-not-allowed opacity-50' : '',
          readOnly
            ? 'cursor-not-allowed'
            : 'focus:border-primary-700 focus:ring-2 focus:ring-primary-700',
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
})
