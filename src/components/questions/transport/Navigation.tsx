import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import {
  getMatomoEventClickDontKnow,
  getMatomoEventClickNextQuestion,
} from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useMagicKey } from '@/hooks/useMagicKey'
import { useForm, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { MouseEvent, useCallback } from 'react'

type Props = {
  question: string
  isPristine: boolean
}

export default function Navigation({ question, isPristine }: Props) {
  const { t } = useClientTranslation()

  const { gotoNextQuestion } = useForm()

  const { addFoldedStep } = useRule(question)

  const handleGoToNextQuestion = useCallback(
    async (e: KeyboardEvent | MouseEvent) => {
      e.preventDefault()

      if (isPristine) {
        trackEvent(getMatomoEventClickDontKnow(question))
      } else {
        trackEvent(getMatomoEventClickNextQuestion(question))
      }

      addFoldedStep(question)

      handleMoveFocus()

      gotoNextQuestion()
    },
    [question, gotoNextQuestion, isPristine, addFoldedStep]
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
        data-cypress-id="next-question-button"
        onClick={handleGoToNextQuestion}>
        {isPristine ? t('Je ne sais pas') + ' →' : t('Suivant') + ' →'}
      </Button>
    </div>
  )
}
