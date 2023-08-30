import { useForm, useRule } from '@/publicodes-state'

import BarChartItem from '@/components/misc/BarChartItem'
import Subcategories from './category/Subcategories'

type Props = {
  category: string
  value: number
  max: number
  current: boolean
  isOpen: boolean
  setIsOpen: any
}

export default function Category({
  category,
  value,
  max,
  current,
  isOpen,
  setIsOpen,
  ...props
}: Props) {
  const { title, icons, color } = useRule(category)
  const { setCurrentCategory, setCurrentQuestion } = useForm()

  return (
    <div
      {...props}
      className={`p-4 pb-1 rounded-xl ${current ? 'bg-primaryLight' : ''}`}>
      <BarChartItem
        label={`${icons} ${title}`}
        value={value}
        max={max}
        color={color}
        onClick={() => {
          setIsOpen((previsOpen: string | null) =>
            previsOpen === category ? null : category
          )
          console.log(category)
          setCurrentCategory(category)
          setCurrentQuestion(null)
        }}
      />
      {isOpen ? <Subcategories category={category} max={max} /> : null}
    </div>
  )
}
