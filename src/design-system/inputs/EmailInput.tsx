import { ChangeEvent, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import TextInputGroup from './TextInputGroup'

type Props = {
  email: string
  setEmail: (email: string) => void
  error: string
  setError: (error: string) => void
  label?: ReactNode | string
  helperText?: string
}

export default function EmailInput({
  email,
  setEmail,
  error,
  setError,
  label,
  helperText,
  ...props
}: Props) {
  const { t } = useTranslation()

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
      {...props}
    />
  )
}
