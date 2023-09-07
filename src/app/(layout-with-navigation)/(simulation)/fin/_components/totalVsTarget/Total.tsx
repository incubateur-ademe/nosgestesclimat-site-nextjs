import { useForm } from '@/publicodes-state'

import Annotation from './total/Annotation'
import Category from './total/Category'
import NumberDisplay from './total/NumberDisplay'

type Props = {
  total: number
}
export default function Total({ total }: Props) {
  const { categories } = useForm()

  return (
    <div className="relative w-28 h-full">
      <Annotation content="Mon empreinte carbone" />
      <NumberDisplay number={total} />
      <div className="flex flex-col h-full rounded-t border-2 border-black overflow-hidden">
        {categories.map((category: string, index: number) => (
          <Category
            key={category}
            position={
              index === 0
                ? 'first'
                : index === categories.length - 1
                ? 'last'
                : 'middle'
            }
            category={category}
            total={total}
          />
        ))}
      </div>
    </div>
  )
}
