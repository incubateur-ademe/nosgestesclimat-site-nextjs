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
  const { category, title, icons, value } = useRule(subcategory)
  const { color } = useRule(category || '')

  // Model Shenanigans
  const { value: inhabitants } = useRule('logement . saisie habitants')

  if (!value) return

  return (
    <div {...props}>
      <BarChartItem
        label={`${icons || ''} ${title}`}
        value={subcategory.includes('logement') ? value / inhabitants : value}
        max={max}
        color={color}
        onClick={onClick}
      />
    </div>
  )
}
