import Trans from '@/components/translation/Trans'
import { SERVER_URL } from '@/constants/urls'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useUser } from '@/publicodes-state'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function EmailForm({ onComplete }: { onComplete: () => void }) {
  const [inputError, setInputError] = React.useState<string | undefined>()

  const { updateEmail } = useUser()

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

    const input = event.currentTarget.elements.namedItem(
      'email'
    ) as HTMLInputElement

    const email = input.value

    // TODO : Vérifier si l'email est valide

    // TODO : Vérifier si l'email est déjà utilisée

    // Créer un compte organisation
    try {
      await createOrganization({ ownerEmail: email })

      updateEmail(email)
    } catch (error: any) {
      setInputError(error.response.data.message)
      return
    }

    // Stocker l'information dans l'objet utilisateur
    // suivante : date d'envoi du mail de vérification
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInputGroup
        name="email"
        label={<Trans>Votre adresse e-mail</Trans>}
        placeholder="jeanmarc@nosgestesclimat.fr"
        required
        error={inputError}
      />

      <Button type="submit" className="mt-8">
        <Trans>Accéder à mon espace</Trans>
      </Button>
    </form>
  )
}
