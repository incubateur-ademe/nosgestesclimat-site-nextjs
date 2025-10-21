import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import TextInput from './TextInput'

type Props = {
  label?: ReactNode | string
  helperText?: string
  className?: string
  readOnly?: boolean
  error?: string
  value?: string
  title?: string
}

export default forwardRef(function EmailInput(
  {
    label,
    helperText,
    className,
    readOnly = false,
    error,
    value,
    title,
    ...props
  }: Props,
  ref
) {
  return (
    <TextInput
      label={label}
      helperText={helperText}
      name="email"
      type="email"
      autoComplete="email"
      placeholder="nom@exemple.fr"
      className={className}
      readOnly={readOnly}
      ref={ref as any}
      error={error}
      value={value}
      title={title}
      {...props}
    />
  )
})
