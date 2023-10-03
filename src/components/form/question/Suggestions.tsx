import { getMatomoEventClickSuggestion } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import { useEngine, useForm, useRule } from '@/publicodes-state'
import { Situation } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  question: string
}

export default function Suggestions({ question }: Props) {
  const { suggestions, setValue, addFoldedStep } = useRule(question)
  const { updateSituation } = useEngine()

  const { setIsNavigationToNextQuestionDisabled } = useForm()

  if (!suggestions?.length) return
  return (
    <div className="mb-4 flex flex-wrap justify-end gap-2 text-sm">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          size="sm"
          className="capitalize"
          onClick={() => {
            trackEvent(
              getMatomoEventClickSuggestion(question, suggestion.label)
            )
            if (typeof suggestion.value === 'object') {
              updateSituation(
                Object.keys(suggestion.value).reduce(
                  (accumulator: Situation, currentValue: string) => ({
                    ...accumulator,
                    [question + ' . ' + currentValue]:
                      suggestion.value && suggestion.value[currentValue],
                  }),
                  {}
                )
              )
              addFoldedStep(question)
            } else {
              setValue(suggestion.value, question)
            }

            setIsNavigationToNextQuestionDisabled(false)
          }}>
          {suggestion.label}
        </Button>
      ))}
    </div>
  )
}
