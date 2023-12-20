import getNamespace from '@/publicodes-state/helpers/getNamespace'
import { useMemo } from 'react'

type Props = {
  remainingQuestions: string[]
  relevantQuestions: string[]
  currentQuestion: string | null
  setCurrentQuestion: (question: string | null) => void
}

export default function useNavigation({
  relevantQuestions,
  currentQuestion,
  setCurrentQuestion,
}: Props) {
  const currentQuestionNamespace = useMemo<string | undefined>(
    () => getNamespace(currentQuestion),
    [currentQuestion]
  )

  const currentQuestionIndex = useMemo<number>(
    () => (currentQuestion ? relevantQuestions?.indexOf(currentQuestion) : 0),
    [relevantQuestions, currentQuestion]
  )

  const noPrevQuestion = useMemo<boolean>(
    () => currentQuestionIndex === 0,
    [currentQuestionIndex]
  )
  const noNextQuestion = useMemo<boolean>(
    () => !relevantQuestions[currentQuestionIndex + 1],
    [relevantQuestions, currentQuestionIndex]
  )

  const isLastQuestionOfCategory = useMemo<boolean>(
    () =>
      getNamespace(relevantQuestions[currentQuestionIndex + 1]) !==
      currentQuestionNamespace,
    [currentQuestionNamespace, currentQuestionIndex, relevantQuestions]
  )

  const isFirstQuestionOfCategory = useMemo<boolean>(
    () =>
      getNamespace(relevantQuestions[currentQuestionIndex - 1]) !==
      currentQuestionNamespace,
    [currentQuestionNamespace, currentQuestionIndex, relevantQuestions]
  )

  const gotoPrevQuestion = (): string | undefined => {
    if (noPrevQuestion) {
      return undefined
    }

    const newCurrentQuestion = relevantQuestions[currentQuestionIndex - 1]

    setCurrentQuestion(newCurrentQuestion)

    return newCurrentQuestion
  }
  const gotoNextQuestion = (): string | undefined => {
    if (noNextQuestion) {
      return undefined
    }

    const newCurrentQuestion = relevantQuestions[currentQuestionIndex + 1]

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
