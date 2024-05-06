'use client'

import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import {
  questionClickPass,
  questionClickSuivant,
} from '@/constants/tracking/question'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useMagicKey } from '@/hooks/useMagicKey'
import { useCurrentSimulation, useForm } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { MouseEvent, useCallback, useMemo } from 'react'

type Props = {
  question: DottedName
  isPristine: boolean
}

export default function Navigation({ question, isPristine }: Props) {
  const { t } = useClientTranslation()

  const { gotoNextQuestion } = useForm()

  const { updateCurrentSimulation } = useCurrentSimulation()

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

      if (isPristine) {
        trackEvent(questionClickPass({ question, timeSpentOnQuestion }))
      } else {
        trackEvent(
          questionClickSuivant({
            question,
            answer: 'mosaique transport',
            timeSpentOnQuestion,
          })
        )
      }

      updateCurrentSimulation({ foldedStepToAdd: question })

      handleMoveFocus()

      gotoNextQuestion()
    },
    [question, gotoNextQuestion, isPristine, updateCurrentSimulation, startTime]
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
    <div className="flex justify-end  gap-4">
      <Button
        color={isPristine ? 'secondary' : 'primary'}
        size="md"
        data-cypress-id="next-question-button"
        onClick={handleGoToNextQuestion}>
        {isPristine ? t('Je ne sais pas') + ' →' : t('Suivant') + ' →'}
      </Button>
    </div>
  )
}
