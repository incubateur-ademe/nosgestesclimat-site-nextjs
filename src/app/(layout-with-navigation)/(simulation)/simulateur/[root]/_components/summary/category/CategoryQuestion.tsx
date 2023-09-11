import { useForm, useRule } from '@/publicodes-state'

type Props = {
  question: string
  color?: string
  toggleQuestionList: () => void
}

const statusClassNames = {
  missing: 'bg-gray-100 text-gray-500',
  current: 'border-2 border-primary',
  default: 'bg-primaryLight',
}
export default function CategoryQuestion({
  question,
  color = '#ff0000',
  toggleQuestionList,
}: Props) {
  const { label, isMissing, displayValue, unit } = useRule(question)

  const { currentQuestion, setCurrentQuestion } = useForm()

  const status =
    currentQuestion === question ? 'current' : isMissing ? 'missing' : 'default'

  return (
    <button
      className={`relative mb-2 flex w-full items-center justify-between gap-4 overflow-hidden rounded-lg p-4 pl-6 text-left font-bold ${statusClassNames[status]} `}
      onClick={() => {
        setCurrentQuestion(question)
        toggleQuestionList()
      }}>
      <div
        className="absolute bottom-0 left-0 top-0 w-2"
        style={{ backgroundColor: color }}
      />
      <div className="w-1/2">{label}</div>
      <div className="align-center flex justify-end text-lg">
        {displayValue !== 'mosaic' ? (
          <div className="rounded-lg bg-white px-4 py-2 !text-primaryDark first-letter:uppercase">
            {displayValue
              .toLocaleString('fr-fr', {
                maximumFractionDigits: 2,
              })
              .replaceAll("'", '')}{' '}
            {unit}
          </div>
        ) : null}
      </div>
    </button>
  )
}
