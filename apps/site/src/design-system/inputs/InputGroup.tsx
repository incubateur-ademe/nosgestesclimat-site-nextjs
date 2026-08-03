import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import React, { useId } from 'react'

interface InputGroupProps {
  name: string
  label?: string | ReactNode
  error?: string | ReactNode
  helperText?: string | ReactNode
  srOnlyHelperText?: string | ReactNode
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
  srOnlyHelperText,
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
  const srOnlyHelperTextId = `srOnlyHelper-${id}`
  const errorId = `error-${id}`

  const describedBy = [
    helperText ? helperTextId : undefined,
    error ? errorId : undefined,
    srOnlyHelperText ? srOnlyHelperTextId : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={cn(
        'flex w-full flex-col items-start',
        containerClassName
      )}>
      {label ? (
        <Label
          htmlFor={fieldId}
          className={cn(
            'mb-2 flex w-full max-w-[30rem] items-start justify-between text-left leading-normal font-bold',
            labelClassName
          )}>
          <span
            className={cn(
              `w-full text-base text-slate-900`,
              error ? 'text-red-800 dark:text-red-50' : ''
            )}>
            {label}
          </span>
          {mention && (
            <span className="text-base font-bold text-pink-600">{mention}</span>
          )}
        </Label>
      ) : null}

      {srOnlyHelperText ? (
        <span
          id={srOnlyHelperTextId}
          className={cn('sr-only -mt-1 mb-2 text-base text-slate-900')}>
          {srOnlyHelperText}
        </span>
      ) : null}

      {helperText ? (
        <span
          id={helperTextId}
          className={cn(
            '-mt-1 mb-2 text-base text-slate-900',
            error && 'text-red-800 dark:text-red-50'
          )}>
          {helperText}
        </span>
      ) : null}

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            'aria-describedby': describedBy,
            disabled,
            required,
          } as Record<string, unknown>)
        }
        return child
      })}

      {error && (
        <span
          id={errorId}
          role="alert"
          data-testid={`error-${name}`}
          className="mt-2 text-sm text-red-800 dark:text-red-50">
          {error}
        </span>
      )}
    </div>
  )
}
