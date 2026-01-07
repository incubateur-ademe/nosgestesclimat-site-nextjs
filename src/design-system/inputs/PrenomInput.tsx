import { useClientTranslation } from '@/hooks/useClientTranslation'
import { forwardRef } from 'react'
import TextInput from './TextInput'

interface Props {
  error?: string
  value?: string
}

export default forwardRef(function PrenomInput(
  { error, value, ...props }: Props,
  ref
) {
  const { t } = useClientTranslation()

  return (
    <TextInput
      label={t('Votre prénom (ou pseudo) dans le groupe')}
      autoComplete="given-name"
      helperText={t(
        'Il sera visible uniquement par les participants du groupe'
      )}
      value={value}
      name="prenom"
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      error={error}
      {...props}
    />
  )
})
