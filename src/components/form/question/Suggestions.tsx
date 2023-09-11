import Button from '@/design-system/inputs/Button'
import { useEngine, useRule } from '@/publicodes-state'
import { Situation } from '@/publicodes-state/types'

type Props = {
  question: string
}

export default function Suggestions({ question }: Props) {
  const { suggestions, setValue } = useRule(question)
  const { updateSituation } = useEngine()

  if (!suggestions?.length) return
  return (
    <div className="mb-2 flex flex-wrap gap-2 text-sm">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          size="sm"
          onClick={() => {
            if (typeof suggestion.value === 'object') {
              updateSituation(
                Object.keys(suggestion.value as object).reduce(
                  (accumulator: Situation, currentValue: string) => ({
                    ...accumulator,
                    [question + ' . ' + currentValue]:
                      suggestion.value && suggestion.value[currentValue],
                  }),
                  {}
                )
              )
            } else {
              setValue(suggestion.value)
            }
          }}>
          {suggestion.label}
        </Button>
      ))}
    </div>
  )
}
