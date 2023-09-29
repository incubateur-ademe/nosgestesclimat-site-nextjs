import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import questions from '@/components/questions'
import { getMatomoEventParcoursTestOver } from '@/constants/matomo'
import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useDebug } from '@/hooks/useDebug'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import TestCompleted from './form/TestCompleted'
import { useUpdateGroupAndRedirectToGroup } from './form/_hooks/useUpdateGroupAndRedirectToGroup'

export default function Form() {
  const router = useRouter()

  const isDebug = useDebug()

  const { groupToRedirectToAfterTest } = useUser()

  const {
    remainingQuestions,
    relevantAnsweredQuestions,
    currentQuestion,
    setCurrentQuestion,
    categories,
  } = useForm()

  const { getValue, getNumericValue } = useEngine()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  const [isInitialized, setIsInitialized] = useState(false)

  const handleUpdateGroupAndRedirectToGroup = useUpdateGroupAndRedirectToGroup()

  useEffect(() => {
    if (!isInitialized) {
      if (
        questionInQueryParams &&
        (relevantAnsweredQuestions.includes(questionInQueryParams) || isDebug)
      ) {
        setCurrentQuestion(questionInQueryParams)
      } else {
        setCurrentQuestion(remainingQuestions[0])
      }
      setIsInitialized(true)
    }
  }, [
    isDebug,
    questionInQueryParams,
    remainingQuestions,
    relevantAnsweredQuestions,
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
          trackEvent(getMatomoEventParcoursTestOver(getNumericValue('bilan')))

          // When a user joins a group without having his test passed
          if (groupToRedirectToAfterTest) {
            handleUpdateGroupAndRedirectToGroup({
              group: groupToRedirectToAfterTest,
            })
            return
          }
          router.push(
            `/fin?diapo=bilan&${formatResultToDetailParam({
              categories,
              getValue,
            })}`
          )
        }}
      />
    </div>
  )
}
