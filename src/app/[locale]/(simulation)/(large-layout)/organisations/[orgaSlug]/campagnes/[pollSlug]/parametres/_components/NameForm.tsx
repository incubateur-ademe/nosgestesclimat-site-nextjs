'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import type { PollToUpdate } from '@/hooks/organisations/polls/useUpdatePoll'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { OrganisationPoll } from '@/types/organisations'
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useForm as useReactHookForm } from 'react-hook-form'

type Props = {
  nameValue: string
  expectedNumberOfParticipants?: number
  updatePoll: (pollToUpdate: PollToUpdate) => void
  updatePollStatus: string
  refetchPoll: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<OrganisationPoll, Error>>
}

export default function NameForm({
  nameValue,
  expectedNumberOfParticipants,
  updatePoll,
  updatePollStatus,
  refetchPoll,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
  } = useReactHookForm({
    defaultValues: {
      name: nameValue,
      expectedNumberOfParticipants,
    },
  })

  const { t } = useClientTranslation()

  function onSubmit({
    name,
    expectedNumberOfParticipants: newExpectedNumberOfParticipants,
  }: {
    name: string
    expectedNumberOfParticipants?: number
  }) {
    try {
      updatePoll({
        name,
        expectedNumberOfParticipants:
          newExpectedNumberOfParticipants !== undefined
            ? newExpectedNumberOfParticipants
            : // If the expectedNumberOfParticipants is empty, we set it to undefined
              // otherwise reset its value to null
              expectedNumberOfParticipants
              ? null
              : undefined,
      })
      refetchPoll()
    } catch (e) {
      // Error is caught in the parent component
    }
  }

  return (
    <form
      onSubmit={
        isDirty
          ? handleSubmit(onSubmit)
          : (e) => {
              e.preventDefault()
            }
      }>
      <div className="relative grid w-full grid-cols-1 gap-4 pb-4 md:grid-cols-2">
        <TextInputGroup
          containerClassName="max-w-[30rem]"
          label={
            <span className="text-lg font-medium">
              <Trans>Nom de la campagne</Trans>
            </span>
          }
          value={nameValue}
          error={errors.name?.message}
          {...register('name', { required: t('Ce champ est requis') })}
        />
        <TextInputGroup
          label={
            <p className="mb-0 flex w-full justify-between">
              <Trans>Nombre de participants attendus</Trans>
              <span className="text-secondary-700 font-bold italic">
                {' '}
                <Trans>facultatif</Trans>
              </span>
            </p>
          }
          value={expectedNumberOfParticipants}
          type="number"
          {...register('expectedNumberOfParticipants', {
            valueAsNumber: true,
            min: {
              value: 1,
              message: t('Le nombre de participants doit être supérieur à 0'),
            },
          })}
          error={errors.expectedNumberOfParticipants?.message}
        />
      </div>

      <div>
        <Button type="submit" aria-disabled={!isDirty}>
          Enregistrer
        </Button>
      </div>
    </form>
  )
}
