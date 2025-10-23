import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export function getGroupedQuestionsFromSubcat(
  questions: DottedName[],
  subcategory: DottedName,
  missingVariables: Record<DottedName, number>
): DottedName[] {
  // We only keep questions that belong to the subcategory: exemple "logement . chauffage"
  const questionsOfSubcat = questions?.filter(
    (question) =>
      question.startsWith(subcategory) && question.split(' . ').length > 2
  )

  // We make sure that questions with common root (third level) stay together and we sort questions within these groups by their missingVariables score
  const groupedQuestions: Record<string, DottedName[]> = {}
  for (const question of questionsOfSubcat) {
    const splitted = question.split(' . ')
    const parent = splitted.slice(0, 3).join(' . ')
    if (!groupedQuestions[parent]) {
      groupedQuestions[parent] = []
    }
    groupedQuestions[parent].push(question)
  }

  // Now we sort each group and questions within each group by missingVariables score descending. If a question has already been answered, its missingVariables score is undefined, so we need to handle that case to make sure it appears first.
  for (const parent in groupedQuestions) {
    groupedQuestions[parent].sort((a, b) => {
      const aIsAnswered = missingVariables[a] === undefined
      const bIsAnswered = missingVariables[b] === undefined

      if (aIsAnswered && !bIsAnswered) {
        return -1
      }
      if (!aIsAnswered && bIsAnswered) {
        return 1
      }

      return (missingVariables[b] ?? 0) - (missingVariables[a] ?? 0)
    })
  }

  // Finally we flatten the result preserving the grouping order
  const result: DottedName[] = []
  for (const parent in groupedQuestions) {
    result.push(...groupedQuestions[parent])
  }

  return result
}
