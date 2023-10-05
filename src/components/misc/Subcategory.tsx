import BarChartItem from '@/components/misc/BarChartItem'
import { useRule } from '@/publicodes-state'

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
  const { category, title, icons, numericValue } = useRule(subcategory)
  const { color } = useRule(category || '')

  if (!numericValue) return

  return (
    <div {...props}>
      <BarChartItem
        label={`${icons || ''} ${title}`}
        value={numericValue}
        max={max}
        color={color}
        onClick={onClick}
      />
    </div>
  )
}
