'use client'

import Trans from '@/components/translation/Trans'
import { EMAIL_PAGE } from '@/constants/infosPages'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import { useInfosPage } from '@/hooks/navigation/useInfosPage'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { usePoll } from '@/hooks/organisations/usePoll'
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

  const { data: poll, isLoading } = usePoll({ pollSlug })

  const { addCustomAnswer } = useContext(InfosContext)

  const { customAdditionalQuestions } = poll ?? {
    customAdditionnalQuestions: [],
  }

  function onSubmit({ 'custom-answer': customQuestion }: Inputs) {
    // Avoid reloading page
    event?.preventDefault()

    addCustomAnswer({
      id: customAdditionalQuestions?.[customQuestionIndex]._id ?? '',
      answer: customQuestion,
    })

    // Go to next page
    router.push(getLinkToNextInfosPage({ curPage: EMAIL_PAGE }))
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
        label={customAdditionalQuestions[customQuestionIndex].question}
        {...register('custom-answer')}
      />

      <Navigation
        linkToPrev={getLinkToPrevInfosPage({ curPage: EMAIL_PAGE })}
        submitDisabled={!getLinkToNextInfosPage({ curPage: EMAIL_PAGE })}
        currentPage={EMAIL_PAGE}
      />
    </form>
  )
}
