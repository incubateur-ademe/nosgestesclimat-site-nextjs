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
import Button from '@/design-system/inputs/Button'
import { getBorderLightColor } from '@/helpers/getCategoryColorClass'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useMagicKey } from '@/hooks/useMagicKey'
import { useCurrentSimulation, useForm, useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { MouseEvent, useCallback, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  question: DottedName
  tempValue?: number
  onComplete?: () => void
}

export default function Navigation({
  question,
  tempValue,
  onComplete = () => '',
}: Props) {
  const { t } = useClientTranslation()

  const { gotoPrevQuestion, gotoNextQuestion, noPrevQuestion, noNextQuestion } =
    useForm()

  const { isMissing, plancher, value, category } = useRule(question)

  const { updateCurrentSimulation } = useCurrentSimulation()

  const isNextDisabled =
    tempValue !== undefined && plancher !== undefined && tempValue < plancher

  // Start time of the question
  //(we need to use question to update the start time when the question changes, but it is not exactly usefull as a dependency)
  const startTime = useMemo(() => {
    if (question) {
      return Date.now()
    }
    return Date.now()
  }, [question])

  const handleGoToNextQuestion = useCallback(
    async (e: KeyboardEvent | MouseEvent) => {
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

      if (noNextQuestion) {
        onComplete()
        return
      }

      gotoNextQuestion()
    },
    [
      question,
      gotoNextQuestion,
      noNextQuestion,
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
        'flex justify-between border-b pb-6',
        getBorderLightColor(category).replace('-100', '-200')
      )}>
      <Button
        size="md"
        onClick={() => {
          trackEvent(questionClickPrevious({ question }))

          if (!noPrevQuestion) {
            gotoPrevQuestion()
          }

          handleMoveFocus()
        }}
        color="text"
        className={twMerge('px-3', noPrevQuestion ? 'invisible' : 'visible')}>
        {'← ' + t('Précédent')}
      </Button>

      <Button
        color={isMissing ? 'secondary' : 'primary'}
        disabled={isNextDisabled}
        size="md"
        data-cypress-id="next-question-button"
        onClick={handleGoToNextQuestion}>
        {noNextQuestion
          ? t('Terminer')
          : isMissing
            ? t('Je ne sais pas') + ' →'
            : t('Suivant') + ' →'}
      </Button>
    </div>
  )
}
