import { useRule } from '@/publicodes-state'
import { useState } from 'react'

import BarChartItem from '@/components/misc/BarChartItem'
import Subcategories from './category/Subcategories'

type Props = {
  category: string
  value: number
  max: number
}

export default function Category({ category, value, max }: Props) {
  const { title, icons, color } = useRule(category)

  const [open, setOpen] = useState(false)

  return (
    <div className="mb-4">
      <BarChartItem
        label={`${icons} ${title}`}
        value={value}
        max={max}
        color={color}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      />
      {open ? (
        <Subcategories category={category} max={max} color={color} />
      ) : null}
    </div>
  )
}
