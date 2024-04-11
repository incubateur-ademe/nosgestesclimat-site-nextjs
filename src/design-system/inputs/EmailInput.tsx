import { ChangeEvent, ReactNode } from 'react'
import TextInputGroup from './TextInputGroup'

type Props = {
  email: string
  setEmail: (email: string) => void
  error: string
  setError: (error: string) => void
  label?: ReactNode | string
  helperText?: string
  className?: string
  readOnly?: boolean
}

export default function EmailInput({
  email,
  setEmail,
  error,
  setError,
  label,
  helperText,
  className,
  readOnly = false,
  ...props
}: Props) {
  return (
    <TextInputGroup
      label={label}
      helperText={helperText}
      name="email"
      type="email"
      placeholder="jean-marc@nosgestesclimat.fr"
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        if (error) {
          setError('')
        }
      }}
      value={email}
      error={error}
      className={className}
      readOnly={readOnly}
      {...props}
    />
  )
}
