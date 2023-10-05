import Trans from '@/components/translation/Trans'
import {
  getMatomoEventClickDontKnow,
  getMatomoEventClickNextQuestion,
  getMatomoEventClickPrevQuestion,
} from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
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
  const { gotoPrevQuestion, gotoNextQuestion, noPrevQuestion, noNextQuestion } =
    useForm()
  const { isMissing, setDefaultAsValue, numericValue } = useRule(question)
  const [isSettingDefaultValue, setIsSettingDefaultValue] = useState(false)

  const nextDisabled =
    questionsThatCantBeZero.includes(question) && numericValue < 1
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
          }}
          color="text">
          <Trans>← Précédent</Trans>
        </Button>
      ) : null}
      <Button
        color={isMissing ? 'secondary' : 'primary'}
        disabled={isSettingDefaultValue || nextDisabled}
        data-cypress-id="next-question-button"
        onClick={async () => {
          if (isMissing) {
            trackEvent(getMatomoEventClickDontKnow(question))
          } else {
            trackEvent(getMatomoEventClickNextQuestion(question))
          }
          setIsSettingDefaultValue(true)
          await setDefaultAsValue(question)
          setIsSettingDefaultValue(false)

          if (!noNextQuestion) {
            gotoNextQuestion()
            return
          }
          onComplete()
        }}>
        <Trans>
          {noNextQuestion
            ? 'Terminer'
            : isMissing
            ? 'Je ne sais pas →'
            : 'Suivant →'}
        </Trans>
      </Button>
    </div>
  )
}
