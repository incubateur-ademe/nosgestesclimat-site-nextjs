'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import Label from '@/design-system/inputs/Label'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Separator from '@/design-system/layout/Separator'
import React from 'react'

export default function CreationForm({
  onSubmit,
  nameError,
  setNameError,
  ownerNameError,
  setOwnerNameError,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  nameError: string | null
  setNameError: React.Dispatch<React.SetStateAction<string | null>>
  ownerNameError: string | null
  setOwnerNameError: React.Dispatch<React.SetStateAction<string | null>>
}) {
  return (
    <form onSubmit={onSubmit} className="items-auto flex flex-col gap-4">
      <TextInputGroup
        name="name"
        label={<Trans>Votre organisation</Trans>}
        error={nameError ?? ''}
        onChange={() => setNameError('')}
      />

      <TextInputGroup
        name="administratorName"
        label={<Trans>Votre prénom</Trans>}
        error={ownerNameError ?? ''}
        onChange={() => setOwnerNameError('')}
      />

      <Separator />

      <TextInputGroup
        name="position"
        label={
          <Label isOptional>
            <Trans>Rôle</Trans>
          </Label>
        }
        className="mb-4"
      />

      <TextInputGroup
        type="telephone"
        name="telephone"
        label={
          <Label isOptional>
            <Trans>Téléphone</Trans>
          </Label>
        }
        className="mb-4"
      />

      <TextInputGroup
        name="expectedNumberOfParticipants"
        type="number"
        label={
          <Label isOptional>
            <Trans>Nombre de participants (estimé)</Trans>
          </Label>
        }
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
              <Trans>(une fois par mois maximum !)</Trans>
            </span>
          }
        />
      </div>

      <Button type="submit" className="mt-12 self-start">
        <Trans>Accéder à mon espace</Trans>
      </Button>
    </form>
  )
}
