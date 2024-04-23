import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { ValueObject } from '@/types/groups'
import { formatValue } from 'publicodes'
import PercentageDiff from '../pointsFortsFaibles/pointsListItem/PercentageDiff'

type Props = {
  category: string
  categoryFootprint?: ValueObject
  membersLength: number
}

export default function Category({
  category,
  categoryFootprint,
  membersLength,
}: Props) {
  const { icons, title } = useRule(category)

  if (!categoryFootprint) return null

  return (
    <li className="flex items-center justify-between border-0 border-b-[1px] border-solid border-gray-200 py-4 last:border-b-0">
      <div className="flex items-center">
        <div className="flex-shrink-0 text-2xl">
          <Emoji>{icons}</Emoji>
        </div>
        <div className="ml-4">
          <div className="text-md font-bold text-gray-900">{title}</div>
        </div>
        {membersLength > 1 && (
          <PercentageDiff value={categoryFootprint.difference || 0} />
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="rounded-[5px] border-[1px] border-solid border-primary-800 bg-primary-100 p-1 text-sm text-primary-700">
          <strong>
            {formatValue(categoryFootprint.value / 1000, {
              precision: 1,
            })}
          </strong>{' '}
          t
        </div>
      </div>
    </li>
  )
}
