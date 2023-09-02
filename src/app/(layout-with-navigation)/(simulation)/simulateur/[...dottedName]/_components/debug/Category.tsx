import { useForm, useRule } from '@/publicodes-state'

import CategoryQuestion from './category/CategoryQuestion'
type Props = {
  category: any
  toggleQuestionList: () => void
}

export default function Category({ category, toggleQuestionList }: Props) {
  const { color } = useRule(category)
  const { questionsByCategories } = useForm()

  return questionsByCategories[category].map((question: string) => (
    <CategoryQuestion
      key={question}
      question={question}
      color={color}
      toggleQuestionList={toggleQuestionList}
    />
  ))
}
