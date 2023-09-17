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
      relevantQuestions[currentQuestionIndex + 1]?.split(' . ')[0] !==
      currentQuestion?.split(' . ')[0],
    [currentQuestion, currentQuestionIndex, relevantQuestions]
  )

  const gotoPrevQuestion = (): string | undefined => {
    if (noPrevQuestion) return

    const newCurrentQuestion = relevantQuestions[currentQuestionIndex - 1]

    setCurrentQuestion(newCurrentQuestion)

    return newCurrentQuestion
  }
  const gotoNextQuestion = (): string | undefined => {
    if (noNextQuestion) return

    const newCurrentQuestion = relevantQuestions[currentQuestionIndex + 1]

    setCurrentQuestion(newCurrentQuestion)

    return newCurrentQuestion
  }

  return {
    gotoPrevQuestion,
    gotoNextQuestion,
    noPrevQuestion,
    noNextQuestion,
    isLastQuestionOfCategory,
  }
}
