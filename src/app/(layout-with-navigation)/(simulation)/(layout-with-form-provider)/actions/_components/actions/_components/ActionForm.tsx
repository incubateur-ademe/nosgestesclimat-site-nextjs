import Navigation from '@/app/(layout-with-navigation)/(simulation)/(layout-with-form-provider)/simulateur/[root]/_components/form/Navigation'
import Question from '@/app/(layout-with-navigation)/(simulation)/(layout-with-form-provider)/simulateur/[root]/_components/form/Question'
import { useForm } from '@/publicodes-state'
import { useEffect } from 'react'

type Props = {
  category: string
  onComplete: () => void
}

export default function ActionForm({ category, onComplete }: Props) {
  const {
    currentQuestion,
    remainingQuestionsByCategories,
    setCurrentQuestion,
    setCurrentCategory,
    currentCategory,
  } = useForm()

  useEffect(() => {
    if (category && !currentCategory) {
      setCurrentCategory(category)
    }
  }, [category, currentCategory, setCurrentCategory])

  useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(remainingQuestionsByCategories[currentCategory]?.[0])
    }
  }, [
    currentCategory,
    currentQuestion,
    remainingQuestionsByCategories,
    setCurrentQuestion,
  ])

  if (!currentQuestion || !currentCategory) return null

  return (
    <div className="mb-4 rounded-lg bg-primaryLight p-4 text-left">
      <Question question={currentQuestion} key={currentQuestion} />
      <Navigation
        shouldDisableRouter
        question={currentQuestion}
        onComplete={onComplete}
      />
    </div>
  )
}
