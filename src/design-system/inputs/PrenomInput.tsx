import { useClientTranslation } from '@/hooks/useClientTranslation'
import { ChangeEvent } from 'react'
import TextInputGroup from './TextInputGroup'

type Props = {
  prenom: string
  setPrenom: (prenom: string) => void
  errorPrenom: string
  setErrorPrenom: (errorPrenom: string) => void
}

export default function PrenomInput({
  prenom,
  setPrenom,
  errorPrenom,
  setErrorPrenom,
  ...props
}: Props) {
  const { t } = useClientTranslation()

  return (
    <TextInputGroup
      label={t('Votre prénom (ou pseudo)')}
      helperText={t(
        'Il sera visible uniquement par les participants du groupe'
      )}
      name="prenom"
      placeholder="Jean-Marc"
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setPrenom(e.target.value)
        if (errorPrenom) {
          setErrorPrenom('')
        }
      }}
      error={errorPrenom}
      value={prenom}
      {...props}
    />
  )
}
