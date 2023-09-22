import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import questions from '@/components/questions'
import { getMatomoEventJoinedGroupe } from '@/constants/matomo'
import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import TestCompleted from './form/TestCompleted'

export default function Form() {
  const {
    remainingQuestions,
    currentQuestion,
    setCurrentQuestion,
    categories,
  } = useForm()

  const { groupToRedirectToAfterTest, setGroupToRedirectToAfterTest } =
    useUser()

  const [isInitialized, setIsInitialized] = useState(false)

  const { getValue } = useEngine()

  const router = useRouter()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  useEffect(() => {
    if (!isInitialized) {
      if (questionInQueryParams) {
        setCurrentQuestion(questionInQueryParams)
      } else {
        setCurrentQuestion(remainingQuestions[0])
      }
      setIsInitialized(true)
    }
  }, [
    questionInQueryParams,
    remainingQuestions,
    setCurrentQuestion,
    isInitialized,
  ])

  useEffect(() => {
    if (isInitialized && currentQuestion) {
      setQuestionInQueryParams(currentQuestion)
    }
  }, [setQuestionInQueryParams, currentQuestion, isInitialized])

  if (!isInitialized) {
    return
  }

  if (!currentQuestion) {
    return <TestCompleted />
  }

  return (
    <div className="mb-4 rounded-lg bg-primaryLight p-4">
      {questions[currentQuestion] ? (
        questions[currentQuestion]
      ) : (
        <Question question={currentQuestion} key={currentQuestion} />
      )}
      <Navigation
        question={currentQuestion}
        onComplete={() => {
          // When a user joins a group without having his test passed
          if (groupToRedirectToAfterTest) {
            const groupId = groupToRedirectToAfterTest._id

            trackEvent(getMatomoEventJoinedGroupe(groupId))

            setGroupToRedirectToAfterTest(undefined)

            router.push(`/groupes/resultats?groupId=${groupId}`)
            return
          }

          // Not sure why but we need a timer
          setTimeout(() => {
            router.push(
              `/fin?${formatResultToDetailParam({ categories, getValue })}`
            )
          }, 500)
        }}
      />
    </div>
  )
}
