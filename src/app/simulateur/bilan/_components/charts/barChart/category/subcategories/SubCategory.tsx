import { useRule } from '@/publicodes-state'

import BarChartItem from '@/components/misc/BarChartItem'

type Props = {
  category: string
  max: number
  color: string
}

export default function Category({ category, max, color }: Props) {
  const { title, icons, value } = useRule(category)

  return value ? (
    <BarChartItem
      label={`${icons || ''} ${title}`}
      value={value}
      max={max}
      color={color}
      onClick={() => null}
    />
  ) : null
}
