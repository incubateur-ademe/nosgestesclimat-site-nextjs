'use client'

import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import {
  questionClickPass,
  questionClickPrevious,
  questionClickSuivant,
} from '@/constants/tracking/question'
import Button from '@/design-system/buttons/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useIframe } from '@/hooks/useIframe'
import { useMagicKey } from '@/hooks/useMagicKey'
import { useCurrentSimulation, useFormState, useRule } from '@/publicodes-state'
import getValueIsOverFloorOrCeiling from '@/publicodes-state/helpers/getValueIsOverFloorOrCeiling'
import { trackEvent } from '@/utils/analytics/trackEvent'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { MouseEvent } from 'react'
import { useCallback, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import SyncIndicator from './navigation/SyncIndicator'

export default function Navigation({
  question,
  tempValue,
  onComplete = () => '',
  isEmbedded,
  remainingQuestions,
}: {
  question: DottedName
  tempValue?: number
  onComplete?: () => void
  isEmbedded?: boolean
  remainingQuestions?: DottedName[]
}) {
  const { t } = useClientTranslation()

  const { isIframe } = useIframe()

  const { gotoPrevQuestion, gotoNextQuestion, noPrevQuestion, noNextQuestion } =
    useFormState()

  const { isMissing, plancher, plafond, value } = useRule(question)

  const { updateCurrentSimulation } = useCurrentSimulation()

  const { isBelowFloor, isOverCeiling } = getValueIsOverFloorOrCeiling({
    value: tempValue,
    plafond,
    plancher,
  })

  const isNextDisabled = isBelowFloor || isOverCeiling

  const isSingleQuestionEmbedded =
    (isEmbedded &&
      remainingQuestions &&
      remainingQuestions.length === 1 &&
      remainingQuestions[0] === question) ||
    (remainingQuestions && remainingQuestions.length === 0)

  const finalNoNextQuestion = isSingleQuestionEmbedded ? true : noNextQuestion
  const finalNoPrevQuestion = isSingleQuestionEmbedded ? true : noPrevQuestion

  // Start time of the question
  //(we need to use question to update the start time when the question changes, but it is not exactly usefull as a dependency)
  const startTime = useMemo(() => {
    if (question) {
      return Date.now()
    }
    return Date.now()
  }, [question])

  const handleGoToNextQuestion = useCallback(
    (e: KeyboardEvent | MouseEvent) => {
      e.preventDefault()

      const endTime = Date.now()
      const timeSpentOnQuestion = endTime - startTime

      if (isMissing) {
        trackEvent(questionClickPass({ question, timeSpentOnQuestion }))
      } else {
        trackEvent(
          questionClickSuivant({ question, answer: value, timeSpentOnQuestion })
        )
      }

      if (isMissing) {
        updateCurrentSimulation({ foldedStepToAdd: question })
      }

      handleMoveFocus()

      if (finalNoNextQuestion) {
        onComplete()
        return
      }

      gotoNextQuestion()
    },
    [
      question,
      gotoNextQuestion,
      finalNoNextQuestion,
      isMissing,
      value,
      onComplete,
      updateCurrentSimulation,
      startTime,
    ]
  )

  useMagicKey({
    gotToNextQuestion: handleGoToNextQuestion,
  })

  const handleMoveFocus = () => {
    // Focus the question title upon question change
    setTimeout(() => {
      const focusedElement =
        // Default : focus the first element focusable in the modified area of the form
        document.getElementById(
          QUESTION_DESCRIPTION_BUTTON_ID
          // Otherwise focus the first input or field button
        ) ??
        document.getElementById(
          DEFAULT_FOCUS_ELEMENT_ID
          // Edge case : mosaics
        ) ??
        document.getElementById(`${DEFAULT_FOCUS_ELEMENT_ID}-0`)

      if (focusedElement) {
        focusedElement?.focus()
      }
    })
  }

  return (
    <div
      className={twMerge(
        'fixed right-0 bottom-0 left-0 z-50 min-h-[66px] bg-gray-100 py-3',
        isEmbedded && 'static bg-transparent p-0',
        isIframe &&
          'relative right-auto bottom-auto left-auto z-0 bg-transparent'
      )}>
      {!isIframe && !isEmbedded && <SyncIndicator />}
      <div
        className={twMerge(
          'relative mx-auto flex w-full max-w-6xl justify-between gap-1 px-4 md:gap-4 lg:justify-start',
          isEmbedded && 'justify-start'
        )}>
        <Button
          size="md"
          onClick={() => {
            trackEvent(questionClickPrevious({ question }))

            if (!finalNoPrevQuestion) {
              gotoPrevQuestion()
            }

            handleMoveFocus()
          }}
          disabled={finalNoPrevQuestion}
          color="text"
          className={twMerge('px-3')}>
          <span className="hidden md:inline">←</span> {t('Précédent')}
        </Button>

        <Button
          color={isMissing ? 'secondary' : 'primary'}
          disabled={isNextDisabled}
          className="p-3 text-sm"
          size="md"
          data-cypress-id="next-question-button"
          onClick={handleGoToNextQuestion}>
          {finalNoNextQuestion
            ? t('Terminer')
            : isMissing
              ? t('Passer la question') + ' →'
              : t('Suivant') + ' →'}
        </Button>
      </div>
    </div>
  )
}
