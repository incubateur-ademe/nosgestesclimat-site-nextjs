'use client'

import Trans from '@/components/translation/Trans'
import { ORGANISATION_TYPES } from '@/constants/organisations/organisationTypes'
import Select from '@/design-system/inputs/Select'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { OrgaSettingsInputsType } from '@/types/organisations'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

type Props = {
  defaultValues?: OrgaSettingsInputsType
  register: UseFormRegister<OrgaSettingsInputsType>
  errors: FieldErrors
}

export default function OrganisationFields({
  defaultValues,
  register,
  errors,
}: Props) {
  const { t } = useClientTranslation()

  if (!defaultValues) return null

  return (
    <div className="flex flex-col gap-4">
      <TextInputGroup
        label={<Trans>Votre organisation</Trans>}
        value={defaultValues.name}
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
        value={defaultValues.organisationType}
        {...register('organisationType')}>
        <option className="cursor-pointer"></option>
        {Object.entries(ORGANISATION_TYPES).map(([key, value]) => (
          <option className="cursor-pointer" key={key} value={key}>
            {value}
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
        value={defaultValues.numberOfCollaborators}
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
        value={defaultValues.position}
        {...register('position')}
      />{' '}
    </div>
  )
}
