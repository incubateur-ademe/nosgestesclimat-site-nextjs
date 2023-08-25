import { useForm } from '@/publicodes-state'
import { Category } from '@/types/model'
import SubCategory from './SubCategory'

export default function CategoryTable() {
  const { categories, relevantQuestions } = useForm()

  return categories.map((category: Category) => {
    const categoryQuestions = relevantQuestions.filter(
      (question: { dottedName: string }) =>
        question.dottedName.includes(category.dottedName)
    )

    if (!categoryQuestions.length) return null

    return (
      <SubCategory
        key={category.dottedName}
        ruleDottedName={category.dottedName}
        rules={categoryQuestions}
        level={1}
      />
    )
  })
}
