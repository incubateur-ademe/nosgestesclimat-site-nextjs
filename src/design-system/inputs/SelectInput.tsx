import type {
  ChangeEvent,
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
} from 'react'
import { forwardRef, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import InputGroup from './InputGroup'
import { defaultInputStyleClassNames } from './TextInput'

export default forwardRef(function SelectInput(
  {
    children,
    name,
    label,
    error,
    helperText,
    className,
    containerClassName,
    onChange,
    value,
    required = false,
    disabled,
    mention,
    ...props
  }: PropsWithChildren<{
    name: string
    label?: string | ReactNode
    error?: string
    helperText?: string
    className?: string
    containerClassName?: string
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
    value?: string | number
    required?: boolean
    disabled?: boolean
    mention?: string
  }>,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const id = useId()
  const selectId = `select-${id}`

  return (
    <InputGroup
      name={name}
      label={label}
      error={error}
      helperText={helperText}
      containerClassName={containerClassName}
      required={required}
      disabled={disabled}
      mention={mention}>
      <select
        id={selectId}
        ref={ref}
        name={name}
        value={value}
        onChange={onChange ?? (() => null)}
        required={required}
        aria-disabled={disabled}
        className={twMerge(
          'w-full max-w-[30rem] appearance-none p-4 text-base',
          defaultInputStyleClassNames,
          error ? 'border-red-200! bg-red-50! ring-2 ring-red-700!' : '',
          disabled ? 'cursor-not-allowed opacity-50' : '',
          'focus:ring-primary-700 focus:ring-2 focus:ring-offset-3 focus:outline-hidden',
          className
        )}
        {...props}>
        {children}
      </select>
    </InputGroup>
  )
})
