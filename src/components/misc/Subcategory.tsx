import { useRule } from '@/publicodes-state'

import BarChartItem from '@/components/misc/BarChartItem'

type Props = {
  subcategory: string
  max: number
  onClick?: () => void
}

export default function Subcategory({
  subcategory,
  max,
  onClick = () => null,
  ...props
}: Props) {
  const { category, title, icons, value } = useRule(subcategory)
  const { color } = useRule(category || '')

  // Model Shenanigans
  const { value: inhabitants } = useRule('logement . saisie habitants')

  return value ? (
    <div {...props}>
      <BarChartItem
        label={`${icons || ''} ${title}`}
        value={subcategory.includes('logement') ? value / inhabitants : value}
        max={max}
        color={color}
        onClick={onClick}
      />
    </div>
  ) : null
}
