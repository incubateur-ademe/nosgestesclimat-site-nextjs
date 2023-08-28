import { useForm } from '@/publicodes-state'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navigation from './form/Navigation'
import Question from './form/Question'

export default function Form() {
  const { currentQuestion } = useForm()
  const router = useRouter()
  useEffect(() => {
    router.push('/simulateur/bilan/' + currentQuestion.split(' . ').join('/'))
  }, [currentQuestion])

  return (
    <div className="rounded-lg bg-primaryLight p-4 mb-4">
      <Question question={currentQuestion} key={currentQuestion} />
      <Navigation question={currentQuestion} />
    </div>
  )
}
