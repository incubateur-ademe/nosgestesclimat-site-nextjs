'use client'

import Trans from '@/components/translation/Trans'
import { ORGANISATION_TYPES } from '@/constants/organisations/organisationTypes'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Organisation } from '@/types/organisations'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

type Values = {
  name: string
  administratorName: string
  hasOptedInForCommunications: boolean
  organisationType: string
  email: string
  position: string
  numberOfCollaborators: number
  administratorTelephone: string
}

type Props = {
  organisation: Organisation | undefined
  register: UseFormRegister<Values>
  errors: FieldErrors
}

export default function OrganisationFields({
  organisation,
  register,
  errors,
}: Props) {
  const { t } = useClientTranslation()

  if (!organisation) return null

  return (
    <div className="flex flex-col gap-4">
      <TextInputGroup
        label={<Trans>Votre organisation</Trans>}
        value={organisation.name}
        {...register('name')}
      />
      <Select
        label={
          <p className="mb-0 flex justify-between">
            <Trans>Type d'organisation</Trans>{' '}
            <span className="font-bold italic text-secondary-700">
              {' '}
              <Trans>facultatif</Trans>
            </span>
          </p>
        }
        value={organisation.organisationType}
        {...register('organisationType')}>
        {ORGANISATION_TYPES.map((type) => (
          <option className="cursor-pointer" key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
      <TextInputGroup
        type="number"
        label={
          <p className="mb-0 flex w-full justify-between">
            <Trans>Nombre de collaborateurs</Trans>{' '}
            <span className="font-bold italic text-secondary-700">
              {' '}
              <Trans>facultatif</Trans>
            </span>
          </p>
        }
        value={organisation.numberOfCollaborators}
        {...register('numberOfCollaborators', {
          min: {
            value: 0,
            message: t('Veuillez entrer un nombre positif.'),
          },
        })}
        error={(errors.numberOfCollaborators?.message as string) || ''}
      />
      <TextInputGroup
        label={
          <p className="mb-0 flex w-full justify-between">
            <Trans>Votre rôle</Trans>{' '}
            <span className="font-bold italic text-secondary-700">
              {' '}
              <Trans>facultatif</Trans>
            </span>
          </p>
        }
        value={organisation.administrators?.[0]?.position}
        {...register('position')}
      />{' '}
    </div>
  )
}
