import {
  DottedName,
  UpdateCurrentSimulationProps,
} from '@/publicodes-state/types'

type Props = {
  question: DottedName
  relevantQuestions: DottedName[]
  updateCurrentSimulation: (simulation: UpdateCurrentSimulationProps) => void
}

export function foldEveryQuestionsUntil({
  question,
  relevantQuestions,
  updateCurrentSimulation,
}: Props) {
  const indexOfQuestion = relevantQuestions.indexOf(question)
  const questionsToAnswer = relevantQuestions.slice(0, indexOfQuestion)
  questionsToAnswer.map((question) =>
    updateCurrentSimulation({ foldedStepToAdd: question })
  )
}
