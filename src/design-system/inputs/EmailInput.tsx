import { ReactNode, forwardRef } from 'react'
import TextInputGroup from './TextInputGroup'

type Props = {
  label?: ReactNode | string
  helperText?: string
  className?: string
  readOnly?: boolean
  error?: string
  value?: string
}

export default forwardRef(function EmailInput(
  {
    label,
    helperText,
    className,
    readOnly = false,
    error,
    value,
    ...props
  }: Props,
  ref
) {
  return (
    <TextInputGroup
      label={label}
      helperText={helperText}
      name="email"
      type="email"
      placeholder="jean-marc@nosgestesclimat.fr"
      className={className}
      readOnly={readOnly}
      ref={ref as any}
      error={error}
      value={value}
      {...props}
    />
  )
})
