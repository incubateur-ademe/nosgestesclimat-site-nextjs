import { useForm, useRule } from '@/publicodes-state'

type Props = {
  question: string
  color: string
  toggleQuestionList: () => void
}

const statusClassNames = {
  missing: 'bg-gray-100 text-gray-500',
  current: 'border-2 border-primary',
  default: 'bg-primaryLight',
}
export default function CategoryQuestion({
  question,
  color,
  toggleQuestionList,
}: Props) {
  const { label, isMissing, displayValue, unit } = useRule(question)

  const { currentQuestion, setCurrentQuestion } = useForm()

  const status =
    currentQuestion === question ? 'current' : isMissing ? 'missing' : 'default'

  return (
    <button
      disabled={isMissing}
      className={`relative overflow-hidden flex gap-4 w-full justify-between items-center mb-2 p-4 pl-6 rounded-lg font-bold text-left ${statusClassNames[status]} `}
      onClick={() => {
        setCurrentQuestion(question)
        toggleQuestionList()
      }}>
      <div
        className="absolute top-0 bottom-0 left-0 w-2"
        style={{ backgroundColor: color }}
      />
      <div className="w-1/2">{label}</div>
      <div className="text-lg flex align-center justify-end">
        {displayValue !== 'mosaic' ? (
          <div className="bg-white !text-primaryDark px-4 py-2 rounded-lg first-letter:uppercase">
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
