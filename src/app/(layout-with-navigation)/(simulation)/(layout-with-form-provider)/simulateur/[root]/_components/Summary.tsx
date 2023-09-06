import { useForm } from '@/publicodes-state'
import Category from './summary/Category'

type Props = {
  toggleQuestionList: () => void
}
export default function Summary({ toggleQuestionList }: Props) {
  const { categories } = useForm()
  return (
    <div>
      {categories.map((category: any) => (
        <Category
          key={category}
          category={category}
          toggleQuestionList={toggleQuestionList}
        />
      ))}
    </div>
  )
}
