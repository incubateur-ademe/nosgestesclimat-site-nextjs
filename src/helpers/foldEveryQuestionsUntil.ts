import { UpdateCurrentSimulationProps } from '@/publicodes-state/types'

type Props = {
  question: string
  relevantOrderedQuestions: string[]
  updateCurrentSimulation: (simulation: UpdateCurrentSimulationProps) => void
}

export function foldEveryQuestionsUntil({
  question,
  relevantOrderedQuestions,
  updateCurrentSimulation,
}: Props) {
  const indexOfQuestion = relevantOrderedQuestions.indexOf(question)
  const questionsToAnswer = relevantOrderedQuestions.slice(0, indexOfQuestion)
  questionsToAnswer.map((question) =>
    updateCurrentSimulation({ foldedStepToAdd: question })
  )
}
