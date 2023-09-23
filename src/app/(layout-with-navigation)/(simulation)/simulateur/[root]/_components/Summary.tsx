import { useDebug } from '@/hooks/useDebug'
import { useForm } from '@/publicodes-state'
import Question from './summary/Question'

type Props = {
  toggleQuestionList: () => void
  isQuestionListOpen: boolean
}
export default function Summary({
  toggleQuestionList,
  isQuestionListOpen,
}: Props) {
  const isDebug = useDebug()

  const { relevantQuestions } = useForm()

  return (
    <div className={isQuestionListOpen || isDebug ? 'mb-8 block' : 'hidden'}>
      {relevantQuestions.map((question: any) => (
        <Question
          key={question}
          question={question}
          toggleQuestionList={toggleQuestionList}
        />
      ))}
    </div>
  )
}
