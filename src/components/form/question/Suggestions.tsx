import { getMatomoEventClickSuggestion } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import { useEngine, useRule } from '@/publicodes-state'
import { Situation } from '@/publicodes-state/types'
import { capitalizeString } from '@/utils/capitalizeString'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  question: string
  setTempValue?: (value: number | undefined) => void
}

export default function Suggestions({ question, setTempValue }: Props) {
  const { suggestions, setValue, addFoldedStep } = useRule(question)
  const { updateSituation } = useEngine()

  if (!suggestions?.length) return
  return (
    <div className="mb-4 flex flex-wrap justify-end gap-2 text-sm">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          data-cypress-id="suggestion"
          size="sm"
          className="text-xs font-normal md:text-sm"
          onClick={() => {
            trackEvent(
              getMatomoEventClickSuggestion(question, suggestion.label)
            )

            setTempValue && setTempValue(undefined)

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
          }}>
          {capitalizeString(suggestion.label)}
        </Button>
      ))}
    </div>
  )
}
