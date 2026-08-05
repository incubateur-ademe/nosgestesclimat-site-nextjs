'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import Trans from '@/components/translation/trans/TransClient'
import { linkToGroupCreation } from '@/constants/group'
import {
  ORGANISATION_TYPES,
  OrganisationTypeEnum,
} from '@/constants/organisations/organisationTypes'
import Button from '@/design-system/buttons/Button'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import SelectInput from '@/design-system/inputs/SelectInput'
import TextInput from '@/design-system/inputs/TextInput'
import Separator from '@/design-system/layout/Separator'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useCollectiveTestFlow } from './CollectiveTestProvider'

interface Inputs {
  name: string
  organisationType: OrganisationTypeEnum | ''
  administratorFirstName: string
  administratorLastName: string
  administratorPosition: string
}

type InputErrors = Partial<Record<keyof Inputs, string>>

export default function OrganisationCreationForm() {
  const { t } = useClientTranslation()
  const { state, send } = useCollectiveTestFlow()

  const [formData, setFormData] = useState<Inputs>({
    name: state.orgaDraft?.name ?? '',
    organisationType: state.orgaDraft?.organisationType ?? '',
    administratorFirstName: state.orgaDraft?.administratorFirstName ?? '',
    administratorLastName: state.orgaDraft?.administratorLastName ?? '',
    administratorPosition: state.orgaDraft?.administratorPosition ?? '',
  })
  const [errors, setErrors] = useState<InputErrors>({})

  // Restore the persisted draft once it is hydrated by the provider
  useEffect(() => {
    if (!state.orgaDraft) return

    setFormData((previous) => ({ ...previous, ...state.orgaDraft }))
  }, [state.orgaDraft])

  const isPending = state.submission.status === 'pending'
  const hasSubmissionError = state.submission.status === 'error'

  function updateField<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setFormData((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: InputErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = t('Ce champ est requis')
    }

    if (!formData.organisationType) {
      nextErrors.organisationType = t('Ce champ est requis')
    }

    if (!formData.administratorFirstName.trim()) {
      nextErrors.administratorFirstName = t('Ce champ est requis')
    }

    if (!formData.administratorLastName.trim()) {
      nextErrors.administratorLastName = t('Ce champ est requis')
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    send({
      type: 'ORGA_DRAFT_UPDATED',
      draft: {
        name: formData.name.trim(),
        organisationType: formData.organisationType as OrganisationTypeEnum,
        administratorFirstName: formData.administratorFirstName.trim(),
        administratorLastName: formData.administratorLastName.trim(),
        administratorPosition: formData.administratorPosition.trim(),
      },
    })
    send({ type: 'SUBMISSION_STARTED' })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInput
          className="col-span-1"
          name="name"
          label={<Trans>Votre organisation</Trans>}
          autoComplete="organization"
          data-testid="organisation-name-input"
          error={errors.name}
          value={formData.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField('name', event.target.value)
          }
        />

        <div>
          <SelectInput
            name="organisationType"
            containerClassName="pt-[3px]"
            label={<Trans>Type d'organisation</Trans>}
            data-testid="organisation-type-select"
            error={errors.organisationType}
            value={formData.organisationType}
            onChange={(event) =>
              updateField(
                'organisationType',
                event.target.value as Inputs['organisationType']
              )
            }>
            {Object.entries(ORGANISATION_TYPES).map(([key, value]) => (
              <option className="cursor-pointer" key={key} value={key}>
                {value}
              </option>
            ))}
          </SelectInput>

          {formData.organisationType ===
            OrganisationTypeEnum.groupOfFriends && (
            <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm">
              <p className="mb-2">
                <Trans>
                  Le mode organisation est un mode <strong>100% anonyme</strong>{' '}
                  pour les participants.
                </Trans>
              </p>

              <p className="mb-4">
                <Trans>
                  Avez-vous essayé{' '}
                  <strong>notre fonctionnalité “Groupes d’amis”</strong> ? Elle
                  vous permettra de vous comparer dans un classement : que celui
                  ou celle ayant la plus faible empreinte gagne !
                </Trans>
              </p>
              <ButtonLink href={linkToGroupCreation} size="sm">
                <Trans>Créer un groupe d'amis</Trans>
              </ButtonLink>
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInput
          className="col-span-1"
          name="administratorFirstName"
          label={<Trans>Votre prénom</Trans>}
          autoComplete="given-name"
          data-testid="organisation-administrator-first-name-input"
          error={errors.administratorFirstName}
          value={formData.administratorFirstName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField('administratorFirstName', event.target.value)
          }
        />

        <TextInput
          className="col-span-1"
          name="administratorLastName"
          label={<Trans>Votre nom</Trans>}
          autoComplete="family-name"
          data-testid="organisation-administrator-last-name-input"
          error={errors.administratorLastName}
          value={formData.administratorLastName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField('administratorLastName', event.target.value)
          }
        />

        <TextInput
          className="col-span-1"
          name="administratorPosition"
          autoComplete="organization-title"
          data-testid="organisation-administrator-position-input"
          label={
            <p className="mb-0 flex items-center justify-between">
              <Trans>Votre poste</Trans>
              <span className="text-secondary-700 text-sm italic">
                facultatif
              </span>
            </p>
          }
          value={formData.administratorPosition}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField('administratorPosition', event.target.value)
          }
        />
      </div>

      {hasSubmissionError && <DefaultSubmitErrorMessage className="mt-4" />}

      <div className="mt-8">
        <Button
          loading={isPending}
          type="submit"
          data-testid="create-organisation-button">
          <Trans>Créer mon test collectif</Trans>
        </Button>
      </div>
    </form>
  )
}
