import QuestionsComplementaires from '@/components/organisations/QuestionsComplementaires'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useCreatePoll } from '@/hooks/polls/useCreatePoll'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Organisation } from '@/types/organisations'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

type Props = {
  organisation: Organisation
}

type Inputs = {
  name: string
}

export default function PollForm({ organisation }: Props) {
  const [pollInfo, setPollInfo] = useState({
    defaultAdditionalQuestions: [] as unknown as [string],
    customAdditionalQuestions: [],
  })
  const [isError, setIsError] = useState(false)

  const router = useRouter()

  const { t } = useClientTranslation()

  const {
    register,
    formState: { errors },
    getValues,
  } = useReactHookForm<Inputs>()

  const { mutateAsync: createPoll } = useCreatePoll()

  async function onSubmit() {
    if (isError) setIsError(false)

    const { name } = getValues()

    try {
      const pollCreated = await createPoll({
        organisationId: organisation?._id ?? '',
        name,
        defaultAdditionalQuestions: pollInfo.defaultAdditionalQuestions,
        customAdditionalQuestions: pollInfo.customAdditionalQuestions,
      })

      if (pollCreated) {
        router.push(
          `/organisations/${organisation?.slug}/campagnes/${pollCreated.slug}`
        )
      }
    } catch (error) {
      setIsError(true)
      captureException(error)
    }
  }

  return (
    <>
      <TextInputGroup
        label={<Trans>Nom de la campagne</Trans>}
        placeholder={t('ex : Campagne 2024, Classe de 6ème A, etc.')}
        {...register('name', {
          required: t('Ce champ est requis'),
        })}
        error={errors.name?.message}
      />

      <QuestionsComplementaires
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

      <Button onClick={onSubmit} className="self-start">
        <Trans>Lancer ma campagne</Trans>
      </Button>
    </>
  )
}
