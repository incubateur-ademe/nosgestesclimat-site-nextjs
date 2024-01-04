'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Separator from '@/design-system/layout/Separator'
import React from 'react'

export default function CreationForm({
  onSubmit,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit}>
      <TextInputGroup
        name="name"
        label={<Trans>Votre organisation</Trans>}
        required
        className="mb-4"
      />

      <TextInputGroup
        name="ownerName"
        label={<Trans>Votre prénom</Trans>}
        required
        className="mb-4"
      />

      <Separator />

      <TextInputGroup
        name="position"
        label={<Trans>Votre rôle</Trans>}
        className="mb-4"
      />

      <TextInputGroup
        type="telephone"
        name="telephone"
        label={<Trans>Téléphone</Trans>}
        className="mb-4"
      />

      <TextInputGroup
        name="numberOfParticipants"
        type="number"
        label={<Trans>Nombre de participants (estimé)</Trans>}
        className="mb-4"
      />

      <Separator />

      <div className="w-[32rem]">
        <CheckboxInputGroup
          name="hasOptedInForCommunications"
          label={
            <span>
              <strong>
                <Trans>
                  Recevoir ponctuellement par email les nouveaux services Nos
                  Gestes Climat aux organisations
                </Trans>
              </strong>{' '}
              (une fois par mois maximum !)
            </span>
          }
        />
      </div>

      <Button type="submit" className="mt-12">
        <Trans>Accéder à mon espace</Trans>
      </Button>
    </form>
  )
}
