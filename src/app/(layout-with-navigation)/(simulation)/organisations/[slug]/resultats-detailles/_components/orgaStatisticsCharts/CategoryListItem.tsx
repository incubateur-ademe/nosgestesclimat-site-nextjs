import Badge from '@/design-system/layout/Badge'
import Emoji from '@/design-system/utils/Emoji'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useRule } from '@/publicodes-state'
import { SimulationRecap } from '@/types/organisations'
import { capitalizeString } from '@/utils/capitalizeString'
import RepartitionChart from './RepartitionChart'

type Props = {
  simulationsRecap: SimulationRecap[]
  value: number
  category: string
  maxValue: number
}

export default function CategoryListItem({
  simulationsRecap,
  value,
  category,
  maxValue,
}: Props) {
  const { icons } = useRule(category)

  const { formattedValue, unit } = formatCarbonFootprint(value * 1000, {
    shouldUseAbbreviation: true,
  })

  return (
    <li className="flex flex-col justify-between gap-2 border-t border-solid border-gray-300 py-2 last:border-b md:flex-row md:gap-8">
      <div className="flex items-center justify-between gap-4 md:w-64">
        <div className="flex items-baseline gap-1">
          <Emoji className="mr-2">{icons}</Emoji>{' '}
          <span>{capitalizeString(category)}</span>
        </div>

        <div className="flex flex-col items-end">
          <Badge>
            <strong>{formattedValue}</strong> {unit}
          </Badge>
        </div>
      </div>

      <RepartitionChart
        className="min-h-[2.5rem] flex-1 rounded-lg"
        maxValue={maxValue}
        items={simulationsRecap.map((obj) => ({
          value: obj.categories[category] / 1000,
          shouldBeHighlighted: obj.isCurrentUser,
        }))}
        id={category}
      />
    </li>
  )
}
