/* eslint-disable */

import { getMatomoEventClickSubcategoryGraph } from '@/constants/matomo'
import { useRule } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'

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
  const { numericValue, title } = useRule(subcategory)

  const percent = (numericValue / total) * 100

  if (percent < 5) return
  return (
    <div
      className={`flex h-full items-center justify-center border-l border-white transition-all ${positionClassNames[position]} ease-in-out`}
      style={{ width: `${percent}%` }}
      onClick={() =>
        trackEvent(getMatomoEventClickSubcategoryGraph(subcategory))
      }>
      <Image
        style={{ filter: 'grayscale(1) invert(1) brightness(1.8)' }}
        src={`/images/model/${subcategory}.svg`}
        alt={title || subcategory}
        width={32}
        height={32}
        className="h-6 w-6 md:h-8 md:w-8"
      />
    </div>
  )
}
