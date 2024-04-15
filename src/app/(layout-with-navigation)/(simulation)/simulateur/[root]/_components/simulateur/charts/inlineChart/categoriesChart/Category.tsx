import Emoji from '@/design-system/utils/Emoji'
import {
  getBackgroundColor,
  getFillColor,
} from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'

type Props = {
  category: string
  total: number
  position: 'first' | 'middle' | 'last'
  current: boolean
}

const positionClassNames = {
  first: 'border-r',
  last: 'border-l',
  middle: 'border-x',
}
export default function Category({
  category,
  total,
  position,
  current,
}: Props) {
  const { numericValue, icons } = useRule(category)

  const percent = (numericValue / total) * 100

  return (
    <div
      className={`relative flex h-full items-center justify-center border-l border-white transition-all ease-in-out ${getBackgroundColor(
        category
      )} ${positionClassNames[position]}`}
      style={{ width: `${percent}%` }}>
      {current ? (
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute  left-1/2 -translate-x-1/2"
          style={{ bottom: 'calc(100% + 0.25rem)' }}>
          <path
            d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z"
            className={getFillColor(category)}
          />
        </svg>
      ) : null}
      {percent > 7 ? (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xl md:h-8 md:w-8">
          <Emoji className="text-sm md:text-base">{icons?.slice(0, 2)}</Emoji>
        </div>
      ) : null}
    </div>
  )
}
