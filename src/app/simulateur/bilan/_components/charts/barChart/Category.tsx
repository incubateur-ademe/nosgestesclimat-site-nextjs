import { useRule } from '@/publicodes-state'

import BarChartItem from '@/components/misc/BarChartItem'
import Subcategories from './category/Subcategories'

type Props = {
  category: string
  value: number
  max: number
  current: boolean
  open: boolean
  setOpen: Function
}

export default function Category({
  category,
  value,
  max,
  current,
  open,
  setOpen,
}: Props) {
  const { title, icons, color } = useRule(category)

  return (
    <div className={`p-2 rounded-xl ${current ? 'bg-primaryLight' : ''}`}>
      <BarChartItem
        label={`${icons} ${title}`}
        value={value}
        max={max}
        color={color}
        onClick={() =>
          setOpen((prevOpen: string | null) =>
            prevOpen === category ? null : category
          )
        }
      />
      {open ? (
        <Subcategories category={category} max={max} color={color} />
      ) : null}
    </div>
  )
}
