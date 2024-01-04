import Trans from '@/components/translation/Trans'
import { SERVER_URL } from '@/constants/urls'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useUser } from '@/publicodes-state'
import { getIsValidEmail } from '@/utils/getIsValidEmail'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function EmailForm({ onComplete }: { onComplete: () => void }) {
  const [inputError, setInputError] = React.useState<string | undefined>()

  const { user, updateEmail, updateLoginExpirationDate } = useUser()

  const { mutateAsync: loginOrganization } = useMutation({
    mutationFn: ({ ownerEmail }: { ownerEmail: string }) =>
      axios
        .post(`${SERVER_URL}/organizations`, {
          ownerEmail,
        })
        .then((response) => response.data),
  })

  const { mutateAsync: createOrganization } = useMutation({
    mutationFn: ({ ownerEmail }: { ownerEmail: string }) =>
      axios
        .post(`${SERVER_URL}/organizations/create`, {
          ownerEmail,
        })
        .then((response) => response.data),
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setInputError(undefined)

    const input = event.currentTarget.elements.namedItem(
      'email'
    ) as HTMLInputElement

    const email = input.value

    // TODO : Vérifier si l'email est valide
    if (!email || !getIsValidEmail(email)) {
      setInputError('L’adresse e-mail est invalide')
      return
    }

    // Try and login
    try {
      const { expirationDate } = await loginOrganization({ ownerEmail: email })

      // We update the email in the user state
      // along with the expiration date of the code
      updateEmail(email)
      updateLoginExpirationDate(expirationDate)
      onComplete()
    } catch (error: any) {
      // If not possible, create the organization
      try {
        const { expirationDate } = await createOrganization({
          ownerEmail: email,
        })

        updateEmail(email)
        updateLoginExpirationDate(expirationDate)
        onComplete()
      } catch (error: any) {
        setInputError(error.response.data.message)
        return
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInputGroup
        name="email"
        label={<Trans>Votre adresse e-mail</Trans>}
        placeholder="jeanmarc@nosgestesclimat.fr"
        required
        error={inputError}
        defaultValue={user?.email}
      />

      {inputError && <p className="mt-2 text-sm text-red-600">{inputError}</p>}

      <Button type="submit" className="mt-8">
        <Trans>Accéder à mon espace</Trans>
      </Button>
    </form>
  )
}
