import { getSubcatsOfCategory } from '@/helpers/publicodes/getSubcatsOfCategory'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  questions: DottedName[]
  categories: string[]
  subcategories: string[]
  missingVariables: Record<string, number>
  answeredQuestions?: DottedName[]
}

export default function getSortedQuestionsList({
  questions,
  categories,
  subcategories,
  missingVariables,
  answeredQuestions = [],
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

    const subcategoriesOfBothQuestions = getSubcatsOfCategory(
      categoryOfBothQuestions as DottedName,
      subcategories as DottedName[]
    )

    if (
      subcategoriesOfBothQuestions.indexOf(
        aCategoryAndSubcategory as DottedName
      ) >
      subcategoriesOfBothQuestions.indexOf(
        bCategoryAndSubcategory as DottedName
      )
    ) {
      return 1
    }
    if (
      subcategoriesOfBothQuestions.indexOf(
        aCategoryAndSubcategory as DottedName
      ) <
      subcategoriesOfBothQuestions.indexOf(
        bCategoryAndSubcategory as DottedName
      )
    ) {
      return -1
    }

    // then, if question is already answered, it must be before others : we can't have a non-answered question before an answered one
    const aIsAnswered = answeredQuestions.includes(a)
    const bIsAnswered = answeredQuestions.includes(b)

    if (aIsAnswered && !bIsAnswered) {
      return -1
    }
    if (!aIsAnswered && bIsAnswered) {
      return 1
    }

    // then by missing variables score. Note that if the question is not a missing variable, the score is undefined, so it will be at the end of the list.
    return missingVariables[b] - missingVariables[a]
  })
}
