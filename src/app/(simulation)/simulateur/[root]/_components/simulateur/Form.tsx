'use client'

import { PreventNavigationContext } from '@/app/_components/mainLayoutProviders/PreventNavigationProvider'
import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import ContentLarge from '@/components/layout/ContentLarge'
import questions from '@/components/specialQuestions'
import { simulationSimulationCompleted } from '@/constants/tracking/simulation'
import { getBgCategoryColor } from '@/helpers/getCategoryColorClass'
import { uuidToNumber } from '@/helpers/uuidToNumber'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useTrackTimeOnSimulation } from '@/hooks/tracking/useTrackTimeOnSimulation'
import { useDebug } from '@/hooks/useDebug'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { useCurrentSimulation, useEngine, useForm } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useContext, useEffect, useState } from 'react'
import CategoriesSummary from './form/CategoriesSummary'
import FunFact from './form/FunFact'
import CategoryIllustration from './summary/CategoryIllustration'

export default function Form() {
  const isDebug = useDebug()

  const { progression, id } = useCurrentSimulation()

  const {
    remainingQuestions,
    relevantAnsweredQuestions,
    currentQuestion,
    setCurrentQuestion,
    currentCategory,
  } = useForm()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  const { goToEndPage } = useEndPage()

  const [isInitialized, setIsInitialized] = useState(false)

  const { trackTimeOnSimulation } = useTrackTimeOnSimulation()
  const { getNumericValue } = useEngine()

  // When we reach the end of the test (by clicking on the last navigation button),
  // we wait for the progression to be updated before redirecting to the end page
  const [shouldGoToEndPage, setShouldGoToEndPage] = useState(false)

  useEffect(() => {
    // We show the quiz for 10% of our users
    const shouldShowQuiz = uuidToNumber(id ?? '') === 0

    if (shouldGoToEndPage && progression === 1) {
      trackTimeOnSimulation()

      if (!shouldShowQuiz) {
        trackEvent(
          simulationSimulationCompleted({ bilan: getNumericValue('bilan') })
        )
      }
      goToEndPage({
        shouldShowQuiz,
        allowedToGoToGroupDashboard: true,
      })
    }
  }, [
    shouldGoToEndPage,
    progression,
    goToEndPage,
    getNumericValue,
    id,
    trackTimeOnSimulation,
  ])

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

  const { handleUpdateShouldPreventNavigation, shouldPreventNavigation } =
    useContext(PreventNavigationContext)

  if (!isInitialized || !currentQuestion) {
    return
  }

  const QuestionComponent = questions[currentQuestion] || Question

  return (
    <>
      <ContentLarge>
        <div className="relative flex flex-1 flex-col gap-2 md:gap-8 lg:mt-0 lg:flex-row lg:gap-24">
          <div className="relative flex flex-1 flex-col">
            <QuestionComponent
              question={currentQuestion}
              key={currentQuestion}
              tempValue={tempValue}
              setTempValue={setTempValue}
            />
          </div>

          <div
            className={`flex flex-col gap-8 md:self-start lg:w-[20rem] short:gap-2 md:${getBgCategoryColor(currentCategory ?? 'transport', '500')}`}>
            <CategoriesSummary />

            <FunFact question={currentQuestion} />

            <div className="mb-8 mt-auto pb-16 md:pb-0">
              <CategoryIllustration category={currentCategory ?? 'transport'} />
            </div>
          </div>
        </div>
      </ContentLarge>

      <Navigation
        question={currentQuestion}
        tempValue={tempValue}
        onComplete={() => {
          if (shouldPreventNavigation) {
            handleUpdateShouldPreventNavigation(false)
          }

          setShouldGoToEndPage(true)
        }}
      />
    </>
  )
}
