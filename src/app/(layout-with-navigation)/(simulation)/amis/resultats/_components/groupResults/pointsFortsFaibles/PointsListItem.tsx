import Badge from '@/design-system/layout/Badge'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { formatValue } from 'publicodes'
import PercentageDiff from './pointsListItem/PercentageDiff'

type PointsListItemProps = {
  name: string
  value: number
  difference: number
}

export default function PointsListItem({
  name,
  value,
  difference,
}: PointsListItemProps) {
  const rule = useRule(name)

  return (
    <li className="mb-3 flex items-center justify-between rounded-md bg-[#F8F8F7] p-3 text-sm last:mb-0">
      <p className="mb-0 flex items-center">
        <span className="mr-3 inline-block text-lg">
          <Emoji>{rule?.icons}</Emoji>
        </span>
        {rule?.title}
        <PercentageDiff value={difference} />
      </p>

      <Badge>
        <strong>{formatValue(value as number, { precision: 0 })}</strong> kg
      </Badge>
    </li>
  )
}
