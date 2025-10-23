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

export const defaultInputStyleClassNames = `rounded-md border border-solid border-slate-500 bg-white transition-colors placeholder:text-slate-500`

type Props = {
  name: string
  label?: string | ReactNode
  type?: string
  isInvalid?: boolean
  error?: string | ReactNode
  successMessage?: ReactNode | string
  helperText?: string | ReactNode
  srOnlyHelperText?: string | ReactNode
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
  shouldUseDebounce?: boolean
}

export default forwardRef(function TextInput(
  {
    name,
    label,
    type = 'text',
    error,
    successMessage,
    helperText,
    srOnlyHelperText,
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
    shouldUseDebounce = true,
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
      error={error}
      helperText={helperText}
      srOnlyHelperText={srOnlyHelperText}
      containerClassName={containerClassName}
      required={required}
      disabled={disabled}
      mention={mention}>
      {shouldUseDebounce ? (
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
            'w-full max-w-[30rem] p-4 text-base',
            defaultInputStyleClassNames,
            error ? 'border-red-200! bg-red-50! ring-2 ring-red-700!' : '',
            disabled ? 'cursor-not-allowed opacity-50' : '',
            readOnly
              ? 'cursor-not-allowed'
              : 'focus:ring-primary-700 focus:ring-2 focus:ring-offset-3 focus:outline-hidden',
            className
          )}
        />
      ) : (
        <input
          ref={ref}
          id={inputId}
          readOnly={readOnly}
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
            'w-full max-w-[30rem] p-4 text-base',
            defaultInputStyleClassNames,
            error ? 'border-red-200! bg-red-50! ring-2 ring-red-700!' : '',
            disabled ? 'cursor-not-allowed opacity-50' : '',
            readOnly
              ? 'cursor-not-allowed'
              : 'focus:ring-primary-700 focus:ring-2 focus:ring-offset-3 focus:outline-hidden',
            className
          )}
        />
      )}
    </InputGroup>
  )
})
