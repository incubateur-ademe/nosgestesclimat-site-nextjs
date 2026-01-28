import { t } from '@/helpers/metadata/fakeMetadataT'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'
import TextInput from './TextInput'

interface Props {
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
    label = t('ui.emailInput.label', 'Votre adresse e-mail'),
    helperText = t(
      'ui.emailInput.helperText',
      'Format attendu : nom.prenom@domaine.fr'
    ),
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
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      error={error}
      value={value}
      title={title}
      {...props}
    />
  )
})
