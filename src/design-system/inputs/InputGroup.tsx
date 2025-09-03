import type { ReactNode } from 'react'
import { useId } from 'react'
import { twMerge } from 'tailwind-merge'

type InputGroupProps = {
  name: string
  label?: string | ReactNode
  error?: string | ReactNode
  helperText?: string | ReactNode
  containerClassName?: string
  labelClassName?: string
  required?: boolean
  disabled?: boolean
  mention?: string
  children: ReactNode
}

export default function InputGroup({
  name,
  label,
  error,
  helperText,
  containerClassName,
  labelClassName,
  required = false,
  disabled,
  mention,
  children,
}: InputGroupProps) {
  const id = useId()
  const fieldId = `field-${id}`
  const helperTextId = `helper-${id}`
  const errorId = `error-${id}`

  const describedBy = [
    helperText ? helperTextId : undefined,
    error ? errorId : undefined,
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
          htmlFor={fieldId}
          className="mb-2 flex w-full max-w-[30rem] justify-between text-left">
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
            '-mt-1 mb-2 text-base text-slate-900',
            error ? 'text-red-700' : ''
          )}>
          {helperText}
        </span>
      ) : null}

      {children}

      {error && (
        <span
          id={errorId}
          role="alert"
          data-testid={`error-${name}`}
          className="mt-2 text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  )
}

export type { InputGroupProps }
