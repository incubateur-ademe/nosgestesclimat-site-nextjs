import { useForm } from '@/publicodes-state'
import Subcategory from './Subcategory'

export default function CategoryTable() {
  const { categories, relevantQuestions } = useForm()

  return categories.map((category: string) => {
    const categoryQuestions = relevantQuestions.filter((question: string) =>
      question.includes(category)
    )

    if (!categoryQuestions.length) return null

    return (
      <Subcategory
        key={category}
        ruleDottedName={category}
        rules={categoryQuestions}
        level={1}
      />
    )
  })
}
