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
}

export default function CategoryListItem({
  simulationsRecap,
  value,
  category,
}: Props) {
  const { icons } = useRule(category)

  const { formattedValue, unit } = formatCarbonFootprint(value * 1000, {
    shouldUseAbbreviation: true,
  })

  return (
    <li className="flex justify-between border-t border-solid border-gray-300 py-2 last:border-b">
      <div className="flex w-64 items-center justify-between gap-4">
        <div className="flex items-baseline gap-1">
          <Emoji className="mr-2">{icons}</Emoji>{' '}
          <span>{capitalizeString(category)}</span>
        </div>

        <Badge>
          <strong>{formattedValue}</strong> {unit}
        </Badge>
      </div>

      <RepartitionChart
        className="ml-8 flex-1 rounded-lg"
        maxValue={6}
        items={simulationsRecap.map((obj) => ({
          value: obj.categories[category],
          shouldBeHighlighted: obj.isCurrentUser,
        }))}
      />
    </li>
  )
}
