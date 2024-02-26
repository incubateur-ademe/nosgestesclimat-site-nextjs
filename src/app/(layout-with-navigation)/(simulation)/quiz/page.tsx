'use client'

import { useQuizGuard } from '@/hooks/navigation/useQuizGuard'
import { useSortedSubcategoriesByFootprint } from '@/hooks/useSortedSubcategoriesByFootprint'
import { AnswerType } from '@/types/quiz'
import { useMemo, useState } from 'react'
import Label from './_components/Label'
import Navigation from './_components/Navigation'

export default function QuizPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useQuizGuard()

  // The categories to choose from (we take the first, second, tenth, twelfth and twentieth subcategories by footprint)
  const { sortedSubcategories } = useSortedSubcategoriesByFootprint()
  const choices = useMemo(
    () => [
      sortedSubcategories[0],
      sortedSubcategories[1],
      sortedSubcategories[9],
      sortedSubcategories[11],
      sortedSubcategories[19],
    ],
    [sortedSubcategories]
  )

  // The chosen answer
  const [answer, setAnswer] = useState<null | string>(null)

  // Is the answer correct / almost correct / false?
  const isAnswerCorrect = useMemo<AnswerType>(() => {
    if (answer === sortedSubcategories[0]) return 'correct'
    if (answer === sortedSubcategories[1]) return 'almost'
    return 'false'
  }, [answer, sortedSubcategories])

  // Is the answer validated?
  const [isAnswerValidated, setIsAnswerValidated] = useState(false)

  if (!isGuardInit || isGuardRedirecting) return null

  return (
    <>
      <Label
        choices={choices}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerValidated={isAnswerValidated}
      />
      <Choices
        answer={answer}
        choices={choices}
        isAnswerValidated={isAnswerValidated}
        setAnswer={setAnswer}
      />
      <Navigation
        answer={answer}
        isAnswerValidated={isAnswerValidated}
        setIsAnswerValidated={setIsAnswerValidated}
      />
    </>
  )
}
