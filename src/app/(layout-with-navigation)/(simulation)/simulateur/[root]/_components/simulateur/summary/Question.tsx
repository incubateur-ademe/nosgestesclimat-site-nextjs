import Trans from '@/components/translation/Trans'
import { useDebug } from '@/hooks/useDebug'
import { useForm, useRule } from '@/publicodes-state'
import ChoicesValue from './question/ChoicesValue'
import NumberValue from './question/NumberValue'

type Props = {
  question: string
  toggleQuestionList: () => void
}

const statusClassNames = {
  missing: 'bg-gray-100 text-gray-500',
  current: 'border-2 border-primary',
  default: 'bg-primaryLight',
}
export default function Question({ question, toggleQuestionList }: Props) {
  const { label, isMissing, value, displayValue, unit, type, color } =
    useRule(question)

  const { currentQuestion, setCurrentQuestion } = useForm()

  const isDebug = useDebug()

  const status =
    currentQuestion === question ? 'current' : isMissing ? 'missing' : 'default'

  return (
    <button
      disabled={!isDebug && isMissing}
      className={`relative mb-2 flex w-full flex-col items-end justify-between gap-2 overflow-hidden rounded-lg p-4 pl-6 text-left font-bold md:flex-row md:items-center md:gap-4 ${statusClassNames[status]} `}
      onClick={() => {
        setCurrentQuestion(question)
        toggleQuestionList()
      }}>
      <div
        className="absolute bottom-0 left-0 top-0 w-2"
        style={{ backgroundColor: color }}
      />
      <div className="text-sm md:w-2/3 md:text-base">
        {isDebug ? (
          <>
            {question} ({type})
          </>
        ) : (
          label
        )}
      </div>
      <div className="align-center flex justify-end whitespace-nowrap md:text-lg">
        {displayValue !== 'mosaic' ? (
          <div
            className={`rounded-lg bg-white px-4 py-2 ${
              isMissing ? 'text-gray-300' : 'text-primaryDark'
            } first-letter:uppercase`}>
            {type === 'number' && (
              <NumberValue displayValue={displayValue} unit={unit} />
            )}
            {type === 'boolean' && <Trans>{displayValue}</Trans>}
            {type === 'choices' && (
              <ChoicesValue value={value} question={question} />
            )}
          </div>
        ) : null}
      </div>
    </button>
  )
}
