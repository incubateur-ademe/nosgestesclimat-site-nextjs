import {
  DEFAULT_FOCUS_ELEMENT_ID,
  QUESTION_DESCRIPTION_BUTTON_ID,
} from '@/constants/accessibility'
import {
  getMatomoEventClickDontKnow,
  getMatomoEventClickNextQuestion,
  getMatomoEventClickPrevQuestion,
} from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useMagicKey } from '@/hooks/useMagicKey'
import { useForm, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { MouseEvent, useCallback } from 'react'

type Props = {
  question: string
  onComplete?: () => void
}

//TODO: It should maayyybe be described in the model...
const questionsThatCantBeZero = [
  'transport . voiture . saisie voyageurs',
  'logement . saisie habitants',
  'logement . surface',
]

export default function Navigation({ question, onComplete = () => '' }: Props) {
  const { t } = useClientTranslation()

  const { gotoPrevQuestion, gotoNextQuestion, noPrevQuestion, noNextQuestion } =
    useForm()

  const { isMissing, numericValue, addFoldedStep } = useRule(question)

  const nextDisabled =
    questionsThatCantBeZero.includes(question) && numericValue < 1

  const handleGoToNextQuestion = useCallback(
    async (e: KeyboardEvent | MouseEvent) => {
      e.preventDefault()

      if (isMissing) {
        trackEvent(getMatomoEventClickDontKnow(question))
      } else {
        trackEvent(getMatomoEventClickNextQuestion(question))
      }

      if (isMissing) {
        addFoldedStep(question)
      }

      handleMoveFocus()

      if (!noNextQuestion) {
        gotoNextQuestion()
        return
      }

      onComplete()
    },
    [
      question,
      gotoNextQuestion,
      noNextQuestion,
      isMissing,
      onComplete,
      addFoldedStep,
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
    <div className="flex justify-end  gap-4">
      {!noPrevQuestion ? (
        <Button
          onClick={() => {
            trackEvent(getMatomoEventClickPrevQuestion(question))
            if (!noPrevQuestion) {
              gotoPrevQuestion()
            }
            handleMoveFocus()
          }}
          color="text">
          {'← ' + t('Précédent')}
        </Button>
      ) : null}
      <Button
        color={isMissing ? 'secondary' : 'primary'}
        disabled={nextDisabled}
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
