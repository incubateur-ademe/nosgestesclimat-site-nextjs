'use client'

import { PreventNavigationContext } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import ContentLarge from '@/components/layout/ContentLarge'
import questions from '@/components/specialQuestions'
import { carboneMetric } from '@/constants/model/metric'
import { getBgCategoryColor } from '@/helpers/getCategoryColorClass'
import { shareDataWithIntegrator } from '@/helpers/iframe/shareDataWithIntegrator'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useDebug } from '@/hooks/useDebug'
import { useIframe } from '@/hooks/useIframe'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { useCurrentSimulation, useFormState } from '@/publicodes-state'
import { useCallback, useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import FunFact from './form/FunFact'
import ResultsBlocksDesktop from './form/ResultsBlocksDesktop'
import ResultsBlocksMobile from './form/ResultsBlocksMobile'
import CategoryIllustration from './summary/CategoryIllustration'

export default function Form() {
  const isDebug = useDebug()

  const { progression, computedResults } = useCurrentSimulation()

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

  const { isIframe, isIframeShareData } = useIframe()

  const [isInitialized, setIsInitialized] = useState(false)

  const handleOnComplete = useCallback(() => {
    if (progression === 1) {
      goToEndPage({
        allowedToGoToGroupDashboard: true,
      })
    }
  }, [progression, goToEndPage])

  const [tempValue, setTempValue] = useState<number | undefined>(undefined)
  const [displayedValue, setDisplayedValue] = useState<string | undefined>(
    undefined
  )

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
              displayedValue={displayedValue}
              setDisplayedValue={setDisplayedValue}
            />

            {isIframe && (
              <Navigation
                key="iframe-navigation"
                question={currentQuestion}
                tempValue={tempValue}
                remainingQuestions={remainingQuestions}
                onComplete={() => {
                  if (shouldPreventNavigation) {
                    handleUpdateShouldPreventNavigation(false)
                  }
                  // Share data if allowed
                  if (isIframeShareData) {
                    shareDataWithIntegrator(computedResults[carboneMetric])
                  }

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
          tempValue={tempValue}
          onComplete={() => {
            if (shouldPreventNavigation) {
              handleUpdateShouldPreventNavigation(false)
            }

            handleOnComplete()
          }}
        />
      )}
    </>
  )
}
