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
import { useForm, useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'

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

  const { isMissing, setDefaultAsValue, numericValue } = useRule(question)

  const [isSettingDefaultValue, setIsSettingDefaultValue] = useState(false)

  const nextDisabled =
    questionsThatCantBeZero.includes(question) && numericValue < 1

  const handleMoveFocus = () => {
    // Focus the question title upon question change
    setTimeout(() => {
      // Default : focus the first element focusable in the modified area of the form
      const questionDescriptionButton = document.getElementById(
        QUESTION_DESCRIPTION_BUTTON_ID
      )

      if (questionDescriptionButton) {
        questionDescriptionButton?.focus()
        return
      }

      // Otherwise focus the first input or field button
      const firstInputOrFieldButton = document.getElementById(
        DEFAULT_FOCUS_ELEMENT_ID
      )

      if (firstInputOrFieldButton) {
        firstInputOrFieldButton?.focus()
        return
      }

      // Edge case : mosaics
      const mosaicFirstField = document.getElementById(
        `${DEFAULT_FOCUS_ELEMENT_ID}-0`
      )

      if (mosaicFirstField) {
        mosaicFirstField?.focus()
        return
      }
    })
  }

  return (
    <div className="flex justify-end  gap-4">
      {!noPrevQuestion ? (
        <Button
          disabled={isSettingDefaultValue}
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
        disabled={isSettingDefaultValue || nextDisabled}
        onClick={async () => {
          if (isMissing) {
            trackEvent(getMatomoEventClickDontKnow(question))
          } else {
            trackEvent(getMatomoEventClickNextQuestion(question))
          }
          setIsSettingDefaultValue(true)
          await setDefaultAsValue(question)
          setIsSettingDefaultValue(false)

          handleMoveFocus()

          if (!noNextQuestion) {
            gotoNextQuestion()

            return
          }
          onComplete()
        }}>
        {noNextQuestion
          ? t('Terminer')
          : isMissing
          ? t('Je ne sais pas') + ' →'
          : t('Suivant') + ' →'}
      </Button>
    </div>
  )
}
