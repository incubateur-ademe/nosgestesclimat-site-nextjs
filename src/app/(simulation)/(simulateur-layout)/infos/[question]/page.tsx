'use client'

import Trans from '@/components/translation/Trans'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { usePollPublicInfo } from '@/hooks/organisations/usePollPublicInfo'
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

  const { pollSlug } = useOrganisationQueryParams()

  const { data: poll, isLoading } = usePollPublicInfo({ pollSlug })

  const { addCustomAnswer } = useContext(InfosContext)

  const customAdditionalQuestions = poll?.customAdditionalQuestions ?? []

  function onSubmit({ 'custom-answer': customQuestion }: Inputs) {
    addCustomAnswer({
      id: customAdditionalQuestions?.[customQuestionIndex - 1]._id ?? '',
      answer: customQuestion,
    })

    // Go to next page
    router.push(getLinkToNextInfosPage({ curPage: params.question as string }))
  }

  if (!customAdditionalQuestions?.length || isLoading) {
    return null
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
              {poll?.organisationInfo?.name}
            </strong>
          </span>
        }
      />

      <TextInputGroup
        label={customAdditionalQuestions?.[customQuestionIndex - 1]?.question}
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
    </form>
  )
}
