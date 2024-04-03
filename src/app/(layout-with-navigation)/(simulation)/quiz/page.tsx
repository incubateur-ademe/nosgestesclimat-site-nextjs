'use client'

import {
  quizValidateAlmostCorrectAnswer,
  quizValidateCorrectAnswer,
  quizValidateWrongAnswer,
} from '@/constants/tracking/pages/quiz'
import { useQuizGuard } from '@/hooks/navigation/useQuizGuard'
import { useSaveQuizAnswer } from '@/hooks/quiz/useSaveQuizAnswer'
import { useSortedSubcategoriesByFootprint } from '@/hooks/useSortedSubcategoriesByFootprint'
import { DottedName } from '@/publicodes-state/types'
import { AnswerType } from '@/types/quiz'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useMemo, useState } from 'react'
import Choices from './_components/Choices'
import Label from './_components/Label'
import Navigation from './_components/Navigation'
import Results from './_components/Results'

export default function QuizPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useQuizGuard()

  const { saveQuizAnswer } = useSaveQuizAnswer()

  // The categories to choose from (we take the first, second, tenth, twelfth and twentieth subcategories by footprint)
  const { sortedSubcategories } = useSortedSubcategoriesByFootprint()

  const choices = useMemo<DottedName[]>(
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
  const [answer, setAnswer] = useState<null | DottedName>(null)

  // Is the answer correct / almost correct / false?
  const isAnswerCorrect = useMemo<AnswerType>(() => {
    if (answer === sortedSubcategories[0]) return 'correct'
    if (answer === sortedSubcategories[1]) return 'almost'
    return 'wrong'
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
      {isAnswerValidated ? (
        <Results choices={choices} />
      ) : (
        <Choices answer={answer} choices={choices} setAnswer={setAnswer} />
      )}
      <Navigation
        answer={answer}
        isAnswerValidated={isAnswerValidated}
        handleAnswerValidation={() => {
          if (!answer) return
          if (isAnswerCorrect === 'correct') {
            trackEvent(quizValidateCorrectAnswer(answer))
          }
          if (isAnswerCorrect === 'almost') {
            trackEvent(quizValidateAlmostCorrectAnswer(answer))
          }
          if (isAnswerCorrect === 'wrong') {
            trackEvent(quizValidateWrongAnswer(answer))
          }
          setIsAnswerValidated(true)
          saveQuizAnswer({ answer, isAnswerCorrect })
        }}
      />
    </>
  )
}
