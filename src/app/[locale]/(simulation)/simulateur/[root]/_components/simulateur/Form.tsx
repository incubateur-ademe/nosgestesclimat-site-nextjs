'use client'

import Navigation from '@/components/form/Navigation'
import Question from '@/components/form/Question'
import ContentLarge from '@/components/layout/ContentLarge'
import questions from '@/components/specialQuestions'
import { getBgCategoryColor } from '@/helpers/getCategoryColorClass'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useDebug } from '@/hooks/useDebug'
import { useIframe } from '@/hooks/useIframe'
import { useQuestionInQueryParams } from '@/hooks/useQuestionInQueryParams'

import { usePreventNavigation } from '@/hooks/navigation/usePreventNavigation'
import { useCurrentSimulation, useFormState } from '@/publicodes-state'
import { useCallback, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import FunFact from './form/FunFact'
import ResultsBlocksDesktop from './form/ResultsBlockDesktop'
import ResultsBlockMobile from './form/ResultsBlockMobile'
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

  const { questionInQueryParams } = useQuestionInQueryParams(currentQuestion)

  const { goToEndPage } = useEndPage()

  const { isIframe } = useIframe()

  const { handleUpdateShouldPreventNavigation, shouldPreventNavigation } =
    usePreventNavigation()

  const handleOnComplete = useCallback(() => {
    if (shouldPreventNavigation) {
      handleUpdateShouldPreventNavigation(false)
    }
    if (progression === 1) {
      goToEndPage({
        allowedToGoToGroupDashboard: true,
      })
    }
  }, [
    shouldPreventNavigation,
    progression,
    handleUpdateShouldPreventNavigation,
    goToEndPage,
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
    window.scrollTo(0, 0)
  }, [currentQuestion])

  if (!currentQuestion) {
    return
  }

  const QuestionComponent = questions[currentQuestion] || Question

  return (
    <>
      <ContentLarge className="px-4 pt-2">
        <ResultsBlockMobile />

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
                onComplete={handleOnComplete}
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
          remainingQuestions={remainingQuestions}
          onComplete={handleOnComplete}
        />
      )}
    </>
  )
}
