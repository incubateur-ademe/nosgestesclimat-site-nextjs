import { useForm, useRule } from '@/publicodes-state'

import CategoryQuestion from './category/CategoryQuestion'
type Props = {
  category: any
}

export default function Category({ category }: Props) {
  const { value, title, isMissing } = useRule(
    category === 'transport' ? 'transport . empreinte' : category // Model shenanigans
  )
  const { subcategories, questionsByCategories, currentCategory } = useForm()

  return (
    <div
      className={`p-4 border border-white ${
        currentCategory === category ? '' : 'border-dotted'
      } rounded`}>
      <h3
        className={`${
          currentCategory === category ? 'underline font-bold' : ''
        } ${isMissing ? 'text-gray-400' : ''}`}>
        {title} : <strong>{value}</strong>
      </h3>
      <div className="text-xs ">
        {questionsByCategories[category].map((question: string) => (
          <CategoryQuestion key={question} question={question} />
        ))}
      </div>
      {/* {
        <div className='text-xs '>
          {subcategories[category].map((subcategory: string) => (
            <CategoryQuestion key={subcategory} question={subcategory} />
          ))}
        </div>
      } */}
    </div>
  )
}
