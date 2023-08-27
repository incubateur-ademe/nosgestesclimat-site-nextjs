import Button from '@/design-system/inputs/Button'
import { useForm, useRule } from '@/publicodes-state'

type Props = {
  question: string
  setValue: any
}

export default function Suggestions({ question, setValue }: Props) {
  const { suggestions } = useRule(question)
  const { updateSituation } = useForm()
  return suggestions?.length ? (
    <div className="mb-2 flex flex-wrap gap-2 text-sm">
      {suggestions.map((suggestion: { [key: string]: string }) => (
        <Button
          key={suggestion.label}
          size="sm"
          onClick={() => {
            if (typeof suggestion.value === 'object') {
              updateSituation(
                Object.keys(suggestion.value).reduce(
                  (accumulator: any, currentValue: any) => ({
                    ...accumulator,
                    [question + ' . ' + currentValue]:
                      suggestion.value[currentValue],
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
  ) : null
}
