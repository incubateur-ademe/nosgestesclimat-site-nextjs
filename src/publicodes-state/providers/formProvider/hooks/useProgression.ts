import { MUST_NOT_ASK_QUESTIONS } from '@/publicodes-state/constants/questions'
import type { UpdateCurrentSimulationProps } from '@/publicodes-state/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useEffect, useMemo } from 'react'

type Props = {
  categories: DottedName[]
  remainingQuestions: DottedName[]
  relevantQuestions: DottedName[]
  updateCurrentSimulation: (simulation: UpdateCurrentSimulationProps) => void
}

/**
 * Get progression and remaining questions sorted by category
 *
 * remainingQuestionsByCategories is not really usefull. It is not deleted for now because it is used in the actions page
 */
export default function useProgression({
  categories,
  remainingQuestions,
  relevantQuestions,
  updateCurrentSimulation,
}: Props) {
  const remainingAskableQuestions = remainingQuestions.filter(
    (question) => !MUST_NOT_ASK_QUESTIONS.has(question)
  )

  const progression = useMemo(
    () =>
      relevantQuestions.length
        ? (relevantQuestions.length - remainingAskableQuestions.length) /
          relevantQuestions.length
        : 0,
    [relevantQuestions, remainingAskableQuestions]
  )

  const remainingQuestionsByCategories = useMemo(
    () =>
      categories.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue]: remainingAskableQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {} as Record<DottedName, DottedName[]>
      ),
    [remainingAskableQuestions, categories]
  )

  // Updates the progression stored in the user object / hook
  useEffect(() => {
    updateCurrentSimulation({ progression })
  }, [progression, updateCurrentSimulation])

  return {
    remainingQuestionsByCategories,
  }
}
