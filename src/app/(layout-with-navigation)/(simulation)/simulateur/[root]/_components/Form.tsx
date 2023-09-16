import { useForm, useUser } from '@/publicodes-state'
import { useEffect, useMemo, useRef } from 'react'

import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import { getMatomoEventJoinedGroupe } from '@/constants/matomo'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
import CategoryIntroduction from './form/CategoryIntroduction'

import questions from '@/components/questions'

export default function Form() {
  const {
    remainingCategories,
    remainingQuestionsByCategories,
    currentQuestion,
    setCurrentQuestion,
    currentCategory,
    setCurrentCategory,
  } = useForm()

  const { groupToRedirectToAfterTest, setGroupToRedirectToAfterTest } =
    useUser()

  const isInitialized = useMemo(
    () => (currentQuestion && currentCategory ? true : false),
    [currentQuestion, currentCategory]
  )

  const router = useRouter()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  const prevQuestionInQueryParams = useRef(questionInQueryParams)

  useEffect(() => {
    if (!currentCategory) {
      if (questionInQueryParams) {
        setCurrentQuestion(questionInQueryParams)
        setCurrentCategory(questionInQueryParams.split(' . ')[0])
      } else {
        setCurrentCategory(remainingCategories[0])
      }
    }
  }, [
    currentCategory,
    questionInQueryParams,
    remainingCategories,
    remainingQuestionsByCategories,
    setCurrentCategory,
    setCurrentQuestion,
  ])

  useEffect(() => {
    if (
      currentQuestion !== questionInQueryParams &&
      prevQuestionInQueryParams.current !== questionInQueryParams
    ) {
      setCurrentQuestion(questionInQueryParams)
      setCurrentCategory(questionInQueryParams.split(' . ')[0])
    }
    prevQuestionInQueryParams.current = questionInQueryParams
  }, [
    questionInQueryParams,
    currentQuestion,
    setCurrentQuestion,
    setCurrentCategory,
  ])

  useEffect(() => {
    if (isInitialized && currentQuestion) {
      setQuestionInQueryParams(currentQuestion)
    }
  }, [
    setQuestionInQueryParams,
    currentQuestion,
    currentCategory,
    isInitialized,
  ])

  if (!currentCategory) return 'Vous avez tout fini :)'

  if (!currentQuestion)
    return (
      <CategoryIntroduction
        category={currentCategory}
        startCategory={() =>
          setCurrentQuestion(remainingQuestionsByCategories[currentCategory][0])
        }
      />
    )

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
          console.log('ON COMPLETE')
          router.push('/fin')
        }}
      />
    </div>
  )
}
