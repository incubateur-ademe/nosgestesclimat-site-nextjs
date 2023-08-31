import { useForm, useRule } from '@/publicodes-state'

type Props = {
  question: string
}

export default function CategoryQuestion({ question }: Props) {
  const { isMissing, displayValue } = useRule(question)

  const { currentQuestion, setCurrentQuestion } = useForm()

  const isCurrentQuestion = currentQuestion === question
  return (
    <button
      className={`mb-1 block text-left hover:text-primary ${
        isCurrentQuestion ? 'underline' : ''
      } ${isMissing && !isCurrentQuestion ? 'text-gray-600' : ''}`}
      onClick={() => setCurrentQuestion(question)}>
      ({question}) : {displayValue}
    </button>
  )
}
