import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

export function getGroupedQuestionsFromSubcat(
  questions: DottedName[],
  subcategory: DottedName,
  missingVariables: Record<DottedName, number>
): DottedName[] {
  // We make sure that questions with common root (third level) stay together and we sort questions within these groups by their missingVariables score
  const groupedQuestions: Record<string, DottedName[]> = questions.reduce(
    (accGroupedQuestions, question) => {
      const splittedQuestion = question.split(' . ')

      // We only keep questions that belong to the subcategory: exemple "logement . chauffage"
      if (!(question.startsWith(subcategory) && splittedQuestion.length > 2))
        return accGroupedQuestions

      const parent = splittedQuestion.slice(0, 3).join(' . ')

      const newGroupedQuestions = [...(accGroupedQuestions[parent] ?? [])]
      newGroupedQuestions.push(question)

      newGroupedQuestions.sort((a, b) => {
        return missingVariables[b] - missingVariables[a]
      })

      accGroupedQuestions[parent] = newGroupedQuestions
      return accGroupedQuestions
    },
    {} as Record<string, DottedName[]>
  )

  // Finally we flatten the result preserving the grouping order
  const result: DottedName[] = []
  for (const parent in groupedQuestions) {
    result.push(...groupedQuestions[parent])
  }

  return result
}
