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
        <button
          key={suggestion.label}
          className="rounded bg-primary px-4  py-2 text-white"
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
        </button>
      ))}
    </div>
  ) : null
}
