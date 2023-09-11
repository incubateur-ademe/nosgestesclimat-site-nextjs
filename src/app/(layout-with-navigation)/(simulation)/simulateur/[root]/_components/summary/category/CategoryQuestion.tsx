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
      className={`relative mb-2 flex w-full flex-col items-end justify-between gap-2 overflow-hidden rounded-lg p-4 pl-6 text-left font-bold md:flex-row md:items-center md:gap-4 ${statusClassNames[status]} `}
      onClick={() => {
        setCurrentQuestion(question)
        toggleQuestionList()
      }}>
      <div
        className="absolute bottom-0 left-0 top-0 w-2"
        style={{ backgroundColor: color }}
      />
      <div className="text-sm md:w-1/2 md:text-base">{label}</div>
      <div className="align-center flex justify-end whitespace-nowrap md:text-lg">
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
