'use client'

import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { getSubcatsOfCategory } from '@/helpers/publicodes/getSubcatsOfCategory'
import { useEngine, useFormState } from '@/publicodes-state'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Question from './subcategory/Question'

type Props = {
  category: DottedName
}

export default function QuestionsWithoutSubcategory({ category }: Props) {
  const { subcategories } = useEngine()
  const { relevantAnsweredQuestions } = useFormState()

  const subCategoriesOfCategory = getSubcatsOfCategory(category, subcategories)

  const answeredQuestionOfCategoryWithoutSubcategory =
    relevantAnsweredQuestions.filter((question) => {
      if (!question.includes(category)) {
        return false
      }
      for (const subCategory of subCategoriesOfCategory) {
        if (question.includes(subCategory)) {
          return false
        }
      }
      if (question.includes('plats')) {
        return false
      }
      return true
    })

  return answeredQuestionOfCategoryWithoutSubcategory.map((question) => (
    <li
      key={question}
      className="bg-primary-100 relative mt-2 w-full overflow-hidden rounded-xl">
      <div
        className={`absolute top-0 bottom-0 left-0 w-2 ${getBackgroundColor(
          category
        )}`}
      />

      <div className="pt-4 pr-4 pb-2 pl-6">
        <Question question={question} />
      </div>
    </li>
  ))
}
