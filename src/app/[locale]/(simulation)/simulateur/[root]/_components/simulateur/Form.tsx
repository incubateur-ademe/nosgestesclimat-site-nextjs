'use client'

import { PreventNavigationContext } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
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
import { useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import FunFact from './form/FunFact'
import ResultsBlocksDesktop from './form/ResultsBlocksDesktop'
import ResultsBlocksMobile from './form/ResultsBlocksMobile'
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
  } = useFormState()

  const { questionInQueryParams, setQuestionInQueryParams } =
    useQuestionInQueryParams()

  const { goToEndPage } = useEndPage()

  const { isIframe } = useIframe()

  const { isGTMAvailable } = useGTM()

  const [isInitialized, setIsInitialized] = useState(false)

  const { trackTimeOnSimulation } = useTrackTimeOnSimulation()
  const { getNumericValue } = useEngine()

  // When we reach the end of the test (by clicking on the last navigation button),
  // we wait for the progression to be updated before redirecting to the end page
  const [shouldGoToEndPage, setShouldGoToEndPage] = useState(false)

  useEffect(() => {
    if (shouldGoToEndPage && progression === 1) {
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
    // goToEndPage was triggered twice in a row
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shouldGoToEndPage,
    progression,
    getNumericValue,
    id,
    trackTimeOnSimulation,
    isGTMAvailable,
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
      <ContentLarge className="px-4 pt-2">
        <ResultsBlocksMobile />

        <div className="relative flex flex-1 flex-col gap-2 md:flex-row md:gap-8 lg:mt-0 lg:gap-12">
          <div className="relative flex flex-1 flex-col">
            <QuestionComponent
              question={currentQuestion}
              key={currentQuestion}
              tempValue={tempValue}
              setTempValue={setTempValue}
            />

            {isIframe && (
              <Navigation
                key="iframe-navigation"
                question={currentQuestion}
                tempValue={tempValue}
                onComplete={() => {
                  if (shouldPreventNavigation) {
                    handleUpdateShouldPreventNavigation(false)
                  }

                  setShouldGoToEndPage(true)
                }}
              />
            )}
          </div>

          <div
            className={`short:gap-2 flex flex-col gap-8 md:w-60 md:self-start md:${getBgCategoryColor(currentCategory ?? 'transport', '500')}`}>
            <ResultsBlocksDesktop />

            <FunFact question={currentQuestion} />

            <div
              className={twMerge(
                'mt-auto mb-8 pb-16 md:pb-0',
                isIframe && 'hidden'
              )}>
              <CategoryIllustration category={currentCategory ?? 'transport'} />
            </div>
          </div>
        </div>
      </ContentLarge>

      {!isIframe && (
        <Navigation
          key="default-navigation"
          question={currentQuestion}
          tempValue={tempValue}
          onComplete={() => {
            if (shouldPreventNavigation) {
              handleUpdateShouldPreventNavigation(false)
            }

            setShouldGoToEndPage(true)
          }}
        />
      )}
    </>
  )
}
