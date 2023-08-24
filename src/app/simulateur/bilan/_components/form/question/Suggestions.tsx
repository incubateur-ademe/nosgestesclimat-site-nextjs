import { useRule } from '@/publicodes-state'

type Props = {
  question: string
  setValue: Function
}

export default function Suggestions({ question, setValue }: Props) {
  const { suggestions } = useRule(question)

  return suggestions?.length ? (
    <div className='mb-2 flex flex-wrap gap-2 text-sm'>
      {suggestions.map((suggestion: { [key: string]: string }) => (
        <button
          key={suggestion.label}
          className='rounded bg-primary px-4  py-2 text-white'
          onClick={() => setValue(suggestion.value)}
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  ) : null
}
