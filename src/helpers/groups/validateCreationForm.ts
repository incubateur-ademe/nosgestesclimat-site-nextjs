import { getIsValidEmail } from '@/utils/getIsValidEmail'

type ValidateFormProps = {
  administratorName: string
  setErrorAdministratorName: (error: string) => void
  administratorEmail?: string
  setErrorEmail: (error: string) => void
  t: (key: string) => string
}

export const validateCreationForm = ({
  administratorName,
  setErrorAdministratorName,
  administratorEmail,
  setErrorEmail,
  t,
}: ValidateFormProps) => {
  // Inputs validation
  if (!administratorName) {
    setErrorAdministratorName(
      t('Veuillez renseigner un prénom ou un pseudonyme.')
    )
    return false
  }
  if (administratorEmail && !getIsValidEmail(administratorEmail)) {
    setErrorEmail(t('Veuillez renseigner un email valide.'))
    return false
  }

  return true
}
