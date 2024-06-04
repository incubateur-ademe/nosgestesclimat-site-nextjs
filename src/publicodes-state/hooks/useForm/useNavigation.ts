import getNamespace from '@/publicodes-state/helpers/getNamespace'
import { useMemo } from 'react'

type Props = {
  remainingQuestions: string[]
  relevantOrderedQuestions: string[]
  currentQuestion: string | null
  setCurrentQuestion: (question: string | null) => void
}

export default function useNavigation({
  remainingQuestions,
  relevantOrderedQuestions,
  currentQuestion,
  setCurrentQuestion,
}: Props) {
  const currentQuestionNamespace = useMemo<string | undefined>(
    () => getNamespace(currentQuestion),
    [currentQuestion]
  )

  const currentQuestionIndex = useMemo<number>(
    () =>
      currentQuestion ? relevantOrderedQuestions?.indexOf(currentQuestion) : 0,
    [relevantOrderedQuestions, currentQuestion]
  )

  const noPrevQuestion = useMemo<boolean>(
    () => currentQuestionIndex === 0,
    [currentQuestionIndex]
  )
  const noNextQuestion = useMemo<boolean>(
    () =>
      remainingQuestions.length === 0 ||
      (remainingQuestions.length === 1 &&
        !remainingQuestions.includes(
          relevantOrderedQuestions[currentQuestionIndex + 1]
        )),
    [currentQuestionIndex, relevantOrderedQuestions, remainingQuestions]
  )

  const isLastQuestionOfCategory = useMemo<boolean>(
    () =>
      getNamespace(relevantOrderedQuestions[currentQuestionIndex + 1]) !==
      currentQuestionNamespace,
    [currentQuestionNamespace, currentQuestionIndex, relevantOrderedQuestions]
  )

  const isFirstQuestionOfCategory = useMemo<boolean>(
    () =>
      getNamespace(relevantOrderedQuestions[currentQuestionIndex - 1]) !==
      currentQuestionNamespace,
    [currentQuestionNamespace, currentQuestionIndex, relevantOrderedQuestions]
  )

  const gotoPrevQuestion = (): string | undefined => {
    if (noPrevQuestion) {
      return undefined
    }

    const newCurrentQuestion =
      relevantOrderedQuestions[currentQuestionIndex - 1]

    setCurrentQuestion(newCurrentQuestion)

    return newCurrentQuestion
  }

  const gotoNextQuestion = (): string | undefined => {
    if (noNextQuestion) {
      return undefined
    }

    const newCurrentQuestion =
      relevantOrderedQuestions[currentQuestionIndex + 1] ||
      remainingQuestions[0]

    setCurrentQuestion(newCurrentQuestion)

    return newCurrentQuestion
  }

  return {
    gotoPrevQuestion,
    gotoNextQuestion,
    noPrevQuestion,
    noNextQuestion,
    isFirstQuestionOfCategory,
    isLastQuestionOfCategory,
  }
}
