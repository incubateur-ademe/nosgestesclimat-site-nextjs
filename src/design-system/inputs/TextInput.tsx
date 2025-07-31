import type {
  ChangeEventHandler,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
} from 'react'
import { forwardRef, useId } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { twMerge } from 'tailwind-merge'
import InputGroup from './InputGroup'

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

export default forwardRef(function TextInput(
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

  return (
    <InputGroup
      name={name}
      label={label}
      error={typeof error === 'string' ? error : undefined}
      helperText={typeof helperText === 'string' ? helperText : undefined}
      containerClassName={containerClassName}
      required={required}
      disabled={disabled}
      mention={mention}>
      <DebounceInput
        id={inputId}
        inputRef={ref}
        readOnly={readOnly}
        debounceTimeout={debounceTimeout}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange ?? (() => null)}
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
    </InputGroup>
  )
})
