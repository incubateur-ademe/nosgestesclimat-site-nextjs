'use client'

import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { useForm, useSimulation } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import Question from './subcategory/Question'

type Props = {
  category: DottedName
}

export default function QuestionsWithoutSubcategory({ category }: Props) {
  const { subcategories } = useSimulation()
  const { relevantAnsweredQuestions } = useForm()

  const subCategoriesOfCategory = subcategories[category]

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
    <div
      key={question}
      className="relative mt-2 w-full overflow-hidden rounded-xl bg-primary-100 ">
      <div
        className={`absolute bottom-0 left-0 top-0 w-2 ${getBackgroundColor(
          category
        )}`}
      />

      <div className="pb-2 pl-6 pr-4 pt-4">
        <Question question={question} />
      </div>
    </div>
  ))
}
