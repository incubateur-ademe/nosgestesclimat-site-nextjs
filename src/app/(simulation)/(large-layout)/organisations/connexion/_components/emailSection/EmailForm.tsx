'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useCreateOrganisation } from '@/hooks/organisations/useCreateOrganisation'
import { useLoginOrganisation } from '@/hooks/organisations/useLoginOrganisation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
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

  const { mutateAsync: loginOrganisation } = useLoginOrganisation()

  const { mutateAsync: createOrganisation } = useCreateOrganisation()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setInputError(undefined)

    const input = event.currentTarget.elements.namedItem(
      'email'
    ) as HTMLInputElement

    const email = input.value

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

    // Try and login
    try {
      const { expirationDate } = await loginOrganisation({
        email,
      })

      // Reset the organisation local state
      updateUserOrganisation({
        administratorEmail: email,
        slug: '',
        name: '',
      })

      // We update the expiration date of the code
      updateLoginExpirationDate(expirationDate)
    } catch (error: any) {
      // If not possible, create the organisation
      try {
        const { expirationDate } = await createOrganisation({
          email,
          userId: user.userId,
        })

        // Always reset the organisation local state
        updateUserOrganisation({
          administratorEmail: email,
          slug: '',
          name: '',
        })

        updateLoginExpirationDate(expirationDate)
      } catch (error: any) {
        setInputError(error.response.data.message)
        return
      }
    } finally {
      updateUserOrganisation({ administratorEmail: email })

      if (!user.email) {
        updateEmail(email)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInputGroup
        name="email"
        type="email"
        value={user?.email || user?.organisation?.administratorEmail || ''}
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

      <Button type="submit" className="mt-8">
        <Trans>Accéder à mon espace</Trans>
      </Button>
    </form>
  )
}
