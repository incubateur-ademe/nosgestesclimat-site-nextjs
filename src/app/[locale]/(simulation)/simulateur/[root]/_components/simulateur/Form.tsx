'use client'

import { PreventNavigationContext } from '@/app/[locale]/_components/mainLayoutProviders/PreventNavigationProvider'
import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import ContentLarge from '@/components/layout/ContentLarge'
import questions from '@/components/specialQuestions'
import { getBgCategoryColor } from '@/helpers/getCategoryColorClass'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useDebug } from '@/hooks/useDebug'
import { useIframe } from '@/hooks/useIframe'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'
import { useCurrentSimulation, useFormState } from '@/publicodes-state'
import { useContext, useEffect, useState } from 'react'
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

  const [isInitialized, setIsInitialized] = useState(false)

  // When we reach the end of the test (by clicking on the last navigation button),
  // we wait for the progression to be updated before redirecting to the end page
  const [shouldGoToEndPage, setShouldGoToEndPage] = useState(
    progression === 1 ? true : false
  )

  useEffect(() => {
    if (shouldGoToEndPage && progression === 1) {
      goToEndPage({
        allowedToGoToGroupDashboard: true,
      })
    }
    // goToEndPage was triggered twice in a row
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldGoToEndPage, progression])

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
