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
    labelClassName,
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
    labelClassName?: string
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
          defaultInputStyleClassNames,
          'w-full max-w-[30rem] p-4 text-sm',
          error ? 'border-red-200! bg-red-50! ring-2 ring-red-700!' : '',
          disabled ? 'pointer-events-none cursor-not-allowed opacity-50' : '',
          'focus:border-primary-700 focus:ring-primary-700 focus:ring-2',
          className
        )}
        {...props}>
        {children}
      </select>
    </InputGroup>
  )
})
