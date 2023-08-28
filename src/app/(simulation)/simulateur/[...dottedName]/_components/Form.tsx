import { useForm } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navigation from './form/Navigation'
import Question from './form/Question'

export default function Form() {
  const { currentQuestion, setCurrentQuestion } = useForm()
  const router = useRouter()

  const searchParams = useSearchParams()
  const questionInQueryParams = searchParams.get('question')

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!isInitialized && questionInQueryParams) {
      setCurrentQuestion(
        decodeURI(
          questionInQueryParams.replaceAll('.', ' . ').replaceAll('_', ' ')
        )
      )
    }
    setIsInitialized(true)
  }, [questionInQueryParams])

  useEffect(() => {
    if (isInitialized) {
      router.push(
        '/simulateur/bilan?question=' +
          currentQuestion.replaceAll(' . ', '.').replaceAll(' ', '_'),
        { scroll: false }
      )
    }
  }, [currentQuestion, isInitialized])

  if (!isInitialized) return
  return (
    <div className="rounded-lg bg-primaryLight p-4 mb-4">
      <Question question={currentQuestion} key={currentQuestion} />
      <Navigation question={currentQuestion} />
    </div>
  )
}
