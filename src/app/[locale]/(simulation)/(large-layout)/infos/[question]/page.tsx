'use client'

import Trans from '@/components/translation/trans/TransClient'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'

import DefaultErrorAlert from '@/components/error/DefaultErrorAlert'
import BlockSkeleton from '@/design-system/layout/BlockSkeleton'
import { useFetchPublicPoll } from '@/hooks/organisations/polls/useFetchPublicPoll'
import { useParams, useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'
import { InfosContext } from '../_components/InfosProvider'
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

  const { data: poll, isLoading, isError } = useFetchPublicPoll()

  const { addCustomAnswer } = useContext(InfosContext)

  const customAdditionalQuestions = poll?.customAdditionalQuestions ?? []

  const customQuestion =
    customAdditionalQuestions[customQuestionIndex - 1].question

  if (!customAdditionalQuestions?.length || isError) {
    return <DefaultErrorAlert />
  }

  function onSubmit({ 'custom-answer': customAnswer }: Inputs) {
    addCustomAnswer({
      key: customQuestion,
      answer: customAnswer,
    })

    // Go to next page
    router.push(getLinkToNextInfosPage({ curPage: params.question as string }))
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
