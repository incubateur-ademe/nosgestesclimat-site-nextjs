import { useRule } from '@/publicodes-state'

import BarChartItem from '@/components/misc/BarChartItem'
import Subcategories from './category/Subcategories'

type Props = {
  category: string
  max: number
  current: boolean
  isOpen: boolean
  setIsOpen: any
}

export default function Category({
  category,
  max,
  isOpen,
  setIsOpen,
  ...props
}: Props) {
  const { title, icons, color } = useRule(category)
  const { value } = useRule(
    category === 'transport' ? 'transport . empreinte' : category
  )

  return (
    <div {...props} className={`p-4 pb-1 rounded-xl `}>
      <BarChartItem
        label={`${icons} ${title}`}
        value={value}
        max={max}
        color={color}
        onClick={() => {
          setIsOpen((previsOpen: string | null) =>
            previsOpen === category ? null : category
          )
        }}
      />
      {isOpen ? <Subcategories category={category} max={max} /> : null}
    </div>
  )
}
