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

  // Model Shenanigans
  const { numericValue: inhabitants } = useRule('logement . saisie habitants')

  if (!numericValue) return

  return (
    <div {...props}>
      <BarChartItem
        label={`${icons || ''} ${title}`}
        value={
          subcategory.includes('logement')
            ? numericValue / inhabitants
            : numericValue
        }
        max={max}
        color={color}
        onClick={onClick}
      />
    </div>
  )
}
