'use client'

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
        label={<NGCTrans>Votre organisation</NGCTrans>}
        error={nameError ?? ''}
        onChange={() => setNameError('')}
      />

      <TextInputGroup
        name="administratorName"
        label={<NGCTrans>Votre prénom</NGCTrans>}
        error={ownerNameError ?? ''}
        onChange={() => setOwnerNameError('')}
      />

      <Separator />

      <TextInputGroup
        name="position"
        label={
          <Label isOptional>
            <NGCTrans>Rôle</NGCTrans>
          </Label>
        }
        className="mb-4"
      />

      <TextInputGroup
        type="telephone"
        name="telephone"
        label={
          <Label isOptional>
            <NGCTrans>Téléphone</NGCTrans>
          </Label>
        }
        className="mb-4"
      />

      <TextInputGroup
        name="expectedNumberOfParticipants"
        type="number"
        label={
          <Label isOptional>
            <NGCTrans>Nombre de participants (estimé)</NGCTrans>
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
                <NGCTrans>
                  Recevoir ponctuellement par email les nouveaux services Nos
                  Gestes Climat aux organisations
                </NGCTrans>
              </strong>{' '}
              <NGCTrans>(une fois par mois maximum !)</NGCTrans>
            </span>
          }
        />
      </div>

      <Button type="submit" className="mt-12 self-start">
        <NGCTrans>Accéder à mon espace</NGCTrans>
      </Button>
    </form>
  )
}
