'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCreateVerificationCode } from '@/hooks/verification-codes/useCreateVerificationCode'
import { useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'
import { isEmailValid } from '@/utils/isEmailValid'
import React from 'react'

export default function EmailForm() {
  const [inputError, setInputError] = React.useState<string | undefined>()

  const { t } = useClientTranslation()

  const {
    updateLoginExpirationDate,
    updateUserOrganisation,
    user,
    updateEmail,
  } = useUser()

  const { mutateAsync: createVerificationCode } = useCreateVerificationCode()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setInputError(undefined)

    const input = event.currentTarget.elements.namedItem(
      'email'
    ) as HTMLInputElement

    const email = formatEmail(input.value)

    // Validation
    if (!email || !isEmailValid(email)) {
      if (!email) {
        setInputError(t('Vous devez renseigner votre adresse e-mail'))
      }
      if (email && !isEmailValid(email)) {
        setInputError(t('L’adresse e-mail est invalide'))
      }

      return
    }

    const { expirationDate } = await createVerificationCode({
      email,
      userId: user.userId,
    })

    // Reset the organisation local state
    updateUserOrganisation({
      administratorEmail: email,
      slug: '',
      name: '',
    })

    // We update the expiration date of the code
    updateLoginExpirationDate(expirationDate)
    updateUserOrganisation({ administratorEmail: email })

    if (!user.email) {
      updateEmail(email)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInputGroup
        name="email"
        type="email"
        data-cypress-id="organisation-connexion-email-input"
        value={user?.organisation?.administratorEmail || user?.email || ''}
        label={<Trans>Votre adresse e-mail</Trans>}
        placeholder="jeanmarc@nosgestesclimat.fr"
        helperText={
          <Trans>
            Nous pourrons vous contacter en cas de problème lors de votre
            inscription
          </Trans>
        }
        required
        error={inputError}
      />

      {inputError && <p className="mt-2 text-sm text-red-600">{inputError}</p>}

      <Button
        type="submit"
        data-cypress-id="organisation-connexion-submit-button"
        className="mt-8">
        <Trans>Accéder à mon espace</Trans>
      </Button>
    </form>
  )
}
