import { useForm } from '@/publicodes-state'
import Navigation from './form/Navigation'
import Question from './form/Question'

export default function Form() {
  const { currentQuestion } = useForm()

  return (
    <div className="rounded bg-primaryLight p-4 mb-4">
      <Question question={currentQuestion} key={currentQuestion} />
      <Navigation question={currentQuestion} />
    </div>
  )
}
