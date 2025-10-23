import { getGroupedQuestionsFromSubcat } from '@/helpers/publicodes/getGroupedQuestionsFromSubcat'
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

    // At this point, both questions are in the same subcategory.

    // then we make sure that questions with common 3 level subsubcategory stay together, and are ordered by missing variables score, and answered status
    const subcatsOrderedQuestions = getGroupedQuestionsFromSubcat(
      questions,
      aCategoryAndSubcategory as DottedName,
      missingVariables,
      answeredQuestions
    )

    if (
      subcatsOrderedQuestions.indexOf(a) > subcatsOrderedQuestions.indexOf(b)
    ) {
      return 1
    }
    if (
      subcatsOrderedQuestions.indexOf(a) < subcatsOrderedQuestions.indexOf(b)
    ) {
      return -1
    }

    // We should reach this point only for questions at the root level of a category.
    // if question is already answered, it must be before others : we can't have a non-answered question before an answered one.
    const aIsAnswered = answeredQuestions.includes(a)
    const bIsAnswered = answeredQuestions.includes(b)

    if (aIsAnswered && !bIsAnswered) {
      return -1
    }
    if (!aIsAnswered && bIsAnswered) {
      return 1
    }
    return (missingVariables[b] ?? 0) - (missingVariables[a] ?? 0)
  })
}
