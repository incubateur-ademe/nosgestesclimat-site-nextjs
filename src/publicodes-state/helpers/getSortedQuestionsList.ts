import { DottedName } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  questions: DottedName[]
  categories: string[]
  subcategories: Record<string, string[]>
  missingVariables: Record<string, number>
}

export default function getSortedQuestionsList({
  questions,
  categories,
  subcategories,
  missingVariables,
}: Props): DottedName[] {
  return questions.sort((a, b) => {
    const aSplittedName = a.split(' . ')
    const bSplittedName = b.split(' . ')

    // We first sort by category
    if (
      categories.indexOf(aSplittedName[0]) >
      categories.indexOf(bSplittedName[0])
    ) {
      return 1
    }
    if (
      categories.indexOf(aSplittedName[0]) <
      categories.indexOf(bSplittedName[0])
    ) {
      return -1
    }

    // then by subcategory
    const categoryOfBothQuestions = aSplittedName[0]
    const aCategoryAndSubcategory = aSplittedName[0] + ' . ' + aSplittedName[1]
    const bCategoryAndSubcategory = bSplittedName[0] + ' . ' + bSplittedName[1]
    if (
      subcategories?.[categoryOfBothQuestions]?.indexOf(
        aCategoryAndSubcategory
      ) >
      subcategories?.[categoryOfBothQuestions]?.indexOf(bCategoryAndSubcategory)
    ) {
      return 1
    }
    if (
      subcategories?.[categoryOfBothQuestions]?.indexOf(
        aCategoryAndSubcategory
      ) <
      subcategories?.[categoryOfBothQuestions]?.indexOf(bCategoryAndSubcategory)
    ) {
      return -1
    }

    // then by missing variables score
    return missingVariables[b] - missingVariables[a]
  })
}
