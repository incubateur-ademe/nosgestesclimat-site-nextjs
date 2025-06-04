'use client'

import Trans from '@/components/translation/trans/TransClient'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'

import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useCurrentSimulation } from '@/publicodes-state'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'
import Navigation from '../_components/Navigation'

type Inputs = {
  'custom-answer': string
}

export default function CustomQuestion() {
  const { register, handleSubmit } = useReactHookForm<Inputs>()

  const params = useParams()

  const customQuestionIndex = parseInt((params.question as string).slice(-1))

  const router = useRouter()

  const { getLinkToNextInfosPage, getLinkToPrevInfosPage } = useInfosPage()

  const currentSimulation = useCurrentSimulation()

  const { updateCurrentSimulation, customAdditionalQuestionsAnswers } =
    currentSimulation || {}

  const { data: poll, isLoading, isError } = useFetchPublicPoll()

  const [error, setError] = useState(false)

  const customAdditionalQuestions = poll?.customAdditionalQuestions ?? []

  const customQuestion =
    customAdditionalQuestions[customQuestionIndex - 1].question

  const { saveSimulation } = useSaveSimulation()

  const [shouldSaveAndGoNext, setShouldSaveAndGoNext] = useState(false)

  useEffect(() => {
    if (shouldSaveAndGoNext) {
      try {
        saveSimulation({
          simulation: currentSimulation,
        })

        // Go to next page
        router.push(
          getLinkToNextInfosPage({ curPage: params.question as string })
        )
      } catch (e) {
        setError(true)
        return
      }
    }
  }, [shouldSaveAndGoNext])

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
          <TextInputGroup
            label={customQuestion}
            {...register('custom-answer')}
          />

          {error && <DefaultSubmitErrorMessage />}

          <Navigation
            linkToPrev={getLinkToPrevInfosPage({
              curPage: params.question as string,
            })}
            submitDisabled={
              !getLinkToNextInfosPage({ curPage: params.question as string })
            }
            currentPage={params.question as string}
          />
        </>
      )}
    </form>
  )
}
