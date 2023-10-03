type ValidateFormProps = {
  prenom: string
  setErrorPrenom: (error: string) => void
  email: string
  setErrorEmail: (error: string) => void
  t: (key: string) => string
}

export const validateForm = ({
  prenom,
  setErrorPrenom,
  email,
  setErrorEmail,
  t,
}: ValidateFormProps) => {
  // Inputs validation
  if (!prenom) {
    setErrorPrenom(t('Veuillez renseigner un prénom ou un pseudonyme.'))
    return false
  }
  if (
    email &&
    !email.match(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    setErrorEmail(t('Veuillez renseigner un email valide.'))
    return false
  }

  return true
}
