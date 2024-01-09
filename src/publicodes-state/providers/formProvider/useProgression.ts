import { useEffect, useMemo } from 'react'

type Props = {
  categories: string[]
  remainingQuestions: string[]
  relevantQuestions: string[]
  updateProgression: (progression: number) => void
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
  updateProgression,
}: Props) {
  const progression = useMemo(
    () =>
      relevantQuestions.length
        ? (relevantQuestions.length - remainingQuestions.length) /
          relevantQuestions.length
        : 0,
    [relevantQuestions, remainingQuestions]
  )

  const remainingQuestionsByCategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce(
        (accumulator: Record<string, string[]>, currentValue: string) => ({
          ...accumulator,
          [currentValue]: remainingQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
      ),
    [remainingQuestions, categories]
  )

  // Updates the progression stored in the user object / hook
  useEffect(() => {
    updateProgression(progression)
  }, [progression, updateProgression])

  return {
    progression,
    remainingQuestionsByCategories,
  }
}
