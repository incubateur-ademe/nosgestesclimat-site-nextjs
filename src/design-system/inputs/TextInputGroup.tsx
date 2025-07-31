import type {
  ChangeEventHandler,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from 'react'
import { forwardRef, useId } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { twMerge } from 'tailwind-merge'

type Props = {
  name: string
  label?: string | ReactNode
  type?: string
  isInvalid?: boolean
  error?: string | ReactNode
  successMessage?: ReactNode | string
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
  'data-cypress-id'?: string
  autoComplete?: string
  mention?: string
}

export default forwardRef(function TextInputGroup(
  {
    name,
    label,
    type = 'text',
    error,
    successMessage,
    helperText,
    mention,
    className,
    containerClassName,
    placeholder,
    onChange,
    value,
    required = false,
    disabled,
    debounceTimeout = 100,
    readOnly = false,
    autoComplete = 'off',
    ...props
  }: HTMLAttributes<HTMLInputElement> & Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId()
  const inputId = `input-${id}`
  const helperTextId = `helper-${id}`
  const errorId = `error-${id}`
  const successId = `success-${id}`

  const describedBy = [
    helperText ? helperTextId : undefined,
    error ? errorId : undefined,
    successMessage ? successId : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={twMerge(
        'flex w-full flex-col items-start',
        containerClassName
      )}>
      {label ? (
        <label
          htmlFor={inputId}
          className="flex w-full max-w-[30rem] justify-between text-left">
          <span
            className={twMerge(
              `text-base font-bold text-slate-900`,
              error ? 'text-red-700' : ''
            )}>
            {label}
          </span>
          {mention && (
            <span className="text-base font-bold text-pink-600">{mention}</span>
          )}
        </label>
      ) : null}

      {helperText ? (
        <span
          id={helperTextId}
          className={twMerge(
            'mt-1 text-base text-slate-900',
            error ? 'text-red-700' : ''
          )}>
          {helperText}
        </span>
      ) : null}

      <DebounceInput
        id={inputId}
        inputRef={ref}
        readOnly={readOnly}
        debounceTimeout={debounceTimeout}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange ?? (() => null)}
        aria-describedby={describedBy || undefined}
        value={value}
        required={required}
        aria-disabled={disabled}
        autoComplete={autoComplete}
        data-cypress-id={`${props['data-cypress-id']}`}
        {...props}
        className={twMerge(
          helperText || label ? 'mt-3!' : '',
          `w-full max-w-[30rem] rounded-xl border border-solid border-slate-500 bg-white p-4 text-sm transition-colors placeholder:text-slate-500`,
          error ? 'border-red-200! bg-red-50! ring-2 ring-red-700!' : '',
          disabled ? 'cursor-not-allowed opacity-50' : '',
          readOnly
            ? 'cursor-not-allowed'
            : 'focus:border-primary-700 focus:ring-primary-700 focus:ring-2',
          className
        )}
      />

      {error && (
        <span
          id={errorId}
          role="alert"
          data-testid={`error-${name}`}
          className="mt-2 text-xs text-red-700">
          {error}
        </span>
      )}

      {successMessage && (
        <span
          id={successId}
          role="status"
          className="mt-2 text-xs text-green-700">
          {successMessage}
        </span>
      )}
    </div>
  )
})
