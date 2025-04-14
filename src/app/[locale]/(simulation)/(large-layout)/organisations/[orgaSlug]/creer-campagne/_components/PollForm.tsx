'use client'

import QuestionsComplementaires from '@/components/organisations/QuestionsComplementaires'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useCreatePoll } from '@/hooks/organisations/polls/useCreatePoll'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { Organisation } from '@/types/organisations'
import { captureException } from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

type Props = {
  organisation: Organisation
}

type Inputs = {
  name: string
  expectedNumberOfParticipants: number
}

export default function PollForm({ organisation }: Props) {
  const [pollInfo, setPollInfo] = useState({
    defaultAdditionalQuestions: [],
    customAdditionalQuestions: [],
  })
  const [isError, setIsError] = useState(false)

  const router = useRouter()

  const { t } = useClientTranslation()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useReactHookForm<Inputs>()

  const { mutateAsync: createPoll } = useCreatePoll(organisation.slug)

  async function onSubmit({ expectedNumberOfParticipants, name }: Inputs) {
    try {
      const pollCreated = await createPoll({
        name,
        defaultAdditionalQuestions: pollInfo.defaultAdditionalQuestions,
        customAdditionalQuestions: pollInfo.customAdditionalQuestions,
        expectedNumberOfParticipants: expectedNumberOfParticipants || undefined,
      })

      if (pollCreated) {
        router.push(
          `/organisations/${organisation.slug}/campagnes/${pollCreated.slug}`
        )
      }
    } catch (error) {
      setIsError(true)
      captureException(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="poll-form">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextInputGroup
            label={<Trans>Nom de la campagne</Trans>}
            placeholder={t('ex : Campagne 2024, Classe de 6ème A, etc.')}
            {...register('name', {
              required: t('Ce champ est requis'),
            })}
            error={errors.name?.message}
            data-cypress-id="poll-name-input"
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
            type="number"
            {...register('expectedNumberOfParticipants', {
              valueAsNumber: true,
              min: {
                value: 1,
                message: t('Le nombre de participants doit être supérieur à 0'),
              },
            })}
            error={errors.expectedNumberOfParticipants?.message}
            data-cypress-id="poll-expected-number-of-participants-input"
          />
        </div>
      </form>

      <QuestionsComplementaires
        organisation={organisation}
        poll={pollInfo}
        description={
          <Trans>
            Vous retrouverez les réponses à ces questions dans l'export des
            réponses à la campagne.
          </Trans>
        }
        onChange={(updates: Record<string, unknown>) =>
          setPollInfo((prevPollInfo) => ({ ...prevPollInfo, ...updates }))
        }
        onChangeCustomQuestions={(updates: Record<string, unknown>) =>
          setPollInfo((prevPollInfo) => ({ ...prevPollInfo, ...updates }))
        }
      />

      {isError && (
        <p className="mt-2 text-red-500">
          <Trans>
            Une erreur s'est produite lors de la création de la campagne.
            Veuillez réessayer.
          </Trans>
        </p>
      )}

      <Button
        type="submit"
        data-cypress-id="poll-create-button"
        form="poll-form"
        className="self-start">
        <Trans>Lancer ma campagne</Trans>
      </Button>
    </>
  )
}
