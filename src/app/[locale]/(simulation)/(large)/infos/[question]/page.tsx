'use client'

import Trans from '@/components/translation/trans/TransClient'
import TextInput from '@/design-system/inputs/TextInput'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'

import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useSaveAndGoNext } from '@/hooks/organisations/useSaveAndGoNext'
import { useCurrentSimulation } from '@/publicodes-state'
import { useParams } from 'next/navigation'
import { useForm as useReactHookForm } from 'react-hook-form'
import Navigation from '../_components/Navigation'

interface Inputs {
  'custom-answer': string
}

export default function CustomQuestion() {
  const { register, handleSubmit } = useReactHookForm<Inputs>()

  const params = useParams<{ question: string }>()

  const customQuestionIndex = parseInt(params.question.slice(-1))

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const currentSimulation = useCurrentSimulation()

  const { updateCurrentSimulation, customAdditionalQuestionsAnswers } =
    currentSimulation || {}

  const { data: poll, isLoading, isError } = useFetchPublicPoll()

  const customAdditionalQuestions = poll?.customAdditionalQuestions ?? []

  const customQuestion =
    customAdditionalQuestions[customQuestionIndex - 1].question

  // Handles saving the simulation current state and redirecting to next step
  const { setShouldSaveAndGoNext, errorSaveSimulation } = useSaveAndGoNext({
    curPage: params.question,
  })

  function onSubmit({ 'custom-answer': customAnswer }: Inputs) {
    updateCurrentSimulation({
      customAdditionalQuestionsAnswers: {
        ...customAdditionalQuestionsAnswers,
        [customQuestion]: customAnswer,
      },
    })

    setShouldSaveAndGoNext(true)
  }

  if (!customAdditionalQuestions?.length || isError) {
    return <DefaultErrorAlert />
  }

  if (isLoading) {
    return <BlockSkeleton />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title
        data-cypress-id="tutoriel-title"
        className="text-lg md:text-2xl"
        title={
          <span>
            <Trans>Question personnalisée de</Trans> 
            <strong className="text-secondary-700">
              {poll?.organisation?.name}
            </strong>
          </span>
        }
      />

      {poll && (
        <>
          <TextInput label={customQuestion} {...register('custom-answer')} />

          {errorSaveSimulation && <DefaultSubmitErrorMessage />}

          <Navigation
            linkToPrev={getLinkToPrevInfosPage({
              curPage: params.question,
            })}
            submitDisabled={
              !getLinkToNextInfosPage({ curPage: params.question })
            }
            currentPage={params.question}
          />
        </>
      )}
    </form>
  )
}
