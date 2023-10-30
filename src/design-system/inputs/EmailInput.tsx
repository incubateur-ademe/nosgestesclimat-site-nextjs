import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import TextInputGroup from './TextInputGroup'

type Props = {
  email: string
  setEmail: (email: string) => void
  errorEmail: string
  setErrorEmail: (errorEmail: string) => void
}

export default function EmailInput({
  email,
  setEmail,
  errorEmail,
  setErrorEmail,
  ...props
}: Props) {
  const { t } = useTranslation()

  return (
    <TextInputGroup
      label={
        <span>
          {t('Votre adresse email')}{' '}
          <span className="italic text-secondary"> {t('facultatif')}</span>
        </span>
      }
      helperText={t(
        'Seulement pour vous permettre de retrouver votre groupe ou de supprimer vos données'
      )}
      name="prenom"
      placeholder="jean-marc@nosgestesclimat.fr"
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        if (errorEmail) {
          setErrorEmail('')
        }
      }}
      value={email}
      error={errorEmail}
      {...props}
    />
  )
}
