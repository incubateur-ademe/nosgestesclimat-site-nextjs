import { useRule } from '@/publicodes-state'
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
  const { value, title } = useRule(subcategory)

  const percent = (value / total) * 100

  if (percent < 5) return
  return (
    <div
      className={`flex h-full justify-center items-center border-white border-ltransition-all ${positionClassNames[position]}`}
      style={{ width: `${percent}%` }}>
      <Image
        className="grayscale brightness-200 invert"
        src={`/images/model/${subcategory}.svg`}
        alt={title}
        width={32}
        height={32}
      />
    </div>
  )
}
