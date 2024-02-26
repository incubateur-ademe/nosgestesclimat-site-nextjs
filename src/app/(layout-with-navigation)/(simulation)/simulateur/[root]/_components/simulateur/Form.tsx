import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import questions from '@/components/questions'
import { getMatomoEventParcoursTestOver } from '@/constants/matomo'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useDebug } from '@/hooks/useDebug'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { useEngine, useForm } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useContext, useEffect, useState } from 'react'
import ColorIndicator from './form/ColorIndicator'

export default function Form() {
  const isDebug = useDebug()

  const {
    progression,
    remainingQuestions,
    relevantAnsweredQuestions,
    currentQuestion,
    setCurrentQuestion,
  } = useForm()

  const { getNumericValue } = useEngine()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  const { goToEndPage } = useEndPage()

  const [isInitialized, setIsInitialized] = useState(false)

  // When we reach the end of the test (by clicking on the last navigation button),
  // we wait for the progression to be updated before redirecting to the end page
  const [shouldGoToEndPage, setShouldGoToEndPage] = useState(false)
  useEffect(() => {
    if (shouldGoToEndPage && progression === 1) {
      goToEndPage()
    }
  }, [shouldGoToEndPage, progression, goToEndPage])

  const [tempValue, setTempValue] = useState<number | undefined>(undefined)

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
    window.scrollTo(0, 0)
  }, [currentQuestion])

  useEffect(() => {
    if (isInitialized && currentQuestion) {
      setQuestionInQueryParams(currentQuestion)
    }
  }, [setQuestionInQueryParams, currentQuestion, isInitialized])

  const { handleUpdateShouldPreventNavigation } = useContext(
    PreventNavigationContext
  )

  if (!isInitialized || !currentQuestion) {
    return
  }

  const QuestionComponent = questions[currentQuestion] || Question

  return (
    <div className="relative mb-4 overflow-hidden rounded-lg bg-grey-100 p-4 pl-6">
      <ColorIndicator question={currentQuestion} />
      <QuestionComponent
        question={currentQuestion}
        key={currentQuestion}
        tempValue={tempValue}
        setTempValue={setTempValue}
      />
      <Navigation
        question={currentQuestion}
        tempValue={tempValue}
        onComplete={() => {
          trackEvent(getMatomoEventParcoursTestOver(getNumericValue('bilan')))

          handleUpdateShouldPreventNavigation(false)

          setShouldGoToEndPage(true)
        }}
      />
    </div>
  )
}
