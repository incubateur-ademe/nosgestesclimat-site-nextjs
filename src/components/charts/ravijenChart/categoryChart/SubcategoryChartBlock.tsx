import { useRule } from '@/publicodes-state'
import Image from 'next/image'

export default function SubcategoryChartBlock({
  subcategory,
}: {
  subcategory: string
}) {
  const { title, displayValue, unit } = useRule(subcategory)

  return (
    <div>
      <Image
        style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
        src={`/images/model/${subcategory}.svg`}
        alt={`${title}, ${displayValue} ${unit}`}
        width={32}
        height={32}
        className="h-6 w-6 md:h-8 md:w-8"
      />

      <p>{title}</p>

      <p>
        {displayValue} {unit}
      </p>
    </div>
  )
}
