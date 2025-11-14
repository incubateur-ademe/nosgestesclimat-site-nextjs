'use client'

import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import ContentLarge from '@/components/layout/ContentLarge'
import questions from '@/components/specialQuestions'
import { captureSimulationCompleted } from '@/constants/tracking/posthogTrackers'
import {
  gtmSimulationCompleted,
  simulationSimulationCompleted,
} from '@/constants/tracking/simulation'
import { getBgCategoryColor } from '@/helpers/getCategoryColorClass'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { usePreventNavigation } from '@/hooks/navigation/usePreventNavigation'
import { useTrackTimeOnSimulation } from '@/hooks/tracking/useTrackTimeOnSimulation'
import { useDebug } from '@/hooks/useDebug'
import { useGTM } from '@/hooks/useGTM'
import { useIframe } from '@/hooks/useIframe'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import {
  useCurrentSimulation,
  useEngine,
  useFormState,
} from '@/publicodes-state'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'
import { trackGTMEvent } from '@/utils/analytics/trackGTMEvent'
import { useCallback, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import FunFact from './form/FunFact'
import ResultsBlocksDesktop from './form/ResultsBlocksDesktop'
import ResultsBlocksMobile from './form/ResultsBlocksMobile'
import CategoryIllustration from './summary/CategoryIllustration'

export default function Form() {
  const isDebug = useDebug()

  const { progression } = useCurrentSimulation()

  const {
    remainingQuestions,
    relevantAnsweredQuestions,
    currentQuestion,
    setCurrentQuestion,
    currentCategory,
  } = useFormState()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  const { goToEndPage } = useEndPage()

  const { isIframe } = useIframe()

  const { isGTMAvailable } = useGTM()

  const { trackTimeOnSimulation } = useTrackTimeOnSimulation()
  const { getNumericValue } = useEngine()
  const { handleUpdateShouldPreventNavigation, shouldPreventNavigation } =
    usePreventNavigation()
  const handleOnComplete = useCallback(() => {
    if (shouldPreventNavigation) {
      handleUpdateShouldPreventNavigation(false)
    }
    if (progression === 1) {
      const timeSpentOnSimulation = trackTimeOnSimulation()

      const bilan = getNumericValue('bilan')

      // Track Matomo event
      trackEvent(simulationSimulationCompleted(bilan))

      // Track GTM event if available
      if (isGTMAvailable) {
        trackGTMEvent(gtmSimulationCompleted)
      }

      trackPosthogEvent(
        captureSimulationCompleted({
          bilanCarbone: getNumericValue('bilan'),
          bilanEau: getNumericValue('bilan', 'eau'),
          timeSpentOnSimulation,
        })
      )

      goToEndPage({
        allowedToGoToGroupDashboard: true,
      })
    }
  }, [
    progression,
    goToEndPage,
    getNumericValue,
    trackTimeOnSimulation,
    isGTMAvailable,
    handleUpdateShouldPreventNavigation,
    shouldPreventNavigation,
  ])

  useEffect(() => {
    if (!relevantAnsweredQuestions || currentQuestion) {
      return
    }
    if (
      questionInQueryParams &&
      (relevantAnsweredQuestions.includes(questionInQueryParams) || isDebug)
    ) {
      setCurrentQuestion(questionInQueryParams)
    } else {
      setCurrentQuestion(remainingQuestions[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    relevantAnsweredQuestions,
    setCurrentQuestion,
    questionInQueryParams,
    isDebug,
  ])

  useEffect(() => {
    if (currentQuestion) setQuestionInQueryParams(currentQuestion)
  }, [currentQuestion, setQuestionInQueryParams])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentQuestion])

  if (!currentQuestion) {
    return
  }
  const QuestionComponent = questions[currentQuestion] || Question

  return (
    <>
      <ContentLarge className="px-4 pt-2">
        <ResultsBlocksMobile />

        <div className="relative flex flex-1 flex-col gap-2 md:flex-row md:gap-8 lg:mt-0 lg:gap-12">
          <div className="relative flex flex-1 flex-col">
            <QuestionComponent
              question={currentQuestion}
              key={currentQuestion}
            />

            {isIframe && (
              <Navigation
                key="iframe-navigation"
                question={currentQuestion}
                remainingQuestions={remainingQuestions}
                onComplete={() => {
                  handleOnComplete()
                }}
              />
            )}
          </div>

          <div
            className={`short:gap-2 flex flex-col gap-8 md:w-60 md:self-start md:${getBgCategoryColor(currentCategory ?? 'transport', '500')}`}>
            <ResultsBlocksDesktop />

            <FunFact question={currentQuestion} />

            {
              // TODO : temporary fix to hide the category illustration for first question
              currentQuestion !== 'transport . voiture . utilisateur' && (
                <div
                  className={twMerge(
                    'mt-auto mb-8 pb-16 md:pb-0',
                    isIframe && 'hidden'
                  )}>
                  <CategoryIllustration
                    category={currentCategory ?? 'transport'}
                  />
                </div>
              )
            }
          </div>
        </div>
      </ContentLarge>

      {!isIframe && (
        <Navigation
          key="default-navigation"
          question={currentQuestion}
          remainingQuestions={remainingQuestions}
          onComplete={() => {
            handleOnComplete()
          }}
        />
      )}
    </>
  )
}
