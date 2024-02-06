'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useUser } from '@/publicodes-state'
import { Organization } from '@/types/organizations'
import { FormEventHandler } from 'react'
import { useUpdateOrganization } from '../../../../_hooks/useUpdateOrganization'

type Props = {
  organization: Organization
}

export default function InformationsForm({ organization }: Props) {
  const { user } = useUser()

  const { mutateAsync: updateOrganization } = useUpdateOrganization({
    email: user?.email,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    const data = new FormData(document.querySelector('form') ?? undefined)

    const name = data.get('name') as string
    const administratorName = data.get('administratorName') as string
    const hasOptedInForCommunications =
      data.get('hasOptedInForCommunications') === 'on' ? true : false

    const modifications: {
      name?: string
      administratorName?: string
      hasOptedInForCommunications?: boolean
    } = {}

    if (name !== organization?.name) {
      modifications.name = name
    }

    if (administratorName !== organization?.administrators?.[0]?.name) {
      modifications.administratorName = administratorName
    }

    if (
      hasOptedInForCommunications !==
      organization?.administrators?.[0]?.hasOptedInForCommunications
    ) {
      modifications.hasOptedInForCommunications = hasOptedInForCommunications
    }

    await updateOrganization({
      ...modifications,
    })
  }

  return (
    <section className="mb-12 mt-8">
      <h2>
        <Trans>Mes informations</Trans>
      </h2>

      <p>
        <Trans>
          Vous pouvez modifier vos informations personnelles. Le lien du sondage
          de votre organisation ne changera pas.
        </Trans>
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInputGroup
          name="name"
          label={<Trans>Votre organisation</Trans>}
          defaultValue={organization?.name}
        />

        <TextInputGroup
          name="administratorName"
          label={<Trans>Votre prénom</Trans>}
          defaultValue={organization?.administrators?.[0]?.name}
        />

        <TextInputGroup
          name="email"
          disabled
          helperText={<Trans>Ce champ n'est pas modifiable</Trans>}
          label={<Trans>Votre e-mail</Trans>}
          defaultValue={organization?.administrators?.[0]?.email}
        />

        <div className="w-[32rem]">
          <CheckboxInputGroup
            name="hasOptedInForCommunications"
            defaultChecked={
              organization?.administrators?.[0]?.hasOptedInForCommunications
            }
            label={
              <span>
                <strong>
                  <Trans>
                    Recevoir ponctuellement par email les nouveaux services Nos
                    Gestes Climat aux organisations
                  </Trans>
                </strong>{' '}
                <Trans>(une fois par mois maximum !)</Trans>
              </span>
            }
          />
        </div>

        <Button type="submit" className="mt-12 self-start">
          <Trans>Modifier mes informations</Trans>
        </Button>
      </form>
    </section>
  )
}
