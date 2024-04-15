import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'

type Props = {
  subcategory: string
  total: number
  position: 'first' | 'middle' | 'last'
}

const positionClassNames = {
  first: 'border-r',
  last: 'border-l',
  middle: 'border-x',
}
export default function Subcategory({ subcategory, total, position }: Props) {
  const { numericValue, icons } = useRule(subcategory)

  const percent = (numericValue / total) * 100

  if (percent < 7) return

  return (
    <div
      className={`flex h-full items-center justify-center border-l border-white transition-all ${positionClassNames[position]} ease-in-out`}
      style={{ width: `${percent}%` }}>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xl md:h-8 md:w-8">
        <Emoji className="text-sm md:text-base">{icons?.slice(0, 2)}</Emoji>
      </div>
    </div>
  )
}
